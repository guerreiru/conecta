import { api } from "./api";
import { User } from "@/types/User";

export async function getUserById(userId: string): Promise<User> {
  const response = await api.get(`/users/${userId}`);
  return response.data;
}
