import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  children: ReactNode;
};

const variantClass = {
  primary: "bg-(--maroon-strong) text-white border border-(--maroon-strong) hover:bg-(--maroon-dark)",
  secondary: "bg-[#795926] text-white border border-[#795926] hover:bg-[#5e4110]",
  outline: "bg-transparent text-(--maroon-strong) border border-(--gold-light) hover:bg-(--surface-muted)",
  ghost: "bg-transparent text-(--maroon-strong) border border-transparent hover:underline",
};

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  return (
    <button
      className={`focus-ring inline-flex min-h-11 items-center justify-center gap-2 px-5 py-2 text-sm font-bold tracking-[0.05em] transition-colors ${variantClass[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
