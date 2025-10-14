import { ServiceOwnerProfile } from "@/components/serviceOwnerProfile";
import { Provider } from "@/types/Provider";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProviderProfile({ params }: Props) {
  const { id } = await params;
  const res = await fetch(`https://conecta-api-l0kh.onrender.com/providers/${id}`);
  const provider: Provider = await res.json();

  if (!provider.id) {
    return <p>Nenhuma empresa foi encontrada para esse perfil</p>
  }

  const name = provider.providerName ?? provider.profile.user?.name ?? "";

  return <ServiceOwnerProfile owner={provider} ownerName={name} />;
}
