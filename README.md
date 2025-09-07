# App Engineering Handbook (MkDocs + ADR)

Repositori dokumentasi siap online untuk memandu **Sprint-0** & *security-by-design* selama 5+ tahun:
- **API-First** (OpenAPI, kontrak)
- **Auth**: **JWT**, **RBAC**, **MFA**
- **Checklists keamanan** jangka panjang dan mudah di-update
- **ADR** (Architecture Decision Records)
- **MkDocs (Material)** untuk portal docs

## Quick Start
```bash
# (opsional) gunakan uv / pip
# uv:  pipx install uv  |  pip: python -m pip install -U pip

# Install deps (pilih salah satu)
uv venv .venv && uv sync --all-extras --dev
# atau
python -m venv .venv && . ./.venv/bin/activate && pip install -r requirements.txt

# Jalankan docs lokal
mkdocs serve -a 127.0.0.1:8001

# Build statik
mkdocs build

# Deploy ke GitHub Pages (manual)
mkdocs gh-deploy --force
```

## Struktur
```
api-security-docs-kit/
├─ mkdocs.yml
├─ requirements.txt (opsional)
├─ docs/
│  ├─ index.md
│  ├─ 00-foundations/
│  ├─ 01-process/
│  ├─ 02-architecture/
│  ├─ 03-guides/
│  ├─ 04-checklists/
│  ├─ 05-templates/
│  ├─ 06-examples/
│  ├─ 07-ops/
│  └─ 08-governance/
└─ docs/adr/
```

## CI/CD untuk Pages
- Lihat `.github/workflows/docs.yml` untuk auto deploy ke GitHub Pages.
