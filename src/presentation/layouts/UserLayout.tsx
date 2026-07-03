import Link from "next/link";
import type { ReactNode } from "react";

import { Icon } from "../components/Icon";

export function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--surface)] text-[var(--text-main)]">
      <header className="sticky top-0 z-50 bg-[var(--maroon)] text-white">
        <div className="shell-container flex h-16 items-center justify-between">
          <Link href="/" className="brand-serif flex items-center gap-3 text-2xl font-bold">
            <Icon>▥</Icon>
            INMIDOC
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-bold tracking-[0.05em] md:flex">
            <Link className="border-b-2 border-[var(--gold-light)] pb-1" href="/">
              Trámites
            </Link>
            <Link className="text-white/90 hover:text-[var(--gold-light)]" href="#">
              Gobierno
            </Link>
            <Link className="text-white/90 hover:text-[var(--gold-light)]" href="#">
              Participa
            </Link>
            <Link className="text-white/90 hover:text-[var(--gold-light)]" href="#">
              Datos
            </Link>
          </nav>
          <Link
            href="/login"
            className="focus-ring bg-white/10 px-4 py-2 text-sm font-bold tracking-[0.05em] hover:bg-white/15"
          >
            Iniciar Sesión
          </Link>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t-4 border-[var(--gold)] bg-[var(--maroon)] py-8 text-white">
        <div className="shell-container flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-bold">© 2024 Gobierno de México - INMIDOC</p>
            <p className="mt-2 text-sm text-white/80">Sistema de Gestión y Validación Documental.</p>
          </div>
          <nav className="flex flex-wrap gap-x-7 gap-y-2 text-sm text-white/85">
            <Link href="#">Privacidad</Link>
            <Link href="#">Términos y Condiciones</Link>
            <Link href="#">Contacto</Link>
            <Link href="#">Mapa de sitio</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
