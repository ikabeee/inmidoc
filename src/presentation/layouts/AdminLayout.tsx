import Link from "next/link";
import type { ReactNode } from "react";

import { Icon } from "../components/Icon";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "▦" },
  { href: "#", label: "Expedientes", icon: "▤" },
  { href: "#", label: "Validación", icon: "◇" },
  { href: "/admin/reports", label: "Reportes", icon: "▥" },
  { href: "#", label: "Configuración", icon: "⚙" },
];

export function AdminLayout({
  children,
  active = "Dashboard",
}: {
  children: ReactNode;
  active?: string;
}) {
  return (
    <div className="min-h-screen bg-[var(--surface-muted)] text-[var(--text-main)]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-[var(--surface-line)] bg-white md:flex">
        <div className="border-b border-[var(--surface-line)] p-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-[var(--maroon-strong)] bg-[var(--maroon-strong)] text-lg font-bold text-white">
            UA
          </div>
          <h2 className="brand-serif text-xl font-semibold text-[var(--maroon)]">Panel INMIDOC</h2>
          <p className="mt-1 text-sm text-[var(--text-muted)]">Administración Central</p>
        </div>
        <nav className="flex-1 py-5">
          {navItems.map((item) => {
            const isActive = item.label === active;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex min-h-12 items-center gap-3 border-l-4 px-5 text-sm font-bold tracking-[0.05em] transition-colors ${
                  isActive
                    ? "border-[#795926] bg-[var(--maroon)] text-white"
                    : "border-transparent text-[var(--text-muted)] hover:bg-[var(--surface-muted)]"
                }`}
              >
                <Icon>{item.icon}</Icon>
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-[var(--surface-line)] p-4">
          <Link
            href="/admin/procedures/new"
            className="focus-ring flex min-h-12 items-center justify-center gap-2 bg-[var(--maroon-strong)] px-4 text-sm font-bold tracking-[0.05em] text-white hover:bg-[var(--maroon-dark)]"
          >
            <Icon>＋</Icon>
            Nuevo Trámite
          </Link>
        </div>
      </aside>
      <div className="md:pl-64">
        <main className="min-h-screen px-4 py-8 md:px-10">{children}</main>
      </div>
    </div>
  );
}
