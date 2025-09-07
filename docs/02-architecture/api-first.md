# API-First

## Prinsip
- Desain kontrak dulu (OpenAPI), implementasi menyusul.
- Kontrak diverifikasi otomatis (linting schema, contract test).
- Versioning dan deprecation jelas.

## Langkah Praktis
1. Buat `examples/openapi.yaml` minimal: auth, users, domain.
2. Terapkan **OpenAPI style guide** (lihat *Guides → OpenAPI Style Guide*).
3. Review via PR + CI (lint spec, broken links).

```yaml
# Potongan OpenAPI v0
openapi: 3.1.0
info: { title: "My API", version: "0.1.0" }
components:
  securitySchemes:
    bearerAuth: { type: http, scheme: bearer, bearerFormat: JWT }
paths:
  /healthz:
    get: { responses: { "200": { description: "OK" } } }
security: [ { bearerAuth: [] } ]
```
