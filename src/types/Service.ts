import { Category } from "./Category";
import { Company } from "./Company";
import { Provider } from "./Provider";
import { User } from "./User";

export type Service = {
  id: string;
  title: string;
  description: string | null;
  price: string;
  typeOfChange: string;
  category: Category;
  user: User;
};
