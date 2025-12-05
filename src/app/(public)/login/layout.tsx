import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description:
    "Faça login na ProLocal para acessar sua conta e gerenciar seus serviços",
  robots: {
    index: false,
    follow: true,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
