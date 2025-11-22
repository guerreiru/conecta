import { User } from "@/types/User";
import { createContext } from "react";

type AuthContextType = {
  user: User | null;
  handleSetUser: (user: User) => void;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ message: string }>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  handleSetUser: () => { },
  loading: true,
  login: async () => ({ message: "" }),
  logout: async () => { },
});
