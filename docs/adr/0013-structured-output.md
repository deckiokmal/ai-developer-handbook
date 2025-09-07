## 1. Definisi

**Structured output dengan Pydantic `BaseModel`** adalah cara untuk mendefinisikan dan memvalidasi **data terstruktur** di Python menggunakan class yang diturunkan dari `pydantic.BaseModel`.

Artinya:

* Kita mendefinisikan **schema data** (struktur, tipe, batasan).
* Setiap data yang masuk akan otomatis **divalidasi & dikonversi** sesuai tipe.
* Output yang dihasilkan konsisten, readable, dan bisa diubah jadi JSON/dict dengan mudah.

---

## 2. Contoh Dasar

```python
from pydantic import BaseModel

class User(BaseModel):
    id: int
    name: str
    is_active: bool = True  # default value

# Validasi otomatis
user = User(id=1, name="Alice")
print(user.dict())
# {'id': 1, 'name': 'Alice', 'is_active': True}
```

👉 Kalau input salah tipe, Pydantic akan error:

```python
User(id="one", name="Alice")
# ValidationError: id must be int
```

---

## 3. Mengapa Disebut **Structured Output**

Biasanya, kalau kita pakai LLM (misalnya OpenAI API), kita ingin model **tidak asal teks bebas**, tapi **menghasilkan data terstruktur**.
Contoh: hasil parsing intent, konfigurasi network, dsb.

Pydantic `BaseModel` memberi:

* **Schema** (struktur data jelas).
* **Validasi** (data tidak sesuai langsung error).
* **Konsistensi** (output bisa dijamin bentuknya).

---

## 4. Contoh untuk AI Agent

Misal kita mau parsing hasil LLM jadi structured data:

```python
from pydantic import BaseModel
from typing import Literal

class IntentRoute(BaseModel):
    intent: Literal["configure", "monitor", "other"]
    confidence_score: float

# Anggap LLM ngembalikan JSON
response = {"intent": "configure", "confidence_score": 0.92}

parsed = IntentRoute(**response)
print(parsed.intent)  # "configure"
print(parsed.dict())  # {'intent': 'configure', 'confidence_score': 0.92}
```

👉 Jadi bukan teks bebas `"saya rasa intent configure dengan confidence 92%"`,
tapi **structured output**: objek `IntentRoute`.

---

## 5. Keunggulan

1. **Validasi ketat** – salah tipe langsung error.
2. **Konversi otomatis** – JSON → Python class → JSON lagi.
3. **Readable** – lebih mudah di-maintain daripada dict mentah.
4. **Plug & play** – cocok dipakai di FastAPI/Quart, karena response bisa otomatis jadi JSON.
5. **Integrasi dengan LLM** – LLM diarahkan untuk mengisi field `BaseModel`, hasilnya konsisten.

---

## 6. Ilustrasi Real (dengan OpenAI API)

```python
from openai import OpenAI
from pydantic import BaseModel
from typing import Literal

class IntentRoute(BaseModel):
    intent: Literal["configure", "monitor", "other"]
    confidence_score: float

client = OpenAI()

resp = client.beta.chat.completions.parse(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "konfigurasi firewall"}],
    response_format=IntentRoute
)

print(resp.output_parsed)  
# IntentRoute(intent='configure', confidence_score=0.95)
```

👉 LLM langsung mengembalikan hasil dalam bentuk **structured Pydantic model**, bukan teks bebas.

---

## 7. Kesimpulan

* **Structured output Pydantic models** = cara mendefinisikan data terstruktur dengan `BaseModel`.
* Dipakai untuk memastikan output **konsisten, tervalidasi, dan mudah diproses**.
* Sangat berguna untuk AI Agent, API response, dan workflow yang butuh data formal, bukan teks bebas.
