import type { Metadata, Viewport } from "next";
import "@fontsource/plus-jakarta-sans/600.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "@fontsource/plus-jakarta-sans/800.css";
import "@fontsource/source-sans-3/400.css";
import "@fontsource/source-sans-3/500.css";
import "@fontsource/source-sans-3/600.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/600.css";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F9FE" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0D17" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://bisasiber.id"
  ),
  title: {
    default: "BisaSiber | Platform Belajar Keamanan Siber Purple Team Interaktif",
    template: "%s | BisaSiber",
  },
  description:
    "Platform belajar keamanan siber interaktif di Indonesia dengan filosofi The Purple Synthesis (Red Team + Blue Team). Kuasai Penetration Testing, SOC Analysis, Cloud Security, dan AI Security langsung di browser.",
  keywords: [
    "BisaSiber",
    "belajar keamanan siber",
    "purple team indonesia",
    "red team blue team",
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
    title: "BisaSiber | Platform Belajar Keamanan Siber Purple Team Interaktif",
    description:
      "Pelatihan keamanan siber Red Team & Blue Team berbasis praktik langsung (hands-on labs) dari level pemula hingga mahir dalam satu platform terpadu.",
    images: [
      {
        url: "/logo-dark.png",
        width: 1200,
        height: 630,
        alt: "BisaSiber — The Purple Synthesis Edition",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BisaSiber | Platform Belajar Keamanan Siber Purple Team Interaktif",
    description:
      "Pelatihan keamanan siber interaktif melalui skenario Red Team, Blue Team, dan Purple Team langsung dari browser Anda.",
    images: ["/logo-dark.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-screen bg-bg text-ink antialiased">
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
