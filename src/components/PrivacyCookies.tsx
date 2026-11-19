import { useEffect, useState } from "react";
import {
  readConsent,
  revokeAnalytics,
  saveConsent,
  startAnalytics,
  type AnalyticsConsent,
} from "../lib/analytics";
import "./privacy-cookies.css";

export function PrivacyCookies() {
  const [consent, setConsent] = useState<AnalyticsConsent | null>(() =>
    readConsent()
  );
  const [showPreferences, setShowPreferences] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);

  useEffect(() => {
    if (consent === "accepted") startAnalytics();
  }, [consent]);

  useEffect(() => {
    if (!showPreferences && !showPolicy) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowPolicy(false);
        setShowPreferences(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [showPreferences, showPolicy]);

  const choose = (value: AnalyticsConsent) => {
    const hadAccepted = consent === "accepted";
    saveConsent(value);
    setConsent(value);
    setShowPreferences(false);
    if (value === "rejected" && hadAccepted) revokeAnalytics();
  };

  return (
    <>
      {consent === null && (
        <aside
          className="fjg-cookie-banner"
          aria-label="Preferências de cookies"
          role="region"
        >
          <div className="fjg-cookie-copy">
            <strong>Privacidade e cookies</strong>
            <p>
              Usamos cookies analíticos opcionais do Google Analytics para
              entender os acessos ao hotsite. Você pode aceitar, recusar ou
              alterar sua escolha depois. O conteúdo continuará disponível
              normalmente.
            </p>
            <button
              className="fjg-text-button"
              type="button"
              onClick={() => setShowPolicy(true)}
            >
              Ler a Política de Privacidade e Cookies
            </button>
          </div>
          <div className="fjg-cookie-actions">
            <button
              className="fjg-cookie-secondary"
              type="button"
              onClick={() => choose("rejected")}
            >
              Recusar opcionais
            </button>
            <button
              className="fjg-cookie-primary"
              type="button"
              onClick={() => choose("accepted")}
            >
              Aceitar analíticos
            </button>
          </div>
        </aside>
      )}

      {consent !== null && (
        <button
          className="fjg-cookie-settings"
          type="button"
          onClick={() => setShowPreferences(true)}
          aria-label="Alterar preferências de cookies"
        >
          Cookies
        </button>
      )}

      {showPreferences && (
        <div
          className="fjg-privacy-backdrop"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setShowPreferences(false);
          }}
        >
          <section
            className="fjg-privacy-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="fjgCookieTitle"
          >
            <div className="fjg-privacy-heading">
              <h2 id="fjgCookieTitle">Preferências de cookies</h2>
              <button
                type="button"
                onClick={() => setShowPreferences(false)}
                aria-label="Fechar preferências"
              >
                ×
              </button>
            </div>
            <p>
              <strong>Cookies necessários:</strong> relacionados ao
              funcionamento e à segurança da plataforma. Não dependem do
              consentimento para cookies analíticos.
            </p>
            <p>
              <strong>Cookies analíticos (opcionais):</strong> utilizados pelo
              Google Analytics 4 para estatísticas de navegação. Sua escolha
              atual:{" "}
              <strong>
                {consent === "accepted" ? "aceitos" : "recusados"}
              </strong>
              .
            </p>
            <button
              className="fjg-text-button"
              type="button"
              onClick={() => {
                setShowPreferences(false);
                setShowPolicy(true);
              }}
            >
              Ler a Política de Privacidade e Cookies
            </button>
            <div className="fjg-privacy-actions">
              <button
                className="fjg-cookie-secondary"
                type="button"
                onClick={() => choose("rejected")}
              >
                Recusar analíticos
              </button>
              <button
                className="fjg-cookie-primary"
                type="button"
                onClick={() => choose("accepted")}
              >
                Aceitar analíticos
              </button>
            </div>
          </section>
        </div>
      )}

      {showPolicy && (
        <div
          className="fjg-privacy-backdrop"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setShowPolicy(false);
          }}
        >
          <section
            className="fjg-privacy-dialog fjg-privacy-policy"
            role="dialog"
            aria-modal="true"
            aria-labelledby="fjgPrivacyTitle"
          >
            <div className="fjg-privacy-heading">
              <h2 id="fjgPrivacyTitle">Política de Privacidade e Cookies</h2>
              <button
                type="button"
                onClick={() => setShowPolicy(false)}
                aria-label="Fechar política"
              >
                ×
              </button>
            </div>
            <p>
              <strong>
                Hotsite Consciência Negra — Instituto Fundação João Goulart.
              </strong>{" "}
              Este hotsite da Prefeitura do Rio divulga iniciativas voltadas à
              igualdade racial. Esta política explica o tratamento de dados de
              navegação e o uso de cookies.
            </p>
            <h3>1. Quais dados podem ser tratados</h3>
            <p>
              Registros técnicos de funcionamento e segurança podem incluir
              endereço IP, data e horário do acesso, páginas visitadas e
              informações sobre navegador e dispositivo. Com autorização, o
              Google Analytics poderá registrar visitas, sessões, localização
              geográfica aproximada, origem dos acessos e interações. Não há
              cadastro de usuários ou submissão de trabalhos.
            </p>
            <h3>2. Finalidades</h3>
            <p>
              Monitorar visitantes e visualizações; identificar origens e
              conteúdos mais visitados; produzir relatórios estatísticos;
              avaliar o alcance das iniciativas; melhorar a experiência e a
              acessibilidade; garantir funcionamento e segurança. O tratamento
              deve observar a LGPD e as hipóteses legais aplicáveis.
            </p>
            <h3>3. Informações públicas</h3>
            <p>
              Os conteúdos institucionais, históricos e estatísticos estão
              disponíveis para consulta pública. Relatórios de acessos
              utilizarão informações agregadas, sem identificação individual dos
              visitantes.
            </p>
            <h3>4. Serviços externos</h3>
            <p>
              O site é hospedado na Vercel e utiliza o Google Analytics quando
              autorizado. O uso desses serviços pode envolver transferência
              internacional de dados, conforme as condições e salvaguardas
              aplicáveis. Links externos seguem suas próprias políticas de
              privacidade.
            </p>
            <h3>5. Cookies e registros de navegação</h3>
            <p>
              Cookies necessários dão suporte ao funcionamento e à segurança.
              Cookies analíticos do GA4 são opcionais: você pode aceitar ou
              recusar sem perder acesso ao conteúdo e alterar a preferência pelo
              botão “Cookies”. Também pode gerenciá-los no navegador.
            </p>
            <h3>6. Retenção dos dados</h3>
            <p>
              Os dados são mantidos pelo período necessário às finalidades
              indicadas e às obrigações legais. Dados do GA4 seguem as
              configurações de retenção da propriedade. A preferência de cookies
              pode ser guardada no navegador.
            </p>
            <h3>7. Direitos e contato</h3>
            <p>
              Você pode exercer os direitos previstos na LGPD, quando
              aplicáveis, pelo e-mail{" "}
              <a href="mailto:contato@fundacaojoaogoulart.com">
                contato@fundacaojoaogoulart.com
              </a>
              . Consulte também{" "}
              <a
                href="https://lgpd.prefeitura.rio/encarregados-de-dados/"
                target="_blank"
                rel="noopener noreferrer"
              >
                o portal LGPD da Prefeitura do Rio
              </a>
              .
            </p>
            <h3>8. Atualizações</h3>
            <p>
              Esta política poderá ser atualizada em decorrência de mudanças no
              site, nas ferramentas ou nas normas aplicáveis. Última
              atualização: 19/11/2026.
            </p>
            <p className="fjg-policy-footnote">
              O texto acima é um resumo para consulta. A versão integral aprovada
              está disponível em{" "}
              <a
                href="/politica-privacidade-cookies.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de Privacidade e Cookies (PDF)
              </a>
              .
            </p>
          </section>
        </div>
      )}
    </>
  );
}
