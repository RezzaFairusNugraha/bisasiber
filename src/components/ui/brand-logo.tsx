"use client";

import Link from "next/link";
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
  sm: { width: 34, text: "text-base" },
  md: { width: 42, text: "text-lg" },
  lg: { width: 52, text: "text-xl" },
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

  const content = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        role="img"
        aria-label="Logo BisaSiber"
        style={{
          width: dimensions.width,
          aspectRatio: "264 / 169",
        }}
        className={cn("relative block shrink-0", imageClassName)}
      >
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-ink"
          style={{
            ...maskBaseStyle,
            maskImage: "url('/logo-white.png')",
            WebkitMaskImage: "url('/logo-white.png')",
          }}
        />
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

      {showText && (
        <span
          className={cn(
            "font-heading font-bold tracking-tight text-ink",
            dimensions.text
          )}
        >
          Bisa<span className="text-btn">Siber</span>
        </span>
      )}
    </span>
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
