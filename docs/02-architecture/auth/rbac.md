# RBAC (Role-Based Access Control)

## Model
- **Role** mengelompokkan **Permission**.
- User mendapatkan 1..n Role.
- Enforcement berdasarkan `permission code` di endpoint/service.

## Tabel Referensi (contoh)
- `role(slug, name)`
- `permission(code, description)`
- `role_permission(role_id, permission_id)`
- `user_role(user_id, role_id)`

## Praktik
- Permission granular (mis. `project:create`, `project:read`).
- Cek di *middleware/dependency* sebelum ke service.
