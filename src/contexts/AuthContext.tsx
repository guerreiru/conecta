import { User } from "@/types/User";
import { createContext } from "react";

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  loading: true,
  login: async () => ({ success: false }),
  logout: async () => {},
  updateUser: () => {},
});
