import type { FormEvent } from "react";

import { Button } from "../components/Button";
import { Icon } from "../components/Icon";

type LoginViewProps = {
  email: string;
  password: string;
  error?: string;
  isSubmitting?: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void> | void;
};

export function LoginView({
  email,
  password,
  error,
  isSubmitting,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginViewProps) {
  return (
    <section className="flex min-h-[calc(100vh-192px)] items-center justify-center px-4 py-12">
      <div className="institutional-card gold-rule-top w-full max-w-md p-8 md:p-10">
        <div className="text-center">
          <h1 className="brand-serif text-4xl font-bold">Iniciar Sesión</h1>
          <p className="mt-3 text-(--text-muted)">Acceso administrativo INMIDOC</p>
        </div>
        <form onSubmit={onSubmit} className="mt-8 grid gap-5">
          <label className="grid gap-2 text-sm font-bold tracking-[0.05em]">
            Correo Electrónico <span className="text-(--maroon)">*</span>
            <span className="relative">
              <Icon name="mail" className="absolute left-3 top-1/2 -translate-y-1/2 text-(--outline)" />
              <input
                className="focus-ring h-14 w-full border border-(--gold-light) pl-10 pr-4 font-normal tracking-0"
                placeholder="usuario@inmidoc.gob.mx"
                type="email"
                value={email}
                onChange={(event) => onEmailChange(event.target.value)}
                required
              />
            </span>
          </label>
          <label className="grid gap-2 text-sm font-bold tracking-[0.05em]">
            Contraseña <span className="text-(--maroon)">*</span>
            <span className="relative">
              <Icon name="lock" className="absolute left-3 top-1/2 -translate-y-1/2 text-(--outline)" />
              <input
                className="focus-ring h-14 w-full border border-(--gold-light) pl-10 pr-4 font-normal tracking-0"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(event) => onPasswordChange(event.target.value)}
                required
              />
            </span>
          </label>

          {error ? <p className="text-sm font-semibold text-(--danger)">{error}</p> : null}

          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Ingresando..." : "Ingresar al Sistema"} <Icon name="login" />
          </Button>
          <div className="mt-2 flex gap-4 border border-(--surface-line) bg-(--surface-muted) p-4 text-sm leading-6 text-(--text-muted)">
            <Icon name="info" className="mt-0.5 text-[#795926]" />
            <p>
              Este es un sistema de uso restringido para personal autorizado del Gobierno de México. El acceso no autorizado será sancionado.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
