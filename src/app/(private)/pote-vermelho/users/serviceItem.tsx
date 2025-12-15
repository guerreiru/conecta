import { useState } from "react";
import { api } from "@/services/api";
import { Service } from "@/types/Service";
import { HighlightSelectOption } from "@/types/HighlightSelectOption";
import { TrashIcon } from "@phosphor-icons/react";
import { toast } from "react-toastify";

type Props = {
  service: Service;
  onRemove: (serviceId: string) => void;
};

// Mapeamento para estilos de destaque mais agradáveis
const highlightColors: Record<HighlightSelectOption, string> = {
  free: "border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400",
  plus: "border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  premium:
    "border-purple-500 bg-purple-50 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
  enterprise:
    "border-yellow-500 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300",
};

export function ServiceItem({ service, onRemove }: Props) {
  const [highlight, setHighlight] = useState<HighlightSelectOption>(
    service.isHighlighted && service.highlightLevel
      ? service.highlightLevel
      : "free"
  );
  const [isLoading, setIsLoading] = useState(false);

  async function handleHighlightChange(value: HighlightSelectOption) {
    setHighlight(value);
    setIsLoading(true);

    const isFree = value === "free";

    try {
      await api.patch(`/services/${service.id}/admin/highlight`, {
        isHighlighted: !isFree,
        highlightLevel: isFree ? null : value,
      });
      toast.success("Destaque atualizado");
    } catch (error) {
      toast.error("Erro ao atualizar");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteService() {
    if (
      !confirm(`Tem certeza que deseja EXCLUIR o serviço: "${service.title}"?`)
    )
      return;

    setIsLoading(true);
    try {
      await api.delete(`/services/${service.id}`);
      onRemove(service.id);
    } catch (error) {
      console.error("Erro ao excluir serviço", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Estilos dinâmicos do select
  const currentHighlightStyle = highlightColors[highlight];

  return (
    <div className="flex items-center justify-between gap-3 bg-gray-100 dark:bg-gray-700 rounded-lg p-2 transition duration-200 hover:bg-gray-200 dark:hover:bg-gray-600">
      <span className="flex-1 text-sm font-medium text-gray-800 dark:text-gray-200 truncate">
        {service.title}
      </span>

      <div className="flex items-center gap-2">
        <select
          value={highlight}
          onChange={(e) =>
            handleHighlightChange(e.target.value as HighlightSelectOption)
          }
          disabled={isLoading}
          className={`
            border-2 rounded-lg px-2 py-1 text-xs font-semibold uppercase 
            focus:ring-2 focus:ring-opacity-50 transition duration-150 ease-in-out
            bg-white dark:bg-gray-800 ${currentHighlightStyle}
            ${isLoading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
          `}
        >
          <option value="free">Free</option>
          <option value="plus">Plus</option>
          <option value="premium">Premium</option>
          <option value="enterprise">Enterprise</option>
        </select>

        <button
          onClick={handleDeleteService}
          disabled={isLoading}
          className={`
            p-1 rounded-full text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30 
            transition duration-150 ease-in-out
            ${isLoading ? "opacity-60 cursor-not-allowed" : ""}
          `}
          aria-label="Excluir serviço"
        >
          <TrashIcon size={16} />
        </button>
      </div>
    </div>
  );
}
