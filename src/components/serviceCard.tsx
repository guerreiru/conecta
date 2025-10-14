"use client";

import { Service } from "@/types/Service";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { whatsAppMessage } from "@/utils/whatsAppMessage";
import { formatToBRL } from "@/utils/formatToBRL";

type ServiceCardProps = {
  service: Service;
  showSeeProfile?: boolean;
  ownerName?: string;
};

function getOwner(service: Service) {
  const { company, provider } = service;

  if (company) {
    return {
      id: company.id,
      type: "company" as const,
      phone: company.address.phone,
    };
  }

  if (provider) {
    return {
      id: provider.id,
      type: "provider" as const,
      phone: provider.address.phone,
    };
  }
}

export function ServiceCard({
  service,
  showSeeProfile = true,
  ownerName,
}: ServiceCardProps) {
  const { title, description, price, id, typeOfChange } = service;

  const owner = getOwner(service);

  const router = useRouter();

  function handleClick() {
    if (owner?.type === "company") {
      router.push(`company/${owner.id}`);
    }

    if (owner?.type === "provider") {
      router.push(`provider/${owner.id}`);
    }
  }

  return (
    <div className="p-3.5 bg-black-200 rounded-xl grid gap-3 text-white">
      <header>
        <p className="font-medium">
          {ownerName && `${ownerName} - `} {title}
        </p>
      </header>

      <div className="text-zinc-400 text-sm">{description}</div>

      <footer className="flex items-center justify-between">
        <p className="font-bold">{formatToBRL(price)}{typeOfChange ? `/${typeOfChange}` : ''}</p>
        <div className="flex items-center gap-2">
          {id && showSeeProfile && (
            <Button onClick={handleClick}>Ver perfil</Button>
          )}
          {owner?.phone && (
            <Button>
              <Link
                href={whatsAppMessage({
                  ownerPhone: owner.phone,
                  ownerName,
                  serviceTitle: service.title,
                })}
                target="_blank"
                rel="noopener noreferrer"
              >
                Solicitar
              </Link>
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
}
