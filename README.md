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
- Tabel lengkap 16 karyawan — sort per kolom (klik header), filter by status / employment type / work mode. Baris dengan tanda ⚠️ di nama = **reduction candidate** (performance score < 3.0, atau achievement < 80% — dihitung otomatis di frontend, bukan field statis di data).
- **Cost Breakdown Panel**: ringkasan Total Monthly Operational Cost (rent + payroll) dengan breakdown persentase, plus 4 sub-panel — Office Rent (current vs proposed, input editable + potential saving real-time), Payroll by Department (chart), HR Outsourcing Internal vs FLC (input quote editable + saving real-time), Work Mode Distribution (chart).
- **Payroll Simulation Tool**: tabel karyawan dengan checkbox (default semua tercentang), uncheck = disimulasikan sebagai pengurangan. Footer sticky menampilkan Total Payroll Saat Ini, Setelah Simulasi, Saving/Bulan, Saving/Tahun. Ada tombol filter cepat "Show Reduction Candidates Only". Keputusan reduksi tetap manual — karyawan yang ditandai reduction candidate tidak otomatis ter-uncheck.
- Toggle **"Show Salary Data"** di header — menyembunyikan semua data finansial sensitif secara default: kolom gaji di tabel utama, KPI berbasis gaji (Total Monthly Payroll, Cost per Revenue), **seluruh Cost Breakdown Panel**, dan **seluruh Payroll Simulation Tool**. Baru muncul setelah toggle diklik manual.
- Toggle **dark mode** (🌙/☀️) di header — preferensinya disimpan di `localStorage` browser, jadi tetap kepilih lagi kalau Acting CEO buka ulang link-nya nanti.
- Semua teks di UI dalam **Bahasa Inggris** (README tetap Bahasa Indonesia karena ini dokumentasi untuk tim dev, bukan yang dilihat Acting CEO).

## ⚠️ Catatan soal Data Gaji & Biaya

`salary_monthly_usd`, data rent kantor, dan quote FLC adalah data finansial sensitif. Dashboard ini di-deploy ke **GitHub Pages publik**, sehingga siapapun yang punya link bisa membuka dashboard-nya. Toggle "Show Salary Data" hanya menyembunyikan data secara default di UI — **ini bukan proteksi keamanan sungguhan**, karena data tetap ikut terkirim ke browser di dalam bundle JS (siapapun yang buka DevTools tetap bisa melihatnya).

Kalau data ini nanti perlu benar-benar dirahasiakan dari publik:
- Pisahkan dashboard gaji/cost dari demo publik ini, atau
- Pakai backend/API dengan autentikasi untuk menyuplai data tersebut, atau
- Deploy ke Vercel/Netlify dengan access control (password gate / login), bukan GitHub Pages biasa yang selalu publik, atau
- Jadikan repo private + hosting dengan kontrol akses.

Untuk demo dummy data ini, toggle sederhana sudah cukup sesuai kebutuhan (mencegah ekspos otomatis saat link dibagikan).

### ⚠️ Data operational cost masih perlu konfirmasi

Di `src/data/operational-cost.json`, `office.current.monthly_rent_usd` bernilai **150000 USD untuk kantor 75 m²** — angka ini kemungkinan typo (mungkin maksudnya RUB, atau angka tahunan bukan bulanan). Dashboard sudah menampilkan warning kuning soal ini di panel "A. Office Rent", tapi **jangan dipakai untuk keputusan apapun sebelum dikonfirmasi ke Acting CEO**. `hr_outsourcing.flc_estimated_monthly_cost_usd` juga masih `null` — isi setelah dapat quote dari vendor FLC (atau isi langsung lewat input field di panel "C. HR Outsourcing" pada dashboard).

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

- Ganti isi `src/data/employees.json` dengan data asli (schema kolom sudah sama, jadi tidak perlu ubah komponen).
- Ganti isi `src/data/operational-cost.json` untuk data rent kantor & HR outsourcing (lihat catatan konfirmasi di atas).

Setelah commit & push ke `main`, dashboard otomatis redeploy dengan data baru.
