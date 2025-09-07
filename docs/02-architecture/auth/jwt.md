# JWT (JSON Web Token)

## Rekomendasi
- **Access token**: 5–15 menit, **Refresh token**: 7–30 hari.
- **Claims** minimal: `sub`, `exp`, `iat`, `jti`, `scope`/`permissions`.
- **Algoritma**: asimetris (RS256/ES256) bila memungkinkan.
- **Rotasi refresh token** dan deteksi reuse.
- **Audience** spesifik layanan.
- **Revocation**: simpan *denylist* `jti` untuk kasus khusus.

## Implementasi (konsep)
```mermaid
flowchart TD
A[Login] --> B[Verifikasi kredensial]
B --> C[Issue Access + Refresh]
C --> D[Client simpan Refresh (httpOnly)]
D --> E[Access dipakai ke API (Bearer)]
E --> F[Expire?]
F --Ya--> G[/Refresh endpoint/] --> H[Rotasi & issue access baru]
```
