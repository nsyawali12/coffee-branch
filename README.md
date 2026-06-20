# Employee Performance Dashboard — Kapal Api Russia Branch

Demo dashboard untuk monitoring performance karyawan vs target di branch distribusi Kapal Api Rusia. Saat ini memakai dummy data (16 karyawan) di `src/data/employees.json` — struktur kolomnya sudah final dan siap dipakai untuk data asli nanti.

## Tech Stack

- React + Vite
- Tailwind CSS v4
- Recharts (donut & bar chart)
- Deploy: GitHub Pages via GitHub Actions

## Fitur

- KPI cards: avg performance score, revenue achievement, high-performer ratio, attendance rate, total payroll, cost per revenue.
- Filter Department & Date Range (berdasarkan tanggal join) yang mempengaruhi seluruh KPI, chart, dan tabel.
- Chart: Goal Achievement Rate (donut), Revenue Target vs Current per Sales Executive, Avg Performance Score by Department.
- Tabel lengkap 16 karyawan, bisa di-sort per kolom (klik header) dan difilter by status.
- Toggle **"Show Salary Data"** — kolom gaji dan KPI yang berbasis gaji (Total Monthly Payroll, Cost per Revenue) disembunyikan secara default dan baru muncul setelah toggle diklik manual.

## ⚠️ Catatan soal Data Gaji

`salary_monthly_usd` adalah data sensitif. Dashboard ini di-deploy ke **GitHub Pages publik**, sehingga siapapun yang punya link bisa membuka dashboard-nya. Toggle "Show Salary Data" hanya menyembunyikan data secara default di UI — **ini bukan proteksi keamanan sungguhan**, karena data tetap ikut terkirim ke browser di dalam bundle JS (siapapun yang buka DevTools tetap bisa melihatnya).

Kalau data gaji asli nanti perlu benar-benar dirahasiakan dari publik:
- Pisahkan dashboard gaji dari demo publik ini, atau
- Pakai backend/API dengan autentikasi untuk menyuplai data gaji, atau
- Deploy ke Vercel/Netlify dengan access control (password gate / login), bukan GitHub Pages biasa yang selalu publik, atau
- Jadikan repo private + hosting dengan kontrol akses.

Untuk demo dummy data ini, toggle sederhana sudah cukup sesuai kebutuhan (mencegah ekspos otomatis saat link dibagikan).

## Run Lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173/coffee-branch/` di browser.

## Build

```bash
npm run build
npm run preview   # preview hasil build
```

## Deploy ke GitHub Pages

Deploy otomatis lewat GitHub Actions (`.github/workflows/deploy.yml`) setiap kali ada push ke branch `main`.

**Setup sekali saja** (kalau belum):
1. Buka repo di GitHub → **Settings → Pages**.
2. Di bagian **Build and deployment → Source**, pilih **GitHub Actions**.
3. Push ke `main` — workflow otomatis build dan deploy.
4. Setelah selesai, dashboard bisa diakses di:
   `https://<username-github>.github.io/coffee-branch/`

Untuk redeploy manual tanpa push baru, buka tab **Actions** di repo → pilih workflow **Deploy to GitHub Pages** → **Run workflow**.

### Catatan kalau nama repo berubah

Path dasar (`base`) di `vite.config.js` di-set ke `/coffee-branch/` supaya asset cocok dengan URL GitHub Pages (`<username>.github.io/coffee-branch/`). Kalau repo di-rename, update juga value `base` di `vite.config.js` agar sesuai nama repo yang baru.

## Update Data

Ganti isi `src/data/employees.json` dengan data asli (schema kolom sudah sama, jadi tidak perlu ubah komponen). Setelah commit & push ke `main`, dashboard otomatis redeploy dengan data baru.
