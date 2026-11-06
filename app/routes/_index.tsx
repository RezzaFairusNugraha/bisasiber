import { useState } from "react";
import {
  IconBook2,
  IconBriefcase,
  IconBuildingBank,
  IconCheck,
  IconCurrencyDollar,
  IconDiamond,
  IconSearch,
  IconShieldCheck,
  IconTarget,
  IconTrophy,
} from "@tabler/icons-react";
import { APP_TITLE } from "@/lib/app-config";

export function meta() {
  return [
    { title: APP_TITLE },
    {
      name: "description",
      content: "Hands-on cyber security training through real-world scenarios",
    },
  ];
}

const IMG = "https://api.builder.io/api/v1/image/assets/TEMP/";
const FALLBACK_IMG = `${IMG}a0aec7389b59c267fe9e6cb147a75e605ac97963?width=471`;

type Difficulty = "easy" | "intermediate" | "hard";

const navItems = [
  { label: "Learn", icon: IconBook2 },
  { label: "Practice", icon: IconTarget },
  { label: "Compete", icon: IconTrophy },
  { label: "AI Upskilling", icon: IconDiamond },
  { label: "Education", icon: IconBuildingBank },
  { label: "Business", icon: IconBriefcase },
  { label: "Pricing", icon: IconCurrencyDollar },
  { label: "Certifications", icon: IconShieldCheck },
];

const stats = [
  ["8+ million", "People learning cyber security"],
  ["Zero to expert", "on one platform"],
  ["1,400+", "hands-on labs and challenges"],
  ["New content", "added every week"],
];

const experience = [
  "All",
  "Starting from scratch",
  "Already know the basics",
  "Upskilling for experts",
];
const topics = [
  "All",
  "Security Analyst",
  "Penetration Tester",
  "Security Engineer",
  "AI Security",
];

const paths: {
  title: string;
  difficulty: Difficulty;
  img: string;
  isNew?: boolean;
}[] = [
  { title: "Cyber Security 101", difficulty: "easy", img: `${IMG}3e05083dc02a59a9cab14c1cdf5440bf67bf30a5?width=471` },
  { title: "Jr Penetration Tester", difficulty: "intermediate", img: `${IMG}82b6c09e5fce0704880707381f7a76009f50a983?width=471`, isNew: true },
  { title: "SOC Level 1", difficulty: "easy", img: `${IMG}2eb4913c5bd47198b1fb97ed57b29b627dc86579?width=471` },
  { title: "AI Security", difficulty: "intermediate", img: `${IMG}f3a18c45fa548b4685727fd815aae0951fc37ed0?width=414` },
  { title: "Defending AWS", difficulty: "easy", img: FALLBACK_IMG, isNew: true },
  { title: "Pre Security", difficulty: "easy", img: FALLBACK_IMG, isNew: true },
  { title: "SOC Level 2", difficulty: "intermediate", img: FALLBACK_IMG, isNew: true },
  { title: "CompTIA Pentest+", difficulty: "easy", img: FALLBACK_IMG },
  { title: "Offensive Pentesting", difficulty: "intermediate", img: FALLBACK_IMG },
  { title: "Advanced Endpoint Investigations", difficulty: "hard", img: FALLBACK_IMG },
  { title: "Defending Azure", difficulty: "intermediate", img: FALLBACK_IMG },
  { title: "Web Application Pentesting", difficulty: "intermediate", img: FALLBACK_IMG },
  { title: "Web Application Red Teaming", difficulty: "hard", img: `${IMG}cef9cc673e35e5c707bf90fa955054bab8003272?width=414` },
  { title: "Red Teaming", difficulty: "hard", img: FALLBACK_IMG },
];

const difficultyStyle: Record<Difficulty, { color: string; bars: number }> = {
  easy: { color: "#26890C", bars: 1 },
  intermediate: { color: "#FF8A00", bars: 2 },
  hard: { color: "#EB0037", bars: 3 },
};

