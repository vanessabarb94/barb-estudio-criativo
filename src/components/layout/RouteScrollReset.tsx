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
 *
 * Revision 15: "← Voltar ao portfólio" (link para /#portfolio) caía
 * na Hero — este reset rodava DEPOIS do Next rolar até a âncora e
 * jogava a página de volta pro topo. Quando a URL tem hash, o reset
 * rola até a seção da âncora (instantâneo, respeitando o
 * scroll-padding-top do header) em vez do topo.
 */
export default function RouteScrollReset() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    const hash = window.location.hash.slice(1);
    const target = hash ? document.getElementById(decodeURIComponent(hash)) : null;
    if (target) target.scrollIntoView({ block: "start" });
    else window.scrollTo(0, 0);
    root.style.scrollBehavior = previous;
  }, [pathname]);

  return null;
}
