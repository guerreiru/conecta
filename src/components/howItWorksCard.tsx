import { FunnelIcon, HeartIcon } from "@phosphor-icons/react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import { ReactNode } from "react";

type StepProps = {
  children: ReactNode;
  title: string;
  description: string;
};

function Step({ children, title, description }: StepProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="p-2 md:p-3 bg-black w-fit rounded-full self-center">
        {children}
      </div>

      <div className="max-w-20 md:max-w-none">
        <p className="text-center text-slate-800 text-sm font-semibold">
          {title}
        </p>
        <p className="mt-1 text-center text-gray-600 dark:text-slate-800 text-[10px]">
          {description}
        </p>
      </div>
    </div>
  );
}

export function HowItWorksCard() {
  return (
    <div className="bg-lime-400/70 rounded-3xl p-4 text-black grid gap-6 my-2">
      <div className="text-center">
        <p className="text-black text-xl font-bold">Como funciona</p>
        <p className="text-gray-600 dark:text-slate-800 text-sm font-medium">
          É muito simples contratar um serviço
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        <Step title="Busque" description="Encontre o profissional ideal">
          <MagnifyingGlassIcon size={20} className="text-lime-400" />
        </Step>
        <Step title="Compare" description="Compare e escolha">
          <FunnelIcon size={20} className="text-lime-400" />
        </Step>
        <Step title="Contrate" description="Encontre o profissional ideal">
          <HeartIcon size={20} className="text-lime-400" />
        </Step>
      </div>
    </div>
  );
}
