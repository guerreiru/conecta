import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  CrownSimpleIcon,
  SparkleIcon,
} from "@phosphor-icons/react/dist/ssr";

export default function PlansPage() {
  return (
    <main className="pb-4">
      <header className="border-b border-gray-200 dark:border-black bg-white dark:bg-black-200 p-8 space-y-4">
        <hgroup>
          <h1 className="text-center text-2xl font-semibold">
            Escolha o plano ideal para você
          </h1>
          <p className="text-stone-500 text-center text-lg">
            Encontre os melhores profissionais com o plano que se encaixa nas
            suas necessidades
          </p>
        </hgroup>
      </header>

      <section className="px-8">
        <section
          aria-labelledby="plans-heading"
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-8 max-w-5xl mx-auto"
        >
          <h2 id="plans-heading" className="sr-only">
            Planos disponíveis
          </h2>

          <article
            className="border-2 border-gray-200 p-8 bg-white rounded-3xl"
            aria-labelledby="basic-plan-title"
          >
            <header>
              <div className="flex items-center gap-3">
                <span className="p-3 bg-gray-100 rounded-2xl">
                  <SparkleIcon size={24} className="text-stone-500" />
                </span>
                <h3 id="basic-plan-title" className="dark:text-black-200">
                  Grátis
                </h3>
              </div>
            </header>

            <p className="font-bold text-4xl mt-4 dark:text-black-200">
              R$ 0,00/mês
            </p>
            <p className="text-stone-500 mt-2 mb-4">
              Ideal para quem quer testar a plataforma
            </p>
            <Button variant="black" className="w-full ">
              Começar
            </Button>

            <ul className="mt-4 text-stone-600 grid gap-3">
              <li className="flex items-center gap-3">
                <span className="rounded-full p-1 bg-lime-400">
                  <CheckIcon weight="bold" size={20} />
                </span>{" "}
                Cadastrar 2 serviços
              </li>

              <li className="flex items-center gap-3">
                <span className="rounded-full p-1 bg-lime-400">
                  <CheckIcon weight="bold" size={20} />
                </span>{" "}
                Visualização de avaliações
              </li>
            </ul>
          </article>

          <article
            className="border-2 border-gray-200 p-8 bg-white dark:bg-black-200 rounded-3xl relative overflow-hidden"
            aria-labelledby="enterprise-plan-title"
          >
            <header>
              <div className="flex items-center gap-3">
                <span className="p-3 bg-gray-100 dark:bg-black rounded-2xl">
                  <CrownSimpleIcon
                    size={24}
                    className="text-stone-500 dark:text-gray-400"
                  />
                </span>
                <h3 id="enterprise-plan-title" className="dark:text-white">
                  Plus
                </h3>
              </div>
            </header>

            <p className="font-bold text-4xl mt-4 dark:text-white">
              R$ 14,90/mês
            </p>
            <p className="text-stone-500 dark:text-gray-400 mt-2 mb-4">
              Ideal para quem precisa de mais recursos
            </p>
            <Button variant="black" className="w-full" disabled>
              Assinar Plus
            </Button>

            <ul className="mt-4 text-stone-600 grid gap-3">
              <li className="flex items-center gap-3">
                <span className="rounded-full p-1 bg-lime-400">
                  <CheckIcon weight="bold" size={20} />
                </span>{" "}
                Cadastrar até 5 serviços
              </li>
              <li className="flex items-center gap-3">
                <span className="rounded-full p-1 bg-lime-400">
                  <CheckIcon weight="bold" size={20} />
                </span>{" "}
                Visualização de avaliações
              </li>
              <li className="flex items-center gap-3">
                <span className="rounded-full p-1 bg-lime-400">
                  <CheckIcon weight="bold" size={20} />
                </span>{" "}
                Destaque nos resultados
              </li>
            </ul>

            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-md bg-white/80 dark:bg-black-200/90">
              <div className="text-center space-y-3 px-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-lime-400 to-lime-500 dark:from-lime-500 dark:to-lime-600 mb-2">
                  <CrownSimpleIcon
                    size={32}
                    weight="fill"
                    className="text-black-200"
                  />
                </div>
                <p className="text-3xl font-bold bg-gradient-to-r from-lime-500 to-lime-600 dark:from-lime-400 dark:to-lime-500 bg-clip-text text-transparent">
                  Em Breve
                </p>
                <p className="text-sm text-stone-600 dark:text-gray-400 max-w-xs">
                  Estamos preparando algo especial
                </p>
              </div>
            </div>
          </article>

          <article
            className="border-2 border-gray-200 p-8 bg-white dark:bg-black-200 rounded-3xl relative overflow-hidden"
            aria-labelledby="enterprise-plan-title"
          >
            <header>
              <div className="flex items-center gap-3">
                <span className="p-3 bg-gray-100 dark:bg-black rounded-2xl">
                  <CrownSimpleIcon
                    size={24}
                    className="text-stone-500 dark:text-gray-400"
                  />
                </span>
                <h3 id="enterprise-plan-title" className="dark:text-white">
                  Enterprise
                </h3>
              </div>
            </header>

            <p className="font-bold text-4xl mt-4 dark:text-white">
              R$ 19,90/mês
            </p>
            <p className="text-stone-500 dark:text-gray-400 mt-2 mb-4">
              Para empresas e uso profissional intensivo
            </p>
            <Button variant="black" className="w-full" disabled>
              Assinar Enterprise
            </Button>

            <ul className="mt-4 text-stone-600 dark:text-gray-400 grid gap-3">
              <li className="flex items-center gap-3">
                <span className="rounded-full p-1 bg-lime-400">
                  <CheckIcon
                    weight="bold"
                    size={20}
                    className="dark:text-black-200"
                  />
                </span>{" "}
                Cadastrar até 15 serviços
              </li>
              <li className="flex items-center gap-3">
                <span className="rounded-full p-1 bg-lime-400">
                  <CheckIcon
                    weight="bold"
                    size={20}
                    className="dark:text-black-200"
                  />
                </span>{" "}
                Visualização de avaliações
              </li>
              <li className="flex items-center gap-3">
                <span className="rounded-full p-1 bg-lime-400">
                  <CheckIcon
                    weight="bold"
                    size={20}
                    className="dark:text-black-200"
                  />
                </span>{" "}
                Maior destaque nos resultados
              </li>
              <li className="flex items-center gap-3">
                <span className="rounded-full p-1 bg-lime-400">
                  <CheckIcon
                    weight="bold"
                    size={20}
                    className="dark:text-black-200"
                  />
                </span>{" "}
                Suporte prioritário
              </li>
              <li className="flex items-center gap-3">
                <span className="rounded-full p-1 bg-lime-400">
                  <CheckIcon
                    weight="bold"
                    size={20}
                    className="dark:text-black-200"
                  />
                </span>{" "}
                Acesso a recursos exclusivos
              </li>
            </ul>

            <div className="absolute inset-0 flex items-center justify-center backdrop-blur-md bg-white/80 dark:bg-black-200/90">
              <div className="text-center space-y-3 px-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-lime-400 to-lime-500 dark:from-lime-500 dark:to-lime-600 mb-2">
                  <CrownSimpleIcon
                    size={32}
                    weight="fill"
                    className="text-black-200"
                  />
                </div>
                <p className="text-3xl font-bold bg-gradient-to-r from-lime-500 to-lime-600 dark:from-lime-400 dark:to-lime-500 bg-clip-text text-transparent">
                  Em Breve
                </p>
                <p className="text-sm text-stone-600 dark:text-gray-400 max-w-xs">
                  Estamos preparando algo especial
                </p>
              </div>
            </div>
          </article>
        </section>
      </section>
    </main>
  );
}
