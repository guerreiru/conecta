import { Company } from "./Company";
import { Provider } from "./Provider";
import { User } from "./User";
import { UserRole } from "./UserRole";

export type Profile = {
  id: string;
  type: UserRole;
  user: User | null;
  company: Company | null;
  provider: Provider | null;
};
