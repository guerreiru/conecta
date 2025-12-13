"use client";

import { User } from "@/types/User";
import { PhoneIcon } from "@phosphor-icons/react";
import Link from "next/link";

interface ServiceProviderProps {
  user: User;
  serviceTitle: string;
  isOwnService: boolean;
}

export function ServiceProvider({
  user,
  serviceTitle,
  isOwnService,
}: ServiceProviderProps) {
  const whatsappNumber = user.address?.phone?.replace(/\D/g, "");
  const whatsappMessage = encodeURIComponent(
    `Olá ${user.name}, tenho interesse no seu serviço: ${serviceTitle}`
  );

  return (
    <div className="bg-white dark:bg-black-200 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="font-semibold text-black dark:text-white mb-4">
        Provedor
      </h3>
      <div className="flex items-center gap-4 mb-4">
        <div>
          <p className="font-semibold text-black dark:text-white">
            {user.name}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {whatsappNumber && !isOwnService && (
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition font-bold"
          >
            <PhoneIcon size={20} />
            Contatar via WhatsApp
          </a>
        )}

        {user.id && (
          <Link
            href={`/provider/${user.id}`}
            className="flex items-center gap-2 px-4 py-2 bg-black hover:bg-zinc-700 text-white rounded-lg transition font-bold"
            aria-label={`Ver perfil completo de ${user.name}`}
          >
            Ver perfil
          </Link>
        )}
      </div>
    </div>
  );
}
