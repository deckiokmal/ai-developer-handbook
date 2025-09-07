# AI Developer Handbook

Best practice untuk build Ready AI System:

* **Building Block** AI Agent workflow
* **API-First** (OpenAPI, kontrak API)
* **Auth**: **JWT**, **RBAC**, **MFA**
* **Checklists keamanan** jangka panjang & mudah di-update
* **ADR** (Architecture Decision Records)
* **MkDocs (Material)** sebagai portal dokumentasi yang elegan & cepat

---

## 1) Mengapa MkDocs + Material + ADR?

* **MkDocs**: generator situs statis berbasis Markdown → cepat, sederhana, dan ramah Git.
* **Material for MkDocs**: tema modern + fitur dokumentasi developer (search, code copy, tabs, admonitions).
* **ADR**: catatan singkat & bernomor tentang **keputusan arsitektur** → jejak audit dan onboarding menjadi mudah.

---

## 2) Prasyarat

* Git, Python 3.11+ (disarankan).
* Akses ke GitHub (untuk Pages).
* (Opsional) **uv** sebagai package manager cepat.

> **Catatan Windows**: virtualenv (`.venv`) tidak “relocatable”. Bila mengganti nama/letak folder repo, **hapus & buat ulang** `.venv`.

---

## 3) Quick Start (Jalankan Lokal & Deploy)

```bash
# (opsional) gunakan uv / pip
# uv:  pipx install uv       |  pip: python -m pip install -U pip

# Install deps (pilih salah satu)
uv venv .venv && uv sync --all-extras --dev
# atau:
python -m venv .venv
# macOS/Linux:
source .venv/bin/activate
# Windows PowerShell:
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Jalankan docs lokal (preview)
python -m mkdocs serve -a 127.0.0.1:8001

# Build statik (output ke folder site/)
python -m mkdocs build

# Deploy manual ke GitHub Pages (branch gh-pages)
python -m mkdocs gh-deploy --force
```

**Struktur direktori:**

```
ai-developer-handbook/
├─ mkdocs.yml
├─ requirements.txt
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

---

## 4) Pengaturan Dasar `mkdocs.yml` (yang penting untuk developer)

Contoh ringkas (sesuaikan `username` & repo):

```yaml
site_name: AI Developer Handbook
site_description: "API-First • Auth (JWT, RBAC, MFA) • Security Checklists • ADR"
site_url: "https://<username>.github.io/ai-developer-handbook/"
repo_url: "https://github.com/<username>/ai-developer-handbook"
repo_name: "ai-developer-handbook"

theme:
  name: material
  features:
    - navigation.sections
    - navigation.top
    - navigation.instant
    - content.code.copy
    - content.action.edit     # tombol "Edit this page"
    - content.action.view     # tombol "View source"
    - toc.integrate

# Penting: arahkan ke branch 'main', bukan 'master'
edit_uri: edit/main/docs/

plugins:
  - search
  - mermaid2

markdown_extensions:
  - admonition
  - attr_list
  - def_list
  - md_in_html
  - tables
  - toc:
      permalink: true
  - pymdownx.details
  - pymdownx.highlight
  - pymdownx.superfences
  - pymdownx.tabbed

nav:
  - Home: index.md
  - Foundations:
    - 00-foundations/overview.md
    - 00-foundations/glossary.md
    - 00-foundations/tenets.md
  - Process:
    - 01-process/sprint-0.md
    - 01-process/adr-guide.md
    - 01-process/api-lifecycle.md
  - Architecture:
    - 02-architecture/api-first.md
    - 02-architecture/security-baseline.md
    - 02-architecture/auth/jwt.md
    - 02-architecture/auth/rbac.md
    - 02-architecture/auth/mfa.md
  - Guides:
    - 03-guides/openapi-style-guide.md
    - 03-guides/secrets-management.md
    - 03-guides/logging-observability.md
    - 03-guides/ci-cd-security.md
  - Checklists:
    - 04-checklists/pre-dev-checklist.md
    - 04-checklists/appsec-checklist.md
    - 04-checklists/deployment-checklist.md
    - 04-checklists/data-protection-checklist.md
  - Templates:
    - 05-templates/adr-template.md
    - 05-templates/security-review-template.md
    - 05-templates/threat-model-template.md
    - 05-templates/api-change-template.md
  - Examples:
    - 06-examples/openapi.yaml
  - Ops:
    - 07-ops/incident-response-runbook.md
    - 07-ops/backup-restore.md
  - Governance:
    - 08-governance/contributing.md
    - 08-governance/code-of-conduct.md
    - 08-governance/versioning-release.md
    - 08-governance/doc-maintenance.md
  - ADR:
    - adr/0001-record-architecture-decisions.md
    - adr/0002-security-baseline.md
    - adr/0003-authn-jwt-rbac.md
    - adr/0004-mfa-adoption.md
    - adr/0005-api-first-contract.md
