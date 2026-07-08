import type { ChangeEvent, FormEvent } from "react";

import { Button } from "../components/Button";
import { Icon } from "../components/Icon";

type SearchHeroProps = {
  frequentSearches: string[];
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: (value: string) => void;
  onFrequentSearch: (value: string) => void;
};

export function SearchHero({
  frequentSearches,
  searchValue,
  onSearchChange,
  onSearchSubmit,
  onFrequentSearch,
}: SearchHeroProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearchSubmit(searchValue);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    onSearchChange(event.target.value);
  }

  return (
    <section className="institutional-card mx-auto mt-8 max-w-[1200px] px-6 py-10 text-center shadow-[0_8px_28px_rgba(97,18,50,0.05)] md:px-12">
      <h1 className="brand-serif text-4xl font-bold text-(--maroon-strong) md:text-5xl">¿Qué trámite buscas?</h1>
      <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-(--text-muted)">
        Encuentra información, requisitos y accesos directos a los servicios del Gobierno de México.
      </p>
      <form className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
        <label className="relative flex-1">
          <span className="sr-only">Buscar trámite</span>
          <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-(--text-muted)" />
          <input
            className="focus-ring h-14 w-full border border-(--gold-light) bg-white pl-12 pr-4 text-base text-(--text-main) placeholder:text-slate-500"
            onChange={handleInputChange}
            placeholder="Ej. CURP, Pasaporte, Cédula Profesional..."
            value={searchValue}
          />
        </label>
        <Button className="h-14 px-8" type="submit">
          Buscar
          <Icon name="arrowRight" />
        </Button>
      </form>
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-(--text-muted)">Búsquedas frecuentes:</span>
        {frequentSearches.map((search) => (
          <button
            key={search}
            className="focus-ring border border-(--surface-line) bg-(--surface-muted) px-3 py-1 text-xs font-bold text-(--maroon-strong) hover:bg-(--gold-light) hover:text-white"
            onClick={() => onFrequentSearch(search)}
            type="button"
          >
            {search}
          </button>
        ))}
      </div>
    </section>
  );
}
