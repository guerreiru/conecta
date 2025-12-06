"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ModalLogout } from "./modalLogout";
import { toast } from "react-toastify";
import { SUCCESS_MESSAGES } from "@/constants/messages";

function ListItem({
  href,
  isActive,
  title,
}: {
  href: string;
  isActive: boolean;
  title: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`px-4 md:px-6 py-2 hover:brightness-90 font-medium rounded-xl ${
          isActive ? "bg-lime-400 dark:text-black" : ""
        }`}
      >
        {title}
      </Link>
    </li>
  );
}

export function NavHeader() {
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
    <nav className="hidden md:flex items-center gap-1 md:gap-2 min-h-9">
      <ul className="flex items-center gap-1 md:gap-2">
        <ListItem href="/" isActive={isActive("/")} title="Buscar serviços" />

        {ready && user && user?.role !== "client" && (
          <ListItem href="/home" isActive={isActive("/home")} title="Home" />
        )}

        {ready && !user && (
          <>
            <ListItem
              href="/login"
              isActive={isActive("/login")}
              title="Entrar"
            />
            <ListItem
              href="/register"
              isActive={isActive("/register")}
              title="Cadastrar-se"
            />
          </>
        )}

        {ready && user && (
          <ListItem
            href="/profile"
            isActive={isActive("/profile")}
            title="Perfil"
          />
        )}

        {!ready && (
          <>
            <li className="px-4 md:px-6">
              <div className="h-7 w-9 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
            </li>
            <li className="px-4 md:px-6">
              <div className="h-7 w-9 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
            </li>
            <li className="px-4 md:px-6">
              <div className="h-7 w-10 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
            </li>
          </>
        )}

        {ready && user && (
          <li>
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="px-4 md:px-6 font-medium rounded-xl"
            >
              Sair
            </button>
          </li>
        )}
      </ul>

      <ModalLogout
        open={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </nav>
  );
}
