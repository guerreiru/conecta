import { ServiceOwnerProfile } from "@/components/serviceOwnerProfile";
import { User } from "@/types/User";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProviderProfile({ params }: Props) {
  const { id } = await params;
  const res = await fetch(`http://localhost:3001/users/${id}`);
  const user: User = await res.json();

  if (!user.id) {
    return <p>Nenhum profissional foi encontrado para esse perfil</p>
  }


  return <ServiceOwnerProfile owner={user} />;
}
