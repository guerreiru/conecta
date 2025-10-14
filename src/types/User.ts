import { Profile } from "./Profile";
import { UserRole } from "./UserRole";

export type User = {
  id: string;
  name: string;
  email: string;
  roles: UserRole[];
  profiles: Profile[];
};
