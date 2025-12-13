import { User } from "@/types/User";
import { PlanBadge } from "../planBadge";
import { FREE_PLAN_SERVICE_LIMIT } from "@/constants";

type HeaderProps = {
  user: User;
  canAddService: boolean;
  openAddModalAction: () => void;
};

export function Header({
  user,
  canAddService,
  openAddModalAction,
}: HeaderProps) {
  return (
    <header className="pb-5 md:pb-10 flex md:items-center justify-between gap-x-2 gap-y-4 flex-col md:flex-row flex-wrap">
      <section>
        <div className="flex items-center gap-5">
          <h1 className="font-extrabold text-2xl md:text-3xl text-black dark:text-white">
            Olá, {user.name}
          </h1>
          <PlanBadge title="Gratuito" variant="free" />
        </div>

        {user.role === "provider" && (
          <p className="text-black/80 dark:text-gray-200 text-sm mt-1 md:mt-0">
            Atualize seus serviços e atraia mais clientes
          </p>
        )}
      </section>

      {user.role === "provider" && (
        <section className="flex flex-col gap-2">
          <button
            className={`px-4 py-3.5 rounded-xl font-bold dark:text-black-50 text-sm transition-all ${
              canAddService
                ? "bg-lime-400 text-black hover:brightness-90"
                : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-60"
            }`}
            aria-label="Adicionar novo serviço"
            onClick={openAddModalAction}
            disabled={!canAddService}
          >
            Adicionar Serviço
          </button>
          {!canAddService && (
            <p className="text-xs text-black/70 dark:text-white md:text-center">
              Limite de {FREE_PLAN_SERVICE_LIMIT} serviço(s) atingido.{" "}
            </p>
          )}
        </section>
      )}
    </header>
  );
}
