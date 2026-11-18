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
  { region: "Pavuna", value: 68.6 },
  { region: "Maré", value: 67.2 },
  { region: "Bangu", value: 65.3 },
  { region: "Guaratiba", value: 65.2 },
  { region: "Anchieta", value: 65.1 },
  { region: "Vigário Geral", value: 64.7 },
  { region: "Rocinha", value: 63.7 },
  { region: "Campo Grande", value: 63.3 },
  { region: "Portuária", value: 63.0 },
  { region: "Realengo", value: 62.3 },
  { region: "São Cristóvão", value: 61.7 },
  { region: "Madureira", value: 60.5 },
  { region: "Rio Comprido", value: 58.8 },
  { region: "Inhaúma", value: 57.1 },
  { region: "Penha", value: 56.9 },
  { region: "Ramos", value: 56.1 },
  { region: "Santa Teresa", value: 54.8 },
  { region: "Irajá", value: 53.6 },
  { region: "Jacarepaguá", value: 51.9 },
  { region: "Paquetá", value: 51.3 },
  { region: "Ilha do Governador", value: 49.3 },
  { region: "Méier", value: 48.1 },
  { region: "Centro", value: 46.9 },
  { region: "Vila Isabel", value: 35.5 },
  { region: "Barra da Tijuca", value: 34.8 },
  { region: "Tijuca", value: 31.9 },
  { region: "Copacabana", value: 27.5 },
  { region: "Botafogo", value: 25.7 },
  { region: "Lagoa", value: 21.3 },
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

/** Anima o valor apenas quando o usuário realmente o vê na tela. */
function useCountUp(
  target: number,
  start: boolean,
  decimals = 0,
  duration = 1250
) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    const reduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.body.classList.contains("motion-off");

    if (reduced) {
      setCount(target);
      return;
    }

    let raf = 0;
    let startedAt: number | null = null;

    const frame = (now: number) => {
      if (startedAt === null) startedAt = now;
      const progress = Math.min(1, (now - startedAt) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(progress === 1 ? target : target * eased);

      if (progress < 1) raf = window.requestAnimationFrame(frame);
    };

    raf = window.requestAnimationFrame(frame);
    return () => window.cancelAnimationFrame(raf);
  }, [target, start, duration]);

  return count.toLocaleString("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

type AnimatedNumberProps = {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
};

/** A leitura por tecnologias assistivas permanece no valor final, sem anunciar cada quadro. */
function AnimatedNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const counted = useCountUp(value, visible, decimals);
  const finalText =
    prefix +
    value.toLocaleString("pt-BR", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) +
    suffix;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -12px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <span className="data-animated-number" ref={ref}>
      <span aria-hidden="true">
        {prefix}
        {counted}
        {suffix}
      </span>
      <span className="data-number-sr-only">{finalText}</span>
    </span>
  );
}

function StatCard({
  label,
  value,
  decimals = 0,
  suffix = "",
  note,
}: HeroStat) {
  return (
    <article className="data-stat-card reveal">
      <span className="data-stat-label">{label}</span>
      <strong className="data-stat-value">
        <AnimatedNumber value={value} decimals={decimals} suffix={suffix} />
      </strong>
      <p className="data-stat-note">{note}</p>
    </article>
  );
}

/** Cada barra é ativada ao entrar na área visível da lista rolável. */
function TerritoryBar({ region, value }: { region: string; value: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="territory-bar-item" ref={ref}>
      <div className="territory-bar-head">
        <span>{region}</span>
        <strong>
          <AnimatedNumber value={value} decimals={1} suffix="%" />
        </strong>
      </div>
      <div
        className="territory-bar-track"
        role="img"
        aria-label={`${region}: ${value.toLocaleString("pt-BR", {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        })}% de moradores negros`}
      >
        <div
          className="territory-bar-fill"
          aria-hidden="true"
          style={{ width: visible ? `${value}%` : "0%" }}
        />
      </div>
    </div>
  );
}

function TerritoryBars() {
  return (
    <div
      className="territory-bars territory-bars-scroll"
      role="region"
      aria-label="Lista rolável das 33 Regiões Administrativas e percentuais de moradores negros"
      tabIndex={0}
    >
      {territoryBars.map((item) => (
        <TerritoryBar key={item.region} {...item} />
      ))}
    </div>
  );
}

