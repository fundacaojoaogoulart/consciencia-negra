import { useState } from "react";

export function StorySection() {
  const [failed, setFailed] = useState(false);

  return (
    <section className="story section v4-story" id="sobre">
      <div className="container story-grid">
        <div className="story-visual reveal">
          <div className="story-photo">
            {!failed && (
              <img
                src="/images/pedra-do-sal-historia.jpg"
                alt="Pedra do Sal, território histórico de memória afro-carioca no Rio de Janeiro"
                loading="lazy"
                onError={() => setFailed(true)}
              />
            )}
            <div className="story-gradient" />
            <span className="story-image-caption">
              A cidade guarda histórias
              <br />
              <em>que nos constituem.</em>
            </span>
          </div>
          <div className="story-photo-credit">
            Pedra do Sal ·{" "}
            <a
              href="https://www.flickr.com/photos/riotur/8700896189/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Alexandre Macieira / Riotur
            </a>
          </div>
        </div>

        <div className="story-copy reveal">
          <span className="eyebrow">01 / História e pertencimento</span>
          <h2 id="heritageTitle">
            Do pionerismo ao futuro: <em>uma reparação histórica.</em>
          </h2>
          <div className="smallrule" />

          <p>
            A população negra tem papel fundamental na construção da história,
            da cultura e da identidade do Rio de Janeiro. Reconhecer essa
            trajetória é também compreender sua presença na sociedade atual e a
            importância de garantir representatividade e igualdade de
            oportunidades.
          </p>
          <p>
            Na cidade do Rio de Janeiro,{" "}
            <strong>54,3% da população é negra</strong>, segundo o Censo
            Demográfico de 2022. São aproximadamente{" "}
            <strong>3,37 milhões de moradores negros</strong>, reforçando a
            importância de políticas públicas que reconheçam desigualdades
            históricas e promovam a equidade racial.
          </p>
          <p>
            O levantamento municipal reúne{" "}
            <strong>50 iniciativas da Prefeitura</strong> voltadas ao
            fortalecimento da equidade racial. Este espaço apresenta ações,
            dados e histórias que ajudam a compreender como memória,
            reconhecimento e políticas públicas podem transformar a cidade.
          </p>

          <blockquote className="story-editorial-quote">
            <p>
              “Ser negro não pode impedir o desejo de existir na cidade de
              nenhum de nós.”
            </p>
            <footer>
              Rafaela Bastos · Aula magna “Por um Rio Antirracista”
            </footer>
          </blockquote>

          <a className="story-inline-link" href="#linha-do-tempo">
            Percorrer essa história <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
