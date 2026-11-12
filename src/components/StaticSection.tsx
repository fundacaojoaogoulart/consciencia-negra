import type { HTMLAttributes } from "react";
import sections from "../content/staticSections.json";
type SectionKey = keyof typeof sections;
type Props = { section: SectionKey } & HTMLAttributes<HTMLDivElement>;
// Conteúdo editorial local revisado: não receber HTML de usuários, CMS ou consultas externas.
export function StaticSection({ section, ...props }: Props) {
  return (
    <div
      {...props}
      className={["static-section", props.className].filter(Boolean).join(" ")}
      dangerouslySetInnerHTML={{ __html: sections[section] }}
    />
  );
}
