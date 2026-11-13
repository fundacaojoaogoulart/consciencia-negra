import { useState } from "react";

/** V5 — fotografia editorial e composição assimétrica. */
export function HeroSection() {
  const [failed, setFailed] = useState(false);

  return (
    <section
      className="hero v4-hero v5-hero"
      id="inicio"
      aria-labelledby="hero-title"
    >
      <div className="v5-hero-texture" aria-hidden="true" />

      <div className="container hero-inner v5-hero-inner">
        <div className="hero-copy v5-hero-copy">
          <div className="v5-hero-kicker">
            <span className="v5-dot" /> 20 de novembro{" "}
            <span className="v5-sep">/</span> Consciência Negra
          </div>

          <h1 id="hero-title">
            Políticas que transformam 
            <br />
            <em>criam um futuro ancestral.</em>
          </h1>

          <p className="hero-desc">
            Conheça iniciativas da Prefeitura do Rio que valorizam a história e
            a cultura negra, promovem a igualdade racial e ampliam direitos e
            oportunidades na cidade.
          </p>

          <div className="hero-actions">
            <a className="btn gold" href="#linha-do-tempo">
              Explorar a trajetória
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="v5-signature">
            <span>RIO DE JANEIRO</span>
            <span className="v5-signature-rule" />
            <span>MEMÓRIA, TERRITÓRIO E DIREITOS</span>
          </div>
        </div>

        <div className="v5-hero-visual">
          <div className="v5-photo-frame">
            <div className="v5-photo-placeholder" aria-hidden="true">
              MEMÓRIA
              <br />
              VIVA
            </div>

            {!failed && (
              <img
                className="v5-hero-photo"
                src="/images/pedra-do-sal-hero.jpg"
                alt="Pedra do Sal, espaço histórico de memória e cultura afro-brasileira na região da Pequena África, Rio de Janeiro"
                onError={() => setFailed(true)}
              />
            )}

            <div className="v5-photo-shade" aria-hidden="true" />

            <span className="v5-hero-20" aria-hidden="true">
              20
            </span>

            <span className="v5-hero-nov" aria-hidden="true">
              NOVEMBRO
            </span>

            <div className="v5-photo-caption">
              CULTURA QUE RESISTE
              <span>·</span>
              RIO QUE SE TRANSFORMA
            </div>
          </div>

          <div className="v5-corner-mark" aria-hidden="true">
            <span>RJ</span>
            <span>·</span>
            <span>20.11</span>
          </div>

          <p className="v5-hero-credit">
            Imagem documental:{" "}
            <a
              href="https://www.flickr.com/photos/leonardomartins/7571541304/in/photolist-JskcX8-2oRNdrM-cyExVm-cx58rA-cyEvb3-2gCTU4V-2gCTNWR-2gCTcNy-2pu7p15-2gCTUyT-2gCTSXM-2gCT7Ht-2gCTPi2-dgEU4u-ikJqia-vBRj5v-cquyMf-ikJr3Y-cquy45-cquym5-2pxuz4E-nbSKes-qv1PFz-2oLSUHU-cquyA7"
              target="_blank"
              rel="noopener noreferrer"
            >
              Flicky
            </a>{" "}
            · Cais do Valongo
          </p>
        </div>
      </div>

      <div className="container v5-hero-foot">
        <span>INSTITUTO FUNDAÇÃO JOÃO GOULART · PREFEITURA DO RIO</span>

        <a href="#sobre">
          Descubra a história
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
