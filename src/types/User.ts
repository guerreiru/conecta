import { Address } from "./Address";
import { Service } from "./Service";
import { UserRole } from "./UserRole";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  specialty?: string;
  bio?: string;
  address?: Address;
  services?: Service[];
};
