import { Button } from "../components/Button";
import { Icon } from "../components/Icon";

export function LoginView() {
  return (
    <section className="flex min-h-[calc(100vh-192px)] items-center justify-center px-4 py-12">
      <div className="institutional-card gold-rule-top w-full max-w-md p-8 md:p-10">
        <div className="text-center">
          <h1 className="brand-serif text-4xl font-bold">Iniciar Sesión</h1>
          <p className="mt-3 text-[var(--text-muted)]">Acceso administrativo INMIDOC</p>
        </div>
        <form className="mt-8 grid gap-5">
          <label className="grid gap-2 text-sm font-bold tracking-[0.05em]">
            Correo Electrónico <span className="text-[var(--maroon)]">*</span>
            <span className="relative">
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--outline)]">✉</Icon>
              <input
                className="focus-ring h-14 w-full border border-[var(--gold-light)] pl-10 pr-4 font-normal tracking-0"
                placeholder="usuario@inmidoc.gob.mx"
                type="email"
              />
            </span>
          </label>
          <label className="grid gap-2 text-sm font-bold tracking-[0.05em]">
            Contraseña <span className="text-[var(--maroon)]">*</span>
            <span className="relative">
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--outline)]">▣</Icon>
              <input
                className="focus-ring h-14 w-full border border-[var(--gold-light)] pl-10 pr-4 font-normal tracking-0"
                placeholder="••••••••"
                type="password"
              />
            </span>
          </label>
          <a className="justify-self-end text-sm text-[#795926] hover:underline" href="#">
            ¿Olvidaste tu contraseña?
          </a>
          <Button className="w-full" type="button">
            Ingresar al Sistema <Icon>↪</Icon>
          </Button>
          <div className="mt-2 flex gap-4 border border-[var(--surface-line)] bg-[var(--surface-muted)] p-4 text-sm leading-6 text-[var(--text-muted)]">
            <Icon className="mt-0.5 text-[#795926]">ⓘ</Icon>
            <p>
              Este es un sistema de uso restringido para personal autorizado del Gobierno de México. El acceso no autorizado será sancionado.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
