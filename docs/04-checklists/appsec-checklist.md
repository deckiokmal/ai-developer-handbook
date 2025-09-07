# AppSec Checklist (Build & Test)

- [ ] Input validation & output encoding
- [ ] HTTPS only + HSTS
- [ ] Security headers (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy)
- [ ] Rate limiting & brute-force protection
- [ ] AuthN: JWT Access/Refresh, rotasi, audience
- [ ] AuthZ: RBAC enforcement di middleware
- [ ] Secrets: disimpan di secret manager
- [ ] Logging: JSON, audit events, PII masking
- [ ] SAST/DAST lintas CI
- [ ] Dependency & container scan
