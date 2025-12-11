import { Service } from "@/types/Service";

/**
 * Ordenar serviços: destacados primeiro, depois por nível
 *
 * Prioridade:
 * 1. Serviços com isHighlighted = true (aparecem primeiro)
 * 2. Ordenados por nível: enterprise > premium > plus
 * 3. Serviços normais mantêm ordem original
 */
export function sortByHighlight(services: Service[]): Service[] {
  const highlightLevelOrder: Record<string, number> = {
    enterprise: 0,
    premium: 1,
    plus: 2,
  };

  return [...services].sort((a, b) => {
    if (a.isHighlighted && !b.isHighlighted) return -1;
    if (!a.isHighlighted && b.isHighlighted) return 1;

    if (a.isHighlighted && b.isHighlighted) {
      const levelA = highlightLevelOrder[a.highlightLevel || "plus"] ?? 999;
      const levelB = highlightLevelOrder[b.highlightLevel || "plus"] ?? 999;
      return levelA - levelB;
    }

    return 0;
  });
}
