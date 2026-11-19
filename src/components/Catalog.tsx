import { useMemo } from "react";
import type { Policy } from "../types";
import { years } from "./Timeline";
interface Props {
  policies: Policy[];
  query: string;
  theme: string;
  year: string;
  limit: number;
  onQuery: (q: string) => void;
  onTheme: (t: string) => void;
  onYear: (y: string) => void;
  onMore: () => void;
  onReset: () => void;
  onDetails: (policy: Policy) => void;
}
export function Catalog({
  policies,
  query,
  theme,
  year,
  limit,
  onQuery,
  onTheme,
  onYear,
  onMore,
  onReset,
  onDetails,
}: Props) {
  const themes = useMemo(
    () =>
      [...new Set(policies.map((p) => p.theme))].sort((a, b) =>
        a.localeCompare(b, "pt-BR")
      ),
    [policies]
  );
  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase("pt-BR");
    return policies.filter(
      (p) =>
        (!q ||
          [p.name, p.what, p.audience, p.owner, p.period, p.status]
            .join(" ")
            .toLocaleLowerCase("pt-BR")
            .includes(q)) &&
        (!theme || p.theme === theme) &&
        (!year || p.year === year)
    );
  }, [policies, query, theme, year]);
  return (
    <section className="catalog section" id="iniciativas">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">04 / Explore o levantamento</div>
            <h2>
              Políticas e iniciativas
              <br />
              em destaque.
            </h2>
          </div>
          <p>
            Pesquise por assunto, escolha um tema ou filtre pelo ano de início da iniciativa.
            Cada cartão apresenta informações registradas no levantamento a partir do ano de publicação.
          </p>
        </div>
        <div className="toolbar">
          <label className="search-wrap">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>
            <input
              type="search"
              aria-label="Buscar iniciativas"
              placeholder="Buscar iniciativa, órgão ou público..."
              value={query}
              onChange={(e) => onQuery(e.target.value)}
            />
          </label>
          <select
            aria-label="Filtrar por tema"
            value={theme}
            onChange={(e) => onTheme(e.target.value)}
          >
            <option value="">Todos os temas</option>
            {themes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            aria-label="Filtrar por ano de início"
            value={year}
            onChange={(e) => onYear(e.target.value)}
          >
            <option value="">Todos os anos de início</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
        <div className="results">
          <span aria-live="polite">
            {filtered.length}{" "}
            {filtered.length === 1
              ? "iniciativa encontrada"
              : "iniciativas encontradas"}
          </span>
          <button type="button" className="reset" onClick={onReset}>
            Limpar filtros
          </button>
        </div>
        <div className="cards" id="cards">
          {filtered.length === 0 ? (
            <div className="empty">
              Nenhuma iniciativa encontrada. Experimente outros filtros.
            </div>
          ) : (
            filtered.slice(0, limit).map((p, i) => (
              <article className="policy" key={p.name + i}>
                <div className="policy-head">
                  <span className="theme">{p.theme}</span>
                  <span className="date">Início: {p.year === "A confirmar" ? "a confirmar" : p.year}</span>
                </div>
                <h3>{p.name}</h3>
                <p>{p.what}</p>
                <div className="policy-foot" style={{ justifyContent: "flex-end" }}>
                  <button
                    className="details"
                    type="button"
                    aria-label={"Ver detalhes de " + p.name}
                    onClick={() => onDetails(p)}
                  >
                    Ver detalhes ↗
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
        <div className="more-row">
          {filtered.length > limit && (
            <button className="more-btn" type="button" onClick={onMore}>
              Mostrar mais iniciativas ↓
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