const footerColumns = [
  { title: "Learning", links: ["Hands-on labs", "For Business", "For Education", "Competitive Hacking", "Certifications"] },
  { title: "Resources", links: ["About Us", "Newsroom", "Blog", "Glossary", "Work at TryHackMe", "Careers in Cyber", "Swag Shop", "Community"] },
  { title: "Privacy & Legal", links: ["Privacy Policy", "Terms of Use", "AI Terms of Use", "Acceptable Use Policy", "Cookie Policy"] },
  { title: "Get in touch", links: ["Contact Us", "Affiliates", "Student Discount"] },
  { title: "AI pentesting", links: ["NoScope"] },
];

const pixels = [
  [37, 35, 20, 5, 0.18, "#A3EA2A"],
  [184, 43, 6, 6, 0.42, "#00B800"],
  [331, 27, 5, 12, 0.38, "#056405"],
  [478, 41, 18, 4, 0.34, "#A3EA2A"],
  [626, 31, 7, 7, 0.72, "#4FF74F"],
  [773, 47, 22, 4, 0.26, "#00B800"],
  [920, 23, 5, 14, 0.55, "#056405"],
  [1067, 39, 8, 8, 0.32, "#A3EA2A"],
  [1214, 29, 20, 4, 0.82, "#A3EA2A"],
  [1362, 44, 12, 4, 0.36, "#4FF74F"],
  [1509, 33, 6, 10, 0.44, "#4FF74F"],
  [1656, 25, 5, 5, 0.64, "#056405"],
] as const;

function PrimaryButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href="/"
      className={`inline-flex h-9 items-center justify-center rounded-[5px] border border-[#A3EA2A] bg-[#A3EA2A] px-4 font-[Ubuntu] text-base text-[#151C2B] transition-colors hover:bg-[#b5f04f] ${className}`}
    >
      {children}
    </a>
  );
}

function GoogleButton() {
  return (
    <a
      href="/"
      className="inline-flex h-[38px] items-center justify-center gap-2 rounded-[5px] bg-[#F9F9FB] px-5 font-[Ubuntu] text-base text-[#151C2B] transition-colors hover:bg-white"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M15.844 6.433H15.2V6.4H8v3.2h4.521a4.8 4.8 0 1 1-1.337-5.184l2.263-2.263A8 8 0 1 0 16 8c0-.537-.055-1.06-.156-1.567z" fill="#FFC107" />
        <path d="M.922 4.276 3.551 6.204A4.8 4.8 0 0 1 8 3.2c1.224 0 2.337.462 3.184 1.216l2.263-2.263A7.97 7.97 0 0 0 8 0 8 8 0 0 0 .922 4.276z" fill="#FF3D00" />
        <path d="M8 16a7.96 7.96 0 0 0 5.364-2.077l-2.476-2.095A4.76 4.76 0 0 1 8 12.8a4.8 4.8 0 0 1-4.513-3.178L.878 11.632A8 8 0 0 0 8 16z" fill="#4CAF50" />
        <path d="M15.844 6.433H15.2V6.4H8v3.2h4.521a4.8 4.8 0 0 1-1.635 2.228l2.478 2.095C13.188 14.082 16 12 16 8c0-.537-.055-1.06-.156-1.567z" fill="#1976D2" />
      </svg>
      Continue with Google
    </a>
  );
}

function Check({ color = "#A3EA2A" }: { color?: string }) {
  return <IconCheck size={14} stroke={3} color={color} aria-hidden="true" />;
}

