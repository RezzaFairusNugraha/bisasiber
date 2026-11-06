export type Difficulty = "easy" | "intermediate" | "hard";

export interface RoomCatalogItem {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  experienceLevel: string;
  difficulty: Difficulty;
  coverImageUrl: string;
  estimatedMinutes: number;
  pointsReward: number;
  isNew?: boolean;
  isPremium?: boolean;
  enrolledCount: number;
  tasksCount: number;
}

export interface RoomTaskItem {
  id: number;
  roomId: number;
  orderIndex: number;
  title: string;
  contentMarkdown: string;
  question: string;
  hint: string;
  points: number;
  requiresLab: boolean;
  expectedFlag: string;
}

const IMG_BASE = "https://api.builder.io/api/v1/image/assets/TEMP/";
export const HERO_BG_IMG = `${IMG_BASE}c04dd7f958d6e08e0df56dfbdf9deb1ab6a63347?width=3840`;
export const HERO_ILLUSTRATION_IMG = `${IMG_BASE}fe4492c61e627614d7dcac95f5503f09a56ce4d9?width=610`;
export const PROMO_BUSINESS_IMG = `${IMG_BASE}bcb88c468c46f873c0db045e623dafdb1f5f8ce2?width=1262`;
export const PROMO_EDUCATION_IMG = `${IMG_BASE}acce7df06fc3f9604a30036774c81327c2935d0d?width=981`;
export const FALLBACK_ROOM_IMG = `${IMG_BASE}a0aec7389b59c267fe9e6cb147a75e605ac97963?width=471`;

export const EXPERIENCE_FILTERS = [
  "Semua",
  "Mulai dari nol",
  "Sudah paham dasar",
  "Tingkat mahir",
] as const;

export const TOPIC_FILTERS = [
  "Semua",
  "Security Analyst",
  "Penetration Tester",
  "Security Engineer",
  "AI Security",
] as const;

export const PLATFORM_STATS = [
  { value: "150.000+", label: "Talenta belajar keamanan siber" },
  { value: "Nol ke Mahir", label: "Kurikulum terarah dalam satu platform" },
  { value: "450+", label: "Lab interaktif & tantangan CTF" },
  { value: "Materi Baru", label: "Dirilis rutin setiap minggu" },
] as const;

