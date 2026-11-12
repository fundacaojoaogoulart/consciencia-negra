
import { useState } from "react";

type Story = {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  location: string;
  photo: string;
  alt: string;
};

const stories: Story[] = [
  {
    id: "memory",
    number: "01",
    label: "Memória, Cultura e Identidade",
    title: "Valorizar histórias, preservar identidades",
    description:
      "Iniciativas que reconhecem a herança africana, preservam o patrimônio afro-brasileiro e valorizam as manifestações culturais e os territórios negros da cidade.",
    location: "CULTURA · MEMÓRIA · IDENTIDADE",
    photo: "/images/historias.png",
    alt: "Mural de arte urbana com representações de mulheres negras",
  },
  {
    id: "rights",
    number: "02",
    label: "Direitos, Proteção e Oportunidades",
    title: "Ampliar direitos, combater desigualdades",
    description:
      "Políticas e ações que promovem a equidade racial no acesso à saúde, à educação, ao trabalho, à proteção e às oportunidades.",
    location: "DIREITOS · PROTEÇÃO · EQUIDADE",
    photo: "/images/maos.png",
    alt: "Mãos cruzadas em um gesto simbólico de união e proteção",
  },
  {
    id: "participation",
    number: "03",
    label: "Representatividade e Participação",
    title: "Fortalecer vozes, ampliar representatividade",
    description:
      "Iniciativas que estimulam a participação social, valorizam lideranças negras e promovem práticas antirracistas nas instituições públicas.",
    location: "REPRESENTATIVIDADE · RESISTÊNCIA",
    photo: "/images/resistencia.png",
    alt: "Retrato em preto e branco de uma mulher negra com tranças",
  },
];

function EditorialPhoto({ item }: { item: Story }) {
  const [error, setError] = useState(false);

  return (
    <div
      className={`editorial-photo photo-${item.id} ${
        error ? "photo-missing" : ""
      }`}
    >
      <div className="photo-fallback" aria-hidden="true">
        <span>RIO</span>
        <b>Memória viva</b>
      </div>

      {!error && (
        <img
          src={item.photo}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          onError={() => setError(true)}
        />
      )}

      <span className="image-shade" aria-hidden="true" />

      <span className="photo-location">
        {item.location}
      </span>
    </div>
  );
}

export function HeritageSection() {
  return (
    <section
      className="heritage section v4-heritage"
      id="territorios"
      aria-labelledby="heritageTitle"
    >
      <div className="container">
        <div className="heritage-intro reveal">
          <div>
            <span className="eyebrow">
              02 / Território, cultura e ancestralidade
            </span>

            <h2 id="heritageTitle">
              O Rio é feito de <em>muitas Áfricas.</em>
            </h2>
          </div>

          <p>
            A presença negra está na história, na cultura e na
            construção do Rio de Janeiro. Reconhecer essa
            contribuição também significa promover políticas
            públicas que enfrentem desigualdades, ampliem
            direitos e fortaleçam a equidade racial. Conheça
            iniciativas da Prefeitura que contribuem para
            essa transformação.
          </p>
        </div>

        <div className="heritage-mosaic v4-mosaic">
          {stories.map((item, index) => (
            <article
              key={item.id}
              className={`heritage-tile v4-tile reveal tile-${item.id}`}
              style={{
                transitionDelay: `${index * 90}ms`,
              }}
            >
              <EditorialPhoto item={item} />

              <div className="tile-content">
                <span className="tile-index">
                  {item.number} / {item.label}
                </span>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <a
                  className="tile-link"
                  href="#iniciativas"
                >
                  Explorar iniciativas
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
