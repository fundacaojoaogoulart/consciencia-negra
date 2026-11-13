// EM BACKLOG 

import type { Policy } from "../types";
const icons: Record<string, string> = {
  "Cultura e memória": "✳",
  "Direitos e proteção": "✦",
  Educação: "✧",
  "Gestão e oportunidades": "↗",
  "Participação e articulação": "◎",
  Saúde: "✚",
};
export function Categories({
  policies,
  onSelectTheme,
}: {
  policies: Policy[];
  onSelectTheme: (theme: string) => void;
}) {
  const themes = [...new Set(policies.map((p) => p.theme))].sort((a, b) =>
    a.localeCompare(b, "pt-BR")
  );
  return (
    <section className="category-section section" id="eixos">
      <div className="container">
        <div className="section-heading">
          <div>
            <div className="eyebrow">04 / Áreas de atuação</div>
            <h2>
              Diferentes caminhos.
              <br />O mesmo compromisso.
            </h2>
          </div>
          <p>
            Conheça os seis eixos temáticos utilizados para organizar as
            iniciativas do levantamento.
          </p>
        </div>
        <div id="categoryGrid" className="category-grid">
          {themes.map((t) => (
            <button
              className="category"
              type="button"
              key={t}
              onClick={() => onSelectTheme(t)}
            >
              <span className="category-mark" aria-hidden="true">
                {icons[t] || "✳"}
              </span>
              <strong>{t}</strong>
              <span>
                {policies.filter((p) => p.theme === t).length} iniciativas no
                levantamento <small aria-hidden="true">↗</small>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
