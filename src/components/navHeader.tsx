"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ModalLogout } from "./modalLogout";
import { logout } from "@/utils/logout";

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
        className={`px-4 md:px-6 py-2 hover:brightness-90 font-medium rounded-xl ${isActive ? "bg-lime-400 dark:text-black" : ""
          }`}
      >
        {title}
      </Link>
    </li>
  );
}

export function NavHeader({
  accessToken,
}: {
  accessToken: string | undefined;
}) {
  const pathName = usePathname();
  const { logout: authLogout, user } = useAuth()
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const isActive = (path: string) => pathName === path;

  function handleLogout() {
    authLogout();
    logout();
    setIsLogoutModalOpen(false);
  }

  return (
    <nav className="flex items-center gap-1 md:gap-2">
      <ul className="flex items-center gap-1 md:gap-2">
        {accessToken && user?.role !== 'client' && (
          <ListItem href="/home" isActive={isActive("/home")} title="Home" />
        )}

        <ListItem href="/" isActive={isActive("/")} title="Buscar serviços" />

        {!accessToken && (
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

        {accessToken && (
          <ListItem
            href="/profile"
            isActive={isActive("/profile")}
            title="Perfil"
          />
        )}

        {/* <ListItem href="/plans" isActive={isActive("/plans")} title="Planos" /> */}
        {accessToken && (
          <li>
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              className="px-4 md:px-6 py-2 font-medium rounded-xl"
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
