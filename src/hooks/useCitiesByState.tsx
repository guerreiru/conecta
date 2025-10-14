import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { City } from "@/types/City";

export function useCitiesByState(stateId: string) {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      if (!stateId) return;
      setLoading(true);
      const res = await api(`/cities/state/${stateId}`);
      setCities(res.data);
      setLoading(false);
    }

    fetchCities();
  }, [stateId]);

  return { cities, loading };
}