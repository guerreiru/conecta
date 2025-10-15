"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Profile } from "@/types/Profile";
import Link from "next/link";
import { useRouter } from "next/navigation";

const profileMap = {
  client: "Usuário",
  company: "Empresa",
  provider: "Prestador de serviço",
};

export default function Home() {
  const { user, handleSetActiveProfile } = useAuth();
  const router = useRouter();

  function handleShowProfile(profile: Profile) {
    handleSetActiveProfile(profile);
    setTimeout(() => { router.push("/profile") }, 0)
  }

  if (!user) {
    return <div className="grid gap-4 py-4 max-w-3xl mx-auto">
      Carregando...
    </div>
  }
  return (
    <div className="grid gap-4 py-4 max-w-3xl mx-auto">
      <Link href="/worker-profile-register">Cadastrar perfil de trabalho</Link>
      {user && user.profiles && user.profiles.length > 0 && (
        <div className="grid md:grid-cols-2 gap-2">
          {user.profiles.map((profile) => (
            <div
              key={profile.id}
              className="border border-lime-400 shadow p-4 rounded-2xl grid gap-2"
            >
              <p>{profileMap[profile.type]}</p>
              <div className="flex justify-end">
                <Button onClick={() => handleShowProfile(profile)}>
                  Perfil
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
