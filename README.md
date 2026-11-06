# BisaSiber — Platform Belajar Teknologi & Siber Interaktif

**BisaSiber** adalah aplikasi web pembelajaran teknologi dan keamanan siber interaktif (serupa dengan TryHackMe) yang dirancang dengan kurikulum berbahasa Indonesia, tantangan Capture The Flag (CTF), serta orkestrasi laboratorium siber berbasis browser.

---

## Fitur Utama

- **Katalog Jalur Belajar & Room Siber**: Filter interaktif berdasarkan tingkat pengalaman (`Mulai dari nol`, `Sudah paham dasar`, `Tingkat mahir`) dan spesialisasi karier (`Security Analyst`, `Penetration Tester`, `Security Engineer`, `AI Security`).
- **Workspace Lab Siber & AttackBox Interaktif (`/lab`)**: Simulasi manajemen container Docker target (Start, Stop, Reset IP), terminal interaktif di browser, petunjuk tugas, dan validasi pengiriman flag `BISA{...}` secara real-time.
- **Dashboard Progres & Papan Peringkat (`/dashboard`)**: Pemantauan XP Siber, rentetan belajar harian (*streak*), progres penyelesaian modul, serta papan peringkat nasional.
- **Halaman Autentikasi Terintegrasi (`/masuk` & `/daftar`)**: Dilengkapi dengan identitas visual dan logo resmi **BisaSiber**.

---

## Arsitektur & Teknologi

- **Runtime & Package Manager**: [Bun](https://bun.sh)
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org) + TypeScript Strict
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Data Fetching & State**: [TanStack Query v5 (`@tanstack/react-query`)](https://tanstack.com/query/latest) dengan custom hooks di `src/hooks/`
- **Database & ORM**: [Neon Serverless PostgreSQL (`@neondatabase/serverless`)](https://neon.tech) + [Drizzle ORM](https://orm.drizzle.team) di `src/db/`
- **Kontainerisasi**: Multi-stage `Dockerfile` (`oven/bun:1-alpine`) & `docker-compose.yml` untuk pengembangan lokal dan jaringan sandbox lab terisolasi.

---

## Struktur Direktori

```text
├── public/
│   ├── logo.png              # Logo resmi BisaSiber (transparan)
│   ├── logo-dark.png         # Logo resmi BisaSiber (latar gelap)
│   └── manifest.json         # Web App Manifest
├── src/
│   ├── app/                  # Next.js App Router (Halaman & API Routes)
│   │   ├── api/              # Endpoint API (rooms, progress, labs)
│   │   ├── daftar/           # Halaman Pendaftaran
│   │   ├── dashboard/        # Halaman Dashboard Pengguna
│   │   ├── lab/              # Halaman Lab Siber & Terminal Interaktif
│   │   ├── masuk/            # Halaman Login
│   │   ├── layout.tsx        # Root Layout, Font, Favicon, & SEO Metadata Indonesia
│   │   └── page.tsx          # Halaman Utama (Landing Page)
│   ├── components/
│   │   ├── ui/               # Komponen dasar (BrandLogo, Button, DifficultyBadge)
│   │   ├── layout/           # Navbar, Sidebar, Footer
│   │   ├── dashboard/        # HeroBanner, Statistik, Promo, DashboardOverview
│   │   ├── rooms/            # RoomCard & LearningPathsSection
│   │   └── lab/              # LabTerminalWorkspace
│   ├── db/
│   │   ├── index.ts          # Koneksi Neon Serverless PostgreSQL + Drizzle
│   │   └── schema.ts         # Skema tabel: users, rooms, tasks, user_progress, lab_instances
│   ├── hooks/                # Custom hooks TanStack Query v5
│   └── providers/            # QueryClientProvider wrapper
├── Dockerfile                # Multi-stage Bun production Dockerfile
├── docker-compose.yml        # Orkestrasi Web, PostgreSQL lokal, & Sandbox Lab
└── drizzle.config.ts         # Konfigurasi migrasi Drizzle Kit
```

---

## Cara Menjalankan Secara Lokal

1. **Instal seluruh dependensi menggunakan Bun:**
   ```bash
   bun install
   ```

2. **Salin konfigurasi environment:**
   ```bash
   cp .env.example .env
   ```
   Sesuaikan variabel `DATABASE_URL` dengan kredensial Neon Serverless PostgreSQL Anda.

3. **Jalankan server pengembangan:**
   ```bash
   bun run dev
   ```
   Buka `http://localhost:3000` di browser Anda.

4. **Perintah Verifikasi & Database:**
   ```bash
   bun run typecheck     # Pemeriksaan tipe TypeScript
   bun run lint          # Pemeriksaan ESLint
   bun run build         # Build produksi Next.js
   bun run db:generate   # Generate migrasi SQL Drizzle
   bun run db:push       # Push skema ke Neon PostgreSQL
   ```

5. **Menjalankan dengan Docker Compose:**
   ```bash
   docker compose up --build
   ```