function Header() {
  return (
    <header className="bg-[#151C2B]">
      <div className="mx-auto flex min-h-[90px] max-w-[1320px] items-center justify-between gap-4 px-5 py-2">
        <div className="flex items-center gap-5">
          <a href="/" aria-label={APP_TITLE}>
            <img
              src={`${IMG}3260862b7ec67283021201ead580574c920c97e1?width=228`}
              alt="TryHackMe logo."
              className="h-16 w-auto"
            />
          </a>
          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-2.5">
              {navItems.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <a
                    href="/"
                    className="flex flex-col items-center gap-[7px] p-2 font-[Ubuntu] text-base leading-[1.2] text-white/50 transition-colors hover:text-white"
                  >
                    <Icon size={22} stroke={1.5} aria-hidden="true" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-3 sm:gap-5">
          <button
            type="button"
            aria-label="Search"
            className="p-2 text-white/50 transition-colors hover:text-white"
          >
            <IconSearch size={20} />
          </button>
          <a
            href="/"
            className="inline-flex h-9 items-center rounded-[5px] border border-[#A3EA2A] px-4 font-[Ubuntu] text-base text-[#F9F9FB] transition-colors hover:bg-white/10"
          >
            Log In
          </a>
          <PrimaryButton className="hidden sm:inline-flex">Join for FREE</PrimaryButton>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#151C2B]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-300px] h-[500px] rounded-[100px] opacity-90 blur-[100px]"
        style={{
          background:
            "radial-gradient(198% 52% at 50% 50%, #1C4DA9 0%, rgba(28,77,169,0) 70%)",
        }}
      />
      <img
        src={`${IMG}c04dd7f958d6e08e0df56dfbdf9deb1ab6a63347?width=3840`}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60"
      />
      <div className="relative mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-12 px-5 pb-20 pt-16 md:pb-[170px] md:pt-[120px] lg:flex-row lg:items-start lg:pt-[120px]">
        <div className="flex w-full max-w-[680px] flex-col">
          <h1 className="font-[Ubuntu] text-[36px] font-medium leading-[1.05] text-[#F9F9FB] sm:text-[54px] sm:leading-[50px]">
            Anyone can learn cyber
            <br className="hidden sm:block" /> security with TryHackMe
          </h1>
          <p className="mt-5 text-xl leading-[1.45] text-[#EEEFF2] sm:text-2xl sm:leading-[35px]">
            Hands-on cyber security training through real-world scenarios
          </p>
          <div className="flex flex-wrap items-center gap-4 pb-[30px] pt-[46px]">
            <PrimaryButton className="h-[38px]">Join for FREE</PrimaryButton>
            <GoogleButton />
          </div>
          <ul className="flex flex-wrap gap-x-4 gap-y-4 text-base text-[#EEEFF2]">
            {["Beginner-friendly", "Guides and challenges"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={`${IMG}fe4492c61e627614d7dcac95f5503f09a56ce4d9?width=610`}
          alt=""
          className="h-auto w-[240px] shrink-0 sm:w-[305px]"
        />
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="bg-[#F8FDEE] px-5 py-8">
      <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map(([big, small]) => (
          <div key={big} className="flex flex-col items-center gap-px text-center text-[#151C2B]">
            <div className="text-2xl font-bold leading-[44px] tracking-[-0.05em] sm:text-[32px]">
              {big}
            </div>
            <div className="text-base leading-8 opacity-70 sm:text-lg">{small}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function DifficultyTag({ level }: { level: Difficulty }) {
  const { color, bars } = difficultyStyle[level];
  return (
    <div className="flex items-center gap-1.5 text-sm capitalize leading-[18px]" style={{ color }}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill={color} aria-hidden="true">
        {[0, 1, 2, 3].map((i) => {
          const h = [2.8, 5.6, 8.4, 11.2][i] ?? 2.8;
          const active = i <= bars;
          return (
            <rect
              key={i}
              x={0.7 + i * 3.5}
              y={12.6 - h}
              width={2.1}
              height={h}
              rx={1}
              opacity={active ? 1 : 0.4}
            />
          );
        })}
      </svg>
      {level}
    </div>
  );
}

function PathCard({ path }: { path: (typeof paths)[number] }) {
  return (
    <article className="flex min-h-[335px] w-[241px] shrink-0 snap-start flex-col gap-6 overflow-hidden rounded-[10px] border border-[#EEEFF2] bg-white px-4 pb-[25px] pt-4">
      <div className="relative h-[135px] shrink-0 overflow-hidden rounded-[10px]">
        <img src={path.img} alt={`${path.title} learning path.`} className="h-full w-full object-cover" />
        {path.isNew && (
          <span className="absolute left-4 top-4 rounded-[10px] bg-gradient-to-r from-[#A3EA2A] to-[#3BC81E] px-2.5 py-1 font-[Ubuntu] text-xs font-medium uppercase leading-3 text-[#151C2B]">
            New 2026
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <DifficultyTag level={path.difficulty} />
        <h3 className="font-[Ubuntu] text-base font-medium leading-[22px] text-[#151C2B]">{path.title}</h3>
      </div>
      <a
        href="/"
        className="inline-flex h-7 w-fit items-center rounded-[5px] border border-[#A3EA2A] bg-[#A3EA2A] px-2.5 font-[Ubuntu] text-sm text-[#151C2B] transition-colors hover:bg-[#b5f04f]"
      >
        Enroll in Path
      </a>
    </article>
  );
}

function LearningPaths() {
  const [level, setLevel] = useState("All");
  const [topic, setTopic] = useState("All");
  return (
    <section className="mx-auto flex max-w-[1296px] flex-col gap-[18px] px-5 py-12 md:py-20">
      <h2 className="text-center font-[Ubuntu] text-[28px] font-medium leading-10 text-[#151C2B] sm:text-4xl">
        Go from wherever you are
        <br className="hidden sm:block" /> to the role you want
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-2 pt-[22px]">
        {experience.map((e) => (
          <button
            key={e}
            type="button"
            onClick={() => setLevel(e)}
            className={`rounded-full px-5 py-1.5 text-base transition-colors ${
              level === e
                ? "bg-[#1153E4] font-semibold text-white"
                : "bg-[#EEEFF2] text-[#151C2B] hover:bg-[#e2e4e9]"
            }`}
          >
            {e}
          </button>
        ))}
      </div>
      <div className="flex flex-col gap-6 overflow-hidden rounded-[20px] bg-[#EEEFF2] p-4 md:flex-row md:gap-[42px] md:px-6 md:pb-6 md:pt-[62px]">
        <div className="flex shrink-0 flex-row flex-wrap gap-3 md:flex-col md:py-6">
          {topics.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTopic(t)}
              className={`rounded-md px-3 py-1.5 text-left text-lg text-[#151C2B] transition-colors md:min-w-[200px] ${
                topic === t ? "bg-[#F9F9FB] font-semibold" : "hover:bg-[#F9F9FB]/60"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="min-w-0 flex-1 rounded-2xl bg-[#F9F9FB] p-4">
          <div className="flex snap-x gap-4 overflow-x-auto pb-2">
            {paths.map((p) => (
              <PathCard key={p.title} path={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Promo({
  badge,
  badgeIcon,
  title,
  subtitle,
  bullets,
  cta,
  proof,
  img,
  imgAlt,
  imgClass,
  reverse,
}: {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  bullets: string[];
  cta: string;
  proof: string;
  img: string;
  imgAlt: string;
  imgClass: string;
  reverse?: boolean;
}) {
  return (
    <article className="overflow-hidden rounded-[10px] bg-[#F6FAF0] md:pl-[50px]">
      {badge && (
        <span className="flex w-fit items-center gap-3 rounded-b-md bg-[#E9F3E7] px-4 py-3 font-[Ubuntu] text-sm font-medium text-[#26890C]">
          {badgeIcon}
          {badge}
        </span>
      )}
      <div className={`flex flex-col gap-10 px-5 md:flex-row md:px-0 ${reverse ? "md:flex-row-reverse" : ""}`}>
        <div className="flex flex-1 flex-col gap-[22px] pb-6 pt-8 md:pb-[146px] md:pt-[55px]">
          {title && <h3 className="font-[Ubuntu] text-2xl font-medium text-[#151C2B]">{title}</h3>}
          {subtitle && <p className="max-w-[490px] text-base leading-[25.6px] text-[#525A6A]">{subtitle}</p>}
          <ul className="flex list-disc flex-col gap-1 pl-5 text-base leading-[22.4px] text-[#525A6A]">
            {bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <div className="flex flex-col items-start gap-3 pt-2">
            <PrimaryButton>{cta}</PrimaryButton>
            <span className="flex items-center gap-2 text-base text-[#525A6A]">
              <Check color="#26890C" />
              {proof}
            </span>
          </div>
        </div>
        <figure className="flex items-end justify-center md:justify-end md:pb-[60px] md:pt-5">
          <img src={img} alt={imgAlt} className={`h-auto max-w-full ${imgClass}`} />
        </figure>
      </div>
    </article>
  );
}

function Promos() {
  return (
    <section className="mx-auto flex max-w-[1296px] flex-col gap-8 px-5 pb-20">
      <Promo
        bullets={[
          "Build an innovative culture that grows and retains talent",
          "Shrink blast radius, cut containment time, give leaders industry-recognised evidence.",
        ]}
        cta="Explore TryHackMe for Business"
        proof="Try it FREE with your team"
        img={`${IMG}bcb88c468c46f873c0db045e623dafdb1f5f8ce2?width=1262`}
        imgAlt="TryHackMe for Business dashboard showing team skills and leaderboard."
        imgClass="w-[631px]"
      />
      <Promo
        badge="TryHackMe For Education"
        badgeIcon={<IconBuildingBank size={18} aria-hidden="true" />}
        title="Teaching cyber security?"
        subtitle="Teach on the platform your students already love"
        bullets={[
          "Cut weeks of prep and map your syllabus to TryHackMe in minutes",
          "Assign prebuilt, editable labs or create your own lessons, and track each student’s progress",
          "Safe, secure environment for your students to hack, accessible from every browser",
        ]}
        cta="Explore TryHackMe for Education"
        proof="Loved by students globally"
        img={`${IMG}acce7df06fc3f9604a30036774c81327c2935d0d?width=981`}
        imgAlt="TryHackMe for Education showing curriculum upload and custom learning paths."
        imgClass="w-[490px]"
      />
    </section>
  );
}

function FooterCta() {
  return (
    <section className="overflow-hidden bg-[#182031] px-5 pt-[82px]">
      <div className="mx-auto flex max-w-[963px] flex-col items-center gap-8 text-center text-white">
        <h2 className="max-w-[782px] font-[Ubuntu] text-[28px] font-medium leading-[1.3] tracking-[0.05em] sm:text-4xl sm:leading-[46px]">
          Join 8+ million people mastering cyber on TryHackMe
        </h2>
        <p className="max-w-[758px] text-lg leading-[23px]">
          Start your journey today. Free, in your browser, no experience needed.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <PrimaryButton className="h-[38px]">Join for FREE</PrimaryButton>
          <GoogleButton />
        </div>
      </div>
      <div aria-hidden="true" className="relative mt-[60px] h-[60px] overflow-hidden">
        {pixels.map(([x, y, w, h, o, c]) => (
          <span
            key={x}
            className="absolute hidden md:block"
            style={{ left: x, top: y, width: w, height: h, opacity: o, background: c }}
          />
        ))}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#212C42] px-5 pb-[22px] pt-[60px] text-[#F9F9FB]">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-[42px]">
        <div className="flex flex-col justify-between gap-10 lg:flex-row">
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:flex lg:flex-wrap">
            {footerColumns.map((col) => (
              <div key={col.title} className="flex min-w-[130px] flex-col gap-5">
                <h3 className="font-[Ubuntu] text-2xl font-medium">{col.title}</h3>
                <ul className="flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="/" className="text-base hover:underline">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start gap-2 lg:items-end lg:text-right">
            <img
              src={`${IMG}3260862b7ec67283021201ead580574c920c97e1?width=228`}
              alt=""
              className="h-[77px] w-auto"
            />
            <p className="max-w-[320px] pt-6 text-sm leading-6">
              We're a gamified, hands-on cyber security training platform that you can access through your browser.
            </p>
            <p className="text-sm text-[#727C92]">128 City Road, London, United Kingdom, EC1V 2NX</p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between gap-4 border-t-2 border-[#3E475A] pt-[22px] text-base text-[#727C92] sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-5">
            <p>Copyright TryHackMe 2018-2026</p>
            <p className="flex items-center gap-2">
              <IconShieldCheck size={24} aria-hidden="true" />
              ISO27001 Compliant
            </p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            {["X", "LinkedIn", "Discord", "Facebook", "YouTube", "Instagram", "Pinterest"].map((s) => (
              <a key={s} href="/" aria-label={s} className="hover:text-white">
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function HomeRoute() {
  return (
    <div className="min-h-full bg-[#F9F9FB] font-[Source_Sans_3]">
      <Header />
      <main id="main-content">
        <Hero />
        <Stats />
        <LearningPaths />
        <Promos />
        <FooterCta />
      </main>
      <Footer />
    </div>
  );
}
