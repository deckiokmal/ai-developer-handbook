# Security Baseline

- **Transport**: HTTPS-only, HSTS, modern TLS, no weak ciphers.
- **AuthN**: JWT Access+Refresh (short-lived), MFA untuk aksi sensitif.
- **AuthZ**: RBAC dengan prinsip **least privilege**.
- **Secrets**: secret manager (bukan .env di repo).
- **Data**: enkripsi at-rest & in-transit; klasifikasi data; retensi minimal.
- **Hardening**: header keamanan, rate limit, input validation, output encoding.
- **Observability**: audit log, metric authz, alert untuk anomali.
- **Supply Chain**: lock deps, audit, SBOM (opsional).
- **SDLC**: SAST/DAST terotomasi; security gate di CI untuk rilis.
