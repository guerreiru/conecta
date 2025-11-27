import { api } from "./api";

export async function deleteService(serviceId: string) {
  return await api.delete(`/services/${serviceId}`);
}
