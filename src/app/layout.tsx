import { Header } from "@/components/header";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { AuthProvider } from "@/providers/authProvider";
import { CategoriesProvider } from "@/providers/categoriesProvider";
import { User } from "@/types/User";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { Manrope } from "next/font/google";
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
  let user: User | null = null;

  try {
    const res = await fetchWithAuth("/auth/me");
    if (res.ok) user = await res.json();
  } catch (e) {
    console.error("Erro ao buscar usuário no servidor:", e);
  }

  return (
    <html lang="pt-br">
      <body className={`antialiased ${manrope.className} px-4`}>
        <AuthProvider initialUser={user}>
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
