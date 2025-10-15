"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Profile as ProfileType } from "@/types/Profile";
import {
  ArticleIcon,
  BellIcon,
  ChatTextIcon,
  LockIcon,
  UserListIcon,
} from "@phosphor-icons/react";
import { useRouter } from "next/navigation";

function getProfileName(profile: ProfileType) {
  return profile.company?.companyName ?? profile.provider?.providerName ?? profile.user?.name ?? "Sem nome"
}

export default function Profile() {
  const { activeProfile } = useAuth();
  const router = useRouter()

  return (
    <main className="py-4 grid">
      <section aria-labelledby="profile-header" className="relative">
        <div className="bg-black-200 h-32 rounded-b-[64px] md:rounded-b-[80px] lg:rounded-b-full"></div>

        <header
          id="profile-header"
          className="grid place-items-center gapx-3 py-2 relative -top-[30%]"
        >
          <figure className="size-28 border border-lime-400 bg-zinc-500 rounded-full"></figure>

          <figcaption className="flex flex-col items-center text-center">
            <h1 className="text-xl font-semibold">
              {activeProfile && getProfileName(activeProfile)}
            </h1>
            <p className="text-sm text-muted-foreground">
              {activeProfile?.user?.email}
            </p>
          </figcaption>
        </header>
      </section>

      <section
        aria-labelledby="profile-options"
        className="grid gap-5 text-black md:mx-auto"
      >
        <h2 id="profile-options" className="sr-only">
          Opções do perfil
        </h2>

        <article
          aria-label="Informações e notificações"
          className="p-4 bg-white rounded-lg shadow grid gap-y-3"
        >
          <ul className="grid gap-y-3">
            <li className="flex items-center gapx-3 py-2">
              <ArticleIcon size={24} aria-hidden />
              <span>Editar informações</span>
            </li>

            <li className="flex items-center gapx-3 py-2">
              <BellIcon size={24} aria-hidden />
              <span>Notificações</span>
            </li>
          </ul>
        </article>

        <article
          aria-label="Suporte e privacidade"
          className="p-4 bg-white rounded-lg shadow grid gap-y-3"
        >
          <ul className="grid gap-y-3">
            <li className="flex items-center gapx-3 py-2">
              <UserListIcon size={24} aria-hidden />
              <span>Ajuda e Suporte</span>
            </li>

            <li className="flex items-center gapx-3 py-2">
              <ChatTextIcon size={24} aria-hidden />
              <span>Contatos</span>
            </li>

            <li className="flex items-center gapx-3 py-2">
              <LockIcon size={24} aria-hidden />
              <span>Política de Privacidade</span>
            </li>
          </ul>
        </article>

        {activeProfile?.type !== "client" && (
          <Button className="w-full" onClick={() => router.push('/profile/services/new')}>
            Cadastrar Serviço
          </Button>
        )}
      </section>
    </main>
  );
}
