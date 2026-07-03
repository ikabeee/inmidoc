type IconProps = {
  label?: string;
  children: string;
  className?: string;
};

export function Icon({ label, children, className = "" }: IconProps) {
  return (
    <span aria-label={label} className={`inline-flex h-5 w-5 items-center justify-center ${className}`}>
      {children}
    </span>
  );
}
