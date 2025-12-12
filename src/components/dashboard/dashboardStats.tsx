import { DashboardCard } from "@/components/dashboardCard";
import { LightningIcon } from "@phosphor-icons/react";

type DashboardStatsProps = {
  servicesCount: number;
  averageRating: number;
  totalReviews: number;
};

export function DashboardStats({
  servicesCount,
  averageRating,
  totalReviews,
}: DashboardStatsProps) {
  return (
    <section
      className="grid grid-cols-3 gap-2 flex-wrap"
      aria-label="Estatísticas do dashboard"
    >
      <DashboardCard
        title="Serviços"
        value={String(servicesCount)}
        icon={<LightningIcon size={16} aria-hidden="true" />}
      />
      <DashboardCard
        title="Nota média"
        value={averageRating > 0 ? averageRating.toFixed(1) : "N/A"}
        icon={<LightningIcon size={16} aria-hidden="true" />}
      />
      <DashboardCard
        title="Avaliações"
        value={totalReviews > 0 ? totalReviews.toString() : "N/A"}
        icon={<LightningIcon size={16} aria-hidden="true" />}
      />
    </section>
  );
}
