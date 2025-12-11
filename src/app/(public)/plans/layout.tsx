import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Planos",
  description: "Conheça os planos e preços da ProLocal",
  robots: {
    index: false,
    follow: true,
  },
};

export default function PlansLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
