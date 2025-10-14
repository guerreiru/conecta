import z from "zod";

export const addressSchema = z.object({
  zipCode: z.string().min(8, "CEP é obrigatório"),
  street: z.string().min(1, "Rua é obrigatória"),
  number: z.string().min(1, "Número é obrigatório"),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  stateId: z.string().min(1, "Estado é obrigatório"),
  stateName: z.string(),
  cityId: z.string().optional(),
  cityName: z.string(),
  website: z.string().optional(),
  phone: z.string().min(1, "Telefone é obrigatório"),
});
