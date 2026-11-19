/** GA4 básico: não carrega scripts nem envia eventos antes do aceite. */
const CONSENT_KEY = "fjg_consciencia_negra_analytics_consent_v1";
export type AnalyticsConsent = "accepted" | "rejected";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: unknown;
  }
}

export function readConsent(): AnalyticsConsent | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: AnalyticsConsent): void {
  try { window.localStorage.setItem(CONSENT_KEY, value); } catch { /* bloqueado pelo navegador */ }
}

export function getMeasurementId(): string {
  const id = (import.meta.env.VITE_GA_MEASUREMENT_ID || "").trim();
  return /^G-[A-Z0-9]+$/i.test(id) ? id : "";
}

let initialized = false;
export function startAnalytics(): void {
  const id = getMeasurementId();
  if (!id || initialized || readConsent() !== "accepted") return;
  initialized = true;
  window[`ga-disable-${id}`] = false;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function (..._args: unknown[]) {
    window.dataLayer?.push(arguments);
  };
  // Definições antes do carregamento do script.
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", id, {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
  });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  script.id = "fjg-google-analytics";
  script.onerror = () => { initialized = false; };
  document.head.appendChild(script);
}

export function revokeAnalytics(): void {
  const id = getMeasurementId();
  if (id) window[`ga-disable-${id}`] = true;
  window.gtag?.("consent", "update", {
    analytics_storage: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  // Remove apenas cookies GA de primeira parte sob domínio e caminho atuais.
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, ...(host.split(".").length > 2 ? [`.${host.split(".").slice(-2).join(".")}`] : [])];
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0]?.trim();
    if (!name || (name !== "_ga" && !name.startsWith("_ga_"))) continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${domain ? `; domain=${domain}` : ""}`;
    }
  }
  // Recarrega para descarregar também a biblioteca previamente carregada.
  if (initialized || document.getElementById("fjg-google-analytics")) window.location.reload();
}
