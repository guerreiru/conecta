import { Category } from "./Category";
import { Company } from "./Company";
import { Provider } from "./Provider";

export type Service = {
  id: string;
  title: string;
  description: string | null;
  price: string;
  typeOfChange: string;
  category: Category;
  company: Company | null;
  provider: Provider | null;
};
