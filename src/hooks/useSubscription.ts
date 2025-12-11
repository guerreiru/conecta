import { api } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

type Subscription = {
  id: string;
  plan: "free" | "plus" | "premium" | "enterprise";
  status: "active" | "canceled" | "past_due" | "unpaid" | "trialing";
  currentPeriodEnd?: string;
  stripeCustomerId?: string;
};

export function useSubscription() {
  return useQuery<Subscription>({
    queryKey: ["subscription"],
    queryFn: async () => {
      const response = await api.get("/subscriptions/me");
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // Cache por 5 minutos
  });
}
