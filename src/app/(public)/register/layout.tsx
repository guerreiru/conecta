import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar Conta",
  description:
    "Cadastre-se na ProLocal como cliente ou profissional. Comece a oferecer ou contratar serviços hoje mesmo.",
  openGraph: {
    title: "Cadastre-se na ProLocal",
    description:
      "Crie sua conta gratuita e conecte-se com profissionais ou clientes.",
  },
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
