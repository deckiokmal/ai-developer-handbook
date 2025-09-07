# OpenAPI Style Guide (Ringkas)

- **Naming**: `kebab-case` untuk path, `camelCase` untuk JSON fields.
- **HTTP Codes**: gunakan standar (200/201/204, 400/401/403/404/409, 422, 500).
- **Errors**: format konsisten `{ "error": { "code": "...", "message": "..." } }`.
- **Versioning**: `/v1/…`, siapkan strategi deprecate.
- **Pagination**: `limit`, `offset` atau `cursor` + metadata.
