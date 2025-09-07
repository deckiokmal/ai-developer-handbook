# Logging & Observability

- **Struktur**: JSON log, korelasi `trace_id`/`request_id`.
- **Level**: DEBUG/INFO/WARN/ERROR/FATAL; hindari DEBUG di prod.
- **Audit**: event keamanan (login, permission denied, admin action).
- **Metrics**: p95 latency, error rate, auth failures, token refresh rate.
- **Tracing**: W3C Trace Context; instrumentasi auto bila ada.
