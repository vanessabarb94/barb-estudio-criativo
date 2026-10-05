/**
 * Canal de contato único do site: WhatsApp da Vanessa.
 *
 * Revision 2 (feedback direto da cliente): o formulário de contato e o
 * endpoint /api/contact foram removidos — todo CTA do site (header,
 * footer, "O que faço", cada serviço, "Sobre mim", CTA final do
 * portfólio, seção de Contato) usa este helper central em vez de
 * hardcodar a URL em cada componente.
 *
 * Número: +55 (42) 99930-9658 -> DDI 55 + DDD 42 + número, só dígitos.
 */
export const WHATSAPP_NUMBER = "5542999309658";

export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const WHATSAPP_DEFAULT_MESSAGE =
  "Olá! Vim pelo site da BARB e quero conversar sobre um projeto.";

/**
 * Monta o link do WhatsApp. `message` é opcional — quando informado, vai
 * como `?text=` (URL-encoded) para pré-preencher a conversa.
 */
export function getWhatsAppLink(message?: string): string {
  if (!message) return WHATSAPP_BASE_URL;
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}
