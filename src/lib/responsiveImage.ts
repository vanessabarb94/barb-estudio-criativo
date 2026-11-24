/**
 * Revision 17 (desempenho): toda imagem .webp em `public/projects/` tem
 * duas versões menores geradas ao lado — `nome.480w.webp` e
 * `nome.800w.webp` (nunca ampliadas além do original). Cards, faixa e
 * grades usam `srcSet` + `sizes` para o navegador baixar só o tamanho
 * que vai realmente aparecer; a visão ampliada (lightbox) continua
 * usando o arquivo original em tamanho cheio.
 *
 * Ao adicionar imagens novas em `public/projects/`, gere as variantes
 * (ver README, seção "Conteúdo e imagens").
 */
export function srcSetFor(src: string | undefined, width?: number): string | undefined {
  if (!src || !src.startsWith("/projects/") || !src.endsWith(".webp")) return undefined;
  const base = src.slice(0, -".webp".length);
  const entries = [`${base}.480w.webp 480w`];
  if (!width || width > 480) entries.push(`${base}.800w.webp 800w`);
  if (width && width > 800) entries.push(`${src} ${width}w`);
  return entries.join(", ");
}

/** Atributos comuns de imagem fora da primeira dobra. */
export const LAZY_IMG = { loading: "lazy", decoding: "async" } as const;
