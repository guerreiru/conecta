import { Profile } from "@/types/Profile";
import { User } from "@/types/User";
import { createContext } from "react";

type AuthContextType = {
  user: User | null;
  handleUpdateUser: (profile: Profile) => void;
  activeProfile: Profile | null;
  handleSetActiveProfile: (profile: Profile) => void;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ message: string }>;
  logout: () => Promise<{ message: string }>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  handleUpdateUser: () => {},
  activeProfile: null,
  handleSetActiveProfile: () => {},
  loading: true,
  login: async () => ({ message: "" }),
  logout: async () => ({ message: "" }),
});
