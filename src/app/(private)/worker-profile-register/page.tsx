"use client";

import { CompanyForm } from "@/components/forms/companyForm";
import { ProviderForm } from "@/components/forms/providerForm";
import { Select } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export default function WorkerProfileRegister() {
  const [profileType, setProfileType] = useState("");
  const { user } = useAuth();

  if (!user?.id) {
    return null;
  }

  return (
    <div className="space-y-6 py-4 max-w-3xl mx-auto">
      <Select
        label="Selecione o tipo de perfil"
        value={profileType}
        onChange={({ target }) => setProfileType(target.value)}
        options={[
          {
            label: "Profissional autônomo",
            value: "provider",
          },
          {
            label: "Empresa",
            value: "company",
          },
        ]}
      />

      {profileType === "provider" && <ProviderForm userId={user.id} />}
      {profileType === "company" && <CompanyForm userId={user.id} />}
    </div>
  );
}
