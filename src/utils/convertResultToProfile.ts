import { CreateCompanyResult } from "@/types/CreateCompanyResult";
import { CreateProviderResult } from "@/types/CreateProviderResult";

export function convertResultToProfile(
  entityName: "company" | "provider",
  result: CreateCompanyResult | CreateProviderResult
) {
  const { profile, ...rest } = result;

  return {
    ...profile,
    [entityName]: rest,
    [entityName === "company" ? "provider" : "company"]: null,
  };
}
