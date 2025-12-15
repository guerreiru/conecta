import { User } from "./User";

export type UsersResponse = {
  data: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  lastPage: number;
};
