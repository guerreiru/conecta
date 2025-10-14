import { Address } from "./Address";
import { Profile } from "./Profile";

export type CreateCompanyResult = {
  id: string;
  companyName: string;
  address: Address;
  profile: Profile;
};
