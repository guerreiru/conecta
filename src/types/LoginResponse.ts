import { User } from "./User";
import { UserRole } from "./UserRole";

export type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: User & {
    activeProfile: {
      id: string;
      type: UserRole;
    };
  };
};
