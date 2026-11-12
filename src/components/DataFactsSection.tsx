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
    label: "Pessoas negras no estado do RJ",
    value: 9.3,
    decimals: 1,
    suffix: " mi",
    note: "em um total de 16.055.174 fluminenses",
  },
  {
    label: "Da população estadual é negra",
    value: 57.8,
    decimals: 1,
    suffix: "%",
    note: "população preta e parda no estado",
  },
  {
    label: "Maior contingente negro entre os estados",
    value: 4,
    suffix: "º",
    note: "em números absolutos, no Brasil",
  },
];

const territoryBars = [
  { city: "Duque de Caxias", value: 68.82 },
  { city: "Nova Iguaçu", value: 67.25 },
  { city: "São Gonçalo", value: 62.0 },
  { city: "Rio de Janeiro", value: 57.79 },
];

function useCountUp(
  target: number,
  start: boolean,
  decimals = 0,
  duration = 1300
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let frame = 0;
    let raf = 0;
    const totalFrames = Math.max(1, Math.round(duration / 16));

    const animate = () => {
      frame += 1;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;

      setCount(value);

      if (frame < totalFrames) {
        raf = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    raf = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return count.toFixed(decimals);
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
      { threshold: 0.25 }
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
            Um panorama sintético sobre população, território e desigualdades
            raciais no estado do Rio de Janeiro, com base no material de
            referência enviado para o protótipo.
          </p>
        </div>

        <div className="data-stat-grid">
          {heroStats.map((item) => (
            <StatCard key={item.label} {...item} start={startCount} />
          ))}
        </div>

        <div className="data-panel reveal">
          <div className="data-tabs" role="tablist" aria-label="Explorar dados">
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
                      O estado do Rio reúne <strong>9,3 milhões</strong> de
                      pessoas negras.
                    </li>
                    <li>
                      Pessoas negras representam <strong>57,8%</strong> da
                      população estadual.
                    </li>
                    <li>
                      O RJ é o <strong>4º maior contingente negro</strong> do
                      país em números absolutos.
                    </li>
                    <li>
                      Entre as mulheres do estado, <strong>quase 57%</strong>{" "}
                      são mulheres negras.
                    </li>
                  </ul>
                </div>

                <div className="data-side-stack">
                  <article className="mini-insight">
                    <span className="mini-insight-title">
                      Juventude negra
                    </span>
                    <strong>62%</strong>
                    <p>
                      é o percentual observado em 42 municípios do estado, com
                      15 municípios variando entre 70% e 78%.
                    </p>
                  </article>

                  <article className="mini-insight">
                    <span className="mini-insight-title">
                      Igualdade racial institucional
                    </span>
                    <strong>2 municípios</strong>
                    <p>
                      fluminenses contam com secretarias exclusivas de igualdade
                      racial: Macaé e Rio de Janeiro.
                    </p>
                  </article>
                </div>
              </div>
            )}

            {activeTab === "territory" && (
              <div className="data-tab-grid territory-layout">
                <div className="data-feature-card">
                  <span className="data-kicker">
                    Municípios com mais de 500 mil habitantes
                  </span>

                  <div className="territory-bars">
                    {territoryBars.map((item) => (
                      <div className="territory-bar-item" key={item.city}>
                        <div className="territory-bar-head">
                          <span>{item.city}</span>
                          <strong>{item.value.toFixed(2)}%</strong>
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
                    <span className="mini-insight-title">
                      Região Metropolitana
                    </span>
                    <strong>65,3%</strong>
                    <p>
                      das pessoas negras do estado se concentram nessa
                      categoria territorial.
                    </p>
                  </article>

                  <article className="mini-insight">
                    <span className="mini-insight-title">
                      Baixada Fluminense / RM
                    </span>
                    <strong>maiores percentuais</strong>
                    <p>
                      Japeri, Belford Roxo, Queimados, São João de Meriti,
                      Magé, Duque de Caxias, Mesquita, Nova Iguaçu, Nilópolis e
                      Seropédica.
                    </p>
                  </article>

                  <article className="mini-insight">
                    <span className="mini-insight-title">
                      Outras regiões
                    </span>
                    <strong>58,7% a 47%</strong>
                    <p>
                      Baixadas Litorâneas, Norte Fluminense, Costa Verde,
                      Centro-Sul, Médio Paraíba, Noroeste Fluminense e Serrana.
                    </p>
                  </article>
                </div>
              </div>
            )}

            {activeTab === "inequality" && (
              <div className="data-tab-grid inequality-layout">
                <div className="compare-card">
                  <span className="data-kicker">Renda média mensal</span>
                  <div className="compare-values">
                    <div>
                      <small>Pessoas negras</small>
                      <strong>R$ 2,3k</strong>
                    </div>
                    <div>
                      <small>Pessoas brancas</small>
                      <strong>R$ 4,4k</strong>
                    </div>
                  </div>
                  <p>
                    Negros ganham <strong>42% menos</strong> no estado do Rio de
                    Janeiro.
                  </p>
                </div>

                <div className="compare-card">
                  <span className="data-kicker">Vitimização policial</span>
                  <div className="single-highlight">
                    <strong>6,4x</strong>
                    <span>maior entre negros do que entre brancos</span>
                  </div>
                  <p>Recorte apresentado no material entre 2019 e 2023.</p>
                </div>

                <div className="data-feature-card full-span">
                  <span className="data-kicker">Leitura estrutural</span>
                  <ul className="data-bullet-list">
                    <li>
                      O racismo é estrutural e seu enfrentamento exige ação de
                      Estado.
                    </li>
                    <li>
                      Os indicadores reforçam a importância de políticas públicas
                      de equidade racial.
                    </li>
                    <li>
                      Memória, representatividade e acesso a direitos devem
                      caminhar juntos.
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="data-disclaimer">
          Dados apresentados a partir do material de referência enviado para o
          protótipo. VERIFICAR A FONTE.
        </p>
      </div>
    </section>
  );
}