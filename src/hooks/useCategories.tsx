import { CategoriesContext } from "@/contexts/CategoriesContext";
import { useContext } from "react";

export const useCategories = () => useContext(CategoriesContext);
