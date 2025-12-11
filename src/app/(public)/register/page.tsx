"use client";

import { ClientForm } from "@/components/forms/clientForm";
import { ProviderForm } from "@/components/forms/providerForm";
import { UserIcon, SuitcaseIcon, CheckCircleIcon } from "@phosphor-icons/react";
import Link from "next/link";
import React, { useState } from "react";
import { WelcomeSection } from "@/components/welcomeSection";
import { useSearchParams } from "next/navigation";

const Register: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  React.useEffect(() => {
    if (type && (type === "client" || type === "professional")) {
      setRole(type);
    }
  }, [type]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 px-6 md:px-12 py-7 md:min-h-[calc(100vh-65px)] gap-8">
      <WelcomeSection />

      <section
        className="grid place-items-center"
        aria-labelledby="login-heading"
      >
        <div className="flex items-center justify-center">
          <div className="w-full max-w-lg px-6 py-6 md:py-8 bg-white dark:bg-black-200 rounded-3xl shadow-xl">
            <h1 className="text-2xl md:text-3xl font-bold text-center">
              Cadastro
            </h1>

            <div className="mt-1 md:mt-3 mb-2 md:mb-6 font-semibold text-zinc-500 dark:text-white flex justify-center gap-1.5">
              <p>Já possui conta?</p>
              <Link href="login" className="text-blue-500 cursor-pointer">
                Entrar
              </Link>
            </div>

            <h2 className="font-semibold text-sm text-center text-zinc-500 dark:text-white mb-2 mt-2">
              Como você quer usar o ProLocal?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 mb-7 mt-3">
              <button
                type="button"
                onClick={() => setRole("client")}
                className={`relative  flex-1 border-2 rounded-2xl p-5 flex flex-col items-center transition-all duration-150 focus:outline-none
              ${
                role === "client"
                  ? "border-lime-400 bg-lime-50 dark:bg-lime-950 shadow-lg"
                  : "border-gray-200 dark:border-zinc-700 bg-white dark:bg-black-200"
              }
              hover:border-lime-400`}
                aria-pressed={role === "client"}
              >
                <UserIcon size={36} className="mb-2 text-lime-500" />
                <span className="font-bold md:text-lg mb-1">Sou Cliente</span>
                <span className="text-sm text-gray-500 dark:text-zinc-300 mb-2 text-center">
                  Contrate serviços perto de você
                </span>
                {role === "client" && (
                  <CheckCircleIcon
                    size={22}
                    className="text-lime-500 mt-1 absolute top-2 right-2"
                  />
                )}
              </button>
              <button
                type="button"
                onClick={() => setRole("professional")}
                className={`relative flex-1 border-2 rounded-2xl p-5 flex flex-col items-center transition-all duration-150 focus:outline-none
              ${
                role === "professional"
                  ? "border-lime-400 bg-lime-50 dark:bg-lime-950 shadow-lg"
                  : "border-gray-200 dark:border-zinc-700 bg-white dark:bg-black-200"
              }
              hover:border-lime-400`}
                aria-pressed={role === "professional"}
              >
                <SuitcaseIcon size={36} className="mb-2 text-lime-500" />
                <span className="font-bold md:text-lg mb-1">
                  Sou Profissional
                </span>
                <span className="text-sm text-gray-500 dark:text-zinc-300 mb-2 text-center">
                  Ofereça seus serviços e conquiste clientes
                </span>
                {role === "professional" && (
                  <CheckCircleIcon
                    size={22}
                    className="text-lime-500 mt-1 absolute top-2 right-2"
                  />
                )}
              </button>
            </div>

            {role === "professional" && <ProviderForm mode="create" />}
            {role === "client" && <ClientForm mode="create" />}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
