import { Header } from "@/components/header";
import { NavBar } from "@/components/navBar";
import { ErrorBoundary } from "@/components/errorBoundary";
import { AuthProvider } from "@/providers/authProvider";
import { CategoriesProvider } from "@/providers/categoriesProvider";
import { QueryProvider } from "@/providers/queryProvider";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001"
  ),
  title: {
    default: "ProLocal - Encontre Profissionais Qualificados Perto de Você",
    template: "%s | ProLocal",
  },
  description:
    "Conecte-se com profissionais qualificados na sua região. Encontre prestadores de serviços de confiança para reformas, reparos, manutenção e muito mais. Rápido, fácil e sem complicações.",
  keywords: [
    "serviços profissionais",
    "prestadores de serviços",
    "profissionais qualificados",
    "serviços locais",
    "reformas",
    "manutenção",
    "reparos",
    "marketplace de serviços",
    "encontrar profissionais",
    "contratar serviços",
  ],
  authors: [{ name: "ProLocal" }],
  creator: "ProLocal",
  publisher: "ProLocal",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    title: "ProLocal - Encontre Profissionais Qualificados Perto de Você",
    description:
      "Conecte-se com profissionais qualificados na sua região. Marketplace de serviços confiável e fácil de usar.",
    siteName: "ProLocal",
  },
  twitter: {
    card: "summary_large_image",
    title: "ProLocal - Encontre Profissionais Qualificados Perto de Você",
    description:
      "Conecte-se com profissionais qualificados na sua região. Marketplace de serviços confiável e fácil de usar.",
    creator: "@prolocal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {},
};

const manrope = Manrope({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ProLocal",
    description:
      "Marketplace para conectar profissionais qualificados com clientes que precisam de serviços locais",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
    },
  };

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`antialiased ${manrope.className} relative pb-28 lg:pb-0`}
      >
        <ErrorBoundary>
          <QueryProvider>
            <AuthProvider>
              <CategoriesProvider>
                <Header />
                {children}
                <ToastContainer autoClose={500} />
                <NavBar />
              </CategoriesProvider>
            </AuthProvider>
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
