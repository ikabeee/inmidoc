import Link from "next/link";
import type { ReactNode } from "react";
import Image from 'next/image'

export function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-(--surface) text-(--text-main)">
      <header className="sticky top-0 z-50 bg-(--maroon) text-white">
        <div className="shell-container flex h-16 items-center justify-between">
          <Link
            href="/"
            className="brand-serif flex items-center gap-3 text-2xl font-bold"
          >
            <Image src="/qroo-logo.png" alt="INMIDOC" width={100} height={100} />
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-bold tracking-[0.05em] md:flex">
            <Link
              className="border-b-2 border-(--gold-light) pb-1"
              href="/"
            >
              Trámites
            </Link>
            <Link
              className="border-b-2 border-(--gold-light) pb-1"
              href="/"
            >
              Haz tu reporte
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
      <footer className="border-t-4 border-(--gold) bg-(--maroon) py-8 text-white">
        <div className="shell-container flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-bold">
              © 2024 Gobierno de México - INMIDOC
            </p>
            <p className="mt-2 text-sm text-white/80">
              Sistema de Gestión y Validación Documental.
            </p>
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
