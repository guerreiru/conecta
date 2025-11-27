import { ServiceOwnerProfile } from "@/components/serviceOwnerProfile";
import { getUserById } from "@/services/usersService";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProviderProfile({ params }: Props) {
  const { id } = await params;

  try {
    const user = await getUserById(id);

    if (!user.id) {
      return <p>Nenhum profissional foi encontrado para esse perfil</p>;
    }

    return <ServiceOwnerProfile owner={user} />;
  } catch (error) {
    return <p>Nenhum profissional foi encontrado para esse perfil</p>;
  }
}
