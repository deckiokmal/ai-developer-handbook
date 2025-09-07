# 📘 Logging, Audit Trail, Debugging & User Notification Policy

Dokumen ini menjadi panduan konsistensi antara **Backend (Quart/Python)** dan **Frontend (UI/JS)** agar aplikasi lebih mudah **dikelola, dipantau, dan diaudit**.

---

## 1. Level Logging (Backend & Frontend)

### Backend (Python/Quart)

| Level        | Tujuan                                     | Contoh                                              |
| ------------ | ------------------------------------------ | --------------------------------------------------- |
| **DEBUG**    | Diagnosis rinci, detail teknis.            | “planner.step=3 tool=rag_retrieval duration=123ms”  |
| **INFO**     | Event normal & milestone.                  | “user_login_success user_id=42”                     |
| **WARNING**  | Kondisi tidak ideal, ada fallback.         | “vector_db_unavailable fallback=local_summary”      |
| **ERROR**    | Gagal 1 request, proses lanjut.            | “mcp_call_failed tool=rag_retrieval timeout=30s”    |
| **CRITICAL** | Kegagalan sistemik.                        | “db_pool_exhausted”                                 |
| **AUDIT**    | Aktivitas penting (immutable, compliance). | “config_push approved_by=admin device=fw-core-01”   |

### Frontend (UI)

| Level       | Tujuan                      | Tampilan                                      |
| ----------- | --------------------------- | --------------------------------------------- |
| **debug**   | Info dev (console).         | Hanya untuk developer.                        |
| **info**    | Notifikasi umum.            | Toast biru, auto-close.                       |
| **success** | Operasi berhasil.           | Toast hijau, auto-close.                      |
| **warning** | Degradasi/fallback.         | Toast kuning, dengan tombol detail.           |
| **error**   | Kegagalan serius.           | Toast merah, persisten + tombol retry/report. |
| **silent**  | Dicatat, tidak ditampilkan. | Hanya kirim ke sink/log.                      |

---

## 2. Prinsip Terpusat

* **Structured Logging (JSON)** di backend → memudahkan parsing.
* **Correlation ID (`request_id`)** dikirim dari backend → frontend & log sink.
* **Audit Logger** terpisah dari log aplikasi.
* **Sink Terpusat**: Grafana Loki / ELK untuk log, Sentry untuk error, DB khusus untuk audit.
* **Alerting** via Slack/Email/Telegram (Grafana Alerting/Sentry).

---

## 3. Format Standar Response API

Semua response dari backend **wajib konsisten**:

```json
{
  "status": "success|info|warning|error",
  "message": "ringkas untuk user",
  "code": "OPTIONAL_CODE",
  "data": {...},
  "request_id": "uuid-123"
}
```

Frontend cukup membaca `status` & `message` → tampilkan notifikasi sesuai mapping.

---

## 4. Audit Trail

* **Immutable**, hanya append.
* **PII & secret disanitasi** sebelum simpan.
* **Akses terbatas** hanya untuk admin/compliance.
* **Retensi lebih panjang** (≥ 1 tahun).
* **Database** SQLite (lokal dev) atau PostgreSQL (prod)

Contoh skema `audit_logs`:

| Kolom          | Tipe      | Contoh                 |
| -------------- | --------- | ---------------------- |
| id             | UUID      | `uuid-123`             |
| ts             | TIMESTAMP | `2025-08-17T13:00:00Z` |
| request_id     | TEXT      | `uuid-123`             |
| user_id        | TEXT      | `u-42`                 |
| action         | TEXT      | `config_push`          |
| resource_type  | TEXT      | `device`               |
| resource_id    | TEXT      | `fw-core-01`           |
| result         | TEXT      | `approved`             |
| meta           | JSON      | `{"version":"v1.2"}`   |

---

## 5. Debugging & Monitoring

* **Request ID wajib** di log & response header.
* **Error decorator global** → format respons konsisten.
* **Health endpoint** (`/healthz`, `/readyz`).
* **Feature flag DEBUG** hanya untuk admin/IP tertentu.
* **Tracing OTEL** (opsional): Quart middleware → Tempo/Jaeger.

---

## 6. Notifikasi ke User (Frontend UX)

| Status            | UX Policy                                             |
| ----------------- | ----------------------------------------------------- |
| success/info      | Toast ≤ 3s, auto-close                                |
| warning           | Toast + tombol “Detail”                               |
| error             | Toast merah persisten + Retry/Report                  |
| long-running task | Progress bar + WebSocket/Push notifikasi saat selesai |

---

## 7. Contoh Log JSON

```json
{
  "ts": "2025-08-17T13:15:22Z",
  "level": "WARNING",
  "logger": "app",
  "msg": "vector_db_unavailable",
  "request_id": "4f6a8e5f-...",
  "user_id": "u-123",
  "route": "/chat",
  "fallback": "summary_local",
  "duration_ms": 187
}
```

---

## 8. Checklist Implementasi

* [ ] Middleware `request_id` & user context di Quart.
* [ ] Helper `log()` & `log_audit()` (structured JSON).
* [ ] Endpoint `/client-logs`, `/healthz`, `/readyz`.
* [ ] Standar response API.
* [ ] FE logger wrapper (`feLog`) + `showServerToast`.
* [ ] Sink terpusat (Loki/Sentry/DB Audit).
* [ ] Dashboard monitoring & alerting.
* [ ] Policy sanitasi & akses audit.

