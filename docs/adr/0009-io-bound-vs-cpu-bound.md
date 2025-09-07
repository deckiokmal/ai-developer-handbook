## 1. Definisi Singkat

* **I/O-bound** → bottleneck ada di **Input/Output** (menunggu respons dari luar CPU).
* **CPU-bound** → bottleneck ada di **perhitungan berat** di CPU.

---

## 2. Contoh Kasus **I/O-bound**

Task lebih banyak **menunggu** daripada menghitung.

* Panggil **API eksternal** (misalnya OpenAI API, REST API).
* Query ke **database**.
* Baca/tulis file besar (PDF, log, CSV).
* Streaming data (upload/download).
* Socket/WebSocket (chat, IoT, game server).

👉 **Gejala**:

* CPU usage **rendah** (idle),
* Tapi aplikasi tetap **lambat** karena banyak “menunggu”.
* Solusi: **pakai async**.

---

## 3. Contoh Kasus **CPU-bound**

Task lebih banyak **menghitung berat**.

* Training machine learning model.
* Enkripsi/dekripsi data besar.
* Render video / kompresi file.
* Simulasi numerik atau scientific computing.
* Proses gambar (OCR, computer vision berat).

👉 **Gejala**:

* CPU usage **tinggi** (100% 1 core).
* Aplikasi lambat bukan karena menunggu, tapi karena **CPU penuh kerja**.
* Solusi: **pakai multiprocessing / GPU / library C (numpy, torch, dll)**.

---

## 4. Cara Praktis Mengecek

1. **Monitor CPU vs Network/Disk**

   * Di Linux: `htop`, `iotop`, `nload`.
   * Di Windows: Task Manager → lihat CPU, Disk, Network.
   * Kalau CPU rendah tapi lambat → **I/O-bound**.
   * Kalau CPU tinggi terus → **CPU-bound**.

2. **Profiling di Python**

   * Pakai `cProfile` untuk lihat bagian mana yang makan waktu.
   * Pakai `asyncio` untuk test concurrency → kalau speed naik signifikan, berarti **I/O-bound**.

3. **Rule of Thumb**

   * **Kalau banyak "await" (API, DB, file, network)** → I/O-bound.
   * **Kalau banyak loop matematis, for/while besar, image processing** → CPU-bound.

---

## 5. Ilustrasi

* **I/O-bound**:

  ```python
  async def fetch_data(url):
      async with aiohttp.ClientSession() as session:
          async with session.get(url) as resp:
              return await resp.text()
  ```

  → Menunggu **network**, bukan CPU.

* **CPU-bound**:

  ```python
  def calculate_pi(n):
      total = 0
      for i in range(n):
          total += ((-1) ** i) / (2*i + 1)
      return total * 4
  ```

  → Loop besar, CPU kerja keras.

---

✅ **Kesimpulan Singkat**

* **I/O-bound** → banyak nunggu respons (pakai **async**).
* **CPU-bound** → banyak hitung berat (pakai **multiprocessing/GPU**).
