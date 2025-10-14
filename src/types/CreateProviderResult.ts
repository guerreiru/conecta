import { Address } from "./Address";
import { Profile } from "./Profile";

export type CreateProviderResult = {
  id: string;
  specialty: string | null;
  bio: string | null;
  address: Address;
  profile: Profile;
};
