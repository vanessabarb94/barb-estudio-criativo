"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Revision 14: a cliente reportou que, ao entrar numa página de projeto
 * pela primeira vez (relatado em "todas as apresentações", mas a causa
 * é da rota em geral, não específica de Apresentações), a página
 * abria rolada perto do FINAL em vez do topo.
 *
 * Causa raiz: `html { scroll-behavior: smooth }` (globals.css, usado
 * para os links de âncora do menu — #home, #sobre etc.) também afeta
 * qualquer `scrollTo` disparado durante a troca de rota do Next.js. Se
 * a pessoa estava rolada pro fim de uma página longa (ex. a galeria de
 * 24 slides da Amanda Ferraz) e navega pra outra rota, o reset de
 * scroll do Next tenta rolar suavemente a partir dessa posição — e
 * essa animação pode não terminar a tempo do novo conteúdo assentar,
 * ou ser interrompida pela troca de DOM, deixando a página "presa" no
 * meio/fim em vez do topo.
 *
 * Fix: a cada troca de pathname (ou seja, toda navegação entre rotas —
 * nunca dispara em navegação de âncora dentro da mesma página, que
 * continua suave), força um scroll pro topo INSTANTÂNEO, desligando
 * temporariamente o `scroll-behavior: smooth` via style inline (maior
 * especificidade que a regra do CSS) só durante esse reset.
 */
export default function RouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    root.style.scrollBehavior = previous;
  }, [pathname]);

  return null;
}
