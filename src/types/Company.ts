import { Address } from "./Address";
import { Profile } from "./Profile";
import { Service } from "./Service";

export type Company = {
  id: string;
  companyName: string;
  specialty: string | null;
  bio: string | null;
  address: Address;
  services: Service[];
  profile: Profile;
};
