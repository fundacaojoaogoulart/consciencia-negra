
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
                src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Pedra%20do%20Sal%20-%20Rio%20de%20Janeiro%20-%2020240914095516.jpg"
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
              href="https://commons.wikimedia.org/wiki/File:Pedra_do_Sal_-_Rio_de_Janeiro_-_20240914095516.jpg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gabibzz
            </a>{" "}
            ·{" "}
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CC BY-SA 4.0
            </a>{" "}
            · foto adaptada
          </div>
        </div>

        <div className="story-copy reveal">
          <span className="eyebrow">
            01 / Memória e pertencimento
          </span>

          <h2>
            O futuro também se constrói com memória.
          </h2>

          <div className="smallrule" />

          <p>
            A população negra tem papel fundamental na construção
            da história, da cultura e da identidade do Rio de Janeiro.
            Reconhecer essa trajetória é também compreender sua
            presença na sociedade atual e a importância de garantir
            representatividade e igualdade de oportunidades.
          </p>

          <p>
            No Brasil, pessoas pretas e pardas representam 55,5%
            da população, segundo o Censo 2022. Essa maioria também
            evidencia a importância de políticas públicas que
            reconheçam desigualdades históricas e promovam
            a equidade racial.
          </p>

          <p>
            No Rio de Janeiro, 48 iniciativas da Prefeitura contribuem
            para o fortalecimento da equidade racial. Este levantamento
            reúne ações, dados e histórias que ajudam a compreender
            como a memória, o reconhecimento e as políticas públicas
            podem transformar a cidade.
          </p>

          <p className="story-note">
            A presença de uma ação neste catálogo não significa,
            por si só, que sua implementação ou impacto tenham
            sido comprovados.
          </p>

          <a
            className="story-inline-link"
            href="#linha-do-tempo"
          >
            Percorrer essa história{" "}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
