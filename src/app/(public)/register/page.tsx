"use client";

import { ClientForm } from "@/components/forms/clientForm";
import { ProviderForm } from "@/components/forms/providerForm";
import Link from "next/link";
import React, { useState } from "react";

const Register: React.FC = () => {
  const [role, setRole] = useState("client")

  return (
    <div className="flex items-center justify-center pt-6 px-4">
      <div className="w-full max-w-lg px-6 py-8 bg-white dark:bg-black-200 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold text-center">Cadastro</h1>

        <div className="mt-3 mb-6 font-semibold text-zinc-500 dark:text-white flex justify-center gap-1.5">
          <p>Já possui conta?</p>
          <Link href="login" className="text-blue-500 cursor-pointer">
            Entrar
          </Link>
        </div>

        <p className="font-semibold text-sm text-center text-zinc-500 dark:text-white">Tipo de conta</p>

        <div className="bg-gray-100 dark:bg-black grid grid-cols-2 gap-2 p-1 rounded-xl mt-4 mb-7">
          <button
            onClick={() => setRole("client")}
            className={`text-center rounded-lg cursor-pointer px-4 py-2.5 ${role === 'client' ? 'bg-white dark:bg-black-200' : ''}`}
          >
            Cliente
          </button>
          <button
            onClick={() => setRole("professional")}
            className={`text-center rounded-lg cursor-pointer px-4 py-2.5 ${role === 'professional' ? 'bg-white dark:bg-black-200' : ''}`}
          >
            Profissional
          </button>
        </div>

        {role === "professional" && <ProviderForm mode="create" />}
        {role === "client" && <ClientForm mode="create" />}
      </div>
    </div>
  );
};

export default Register;
