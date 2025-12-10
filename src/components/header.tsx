"use client";

import Logo from "@/assets/imgs/logo.svg";
import ProLocal from "@/assets/imgs/prolocal.svg";
import WhiteLogo from "@/assets/imgs/white-logo.svg";
import WhiteProLocal from "@/assets/imgs/white-prolocal.svg";
import { SUCCESS_MESSAGES } from "@/constants/messages";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ModalLogout } from "./modalLogout";
import clsx from "clsx";

function ListItem({
  href,
  isActive,
  title,
  className,
  variant = "default",
}: {
  href: string;
  isActive: boolean;
  title: string;
  className?: string;
  variant?: "default" | "highlighted";
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "px-4 md:px-6 py-2 font-medium rounded-xl hover:brightness-90",
        variant === "default" && isActive && "bg-lime-400 dark:text-black",
        variant === "highlighted" &&
          (isActive
            ? "bg-lime-400 text-black"
            : "bg-black-200 dark:bg-white text-white dark:text-black-200"),

        className
      )}
    >
      {title}
    </Link>
  );
}

export function Header() {
  const pathName = usePathname();
  const { logout: authLogout, user, loading } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const ready = !loading && isHydrated;

  const isActive = (path: string) => pathName === path;

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  async function handleLogout() {
    setIsLogoutModalOpen(false);
    toast.success(SUCCESS_MESSAGES.LOGOUT_SUCCESS);
    await authLogout();
  }

  return (
    <header className="bg-white dark:bg-black-200 grid md:flex lg:grid-cols-3 items-center justify-between py-3 px-4 md:px-6 border-b border-gray-200 dark:border-zinc-700">
      <div className="flex items-center">
        <Link href="/" aria-label="Ir para página inicial">
          <div className="flex items-center gap-1">
            <Image
              src={Logo}
              alt="Logo ProLocal"
              width={27}
              height={40}
              quality={100}
              className="dark:hidden"
            />
            <Image
              src={WhiteLogo}
              alt="Logo ProLocal"
              width={27}
              height={40}
              quality={100}
              className="hidden dark:block"
            />
            <Image
              src={ProLocal}
              alt="ProLocal"
              width={74}
              height={16}
              className="dark:hidden"
            />
            <Image
              src={WhiteProLocal}
              alt="ProLocal"
              width={74}
              height={16}
              className="hidden dark:block"
            />
          </div>
        </Link>
      </div>

      <nav
        className="hidden md:flex justify-center gap-2"
        aria-label="Navegação principal"
      >
        <ListItem href="/" isActive={isActive("/")} title="Buscar serviços" />

        {ready && user && user?.role !== "client" && (
          <ListItem href="/home" isActive={isActive("/home")} title="Home" />
        )}

        {!ready && (
          <div
            className="w-28 px-4 md:px-6 py-2 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse"
            aria-hidden="true"
          />
        )}
      </nav>

      {ready && !user && (
        <nav
          className="hidden md:flex items-center justify-end gap-2"
          aria-label="Navegação de autenticação"
        >
          <ListItem
            href="/login"
            isActive={isActive("/login")}
            title="Entrar"
          />
          <ListItem
            href="/register"
            isActive={isActive("/register")}
            title="Cadastrar-se"
            variant="highlighted"
          />
        </nav>
      )}

      {ready && user && (
        <nav
          className="hidden md:flex items-center justify-end gap-2"
          aria-label="Navegação do usuário"
        >
          <ListItem
            href="/profile"
            isActive={isActive("/profile")}
            title="Perfil"
          />
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="px-4 md:px-6 py-2 font-medium rounded-xl hover:brightness-90 bg-black-200 text-white dark:bg-white dark:text-black-200"
            aria-label="Sair da conta"
          >
            Sair
          </button>
        </nav>
      )}

      {!ready && (
        <div
          className="hidden md:flex items-center justify-end gap-2"
          aria-hidden="true"
          aria-live="polite"
        >
          <div className="h-9 w-20 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
          <div className="h-9 w-28 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
        </div>
      )}

      <ModalLogout
        open={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </header>
  );
}
