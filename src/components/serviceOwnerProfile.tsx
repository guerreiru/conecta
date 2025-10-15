import { ServiceCard } from "@/components/serviceCard";
import { Address } from "@/types/Address";
import { Company } from "@/types/Company";
import { Profile } from "@/types/Profile";
import { Service } from "@/types/Service";
import { formatToBRL } from "@/utils/formatToBRL";
import { PhoneIcon, WhatsappLogoIcon } from "@phosphor-icons/react/ssr";
import Link from "next/link";

type Owner = {
  id: string;
  companyName?: string;
  specialty: string | null;
  bio: string | null;
  address: Address;
  services: Service[];
  profile: Profile;
}

type Props = {
  owner: Owner
  ownerName: string
};

export function ServiceOwnerProfile({ owner, ownerName }: Props) {

  const { company, provider } = owner.companyName
    ? { company: owner, provider: null }
    : { company: null, provider: owner };


  return (
    <main className="py-4 max-w-3xl mx-auto">
      <article className="grid gap-2.5">
        <header className="bg-white rounded-3xl pb-4 relative shadow">
          <div className="bg-black-200 h-20 rounded-t-3xl"></div>

          <section className="flex mx-2.5 items-center gapx-3 py-2 relative -top-4">
            <div className="size-20 bg-white border-[2px] border-lime-400 rounded-full"></div>
            <div className="grid gap-1">
              <h1 className="font-bold text-xl text-black">{ownerName}</h1>
              {owner.specialty && (
                <p className="font-bold text-zinc-500">
                  {owner.specialty}
                </p>
              )}
            </div>
          </section>

          <section className="bg-green-50 w-fit p-2 mx-4 rounded-full border-[2px] border-emerald-100 mt-2 mb-5">
            <p className="text-green-600 font-bold">Disponível</p>
          </section>

          <section className="flex justify-between mx-4">
            <div>
              <p className="text-zinc-500">A partir de</p>
              <p className="text-black">{formatToBRL(owner.services[0].price)}{owner.services[0].typeOfChange ? `/${owner.services[0].typeOfChange}` : ''}</p>
            </div>

            <p className="text-zinc-500">{owner.address.cityName}</p>
          </section>
        </header>

        {owner.bio && (
          <section className="bg-white rounded-3xl p-4 pb-7 grid gap-2">
            <h2 className="text-black font-bold">Sobre</h2>
            <p className="font-medium text-sm text-zinc-500">
              {owner.bio}
            </p>
          </section>
        )}

        <section className="bg-lime-400 rounded-3xl p-4 pb-7 grid gap-2">
          <h2 className="text-black font-bold">Serviços oferecidos</h2>

          <div className="grid gapx-3 py-2">
            {owner.services?.length > 0 &&
              owner.services.map((service) => (
                <ServiceCard
                  service={{ ...service, company: company as Company, provider }}
                  key={service.id}
                  showSeeProfile={false}
                  ownerName={owner.profile.user?.name}
                />
              ))}
          </div>
        </section>

        <section className="bg-white rounded-3xl p-4 pb-7 grid gap-2">
          <h2 className="text-black font-bold">Contato</h2>

          <div className="flex items-center gap-4 border text-black border-slate-200 p-2 px-3 rounded-xl">
            <PhoneIcon size={18} />
            <div>
              <p className="text-sm font-semibold">Telefone: </p>
              <a
                className="text-gray-500 text-sm font-medium underline"
                href={`tel:${owner.address.phone}`}
              >
                {owner.address.phone}
              </a>
            </div>
          </div>

          <div className="flex items-center bg-green-50 gap-4 border border-green-200 p-2 px-3 rounded-xl text-green-700">
            <WhatsappLogoIcon size={18} />
            <div>
              <p className="text-sm font-semibold">WhatsApp: </p>
              <Link
                className="text-sm font-medium underline"
                href={`https://wa.me/55${owner.address.phone}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {owner.address.phone}
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
