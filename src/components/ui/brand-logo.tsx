"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "dark" | "light";
  href?: string;
}

const sizeMap = {
  sm: { width: 38, height: 24, text: "text-lg" },
  md: { width: 48, height: 31, text: "text-xl" },
  lg: { width: 62, height: 40, text: "text-2xl" },
};

const maskBaseStyle: React.CSSProperties = {
  maskSize: "contain",
  WebkitMaskSize: "contain",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskPosition: "center",
};

export function BrandLogo({
  className,
  imageClassName,
  showText = true,
  size = "md",
  href = "/",
}: BrandLogoProps) {
  const dimensions = sizeMap[size];
  const prefersReducedMotion = useReducedMotion();

  const content = (
    <motion.span
      initial={prefersReducedMotion ? false : { opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 16,
        mass: 0.9,
      }}
      whileHover={
        prefersReducedMotion ? undefined : { scale: 1.08, rotate: -3 }
      }
      className={cn("inline-flex items-center gap-2.5 group", className)}
    >
      <span className="relative flex shrink-0 items-center justify-center rounded-lg bg-bg2 p-1.5 ring-1 ring-line">
        <span
          role="img"
          aria-label="Logo BisaSiber"
          style={{
            width: dimensions.width,
            aspectRatio: "264 / 169",
          }}
          className={cn("relative block shrink-0", imageClassName)}
        >
          {/* White / Ink Layer */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-ink transition-colors duration-400"
            style={{
              ...maskBaseStyle,
              maskImage: "url('/logo-white.png')",
              WebkitMaskImage: "url('/logo-white.png')",
            }}
          />
          {/* Red Layer + 5s White Shine Sweep */}
          <span
            aria-hidden="true"
            className="logo-red-shine absolute inset-0"
            style={{
              ...maskBaseStyle,
              maskImage: "url('/logo-red.png')",
              WebkitMaskImage: "url('/logo-red.png')",
            }}
          />
        </span>
      </span>

      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-heading font-bold tracking-tight text-ink",
              dimensions.text
            )}
          >
            Bisa<span className="text-btn">Siber</span>
          </span>
          <span className="text-[10px] font-medium uppercase tracking-widest text-mute">
            Lab & Akademi Siber
          </span>
        </span>
      )}
    </motion.span>
  );

  if (!href) {
    return content;
  }

  return (
    <Link
      href={href}
      aria-label="Beranda BisaSiber"
      className="focus:outline-none"
    >
      {content}
    </Link>
  );
}
