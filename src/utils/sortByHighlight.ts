import { Service } from "@/types/Service";

/**
 * Ordenar serviços: destacados primeiro, depois por nível
 *
 * Prioridade:
 * 1. Serviços com isHighlighted = true (aparecem primeiro)
 * 2. Ordenados por nível: enterprise > premium > pro
 * 3. Serviços normais mantêm ordem original
 */
export function sortByHighlight(services: Service[]): Service[] {
  const highlightLevelOrder: Record<string, number> = {
    enterprise: 0,
    premium: 1,
    pro: 2,
  };

  return [...services].sort((a, b) => {
    // Destacados aparecem primeiro
    if (a.isHighlighted && !b.isHighlighted) return -1;
    if (!a.isHighlighted && b.isHighlighted) return 1;

    // Se ambos destacados, ordenar por nível
    if (a.isHighlighted && b.isHighlighted) {
      const levelA = highlightLevelOrder[a.highlightLevel || "pro"] ?? 999;
      const levelB = highlightLevelOrder[b.highlightLevel || "pro"] ?? 999;
      return levelA - levelB;
    }

    // Se nenhum destacado, manter ordem original
    return 0;
  });
}
