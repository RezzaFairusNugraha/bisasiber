import type { Metadata, Viewport } from "next";
import { Ubuntu, Source_Sans_3 } from "next/font/google";
import { QueryProvider } from "@/providers/query-provider";
import "./globals.css";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-ubuntu",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#151C2B",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://bisasiber.id"
  ),
  title: {
    default: "BisaSiber | Platform Belajar Teknologi & Siber Interaktif",
    template: "%s | BisaSiber",
  },
  description:
    "Platform belajar teknologi dan keamanan siber interaktif #1 di Indonesia. Kuasai Penetration Testing, SOC Analysis, Cloud Security, dan AI Security melalui lab skenario dunia nyata langsung di browser Anda.",
  keywords: [
    "BisaSiber",
    "belajar keamanan siber",
    "cyber security indonesia",
    "ethical hacking indonesia",
    "penetration testing",
    "SOC analyst",
    "capture the flag",
    "lab siber interaktif",
  ],
  authors: [{ name: "Tim BisaSiber Indonesia" }],
  creator: "BisaSiber",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
      { url: "/logo-dark.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://bisasiber.id",
    siteName: "BisaSiber",
    title: "BisaSiber | Platform Belajar Teknologi & Siber Interaktif",
    description:
      "Pelatihan keamanan siber dan teknologi berbasis praktik langsung (hands-on labs) dari level pemula hingga mahir dalam satu platform terpadu.",
    images: [
      {
        url: "/logo-dark.png",
        width: 1200,
        height: 630,
        alt: "BisaSiber — Platform Belajar Teknologi & Siber Interaktif",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BisaSiber | Platform Belajar Teknologi & Siber Interaktif",
    description:
      "Pelatihan keamanan siber dan teknologi interaktif melalui skenario dunia nyata langsung dari browser Anda.",
    images: ["/logo-dark.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${ubuntu.variable} ${sourceSans.variable}`}>
      <body className="min-h-screen bg-[#F9F9FB] text-[#151C2B] antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
