import { useCallback, useEffect, useState } from "react";
import policiesRaw from "./data/policies.json";
import type { Policy } from "./types";
import { Header } from "./components/Header";
import { StaticSection } from "./components/StaticSection";
import { HeritageSection } from "./components/HeritageSection";
import { HeroSection } from "./components/HeroSection";
import { StorySection } from "./components/StorySection";
import { Timeline } from "./components/Timeline";
import { Catalog } from "./components/Catalog";
import { PolicyModal } from "./components/PolicyModal";
import { DataFactsSection } from "./components/DataFactsSection.tsx";

const policies = policiesRaw as Policy[];

export default function App() {
  const [query, setQuery] = useState("");
  const [theme, setTheme] = useState("");
  const [year, setYear] = useState("");
  const [limit, setLimit] = useState(9);
  const [selected, setSelected] = useState<Policy | null>(null);
  const closeModal = useCallback(() => setSelected(null), []);

  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  const [progress, setProgress] = useState(0);

  const chooseYear = (value: string) => {
    setYear(value);
    setLimit(9);
  };

  const reset = () => {
    setQuery("");
    setTheme("");
    setYear("");
    setLimit(9);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (event: MediaQueryListEvent) => {
      setReduced(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("motion-off", reduced);
    return () => document.body.classList.remove("motion-off");
  }, [reduced]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (100 * window.scrollY) / max) : 0);

      const art = document.querySelector<HTMLElement>(".hero-art");
      const hero = document.querySelector<HTMLElement>(".hero");

      if (art) {
        art.style.transform =
          !reduced && hero && window.scrollY < hero.offsetHeight + 100
            ? `translate3d(0,${Math.min(window.scrollY * 0.08, 58)}px,0)`
            : "";
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" }
    );

    const watch = () => {
      document
        .querySelectorAll<HTMLElement>(".reveal:not(.is-visible)")
        .forEach((el) => {
          if (reduced) el.classList.add("is-visible");
          else observer.observe(el);
        });
    };

    document
      .querySelectorAll(
        ".heritage-intro,.heritage-tile,.manifesto-inner,.section-heading,.story-grid > *,.stats-grid .stat,.closing .container,.data-facts-header,.data-stat-card,.data-panel"
      )
      .forEach((el) => el.classList.add("reveal"));

    watch();

    const mo = new MutationObserver(watch);
    mo.observe(document.getElementById("root")!, {
      childList: true,
      subtree: true,
    });

    return () => {
      mo.disconnect();
      observer.disconnect();
    };
  }, [reduced]);

  return (
    <>
      <div
        className="reading-progress"
        aria-hidden="true"
        style={{ width: progress + "%" }}
      />

      <Header />

      <main id="conteudo">
        <HeroSection />
        <StaticSection section="stats" />
        <StorySection />
        <HeritageSection />
        <StaticSection section="manifesto" />

        <Timeline
          policies={policies}
          selectedYear={year || "2022"}
          onSelectYear={chooseYear}
        />

        <Catalog
          policies={policies}
          query={query}
          theme={theme}
          year={year}
          limit={limit}
          onQuery={(q) => {
            setQuery(q);
            setLimit(9);
          }}
          onTheme={(t) => {
            setTheme(t);
            setLimit(9);
          }}
          onYear={chooseYear}
          onMore={() => setLimit((v) => v + 9)}
          onReset={reset}
          onDetails={setSelected}
        />

        <DataFactsSection />

        <StaticSection section="closing" />
      </main>

      <StaticSection section="footer" />
      <PolicyModal policy={selected} onClose={closeModal} />
    </>
  );
}