export const INITIAL_ROOMS: RoomCatalogItem[] = [
  {
    id: 1,
    slug: "keamanan-siber-101",
    title: "Keamanan Siber 101",
    subtitle: "Fondasi jaringan, Linux, dan konsep pertahanan siber modern",
    description:
      "Pelajari dasar-dasar keamanan informasi, arsitektur jaringan TCP/IP, perintah dasar terminal Linux, hingga cara mengidentifikasi ancaman siber sehari-hari.",
    category: "Security Analyst",
    experienceLevel: "Mulai dari nol",
    difficulty: "easy",
    coverImageUrl: `${IMG_BASE}3e05083dc02a59a9cab14c1cdf5440bf67bf30a5?width=471`,
    estimatedMinutes: 60,
    pointsReward: 150,
    isNew: false,
    enrolledCount: 24850,
    tasksCount: 4,
  },
  {
    id: 2,
    slug: "junior-penetration-tester",
    title: "Jr Penetration Tester",
    subtitle: "Metodologi pengujian penetrasi aplikasi web & jaringan",
    description:
      "Kuasai teknik reconnaissance, scanning dengan Nmap, eksploitasi kerentanan OWASP Top 10, hingga privilege escalation pada sistem target.",
    category: "Penetration Tester",
    experienceLevel: "Sudah paham dasar",
    difficulty: "intermediate",
    coverImageUrl: `${IMG_BASE}82b6c09e5fce0704880707381f7a76009f50a983?width=471`,
    estimatedMinutes: 120,
    pointsReward: 300,
    isNew: true,
    enrolledCount: 18320,
    tasksCount: 5,
  },
  {
    id: 3,
    slug: "soc-level-1",
    title: "SOC Level 1",
    subtitle: "Deteksi insiden, analisis log SIEM, dan respons ancaman",
    description:
      "Simulasikan peran analis Security Operations Center (SOC). Analisis paket jaringan dengan Wireshark, periksa alert SIEM, dan tangani insiden phishing.",
    category: "Security Analyst",
    experienceLevel: "Mulai dari nol",
    difficulty: "easy",
    coverImageUrl: `${IMG_BASE}2eb4913c5bd47198b1fb97ed57b29b627dc86579?width=471`,
    estimatedMinutes: 90,
    pointsReward: 200,
    enrolledCount: 15900,
    tasksCount: 4,
  },
  {
    id: 4,
    slug: "ai-security-fundamentals",
    title: "Keamanan AI & LLM",
    subtitle: "Prompt injection, model poisoning, dan pertahanan sistem AI",
    description:
      "Eksplorasi permukaan serangan pada Large Language Models (LLM), teknik jailbreaking, ekstraksi data sensitif, dan cara mengamankan pipeline AI.",
    category: "AI Security",
    experienceLevel: "Sudah paham dasar",
    difficulty: "intermediate",
    coverImageUrl: `${IMG_BASE}f3a18c45fa548b4685727fd815aae0951fc37ed0?width=414`,
    estimatedMinutes: 75,
    pointsReward: 250,
    isNew: true,
    enrolledCount: 9410,
    tasksCount: 4,
  },
  {
    id: 5,
    slug: "pertahanan-cloud-aws",
    title: "Pertahanan Cloud AWS",
    subtitle: "Konfigurasi IAM aman, audit CloudTrail, dan pengerasan S3",
    description:
      "Pelajari praktik terbaik mengamankan infrastruktur cloud AWS dari miskonfigurasi bucket, kebocoran kredensial IAM, dan serangan lateral.",
    category: "Security Engineer",
    experienceLevel: "Sudah paham dasar",
    difficulty: "easy",
    coverImageUrl: FALLBACK_ROOM_IMG,
    estimatedMinutes: 80,
    pointsReward: 200,
    isNew: true,
    enrolledCount: 7230,
    tasksCount: 3,
  },
  {
    id: 6,
    slug: "pra-keamanan-siber",
    title: "Pra-Keamanan Siber",
    subtitle: "Langkah pertama sebelum terjun ke dunia hacking & pertahanan",
    description:
      "Modul pengantar ramah pemula untuk memahami cara kerja web, DNS, HTTP, sistem operasi Linux & Windows, serta dasar pemrograman siber.",
    category: "Security Analyst",
    experienceLevel: "Mulai dari nol",
    difficulty: "easy",
    coverImageUrl: FALLBACK_ROOM_IMG,
    estimatedMinutes: 45,
    pointsReward: 100,
    isNew: true,
    enrolledCount: 31400,
    tasksCount: 3,
  },
  {
    id: 7,
    slug: "soc-level-2",
    title: "SOC Level 2",
    subtitle: "Threat hunting tingkat lanjut, analisis malware & forensik",
    description:
      "Tingkatkan kemampuan analisis SOC Anda dengan berburu ancaman persisten (APT), membuat aturan YARA, dan melakukan forensik memori.",
    category: "Security Analyst",
    experienceLevel: "Sudah paham dasar",
    difficulty: "intermediate",
    coverImageUrl: FALLBACK_ROOM_IMG,
    estimatedMinutes: 110,
    pointsReward: 320,
    isNew: true,
    enrolledCount: 8150,
    tasksCount: 4,
  },
  {
    id: 8,
    slug: "persiapan-comptia-pentest",
    title: "Persiapan Pentest+",
    subtitle: "Latihan terstruktur menuju sertifikasi pentester profesional",
    description:
      "Persiapkan diri menghadapi ujian sertifikasi industri melalui skenario perencanaan engagement, pelaporan kerentanan, dan eksploitasi praktis.",
    category: "Penetration Tester",
    experienceLevel: "Mulai dari nol",
    difficulty: "easy",
    coverImageUrl: FALLBACK_ROOM_IMG,
    estimatedMinutes: 85,
    pointsReward: 200,
    enrolledCount: 11200,
    tasksCount: 4,
  },
  {
    id: 9,
    slug: "offensive-pentesting",
    title: "Offensive Pentesting",
    subtitle: "Eksploitasi Active Directory, buffer overflow & post-exploitation",
    description:
      "Tantangan intensif membobol mesin korporat, melakukan pivoting antar jaringan internal, dan menguasai domain controller.",
    category: "Penetration Tester",
    experienceLevel: "Tingkat mahir",
    difficulty: "intermediate",
    coverImageUrl: FALLBACK_ROOM_IMG,
    estimatedMinutes: 150,
    pointsReward: 400,
    enrolledCount: 9800,
    tasksCount: 5,
  },
  {
    id: 10,
    slug: "investigasi-endpoint-lanjut",
    title: "Investigasi Endpoint Lanjut",
    subtitle: "Analisis EDR, artefak Windows Registry, dan respons insiden",
    description:
      "Lacak jejak penyerang pada endpoint yang terkompromi menggunakan telemetri Sysmon, Event Logs, dan artefak sistem file.",
    category: "Security Analyst",
    experienceLevel: "Tingkat mahir",
    difficulty: "hard",
    coverImageUrl: FALLBACK_ROOM_IMG,
    estimatedMinutes: 140,
    pointsReward: 450,
    enrolledCount: 4320,
    tasksCount: 4,
  },
  {
    id: 11,
    slug: "pertahanan-azure-cloud",
    title: "Pertahanan Microsoft Azure",
    subtitle: "Keamanan Entra ID, Microsoft Sentinel, dan kebijakan jaringan",
    description:
      "Amankan ekosistem hybrid cloud dan identitas korporat menggunakan fitur keamanan bawaan Azure dan pemantauan terpusat.",
    category: "Security Engineer",
    experienceLevel: "Sudah paham dasar",
    difficulty: "intermediate",
    coverImageUrl: FALLBACK_ROOM_IMG,
    estimatedMinutes: 95,
    pointsReward: 280,
    enrolledCount: 5190,
    tasksCount: 3,
  },
  {
    id: 12,
    slug: "pentesting-aplikasi-web",
    title: "Pentesting Aplikasi Web",
    subtitle: "SQL Injection, XSS, SSRF, IDOR, dan bypass autentikasi modern",
    description:
      "Bedah kerentanan aplikasi web modern secara langsung menggunakan Burp Suite dan skrip eksploitasi khusus di lingkungan lab terisolasi.",
    category: "Penetration Tester",
    experienceLevel: "Sudah paham dasar",
    difficulty: "intermediate",
    coverImageUrl: FALLBACK_ROOM_IMG,
    estimatedMinutes: 105,
    pointsReward: 300,
    enrolledCount: 19650,
    tasksCount: 4,
  },
  {
    id: 13,
    slug: "red-teaming-aplikasi-web",
    title: "Red Teaming Aplikasi Web",
    subtitle: "Bypass WAF, chaining kerentanan kompleks, dan RCE tingkat lanjut",
    description:
      "Kuasai seni menggabungkan beberapa celah keamanan minor menjadi pengambilalihan server penuh sambil melewati proteksi WAF.",
    category: "Penetration Tester",
    experienceLevel: "Tingkat mahir",
    difficulty: "hard",
    coverImageUrl: `${IMG_BASE}cef9cc673e35e5c707bf90fa955054bab8003272?width=414`,
    estimatedMinutes: 160,
    pointsReward: 500,
    enrolledCount: 6420,
    tasksCount: 5,
  },
  {
    id: 14,
    slug: "operasi-red-team",
    title: "Operasi Red Team",
    subtitle: "Simulasi serangan siber menyeluruh, C2 framework & evasion",
    description:
      "Rancang dan jalankan kampanye simulasi musuh dari initial access, lateral movement, hingga pencapaian objektif tanpa terdeteksi.",
    category: "Security Engineer",
    experienceLevel: "Tingkat mahir",
    difficulty: "hard",
    coverImageUrl: FALLBACK_ROOM_IMG,
    estimatedMinutes: 180,
    pointsReward: 550,
    enrolledCount: 5890,
    tasksCount: 5,
  },
];

