import { Header } from "@/components/header";
import { NavBar } from "@/components/navBar";
import { ErrorBoundary } from "@/components/errorBoundary";
import { AuthProvider } from "@/providers/authProvider";
import { CategoriesProvider } from "@/providers/categoriesProvider";
import { QueryProvider } from "@/providers/queryProvider";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ToastContainer } from "react-toastify";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001"
  ),
  title: {
    default: "ProLocal - Encontre Profissionais Qualificados Perto de Você",
    template: "ProLocal - %s",
  },
  description:
    "Conecte-se com profissionais qualificados na sua região. Encontre prestadores de serviços de confiança para reformas, reparos, manutenção e muito mais. Rápido, fácil e sem complicações.",
  keywords: [
    "contratar serviços",
    "reformas",
    "manutenção",
    "reparos",
    "marketplace de serviços",
    "profissionais qualificados",
    "prestadores de serviços",
    "serviços locais",
    "encontrar profissionais",
    "serviços profissionais",
  ],

  authors: [{ name: "ProLocal" }],
  creator: "ProLocal",
  publisher: "ProLocal",

  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "ProLocal",
    title: "ProLocal - Encontre Profissionais Qualificados Perto de Você",
    description:
      "Conecte-se com profissionais qualificados na sua região. Encontre prestadores de serviços de confiança para reformas, reparos, manutenção e muito mais.",
    images: [
      {
        url: "/antevisao.png",
        width: 1200,
        height: 630,
        alt: "ProLocal - Marketplace de Serviços Locais",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ProLocal - Encontre Profissionais Qualificados Perto de Você",
    description:
      "Conecte-se com profissionais qualificados na sua região. Encontre prestadores de serviços de confiança para reformas, reparos, manutenção e muito mais.",
    images: ["/antevisao.png"],
    creator: "@siteprolocal",
    site: "@siteprolocal",
  },

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#beee02",
      },
    ],
  },
  manifest: "/site.webmanifest",

  other: {
    "msapplication-TileColor": "#beee02",
    "theme-color": "#beee02",
  },
};

const manrope = Manrope({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "ProLocal",
    description: "Marketplace de serviços locais",
    url: baseUrl,
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Marketplace de serviços locais",
    provider: { "@type": "Organization", name: "ProLocal", url: baseUrl },
  };

  const searchSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ProLocal",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/search?q={search_term}`,
      "query-input": "required name=search_term",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: baseUrl,
      },
    ],
  };

  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(searchSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>

      <body
        className={`antialiased ${manrope.className} relative pb-20 lg:pb-0`}
      >
        <ErrorBoundary>
          <QueryProvider>
            <AuthProvider>
              <CategoriesProvider>
                <Header />
                <main>{children}</main>
                <ToastContainer autoClose={500} />
                <NavBar />
                <Analytics />
              </CategoriesProvider>
            </AuthProvider>
          </QueryProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
