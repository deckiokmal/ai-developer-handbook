# 0003 - AuthN via JWT + AuthZ via RBAC
Tanggal: 2025-09-07
Status: Accepted

## Konteks
Layanan membutuhkan autentikasi & otorisasi terdistribusi.

## Keputusan
Gunakan JWT (Access/Refresh) & RBAC (permission granular) dengan enforcement di middleware/dependency.

## Konsekuensi
- Kontrak antar layanan lebih jelas (claims)
- Perlu manajemen kunci & rotasi token
