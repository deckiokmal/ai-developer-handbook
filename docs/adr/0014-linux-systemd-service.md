Siap. Intinya: kita akan buat **2 unit systemd** (server & client) yang:

* Memakai **Python dari venv spesifik** (tanpa `source activate`).
* Membaca **.env per-service** via `EnvironmentFile`.
* Aman berjalan di background & auto-start saat boot.

Sebelum lanjut, quick check (boleh jawab nanti):

1. Path proyek server & client (mis. `/opt/projectwise_server`, `/opt/projectwise_client`)
2. Lokasi venv masing-masing (default: `/<path>/.venv`)
3. File `.env` per-service (mis. `/etc/projectwise/server.env`, `/etc/projectwise/client.env`)
4. User Linux yang dipakai (disarankan non-root: `pwserver`, `pwclient`)

Di bawah ini saya berikan **template lengkap siap pakai**—langsung bisa jalan walau Anda belum jawab.

---

# 1) Struktur yang disarankan

```
/opt/projectwise_server/
  ├─ main.py
  └─ .venv/            # venv server
/opt/projectwise_client/
  ├─ main.py
  └─ .venv/            # venv client
/etc/projectwise/
  ├─ server.env
  └─ client.env
```

> Kalau masih ingin pakai `uv run`, saya sertakan opsi di akhir. Namun untuk server production, **paling stabil** pakai interpreter venv: `.../.venv/bin/python main.py`.

---

# 2) Buat user & permissions (opsional tapi direkomendasikan)

```bash
sudo useradd -r -s /usr/sbin/nologin pwserver
sudo useradd -r -s /usr/sbin/nologin pwclient

sudo chown -R pwserver:pwserver /opt/projectwise_server
sudo chown -R pwclient:pwclient /opt/projectwise_quart

sudo mkdir -p /etc/projectwise
sudo touch /etc/projectwise/server.env /etc/projectwise/client.env
sudo chown root:root /etc/projectwise/*.env
sudo chmod 640 /etc/projectwise/*.env
```

---

# 3) Format `.env` untuk systemd

`EnvironmentFile` systemd membaca format `KEY=VALUE` (tanpa `export`). Contoh:

**`/etc/projectwise/server.env`**

```
PYTHONUNBUFFERED=1
APP_ENV=production
APP_HOST=0.0.0.0
APP_PORT=5000
OPENAI_API_KEY=sk-xxx
DATABASE_URL=sqlite:////opt/projectwise_server/data/app.sqlite
```

**`/etc/projectwise/client.env`**

```
PYTHONUNBUFFERED=1
APP_ENV=production
APP_HOST=0.0.0.0
APP_PORT=8000
MCP_URL=http://localhost:5000/projectwise/mcp/
```

> Catatan:
>
> * Hindari spasi di sekitar `=`.
> * Boleh pakai kutip jika ada karakter khusus: `PASSWORD="p@ss word!"`.

---

# 4) Unit service — **ProjectWise Server**

```ini
# /etc/systemd/system/projectwise-server.service
[Unit]
Description=ProjectWise Server (venv + .env)
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=pwserver
Group=pwserver
WorkingDirectory=/opt/projectwise_server

# Deklarasi venv & PATH agar pip/python dalam venv yang dipakai
Environment=VIRTUAL_ENV=/opt/projectwise_server/.venv
Environment=PATH=/opt/projectwise_server/.venv/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin

# Muat variabel lingkungan service
EnvironmentFile=/etc/projectwise/server.env

# Jalankan app via interpreter venv
ExecStart=/opt/projectwise_server/.venv/bin/python main.py

# Logging & lifecycle
SyslogIdentifier=projectwise-server
StandardOutput=journal
StandardError=journal
Restart=on-failure
RestartSec=5
KillSignal=SIGINT
TimeoutStopSec=30

# Hardening opsional
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=full
ProtectHome=read-only
RestrictSUIDSGID=true
LockPersonality=true
RestrictAddressFamilies=AF_UNIX AF_INET AF_INET6
# Jika butuh tulis ke path tertentu, whitelist di bawah:
# ReadWritePaths=/opt/projectwise_server /var/log/projectwise

[Install]
WantedBy=multi-user.target
```

---

# 5) Unit service — **ProjectWise Client**

```ini
# /etc/systemd/system/projectwise-client.service
[Unit]
Description=ProjectWise Client (venv + .env)
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=pwclient
Group=pwclient
WorkingDirectory=/opt/projectwise_client

Environment=VIRTUAL_ENV=/opt/projectwise_client/.venv
Environment=PATH=/opt/projectwise_client/.venv/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin

EnvironmentFile=/etc/projectwise/client.env

ExecStart=/opt/projectwise_client/.venv/bin/python main.py

SyslogIdentifier=projectwise-client
StandardOutput=journal
StandardError=journal
Restart=on-failure
RestartSec=5
KillSignal=SIGINT
TimeoutStopSec=30

NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=full
ProtectHome=read-only
RestrictSUIDSGID=true
LockPersonality=true
RestrictAddressFamilies=AF_UNIX AF_INET AF_INET6
# ReadWritePaths=/opt/projectwise_client /var/log/projectwise

[Install]
WantedBy=multi-user.target
```

---

# 6) Enable & start

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now projectwise-server.service
sudo systemctl enable --now projectwise-client.service

# Cek status & log
systemctl status projectwise-server.service
systemctl status projectwise-client.service
journalctl -u projectwise-server.service -f
journalctl -u projectwise-client.service -f
```

---

## Opsi: tetap pakai `uv run`

Jika Anda ingin mempertahankan `uv`:

**Server**

```ini
ExecStart=/home/pwserver/.local/bin/uv run --frozen main.py
Environment=PATH=/home/pwserver/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin
```

**Client**

```ini
ExecStart=/home/pwclient/.local/bin/uv run --frozen main.py
Environment=PATH=/home/pwclient/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin
```

> Pastikan `which uv` untuk masing-masing user menghasilkan path yang sama dengan `ExecStart`.

---

## Troubleshooting cepat

* **`ExecStart` not found** → pastikan path interpreter venv valid (`ls /opt/.../.venv/bin/python`).
* **Tidak membaca .env** → pastikan format `KEY=VALUE`, izin `640`, dan `EnvironmentFile` menunjuk file yang benar.
* **Port bentrok** → cek `ss -tulpn | grep :PORT` lalu ubah `APP_PORT` atau hentikan service lain.
* **Butuh reload tanpa restart** → kalau app dukung SIGHUP, bisa tambahkan `ExecReload=/bin/kill -HUP $MAINPID` (opsional).

---

Kalau Anda kirim **path final** server & client + lokasi venv + kebutuhan env kunci (mis. `APP_PORT`, `MCP_URL`, `DB_URL`), saya bisa kirimkan **dua file .service & dua file .env** versi final siap-tempel 1:1.
