import { ServiceOwnerProfile } from "@/components/serviceOwnerProfile";
import { Company } from "@/types/Company";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CompanyProfile({ params }: Props) {
  const { id } = await params;
  const res = await fetch(`https://conecta-api-l0kh.onrender.com/companies/${id}`);
  const company: Company = await res.json();

  if (!company.id) {
    return <p>Nenhuma empresa foi encontrada para esse perfil</p>
  }

  return <ServiceOwnerProfile owner={company} ownerName={company.companyName} />;
}
