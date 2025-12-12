"use client";

import { ServiceCard } from "@/components/service/serviceCard";
import { User } from "@/types/User";
import { formatToBRL } from "@/utils/formatToBRL";
import { PhoneIcon, WhatsappLogoIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";

type Props = {
  owner: User;
};

export function ServiceOwnerProfile({ owner }: Props) {
  const ownerHasServices = owner.services && owner.services.length > 0;
  const activeServices = ownerHasServices
    ? owner.services!.filter((service) => service.isActive)
    : [];

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <article className="grid gap-4">
        {/* HEADER */}
        <header className="bg-white dark:bg-black-100 rounded-3xl p-4">
          <section className="flex items-center gap-x-3">
            <div className="grid gap-1">
              <h1 className="font-bold text-xl text-black dark:text-gray-100">
                {owner.name}
              </h1>

              {owner.specialty && (
                <p className="font-bold text-zinc-500 dark:text-gray-300">
                  {owner.specialty}
                </p>
              )}
            </div>
          </section>

          <section className="flex justify-between">
            {owner.services &&
              owner.services.length > 0 &&
              (() => {
                const cheapestService = [...owner.services].sort(
                  (a, b) => Number(a.price) - Number(b.price)
                )[0];

                return (
                  <div>
                    <p className="text-zinc-500 dark:text-gray-300">
                      A partir de
                    </p>
                    <p className="text-black dark:text-white">
                      {formatToBRL(cheapestService.price)}
                    </p>
                  </div>
                );
              })()}

            <p className="text-zinc-500 dark:text-gray-300">
              {owner.address?.cityName}
            </p>
          </section>
        </header>

        {/* SOBRE */}
        {owner.bio && (
          <Card title="Sobre" className="bg-white dark:bg-black-100">
            <p className="font-medium text-sm text-zinc-500 dark:text-gray-300">
              {owner.bio}
            </p>
          </Card>
        )}

        {/* SERVIÇOS OFERECIDOS */}
        <Card
          title="Serviços oferecidos"
          className="bg-lime-400 dark:bg-lime-600"
        >
          {activeServices && (
            <div className="grid gap-3 py-2">
              {activeServices.map((service) => (
                <ServiceCard key={service.id} service={service} owner={owner} />
              ))}
            </div>
          )}
        </Card>

        {/* CONTATO */}
        <Card title="Contato" className="bg-white dark:bg-black-100">
          {/* Telefone */}
          <div className="flex items-center gap-4 border text-black dark:text-gray-100 border-slate-200 dark:border-gray-700 p-2 px-3 rounded-xl">
            <PhoneIcon size={18} />
            <div>
              <p className="text-sm font-semibold">Telefone:</p>
              <a
                className="text-gray-500 dark:text-gray-300 text-sm font-medium underline"
                href={`tel:${owner.address?.phone}`}
              >
                {owner.address?.phone}
              </a>
            </div>
          </div>

          {/* WhatsApp */}
          <div className="flex items-center gap-4 border border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/30 p-2 px-3 rounded-xl text-green-700 dark:text-green-300">
            <WhatsappLogoIcon size={18} />
            <div>
              <p className="text-sm font-semibold">WhatsApp:</p>
              <Link
                className="text-sm font-medium underline"
                href={`https://wa.me/55${owner.address?.phone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {owner.address?.phone}
              </Link>
            </div>
          </div>
        </Card>
      </article>
    </div>
  );
}

/* COMPONENTE CARD PADRONIZADO */
function Card({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-3xl p-4 pb-7 grid gap-2 ${className}`}>
      <h2 className="text-black dark:text-gray-100 font-bold">{title}</h2>
      {children}
    </section>
  );
}
