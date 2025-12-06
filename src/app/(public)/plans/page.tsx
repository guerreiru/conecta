import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  CrownSimpleIcon,
  LightningIcon,
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
                  Básico
                </h3>
              </div>
            </header>

            <p className="font-bold text-4xl mt-4 dark:text-black-200">
              R$ 11,90/mês
            </p>
            <p className="text-stone-500 mt-2 mb-4">
              Perfeito para começar a encontrar profissionais
            </p>
            <Button variant="black" className="w-full ">
              Assinar Básico
            </Button>

            <ul className="mt-4 text-stone-600 grid gap-3">
              <li className="flex items-center gap-3">
                <span className="rounded-full p-1 bg-lime-400">
                  <CheckIcon weight="bold" size={20} />
                </span>{" "}
                Busca de profissionais na sua região
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
                Suporte prioritário
              </li>
              <li className="flex items-center gap-3 text-neutral-300">
                <span className="rounded-full p-1 bg-gray-200">
                  <CheckIcon weight="bold" size={20} />
                </span>{" "}
                Destaque nos resultados
              </li>
              <li className="flex items-center gap-3 text-neutral-300">
                <span className="rounded-full p-1 bg-gray-200">
                  <CheckIcon weight="bold" size={20} />
                </span>{" "}
                Análise de propostas
              </li>
              <li className="flex items-center gap-3 text-neutral-300">
                <span className="rounded-full p-1 bg-gray-200">
                  <CheckIcon weight="bold" size={20} />
                </span>{" "}
                Atendimento prioritário
              </li>
            </ul>
          </article>

          <article
            className="border-2 border-lime-400 p-8 bg-white rounded-3xl relative"
            aria-labelledby="basic-plan-title"
          >
            <p className="absolute -top-4 bg-lime-400 py-1 px-6 rounded-lg font-bold dark:text-black-200">
              Mais popular
            </p>
            <header>
              <div className="flex items-center gap-3">
                <span className="p-3 bg-lime-400 rounded-2xl dark:text-black-200">
                  <LightningIcon size={24} />
                </span>
                <h3 id="basic-plan-title" className="dark:text-black-200">
                  Premium
                </h3>
              </div>
            </header>

            <p className="font-bold text-4xl mt-4 dark:text-black-200">
              R$ 14,90/mês
            </p>
            <p className="text-stone-500 mt-2 mb-4">
              Ideal para quem precisa de mais recursos
            </p>
            <Button className="w-full">Assinar Premium</Button>

            <ul className="mt-4 text-stone-600 grid gap-3">
              <li className="flex items-center gap-3">
                <span className="rounded-full p-1 bg-lime-400">
                  <CheckIcon weight="bold" size={20} />
                </span>{" "}
                Busca de profissionais na sua região
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
                Suporte prioritário 24/7
              </li>
              <li className="flex items-center gap-3">
                <span className="rounded-full p-1 bg-lime-400">
                  <CheckIcon weight="bold" size={20} />
                </span>{" "}
                Destaque nos resultados
              </li>
              <li className="flex items-center gap-3">
                <span className="rounded-full p-1 bg-lime-400">
                  <CheckIcon weight="bold" size={20} />
                </span>{" "}
                Análise de propostas
              </li>
              <li className="flex items-center gap-3 text-neutral-300">
                <span className="rounded-full p-1 bg-gray-200">
                  <CheckIcon weight="bold" size={20} />
                </span>{" "}
                Atendimento prioritário
              </li>
            </ul>
          </article>

          <article
            className="border-2 border-gray-200 p-8 bg-white rounded-3xl"
            aria-labelledby="basic-plan-title"
          >
            <header>
              <div className="flex items-center gap-3">
                <span className="p-3 bg-gray-100 rounded-2xl">
                  <CrownSimpleIcon size={24} className="text-stone-500" />
                </span>
                <h3 id="basic-plan-title" className="dark:text-black-200">
                  Enterprise
                </h3>
              </div>
            </header>

            <p className="font-bold text-4xl mt-4 dark:text-black-200">
              R$ 19,90/mês
            </p>
            <p className="text-stone-500 mt-2 mb-4">
              Para empresas e uso profissional intensivo
            </p>
            <Button variant="black" className="w-full">
              Assinar Enterprise
            </Button>

            <ul className="mt-4 text-stone-600 grid gap-3">
              <li className="flex items-center gap-3">
                <span className="rounded-full p-1 bg-lime-400">
                  <CheckIcon weight="bold" size={20} />
                </span>{" "}
                Busca de profissionais na sua região
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
                Suporte por email
              </li>
              <li className="flex items-center gap-3">
                <span className="rounded-full p-1 bg-lime-400">
                  <CheckIcon weight="bold" size={20} />
                </span>{" "}
                Destaque nos resultados
              </li>
              <li className="flex items-center gap-3">
                <span className="rounded-full p-1 bg-lime-400">
                  <CheckIcon weight="bold" size={20} />
                </span>{" "}
                Análise de propostas
              </li>
              <li className="flex items-center gap-3">
                <span className="rounded-full p-1 bg-lime-400">
                  <CheckIcon weight="bold" size={20} />
                </span>{" "}
                Atendimento prioritário
              </li>
            </ul>
          </article>
        </section>

        <section
          aria-labelledby="faq-heading"
          className="p-8 rounded-3xl bg-white border border-gray-200 max-w-5xl mx-auto"
        >
          <h2 id="faq-heading" className="mb-6 text-center dark:text-black-200">
            Perguntas Frequentes
          </h2>

          <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <dt className="font-medium text-gray-800 mb-2">
                Posso cancelar a qualquer momento?
              </dt>
              <dd className="text-stone-600">
                Sim, você pode cancelar seu plano a qualquer momento sem multas
                ou taxas adicionais.
              </dd>
            </div>

            <div>
              <dt className="font-medium text-gray-800 mb-2">
                Como funciona o período de teste?
              </dt>
              <dd className="text-stone-600">
                Todos os planos pagos têm 7 dias de garantia. Se não ficar
                satisfeito, devolvemos seu dinheiro.
              </dd>
            </div>

            <div>
              <dt className="font-medium text-gray-800 mb-2">
                Posso mudar de plano depois?
              </dt>
              <dd className="text-stone-600">
                Claro! Você pode fazer upgrade ou downgrade do seu plano a
                qualquer momento.
              </dd>
            </div>

            <div>
              <dt className="font-medium text-gray-800 mb-2">
                Quais são as formas de pagamento?
              </dt>
              <dd className="text-stone-600">
                Aceitamos cartão de crédito, PIX e boleto bancário para sua
                comodidade.
              </dd>
            </div>
          </dl>
        </section>
      </section>
    </main>
  );
}
