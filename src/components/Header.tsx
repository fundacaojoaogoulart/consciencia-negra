
import { useEffect, useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Fecha o menu ao navegar entre as seções
  useEffect(() => {
    const close = () => setOpen(false);

    window.addEventListener("hashchange", close);

    return () => {
      window.removeEventListener("hashchange", close);
    };
  }, []);

  // Estilo do cabeçalho durante a rolagem
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  // Permite fechar o menu com Escape
  useEffect(() => {
    if (!open) return;

    const handleEscape = (
      event: KeyboardEvent
    ) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [open]);

  return (
    <header
      className={[
        "header",
        "v4-header",
        scrolled
          ? "header-scrolled"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="container head-in">
        <a
          className="header-brand"
          href="#inicio"
          aria-label="Voltar ao início — Prefeitura do Rio"
          onClick={() => setOpen(false)}
        >
          <img
            className="logo"
            src="/images/logo-fjg-prefeitura-branca.png"
            alt="Prefeitura do Rio"
          />
        </a>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mainNav"
          aria-label={
            open
              ? "Fechar menu"
              : "Abrir menu"
          }
          onClick={() =>
            setOpen((value) => !value)
          }
        >
          <span aria-hidden="true">
            {open ? "✕" : "☰"}
          </span>

          <span>
            {open ? "Fechar" : "Menu"}
          </span>
        </button>

        <nav
          id="mainNav"
          aria-label="Navegação principal"
          className={
            "nav" + (open ? " open" : "")
          }
          onClick={(event) => {
            if (
              (event.target as HTMLElement)
                .closest("a")
            ) {
              setOpen(false);
            }
          }}
        >
          <a href="#sobre">
            O projeto
          </a>

          <a href="#territorios">
            Nossa memória
          </a>

          <a href="#linha-do-tempo">
            Linha do tempo
          </a>

          <a href="#iniciativas">
            Iniciativas
          </a>

          <a href="#dados-raciais">
            Panorama racial
          </a>

          <a
            className="nav-btn"
            href="#fontes"
          >
            Fontes e dados
            <span aria-hidden="true">
              ↗
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}
