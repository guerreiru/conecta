import { api } from "@/services/api";
import { User } from "@/types/User";
import { ServiceItem } from "./serviceItem";
import { useState } from "react";
import { MailboxIcon, MapPinIcon, TrashIcon } from "@phosphor-icons/react";
import { toast } from "react-toastify";

type Props = {
  user: User;
  onRemoveUser: (userId: string) => void;
};

export function UserCard({ user, onRemoveUser }: Props) {
  const [services, setServices] = useState(user.services ?? []);
  const [isDeleting, setIsDeleting] = useState(false);

  const city = user.address?.cityName;
  const state = user.address?.stateName;

  const location = city && state ? `${city}, ${state}` : city || state || "";

  async function handleDeleteUser() {
    if (!confirm(`Deseja realmente excluir o usuário: ${user.name}?`)) return;

    setIsDeleting(true);
    try {
      await api.delete(`/users/${user.id}`);
      toast.success("Usuário excluído");
      onRemoveUser(user.id);
    } catch (error) {
      toast.error("Erro ao excluir usuário");
      setIsDeleting(false);
    }
  }

  function handleRemoveService(serviceId: string) {
    setServices((prev) => prev.filter((s) => s.id !== serviceId));
  }

  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-xl space-y-4 transition duration-300 hover:shadow-2xl">
      <div className="flex justify-between items-start border-b pb-4 border-gray-100 dark:border-gray-700">
        <div>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {user.name}
          </p>

          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
            <MailboxIcon size={14} className="mr-1 flex-shrink-0" />
            <span>{user.email}</span>
          </div>

          {location && (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
              <MapPinIcon size={14} className="mr-1 flex-shrink-0" />
              <span>{location}</span>
            </div>
          )}
        </div>

        <button
          onClick={handleDeleteUser}
          disabled={isDeleting}
          className={`
            p-2 rounded-full text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 
            transition duration-150 ease-in-out flex items-center justify-center 
            ${isDeleting ? "opacity-60 cursor-not-allowed" : ""}
          `}
          aria-label="Excluir usuário"
        >
          {isDeleting ? (
            <div className="w-4 h-4 border-2 border-t-2 border-red-600 border-opacity-30 border-t-red-600 rounded-full animate-spin"></div>
          ) : (
            <TrashIcon size={18} />
          )}
        </button>
      </div>

      {services.length > 0 && (
        <div className="space-y-2 pt-2">
          <h3 className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">
            Serviços ({services.length})
          </h3>
          <div className="max-h-60 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {services.map((service) => (
              <ServiceItem
                key={service.id}
                service={service}
                onRemove={handleRemoveService}
              />
            ))}
          </div>
        </div>
      )}

      {services.length === 0 && (
        <p className="text-sm text-gray-400 dark:text-gray-500 pt-2">
          Nenhum serviço cadastrado.
        </p>
      )}
    </div>
  );
}
