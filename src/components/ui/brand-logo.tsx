import Image from "next/image";
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
  sm: { width: 38, height: 38, text: "text-lg" },
  md: { width: 48, height: 48, text: "text-xl" },
  lg: { width: 62, height: 62, text: "text-2xl" },
};

export function BrandLogo({
  className,
  imageClassName,
  showText = true,
  size = "md",
  variant = "dark",
  href = "/",
}: BrandLogoProps) {
  const dimensions = sizeMap[size];

  const content = (
    <span className={cn("inline-flex items-center gap-2.5 group", className)}>
      <span className="relative flex shrink-0 items-center justify-center rounded-lg bg-[#151C2B]/80 p-1 ring-1 ring-white/10 transition-transform group-hover:scale-105">
        <Image
          src="/logo.png"
          alt="Logo BisaSiber"
          width={dimensions.width}
          height={dimensions.height}
          className={cn("h-auto w-auto object-contain", imageClassName)}
          priority
        />
      </span>
      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-heading font-bold tracking-tight",
              dimensions.text,
              variant === "dark" ? "text-[#F9F9FB]" : "text-[#151C2B]"
            )}
          >
            Bisa<span className="text-[#A3EA2A]">Siber</span>
          </span>
          <span
            className={cn(
              "text-[10px] font-medium uppercase tracking-widest",
              variant === "dark" ? "text-white/55" : "text-[#525A6A]"
            )}
          >
            Lab & Akademi Siber
          </span>
        </span>
      )}
    </span>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} aria-label="Beranda BisaSiber" className="focus:outline-none">
      {content}
    </Link>
  );
}
