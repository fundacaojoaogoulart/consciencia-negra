import { useEffect, useRef } from "react";
import type { Policy } from "../types";
export function PolicyModal({
  policy,
  onClose,
}: {
  policy: Policy | null;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!policy) return;
    const previous = document.activeElement as HTMLElement | null;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("keydown", key);
      document.body.style.overflow = oldOverflow;
      previous?.focus();
    };
  }, [policy, onClose]);
  if (!policy) return null;
  const meta = [
    ["Público atendido", policy.audience],
    ["Órgão responsável", policy.owner],
    ["Situação identificada", policy.status],
    ["Ano de início", policy.year],
    ["Fonte indicada no levantamento", policy.source],
  ];
  return (
    <div
      className="modal open"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        <div className="dialog-head">
          <div>
            <div className="eyebrow">
              {policy.theme} · Início: {policy.year}
            </div>
            <h2 id="modalTitle">{policy.name}</h2>
          </div>
          <button
            ref={closeRef}
            className="close"
            aria-label="Fechar detalhes"
            type="button"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <p>{policy.what}</p>
        <dl className="meta">
          {meta.map(([k, v]) => (
            <div key={k}>
              <dt>{k}</dt>
              <dd>{v || "Não informado"}</dd>
            </div>
          ))}
        </dl>
        <div className="notice">
          Descrição e situação reproduzidas do levantamento-base. Recomenda-se
          conferir as fontes oficiais antes da publicação.
        </div>
      </div>
    </div>
  );
}
