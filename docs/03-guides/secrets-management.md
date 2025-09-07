# Secrets Management

- Simpan di **Secret Manager** (cloud/KMS), bukan `.env` di repo.
- Rotasi berkala; prinsip **least privilege** pada akses secret.
- Hindari men-*log* secret (masking).
- Pemisahan *runtime config* vs *build-time*.
