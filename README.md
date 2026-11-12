# Rio de Memórias, Direitos e Futuro — V5 para apresentação

Hotsite em **React 19 + TypeScript + Vite + Tailwind CSS 4**, com animações CSS, navegação por seções, filtros e linha do tempo.

## Como abrir na máquina da supervisora

Requer Node.js 20+.

```bash
npm install
npm run dev
```

Abra a URL mostrada no terminal (geralmente `http://localhost:5173/`).

### Para testar a versão de produção

```bash
npm run typecheck
npm run build
npm run preview
```

Não há necessidade de configurar Firebase, Git ou banco de dados nesta etapa.

## Pontos para avaliação

- A marca original Prefeitura do Rio + Fundação João Goulart está preservada no cabeçalho e no rodapé.
- O banner V5 utiliza fotografia documental, menos formas geométricas e a fonte serifada aprovada.
- Navegação secundária em Manrope com melhor legibilidade.
- O bloco **Histórias que nos constituem** apresenta fotografia da Pedra do Sal.
- A seção **O Rio é feito de muitas Áfricas** apresenta memória, liberdade religiosa e samba.
- Confira efeitos ao rolar, clicar nos anos, filtrar as iniciativas e abrir detalhes.
- Utilize o controle **Reduzir movimento** no canto da página para avaliar acessibilidade.
- Confira a experiência no celular e no desktop.

## Atenções antes de publicação oficial

**Este pacote é um protótipo de apresentação, não uma publicação institucional aprovada.** Os 48 registros foram extraídos do modelo e levantamento fornecidos; títulos, status e dados precisam de aprovação dos responsáveis. O conteúdo editorial será substituído quando a supervisora enviar a versão final.

**Fotografias:** as imagens documentais são atualmente carregadas por URLs externas do Wikimedia Commons e dependem de internet. Os créditos e licenças estão indicados na interface, mas a equipe deve revisar direitos de uso, atribuição e adequação editorial antes de publicar. As imagens não foram incorporadas ao pacote porque seus arquivos de origem não estavam disponíveis localmente. A equipe pode substituir os URLs por arquivos aprovados em `public/images/`.

**Dados:** `src/data/policies.json` contém os registros do catálogo. `src/content/staticSections.json` mantém os trechos editoriais provisórios (estatísticas, manifesto, encerramento, fontes).

## Arquivos principais

- `src/components/HeroSection.tsx`: banner editorial.
- `src/components/Header.tsx`: marca e navegação.
- `src/components/StorySection.tsx`: fotografia e mensagem da memória.
- `src/components/HeritageSection.tsx`: 3 fotografias culturais, fontes e vínculos com catálogo.
- `src/components/Timeline.tsx`: seleção dos marcos temporais.
- `src/components/Catalog.tsx` e `PolicyModal.tsx`: filtros e detalhes.
- `src/styles.css`: identidade visual, animações e responsividade; estilização herdada da V2–V4 com refinamentos V5 ao final.

## Revisões sugeridas com a supervisora

Anote o nome da seção, a alteração solicitada, o texto aprovado e a prioridade. Registre especialmente comentários sobre: identidade institucional, fotografias, liberdade religiosa, títulos, estatísticas, navegabilidade, fontes e dados.
