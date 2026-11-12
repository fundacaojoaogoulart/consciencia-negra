import { useEffect, useRef, useState } from "react";

type TabKey = "population" | "territory" | "inequality";

type HeroStat = {
  label: string;
  value: number;
  decimals?: number;
  suffix?: string;
  note: string;
};

const heroStats: HeroStat[] = [
  {
    label: "Pessoas negras na cidade do Rio",
    value: 3.37,
    decimals: 2,
    suffix: " mi",
    note: "De um total de 6,21 milhões de moradores",
  },
  {
    label: "Da população carioca é negra",
    value: 54.3,
    decimals: 1,
    suffix: "%",
    note: "Segundo o Censo Demográfico de 2022",
  },
  {
    label: "Maior contingente negro entre municípios brasileiros",
    value: 2,
    suffix: "º",
    note: "Em número de moradores, atrás de São Paulo",
  },
];

const territoryBars = [
  { region: "Cidade de Deus", value: 75.2 },
  { region: "Complexo do Alemão", value: 72.0 },
  { region: "Jacarezinho", value: 70.4 },
  { region: "Santa Cruz", value: 69.8 },
];

const sourceLinks = [
  {
    label: "IBGE — Censos 2010 e 2022, tabela 9606",
    href: "https://sidra.ibge.gov.br/tabela/9606",
  },
  {
    label: "IPP/Data.Rio — Regiões Administrativas, tabela 852",
    href: "https://datariov2-pcrj.hub.arcgis.com/content/672c1a543f694bacafe19d1ca47c1f87",
  },
  {
    label: "Panorama Socioeconômico da População Negra Carioca",
    href: "https://repertorio.pcrjmulti.rio/projetos/projeto-panorama-socioeconomico-da-populacao-negra-carioca/",
  },
  {
    label: "FJG — Mapeamento da Burocracia Representativa",
    href: "https://repertorio.rio/projetos/mapeamento-de-burocracia-representativa-da-prefeitura-do-rio/",
  },
  {
    label: "SMS-Rio — Boletim de Saúde da População Negra",
    href: "https://epirio.svs.rio.br/wp-content/uploads/2025/11/Saude_Negra_2025fim2025_11_19.html",
  },
];

