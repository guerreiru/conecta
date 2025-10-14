import { Category } from "@/types/Category";
import { createContext } from "react";

type CategoriesContextData = {
  categories: Category[];
  loading: boolean;
  reloadCategories: () => Promise<void>;
};

export const CategoriesContext = createContext<CategoriesContextData>(
  {} as CategoriesContextData
);