```

**Tips penting:**

* `edit_uri: edit/main/docs/` → agar “Edit this page” langsung ke branch **main**.
* Tambahkan halaman ke `nav:` agar muncul di sidebar (jika tidak, MkDocs akan memberi info “pages exist but not in nav”).
* Jika `docs` Anda di subfolder lain, set `docs_dir:` dan sesuaikan `edit_uri`.

---

## 5) Alur Konten & Konvensi Penulisan

**ADR (Architecture Decision Records)**

* Letak: `docs/adr/000X-title.md`
* Struktur: **Konteks → Keputusan → Alternatif → Konsekuensi → Referensi**
* Status: *Proposed / Accepted / Deprecated / Superseded-by #xxxx*
* Update `nav` atau biarkan terindeks melalui kategori ADR.

**Konvensi Umum**

* Markdown standar; gunakan **admonitions**:

  ```md
  !!! tip "Ringkas"
      Gunakan contoh konkret & langkah-langkah.
  ```
* **Kode** dengan *fenced code block*: `python, `bash, dll.
* **Diagram** pakai Mermaid:

  ```mermaid
  flowchart TD
  A[Client] --> B[API]
  ```
* **Tabs** untuk variasi OS/alat (pymdownx.tabbed).

---

## 6) Deploy ke GitHub Pages

### Opsi A — **Manual dari lokal** (cepat)

```bash
# Pastikan repo Git sudah terhubung
git init
git add .
git commit -m "docs: initial site"
git branch -M main
git remote add origin https://github.com/<username>/ai-developer-handbook.git
git push -u origin main

# Deploy ke branch gh-pages
python -m mkdocs gh-deploy --force
```

Aktifkan Pages: **Repo → Settings → Pages → Source = Deploy from a branch → gh-pages / (root)**.

### Opsi B — **Otomatis via GitHub Actions** (disarankan)

Buat `.github/workflows/pages.yml`:

```yaml
name: Deploy MkDocs to GitHub Pages
on:
  push: { branches: [ main ] }
  workflow_dispatch:
permissions: { contents: read, pages: write, id-token: write }
concurrency: { group: "pages", cancel-in-progress: true }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with: { python-version: '3.12' }
      - run: |
          python -m pip install --upgrade pip
          pip install mkdocs mkdocs-material mkdocs-mermaid2-plugin pymdown-extensions
      - run: mkdocs build --strict
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./site }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages, url: ${{ steps.deployment.outputs.page_url }} }
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Lalu di **Settings → Pages**: **Source = GitHub Actions**.

**Custom domain (opsional)**

* Tambah `docs/CNAME` berisi domain: `docs.example.com`
* DNS: `docs.example.com` → CNAME ke `<username>.github.io`
* Set “Custom domain” di Settings → Pages.

---

## 7) Fitur & Fungsi MkDocs/Material (berguna untuk developer)

* **Search** cepat, **sticky navigation**, **code copy**, **dark mode** (opsional theme).
* **Edit & View Source**: `content.action.edit` & `content.action.view` → memudahkan kontribusi via PR.
* **Mermaid** diagram (sequence/flow/ERD), **tabs**, **admonitions**, **highlighting**.
* **Strict build** (`mkdocs build --strict`) → gagal cepat saat ada tautan rusak/konfigurasi salah.
* **Ekstensi** `pymdown-extensions` → tab, details, superfences, dsb.
* **Versi dokumentasi** (opsional) dengan **mike** bila perlu multi versi (v1, v2).

---

## 8) Pola Reusability (agar mudah dipakai ulang)

* Jadikan repo ini sebagai **GitHub Template** (Settings → Template repository).
  → Untuk proyek baru: klik **“Use this template”**, rename repo, ganti `site_name`, `site_url`, `repo_url`, dan jalankan CI.
* Simpan **checklists & templates** (ADR, security review, API change) sebagai standar tim.
* Review triwulanan → update **ADR** & **security baseline** sesuai praktik terbaru.

---

## 9) Troubleshooting

* **“pages exist but not in nav”**
  → Tambahkan halaman ke `nav:` di `mkdocs.yml` jika ingin muncul di sidebar (tidak wajib).
* **“Edit this page” menuju `master`**
  → Set `edit_uri: edit/main/docs/` (sesuaikan branch/folder).
* **Error setelah rename folder proyek** (Windows)
  → Hapus & buat ulang `.venv`, lalu gunakan `python -m mkdocs ...`.
* **`gh-deploy` gagal: `origin` tidak ada**
  → Pastikan `git remote add origin https://github.com/<username>/<repo>.git` dan `git push -u origin main`.

---

## 10) CI/CD & Quality Gate (rekomendasi)

* Tambahkan job **link checker** & **spell checker** (opsional).
* Wajibkan **build docs** hijau sebelum merge PR.
* Pin versi dependency utama (mkdocs/material) & lakukan **upgrade berkala** (cek changelog).

---

## Kontribusi

* Gunakan **Conventional Commits** (`docs:`, `feat:`, `fix:`, …).
* Setiap perubahan arsitektur → buat/ubah **ADR** terkait.
* Jaga **navigasi** & **tautan** tetap konsisten.
