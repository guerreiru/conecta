import z from "zod";

export const addressSchema = z
  .object({
    zipCode: z.string().min(8, "CEP é obrigatório"),
    street: z.string().min(1, "Rua é obrigatória"),
    number: z.string().min(1, "Número é obrigatório"),
    neighborhood: z.string().min(1, "Bairro é obrigatório"),

    stateId: z.string().optional(),
    stateName: z.string().optional(),

    cityId: z.string().optional(),
    cityName: z.string().optional(),

    website: z.string().optional(),
    phone: z.string().min(1, "Telefone é obrigatório"),
  })
  .refine((data) => data.stateId || data.stateName, {
    message: "Estado é obrigatório",
    path: ["stateId"],
  })
  .refine((data) => data.cityId || data.cityName, {
    message: "Cidade é obrigatória",
    path: ["cityId"],
  });
