import { ServiceCard } from "@/components/dashboard/serviceCard";
import { Service } from "@/types/Service";
import { User } from "@/types/User";

type ServiceListProps = {
  services: Service[];
  owner: User;
  onEditAction: (service: Service) => void;
  onDeleteAction: (serviceId: string) => void;
  onActiveAction: (service: Service) => void;
};

export function ServiceList({
  services,
  owner,
  onEditAction,
  onDeleteAction,
  onActiveAction,
}: ServiceListProps) {
  return (
    <section
      className="py-4 text-black dark:text-gray-200"
      aria-labelledby="meus-servicos"
    >
      <h2
        id="meus-servicos"
        className="text-2xl mt-5 font-semibold dark:text-white text-center"
      >
        Serviços
      </h2>

      {services.length > 0 ? (
        <ul className="grid mt-6 gap-4">
          {services.map((service) => (
            <li key={service.id}>
              <ServiceCard
                service={service}
                owner={owner}
                onEditAction={onEditAction}
                onDeleteAction={onDeleteAction}
                onActiveAction={onActiveAction}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-stone-500 dark:text-gray-400 text-center">
          Você ainda não cadastrou serviços.
        </p>
      )}
    </section>
  );
}
