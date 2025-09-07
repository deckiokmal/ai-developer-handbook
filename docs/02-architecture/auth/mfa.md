# MFA (Multi-Factor Authentication)

## Faktor
- **Something you know** (password)
- **Something you have** (TOTP, WebAuthn, push)
- **Something you are** (biometrik)

## Rekomendasi
- TOTP per-user, backup codes.
- WebAuthn (passkey) untuk pengalaman tanpa password.
- Enforcement MFA untuk aksi berisiko tinggi (role admin, transfer dana, ubah secret).
