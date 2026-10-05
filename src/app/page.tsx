import Hero from "@/components/sections/Hero";
import WhatIDo from "@/components/sections/WhatIDo";
import MovingWorkStrip from "@/components/sections/MovingWorkStrip";
import ConceptualStrip from "@/components/sections/ConceptualStrip";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import RecentWork from "@/components/sections/RecentWork";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

/**
 * Home: rolagem contínua, ordem fixa (Header/Footer vêm do RootLayout):
 * Hero -> O que faço -> Faixa de trabalhos -> Faixa conceitual ->
 * Serviços -> Portfólio (revision 4) -> Conheça mais de mim -> Sobre
 * mim -> Contato.
 *
 * Revision 2: a seção de Depoimentos (Testimonials) foi retirada do
 * fluxo renderizado por pedido explícito da cliente — não há
 * depoimentos reais ainda e ela não quer nem o estado de preview
 * visível agora. O componente e os dados (`src/components/sections/
 * Testimonials.tsx`, `TESTIMONIALS`/`TESTIMONIALS_SECTION` em
 * content/site.ts) continuam no código, só não são importados/
 * renderizados aqui — basta reimportar e adicionar `<Testimonials />`
 * de volta (entre Services e RecentWork, posição original) quando
 * houver depoimentos reais e publicáveis.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <WhatIDo />
      <MovingWorkStrip />
      <ConceptualStrip />
      <Services />
      <Portfolio />
      <RecentWork />
      <About />
      <Contact />
    </>
  );
}
