import { api } from "./api";

export async function deleteService(serviceId: string) {
  return await api.delete(`http://localhost:3001/services/${serviceId}`);
}
