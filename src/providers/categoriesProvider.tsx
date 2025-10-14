"use client";

import { CategoriesContext } from "@/contexts/CategoriesContext";
import { api } from "@/services/api";
import { Category } from "@/types/Category";
import { useEffect, useState } from "react";

export function CategoriesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
    } catch (error) {
      console.error("Erro ao carregar categorias", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <CategoriesContext.Provider
      value={{ categories, loading, reloadCategories: loadCategories }}
    >
      {children}
    </CategoriesContext.Provider>
  );
}
