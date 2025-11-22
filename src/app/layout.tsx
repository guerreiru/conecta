import { Header } from "@/components/header";
import { NavBar } from "@/components/navBar";
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
      <body className={`antialiased ${manrope.className} relative pb-24 lg:pb-0`}>
        <AuthProvider>
          <CategoriesProvider>
            <Header />
            {children}
            <ToastContainer autoClose={500} />
            <NavBar />
          </CategoriesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
