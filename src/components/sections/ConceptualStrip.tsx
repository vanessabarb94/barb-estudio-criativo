import { CONCEPTUAL_STRIP_TEXT } from "@/content/site";
import Reveal from "@/components/ui/Reveal";
import styles from "./ConceptualStrip.module.css";

/**
 * Revision 2: cores invertidas (off-white/texto preto, era
 * escuro/claro), sem loop horizontal nem parallax — texto estático.
 * Faixa mais estreita, fonte menor, bordas finas pretas no topo/base.
 *
 * Revision 3: a faixa continua estática (sem animação), mas a frase
 * é repetida o suficiente para preencher a largura toda de ponta a
 * ponta, sem vão vazio nas laterais em nenhuma largura de viewport.
 * Repetições extras são decorativas (aria-hidden); o texto real e
 * único fica acessível via .visually-hidden para leitores de tela.
 *
 * Revision 8: entrada com fade up (Reveal) — a faixa não tinha nenhum
 * efeito de entrada ainda.
 *
 * Revision 15: no mobile a frase repetida aparecia cortada nas duas
 * pontas (só pedaços legíveis). Abaixo de 768px a faixa mostra a frase
 * UMA vez, inteira, com a fonte reduzida até caber na largura da tela
 * (ver .single em ConceptualStrip.module.css). Desktop inalterado.
 */
const SINGLE_TEXT = CONCEPTUAL_STRIP_TEXT.replace(/s*●s*$/, "");
const REPEAT_COUNT = 16;

export default function ConceptualStrip() {
  return (
    <Reveal as="div" className={styles.section}>
      <span className="visually-hidden">{CONCEPTUAL_STRIP_TEXT}</span>
      <span className={styles.single} aria-hidden="true">
        {SINGLE_TEXT}
      </span>
      <div className={styles.track} aria-hidden="true">
        {Array.from({ length: REPEAT_COUNT }).map((_, index) => (
          <span key={index} className={styles.text}>
            {CONCEPTUAL_STRIP_TEXT}
          </span>
        ))}
      </div>
    </Reveal>
  );
}
