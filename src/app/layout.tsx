import { Header } from "@/components/header";
import { AuthProvider } from "@/providers/authProvider";
import { CategoriesProvider } from "@/providers/categoriesProvider";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conecta",
  description: "Busque serviços sem complicações",
};

const manrope = Manrope({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-br">
      <body className={`antialiased ${manrope.className} px-4 relative pb-20 lg:pb-0`}>
        <AuthProvider>
          <CategoriesProvider>
            <Header />
            {children}
            <ToastContainer />
          </CategoriesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
