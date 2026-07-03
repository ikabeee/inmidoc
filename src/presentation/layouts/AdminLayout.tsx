import Link from "next/link";
import type { ReactNode } from "react";

import { Icon } from "../components/Icon";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "#", label: "Expedientes", icon: "folder" },
  { href: "#", label: "Validación", icon: "shield" },
  { href: "/admin/reports", label: "Reportes", icon: "chart" },
  { href: "#", label: "Configuración", icon: "settings" },
] as const;

export function AdminLayout({
  children,
  active = "Dashboard",
}: {
  children: ReactNode;
  active?: string;
}) {
  return (
    <div className="min-h-screen bg-(--surface-muted) text-(--text-main)">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-(--surface-line) bg-white md:flex">
        <div className="border-b border-(--surface-line) p-6 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-(--maroon-strong) bg-(--maroon-strong) text-lg font-bold text-white">
            UA
          </div>
          <h2 className="brand-serif text-xl font-semibold text-(--maroon)">Panel INMIDOC</h2>
          <p className="mt-1 text-sm text-(--text-muted)">Administración Central</p>
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
                    ? "border-[#795926] bg-(--maroon) text-white"
                    : "border-transparent text-(--text-muted) hover:bg-(--surface-muted)"
                }`}
              >
                <Icon name={item.icon} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-(--surface-line) p-4">
          <Link
            href="/admin/procedures/new"
            className="focus-ring flex min-h-12 items-center justify-center gap-2 bg-(--maroon-strong) px-4 text-sm font-bold tracking-[0.05em] text-white hover:bg-(--maroon-dark)"
          >
            <Icon name="plus" />
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
