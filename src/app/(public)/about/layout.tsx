import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Saiba mais sobre a ProLocal, nossa missão e valores",
  robots: {
    index: false,
    follow: true,
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
