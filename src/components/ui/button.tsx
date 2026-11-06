import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "outline" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps & {
  href: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-btn bg-btn text-onred hover:bg-red2 hover:border-red2 font-medium shadow-xs",
  outline:
    "border border-btn bg-transparent text-ink hover:bg-redsoft",
  secondary:
    "border border-line bg-bg2 text-ink hover:bg-card",
  ghost: "bg-transparent text-mute hover:text-ink hover:bg-bg2",
  danger:
    "border border-hard bg-hard text-onred hover:bg-red2 font-medium",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm rounded-[5px]",
  md: "h-9 px-4 text-base rounded-[5px]",
  lg: "h-11 px-6 text-base rounded-[6px]",
};

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props;

  const classes = cn(
    "btn-interactive inline-flex items-center justify-center gap-2 font-heading focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      type={buttonProps.type ?? "button"}
      className={classes}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

export function GoogleAuthButton({
  href = "/daftar",
  label = "Lanjutkan dengan Google",
  className,
}: {
  href?: string;
  label?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "btn-interactive inline-flex h-[38px] items-center justify-center gap-2.5 rounded-[5px] border border-line bg-bg2 px-5 font-heading text-base text-ink hover:border-red hover:bg-card shadow-xs",
        className
      )}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M15.844 6.433H15.2V6.4H8v3.2h4.521a4.8 4.8 0 1 1-1.337-5.184l2.263-2.263A8 8 0 1 0 16 8c0-.537-.055-1.06-.156-1.567z"
          fill="#FFC107"
        />
        <path
          d="M.922 4.276 3.551 6.204A4.8 4.8 0 0 1 8 3.2c1.224 0 2.337.462 3.184 1.216l2.263-2.263A7.97 7.97 0 0 0 8 0 8 8 0 0 0 .922 4.276z"
          fill="#FF3D00"
        />
        <path
          d="M8 16a7.96 7.96 0 0 0 5.364-2.077l-2.476-2.095A4.76 4.76 0 0 1 8 12.8a4.8 4.8 0 0 1-4.513-3.178L.878 11.632A8 8 0 0 0 8 16z"
          fill="#4CAF50"
        />
        <path
          d="M15.844 6.433H15.2V6.4H8v3.2h4.521a4.8 4.8 0 0 1-1.635 2.228l2.478 2.095C13.188 14.082 16 12 16 8c0-.537-.055-1.06-.156-1.567z"
          fill="#1976D2"
        />
      </svg>
      {label}
    </Link>
  );
}
