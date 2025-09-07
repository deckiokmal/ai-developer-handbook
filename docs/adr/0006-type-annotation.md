## 1. Definisi

**Type Annotation** di Python adalah fitur untuk memberikan informasi tentang tipe data dari variabel, parameter fungsi, maupun nilai kembalian fungsi.
Contoh sederhana:

```python
def add(x: int, y: int) -> int:
    return x + y
```

Artinya:

* Parameter `x` bertipe `int`.
* Parameter `y` bertipe `int`.
* Fungsi mengembalikan nilai bertipe `int`.

## 2. Tujuan Utama

* **Meningkatkan keterbacaan kode**: orang lain (atau diri sendiri di masa depan) bisa langsung tahu tipe data yang diharapkan.
* **Membantu debugging**: IDE / linter (misalnya `mypy`, `pylance`) bisa mendeteksi kesalahan lebih cepat.
* **Dokumentasi otomatis**: banyak tools dokumentasi bisa men-generate dokumentasi lebih jelas dari type hints.
* **Meningkatkan maintainability**: memudahkan scaling project besar.

## 3. Penting Dipahami

* Type annotation **tidak memaksa Python** untuk benar-benar mengecek tipe saat runtime (Python tetap *dynamically typed*).
* Tetapi bisa digunakan bersama *type checker* (seperti `mypy`) untuk validasi statis.

## 4. Contoh Penggunaan

### Variabel

```python
name: str = "BencoolenTech"
age: int = 30
is_active: bool = True
```

### Fungsi dengan parameter dan return type

```python
def greet(name: str) -> str:
    return f"Hello, {name}"
```

### Fungsi dengan Optional

```python
from typing import Optional

def find_user(id: int) -> Optional[str]:
    if id == 1:
        return "Alice"
    return None
```

### Fungsi dengan List dan Dict

```python
from typing import List, Dict

def get_scores() -> List[int]:
    return [90, 85, 88]

def get_user() -> Dict[str, str]:
    return {"name": "Alice", "role": "Admin"}
```

### Class dengan Type Annotation

```python
class User:
    id: int
    name: str

    def __init__(self, id: int, name: str) -> None:
        self.id = id
        self.name = name
```

---

## 5. Kesimpulan

Type annotation di Python adalah **petunjuk** (hint), bukan aturan wajib, untuk menunjukkan tipe data yang diharapkan. Dengan bantuan *type checker*, type annotation bisa membantu mencegah bug, memperjelas kontrak fungsi, dan menjaga konsistensi project besar.
