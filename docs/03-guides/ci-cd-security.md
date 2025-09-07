# CI/CD Security

- **SAST**: jalankan lint, type check, security scan (bandit, semgrep).
- **DAST**: minimal untuk endpoint publik.
- **Deps Audit**: audit libs, lockfile, pin versi.
- **Image Scan**: scan image container; gunakan base minimal.
- **Policy Gates**: PR tak boleh merge jika check merah.