function useCountUp(
  target: number,
  start: boolean,
  decimals = 0,
  duration = 1100
) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(target);
      return;
    }
    let frame = 0;
    let raf = 0;
    const totalFrames = Math.max(1, Math.round(duration / 16));
    const animate = () => {
      frame += 1;
      const progress = Math.min(1, frame / totalFrames);
      setCount(target * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) raf = requestAnimationFrame(animate);
      else setCount(target);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return count.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function StatCard({
  label,
  value,
  decimals = 0,
  suffix = "",
  note,
  start,
}: HeroStat & { start: boolean }) {
  const counted = useCountUp(value, start, decimals);
  return (
    <article className="data-stat-card reveal">
      <span className="data-stat-label">{label}</span>
      <strong className="data-stat-value">
        {counted}
        {suffix}
      </strong>
      <p className="data-stat-note">{note}</p>
    </article>
  );
}

export function DataFactsSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("population");
  const [startCount, setStartCount] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="data-facts section"
      id="dados-raciais"
      ref={sectionRef}
      aria-labelledby="dataFactsTitle"
    >
      <div className="container">
        <div className="data-facts-header reveal">
          <div>
            <span className="eyebrow">05 / Panorama racial</span>
            <h2 id="dataFactsTitle">Os números também contam histórias.</h2>
          </div>
          <p>
            Mais da metade da população da cidade do Rio de Janeiro é negra.
            Veja onde vivem esses moradores e o que os dados mostram sobre
            renda, trabalho e acesso a cargos de gestão na Prefeitura.
          </p>
        </div>

        <div className="data-stat-grid">
          {heroStats.map((item) => (
            <StatCard key={item.label} {...item} start={startCount} />
          ))}
        </div>

        <div className="data-panel reveal">
          <div
            className="data-tabs"
            role="group"
            aria-label="Explorar dados do município"
          >
            <button
              type="button"
              className={activeTab === "population" ? "active" : ""}
              aria-pressed={activeTab === "population"}
              onClick={() => setActiveTab("population")}
            >
              População
            </button>
            <button
              type="button"
              className={activeTab === "territory" ? "active" : ""}
              aria-pressed={activeTab === "territory"}
              onClick={() => setActiveTab("territory")}
            >
              Território
            </button>
            <button
              type="button"
              className={activeTab === "inequality" ? "active" : ""}
              aria-pressed={activeTab === "inequality"}
              onClick={() => setActiveTab("inequality")}
            >
              Desigualdades
            </button>
          </div>

          <div className="data-panel-body">
            {activeTab === "population" && (
              <div className="data-tab-grid">
                <div className="data-feature-card">
                  <span className="data-kicker">Destaques gerais</span>
                  <ul className="data-bullet-list">
                    <li>
                      A cidade tem <strong>3.372.323 moradores negros</strong>,
                      segundo o Censo 2022.
                    </li>
                    <li>
                      Entre 2010 e 2022, a participação da população negra
                      passou de <strong>48,0% para 54,3%</strong>.
                    </li>
                    <li>
                      Nesse período, houve um acréscimo de cerca de{" "}
                      <strong>341 mil moradores negros</strong>.
                    </li>
                    <li>
                      O Rio é o <strong>2º município brasileiro</strong> com
                      maior contingente de população negra, atrás de São Paulo.
                    </li>
                  </ul>
                </div>
                <div className="data-side-stack">
                  <article className="mini-insight">
                    <span className="mini-insight-title">Mulheres negras</span>
                    <strong>1,77 milhão</strong>
                    <p>
                      Cerca de 52,4% da população negra carioca é composta por
                      mulheres.
                    </p>
                  </article>
                  <article className="mini-insight">
                    <span className="mini-insight-title">Juventude negra</span>
                    <strong>59,3%</strong>
                    <p>
                      Dos jovens de 15 a 29 anos da cidade são negros,
                      aproximadamente 750 mil pessoas.
                    </p>
                  </article>
                </div>
              </div>
            )}

            {activeTab === "territory" && (
              <div className="data-tab-grid territory-layout">
                <div className="data-feature-card">
                  <span className="data-kicker">
                    Regiões Administrativas com maior proporção de moradores
                    negros
                  </span>
                  <div className="territory-bars">
                    {territoryBars.map((item) => (
                      <div className="territory-bar-item" key={item.region}>
                        <div className="territory-bar-head">
                          <span>{item.region}</span>
                          <strong>
                            {item.value.toLocaleString("pt-BR", {
                              minimumFractionDigits: 1,
                              maximumFractionDigits: 1,
                            })}
                            %
                          </strong>
                        </div>
                        <div className="territory-bar-track">
                          <div
                            className="territory-bar-fill"
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="data-side-stack">
                  <article className="mini-insight">
                    <span className="mini-insight-title">Maioria negra</span>
                    <strong>24 de 33 RAs</strong>
                    <p>
                      A população negra é maioria em 24 das 33 Regiões
                      Administrativas.
                    </p>
                  </article>
                  <article className="mini-insight">
                    <span className="mini-insight-title">Campo Grande</span>
                    <strong>380.354 moradores</strong>
                    <p>
                      Maior contingente de moradores negros em números
                      absolutos.
                    </p>
                  </article>
                  <article className="mini-insight">
                    <span className="mini-insight-title">Lagoa</span>
                    <strong>21,3%</strong>
                    <p>
                      Menor proporção de moradores negros entre as Regiões
                      Administrativas da cidade.
                    </p>
                  </article>
                </div>
              </div>
            )}

            {activeTab === "inequality" && (
              <div className="data-tab-grid inequality-layout">
                <div className="compare-card">
                  <span className="data-kicker">
                    Renda domiciliar mensal por pessoa · 2024
                  </span>
                  <div className="compare-values">
                    <div>
                      <small>Pessoas negras</small>
                      <strong>R$ 2,3 mil</strong>
                    </div>
                    <div>
                      <small>Pessoas brancas</small>
                      <strong>R$ 4,4 mil</strong>
                    </div>
                  </div>
                  <p>
                    Entre 2021 e 2024, descontada a inflação, a renda cresceu{" "}
                    <strong>17,2%</strong> entre pessoas negras e{" "}
                    <strong>10,5%</strong> entre pessoas brancas.
                  </p>
                </div>
                <div className="compare-card">
                  <span className="data-kicker">
                    Mercado de trabalho · 2021–2024
                  </span>
                  <div className="compare-values">
                    <div>
                      <small>Crescimento de ocupados negros</small>
                      <strong>27,2%</strong>
                    </div>
                    <div>
                      <small>Crescimento de ocupados brancos</small>
                      <strong>17,4%</strong>
                    </div>
                  </div>
                  <p>
                    Em 2024, a taxa de desemprego foi de <strong>8,9%</strong>{" "}
                    entre pessoas negras e <strong>7,1%</strong> entre pessoas
                    brancas.
                  </p>
                </div>
                <div className="data-feature-card full-span">
                  <span className="data-kicker">
                    Representatividade na Prefeitura · levantamento FJG
                  </span>
                  <ul className="data-bullet-list">
                    <li>
                      <strong>51,6%</strong> dos servidores municipais com
                      informação de raça/cor são pessoas negras.
                    </li>
                    <li>
                      <strong>41,0%</strong> dos ocupantes de cargos de gestão
                      são pessoas negras.
                    </li>
                    <li>
                      <strong>32,2%</strong> dos ocupantes de cargos de nível
                      estratégico são pessoas negras.
                    </li>
                  </ul>
                </div>
                <div className="data-feature-card full-span">
                  <span className="data-kicker">
                    Violência interpessoal · 2024
                  </span>
                  <p>
                    <strong>69,7%</strong> das notificações de violência
                    interpessoal registradas na cidade envolveram pessoas
                    negras.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="data-disclaimer">
          <strong>Fontes e metodologia:</strong> dados de diferentes
          levantamentos e períodos. Consulte as publicações originais:{" "}
          {sourceLinks.map((source, index) => (
            <span key={source.href}>
              {index > 0 ? " · " : ""}
              <a href={source.href} target="_blank" rel="noopener noreferrer">
                {source.label} ↗
              </a>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
