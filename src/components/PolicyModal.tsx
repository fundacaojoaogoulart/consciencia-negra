
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
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!policy) return;

    const previous = document.activeElement as HTMLElement | null;
    const oldOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }

      if (e.key === "Tab") {
        const elements = [
          closeRef.current,
          linkRef.current,
        ].filter(
          (el): el is HTMLButtonElement | HTMLAnchorElement =>
            el !== null
        );

        const first = elements[0];
        const last = elements[elements.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
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
    ["Ano de início", policy.year],
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

        {policy.repertorioUrl && (
          <a
            ref={linkRef}
            className="repertorio-link"
            href={policy.repertorioUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Conheça o projeto no RepertóRIO ↗
          </a>
        )}
      </div>
    </div>
  );
}
