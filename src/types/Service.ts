import { Category } from "./Category";
import { User } from "./User";

export type Service = {
  id: string;
  title: string;
  description: string | null;
  price: string;
  typeOfChange: string;
  category: Category;
  isActive?: boolean;
  user: User;
  isHighlighted?: boolean;
  highlightLevel?: "plus" | "premium" | "enterprise";
  serviceType: "all" | "in_person" | "online";
};
