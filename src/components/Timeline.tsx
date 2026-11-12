
import { useEffect, useRef } from "react";
import type { CSSProperties, KeyboardEvent } from "react";
import type { Policy } from "../types";

const years = [
  "2011",
  "2013",
  "2014",
  "2016",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026",
];

interface Props {
  policies: Policy[];
  selectedYear: string;
  onSelectYear: (year: string) => void;
}

export function Timeline({
  policies,
  selectedYear,
  onSelectYear,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const selectedIndex = years.indexOf(selectedYear);

  const currentIndex = Math.max(0, selectedIndex);
  const related = policies.filter(
    (p) => p.year === selectedYear
  );

  const progress =
    (currentIndex / (years.length - 1)) * 100;

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const active = container.querySelector<HTMLElement>(
      ".timeline-year.active"
    );

    if (!active) return;

    const left =
      active.offsetLeft +
      active.offsetWidth / 2 -
      container.clientWidth / 2;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    container.scrollTo({
      left: Math.max(0, left),
      behavior: reduced ? "instant" : "smooth",
    });
  }, [selectedYear]);

  const navigate = (direction: number) => {
    const index = Math.min(
      years.length - 1,
      Math.max(0, currentIndex + direction)
    );

    onSelectYear(years[index]);
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let next = index;

    if (event.key === "ArrowRight") next = index + 1;
    else if (event.key === "ArrowLeft") next = index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = years.length - 1;
    else return;

    event.preventDefault();

    next = Math.max(0, Math.min(years.length - 1, next));

    onSelectYear(years[next]);

    scrollRef.current
      ?.querySelectorAll<HTMLButtonElement>(".timeline-year")
      [next]?.focus();
  };

  const progressStyle = {
    "--timeline-progress": `${progress}%`,
  } as CSSProperties;

  return (
    <section
      className="timeline-section section timeline-editorial"
      id="linha-do-tempo"
      aria-labelledby="timeline-title"
    >
      <div className="container">
        <div className="section-heading timeline-heading">
          <div>
            <div className="eyebrow">
              03 / Percurso histórico
            </div>

            <h2 id="timeline-title">
              Uma agenda em movimento.
            </h2>
          </div>

          <p>
            Explore os anos com iniciativas da Prefeitura do
            Rio e descubra como diferentes frentes de atuação
            foram ganhando espaço.
          </p>
        </div>

        <div className="timeline-navigation">
          <span className="timeline-navigation-label">
            EXPLORE OS MARCOS DA TRAJETÓRIA
          </span>

          <div className="timeline-arrows">
            <button
              type="button"
              className="timeline-arrow"
              onClick={() => navigate(-1)}
              disabled={currentIndex === 0}
              aria-label="Ano anterior"
            >
              <span aria-hidden="true">←</span>
            </button>

            <button
              type="button"
              className="timeline-arrow"
              onClick={() => navigate(1)}
              disabled={currentIndex === years.length - 1}
              aria-label="Próximo ano"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>

        <div
          className="timeline-years-scroll"
          ref={scrollRef}
          tabIndex={0}
          aria-label="Linha do tempo com rolagem horizontal"
        >
          <div
            className="timeline-years-shell"
            style={progressStyle}
          >
            <div
              id="years"
              className="year-controls timeline-years"
              role="group"
              aria-label="Selecione um ano"
            >
              {years.map((y, index) => {
                const count = policies.filter(
                  (p) => p.year === y
                ).length;

                const active = selectedYear === y;
                const passed = index < currentIndex;

                return (
                  <button
                    key={y}
                    type="button"
                    className={[
                      "timeline-year",
                      active ? "active" : "",
                      passed ? "passed" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    aria-pressed={active}
                    onClick={() => onSelectYear(y)}
                    onKeyDown={(event) =>
                      handleKeyDown(event, index)
                    }
                  >
                    <span className="timeline-dot">
                      <span className="timeline-dot-inner" />
                    </span>

                    <span className="timeline-year-number">
                      {y}
                    </span>

                    <span className="timeline-year-count">
                      {count}{" "}
                      {count === 1
                        ? "iniciativa"
                        : "iniciativas"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div
          key={selectedYear}
          className="timeline-feature timeline-detail-card"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="timeline-detail-content">
            <span className="timeline-detail-eyebrow">
              ANO SELECIONADO / {selectedYear}
            </span>

            <div className="timeline-detail-main">
              <span
                className="timeline-detail-number"
                aria-hidden="true"
              >
                {selectedYear}
              </span>

              <div className="timeline-detail-info">
                <h3>
                  {related.length}{" "}
                  {related.length === 1
                    ? "iniciativa"
                    : "iniciativas"}
                </h3>

                <p>
                  {related.length > 0
                    ? related
                        .slice(0, 2)
                        .map((item) => item.name)
                        .join(" · ") +
                      (related.length > 2
                        ? " e outras iniciativas."
                        : ".")
                    : "Nenhuma iniciativa cadastrada neste ano."}
                </p>
              </div>
            </div>
          </div>

          <a
            className="timeline-detail-link"
            href="#iniciativas"
          >
            Ver iniciativas deste ano
            <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="timeline-bottom">
          <span>
            {String(currentIndex + 1).padStart(2, "0")}
            {" / "}
            {String(years.length).padStart(2, "0")}
          </span>

          <span>
            A HISTÓRIA CONTINUA EM CONSTRUÇÃO
          </span>
        </div>
      </div>
    </section>
  );
}

export { years };
