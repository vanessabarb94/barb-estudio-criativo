/**
 * Modo preview vs público.
 *
 * NEXT_PUBLIC_PREVIEW_MODE=true habilita a exibição de depoimentos
 * fictícios (com aviso) e badges de "conteúdo provisório". Em produção,
 * a env var deve ficar ausente ou "false" — esses elementos somem.
 *
 * É NEXT_PUBLIC_ porque a decisão de exibição acontece em componentes de
 * cliente (badges, avisos) e de servidor igualmente; o valor é inlinado
 * no build pelo Next.js.
 */
export function isPreviewMode(): boolean {
  return process.env.NEXT_PUBLIC_PREVIEW_MODE === "true";
}
