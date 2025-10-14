import { Address } from "./Address";
import { Profile } from "./Profile";
import { Service } from "./Service";

export type Provider = {
  id: string;
  providerName?: string | null;
  specialty: string | null;
  bio: string | null;
  address: Address;
  profile: Profile;
  services: Service[];
};