export const INITIAL_TASKS: RoomTaskItem[] = [
  {
    id: 101,
    roomId: 1,
    orderIndex: 1,
    title: "Tugas 1: Pengenalan Topologi & Port Jaringan",
    contentMarkdown:
      "Setiap layanan di jaringan berkomunikasi melalui port tertentu. Sebagai contoh, server web HTTP berjalan di port `80`, HTTPS di port `443`, dan akses remote aman SSH berjalan di port `22`. Pada skenario lab ini, Anda diminta mengidentifikasi port standar SSH dan menjalankan pemindaian awal.",
    question: "Masukkan flag pembuka yang tertera pada banner layanan SSH target:",
    hint: "Jalankan perintah `nmap -sV 10.10.24.88` pada terminal lab atau ketik `BISA{p0rt_ssh_22_aman}`.",
    points: 35,
    requiresLab: true,
    expectedFlag: "BISA{p0rt_ssh_22_aman}",
  },
  {
    id: 102,
    roomId: 1,
    orderIndex: 2,
    title: "Tugas 2: Eksplorasi Direktori Linux & File Tersembunyi",
    contentMarkdown:
      "Pada sistem operasi berbasis Linux, file yang diawali dengan tanda titik (`.`) bersifat tersembunyi. Administrator sering kali tanpa sengaja meninggalkan catatan kredensial di dalam direktori `/home/bisa/.rahasia`.",
    question: "Apa isi flag di dalam file `/home/bisa/.rahasia/flag.txt`?",
    hint: "Gunakan perintah `ls -la` lalu `cat .rahasia/flag.txt` di terminal lab (`BISA{l1nux_f1l3_h1dd3n}`).",
    points: 40,
    requiresLab: true,
    expectedFlag: "BISA{l1nux_f1l3_h1dd3n}",
  },
  {
    id: 103,
    roomId: 1,
    orderIndex: 3,
    title: "Tugas 3: Analisis Header HTTP & Cookie Sesi",
    contentMarkdown:
      "Saat browser berkomunikasi dengan aplikasi web, server mengirimkan HTTP Response Header. Periksa respons dari endpoint `/api/status` pada mesin target untuk menemukan token verifikasi.",
    question: "Masukkan nilai flag dari header `X-BisaSiber-Flag`:",
    hint: "Jalankan `curl -I http://10.10.24.88:8080/api/status` (`BISA{http_h3ad3r_inspeksi}`).",
    points: 75,
    requiresLab: true,
    expectedFlag: "BISA{http_h3ad3r_inspeksi}",
  },
];