export function DataFactsSection() {
  const [activeTab, setActiveTab] = useState<TabKey>("population");
  return (
    <section
      className="data-facts section"
      id="dados-raciais"
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
            <StatCard key={item.label} {...item} />
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

          <div className="data-panel-body" aria-live="off">
            <div key={activeTab} className="data-tab-content">
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
                    <strong><AnimatedNumber value={1.77} decimals={2} suffix=" milhão" /></strong>
                    <p>
                      Cerca de 52,4% da população negra carioca é composta por
                      mulheres.
                    </p>
                  </article>
                  <article className="mini-insight">
                    <span className="mini-insight-title">Juventude negra</span>
                    <strong><AnimatedNumber value={59.3} decimals={1} suffix="%" /></strong>
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
                    Proporção de moradores negros por Região Administrativa
                  </span>
                  <p className="territory-scroll-hint">
                    33 regiões · da maior para a menor proporção. Role a lista para ver todas.
                  </p>
                  <TerritoryBars />
                </div>
                <div className="data-side-stack">
                  <article className="mini-insight">
                    <span className="mini-insight-title">Maioria negra</span>
                    <strong><AnimatedNumber value={24} /> de 33 RAs</strong>
                    <p>
                      A população negra é maioria em 24 das 33 Regiões
                      Administrativas.
                    </p>
                  </article>
                  <article className="mini-insight">
                    <span className="mini-insight-title">Campo Grande</span>
                    <strong><AnimatedNumber value={380354} suffix=" moradores" /></strong>
                    <p>
                      Maior contingente de moradores negros em números
                      absolutos.
                    </p>
                  </article>
                  <article className="mini-insight">
                    <span className="mini-insight-title">Lagoa</span>
                    <strong><AnimatedNumber value={21.3} decimals={1} suffix="%" /></strong>
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
                    Renda domiciliar per capita · 2025
                  </span>
                  <div className="compare-values">
                    <div>
                      <small>Pessoas negras</small>
                      <strong><AnimatedNumber value={2570} prefix="R$ " /></strong>
                    </div>
                    <div>
                      <small>Pessoas brancas</small>
                      <strong><AnimatedNumber value={5035} prefix="R$ " /></strong>
                    </div>
                  </div>
                  <p>
                    Entre 2021 e 2025, a renda per capita cresceu <strong>39,3%</strong>{" "}
                    entre pessoas negras e <strong>25,4%</strong> entre pessoas brancas.
                    Em 2025, a renda de pessoas brancas era <strong>95,9% maior</strong>.
                  </p>
                  <p>
                    A renda per capita das pessoas negras cariocas foi
                    <strong> 53,8% maior</strong> que a média nacional da população
                    negra (<strong>R$ 1.671</strong>) em 2025.
                  </p>
                </div>
                <div className="compare-card">
                  <span className="data-kicker">
                    Mercado de trabalho · primeiros semestres de 2021 e 2026
                  </span>
                  <div className="compare-values">
                    <div>
                      <small>Pessoas negras ocupadas · 2026</small>
                      <strong><AnimatedNumber value={1.8} decimals={1} suffix=" milhão" /></strong>
                    </div>
                    <div>
                      <small>Crescimento da ocupação negra</small>
                      <strong><AnimatedNumber value={43.1} decimals={1} suffix="%" /></strong>
                    </div>
                  </div>
                  <p>
                    Em 2026, pessoas negras representavam <strong>54,2%</strong> dos ocupados
                    no Rio. Eram <strong>549,3 mil</strong> pessoas negras ocupadas a mais
                    que no primeiro semestre de 2021.
                  </p>
                </div>
                <div className="data-feature-card full-span">
                  <span className="data-kicker">
                    Desocupação da população negra · primeiros semestres de 2021 e 2026
                  </span>
                  <ul className="data-bullet-list">
                    <li>
                      A taxa média de desocupação caiu de <strong>18,5%</strong> para{" "}
                      <strong>7,0%</strong>, uma redução de <strong>11,5 pontos percentuais</strong>.
                    </li>
                    <li>
                      O número de pessoas negras desocupadas diminuiu em <strong>150,8 mil</strong>.
                    </li>
                  </ul>
                </div>
                <div className="data-feature-card full-span">
                  <span className="data-kicker">Educação · pessoas com 25 anos ou mais · 2025</span>
                  <ul className="data-bullet-list">
                    <li>
                      No Rio, <strong>43,0%</strong> das pessoas negras e <strong>33,9%</strong>
                      das pessoas brancas tinham ensino médio completo, sem superior concluído.
                    </li>
                    <li>
                      <strong>23,6%</strong> das pessoas negras cariocas tinham ensino superior
                      completo, ante <strong>14,5%</strong> das pessoas negras no Brasil.
                    </li>
                  </ul>
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
        </div>

        <div className="data-disclaimer">
          <strong>Fontes e metodologia:</strong> IBGE — PNAD Contínua Trimestral
          (mercado de trabalho, primeiros semestres de 2021 e 2026) e PNAD
          Contínua Anual (renda e escolaridade, 2025), em compilação da SMDE
          e da FJG encaminhada pela CDC em novembro de 2026. Demais indicadores:
          Censo Demográfico 2022 e levantamentos institucionais específicos.
          Consulte também as publicações originais:{" "}
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
