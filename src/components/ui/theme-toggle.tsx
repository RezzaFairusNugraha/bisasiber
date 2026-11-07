"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { IconMoon, IconSun } from "@tabler/icons-react";

type DocumentWithViewTransition = Document & {
  startViewTransition?: (callback: () => void) => {
    ready: Promise<void>;
    finished: Promise<void>;
  };
};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  function handleToggle(e: React.MouseEvent<HTMLButtonElement>) {
    const nextTheme = isDark ? "light" : "dark";
    const x = `${e.clientX}px`;
    const y = `${e.clientY}px`;

    document.documentElement.style.setProperty("--x", x);
    document.documentElement.style.setProperty("--y", y);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const doc = document as DocumentWithViewTransition;

    if (!doc.startViewTransition || prefersReducedMotion) {
      setTheme(nextTheme);
      return;
    }

    doc.startViewTransition(() => {
      setTheme(nextTheme);
    });
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap"}
      title={isDark ? "Mode Terang" : "Mode Gelap"}
      className="btn-interactive inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg border border-line bg-bg2 text-mute hover:border-red hover:text-ink"
    >
      {isDark ? (
        <IconSun size={19} stroke={1.75} />
      ) : (
        <IconMoon size={19} stroke={1.75} />
      )}
    </button>
  );
}
