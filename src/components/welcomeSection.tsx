import { CheckIcon } from "@phosphor-icons/react";

export function WelcomeSection() {
  return (
    <section
      className="hidden lg:flex flex-col justify-center w-full max-w-lg mx-auto gap-6 max-h-screen"
      aria-labelledby="welcome-heading"
    >
      <div className="space-y-1">
        <h1
          id="welcome-heading"
          className="dark:text-white font-bold text-4xl lg:text-6xl"
        >
          Bem-vindo ao Prolocal
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Conecte-se com os melhores profissionais ou ofereça seus serviços
        </p>
      </div>

      <ul
        className="mt-8 space-y-3 text-gray-700 dark:text-gray-300"
        aria-label="Benefícios da plataforma"
      >
        <li className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="grid place-items-center p-2.5 bg-lime-400 rounded-full"
          >
            <CheckIcon className="dark:text-black" />
          </span>
          Cadastro rápido e seguro
        </li>
        <li className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="grid place-items-center p-2.5 bg-lime-400 rounded-full"
          >
            <CheckIcon className="dark:text-black" />
          </span>
          Encontre profissionais qualificados
        </li>
        <li className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="grid place-items-center p-2.5 bg-lime-400 rounded-full"
          >
            <CheckIcon className="dark:text-black" />
          </span>
          Ofereça seus serviços para uma ampla audiência
        </li>
        <li className="flex items-center gap-2">
          <span
            aria-hidden="true"
            className="grid place-items-center p-2.5 bg-lime-400 rounded-full"
          >
            <CheckIcon className="dark:text-black" />
          </span>
          Avaliações e feedbacks para garantir qualidade
        </li>
      </ul>
    </section>
  );
}
