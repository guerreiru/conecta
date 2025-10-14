import { UserRole } from "./UserRole";

export type AuthData = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    roles: UserRole[];
  };
};
