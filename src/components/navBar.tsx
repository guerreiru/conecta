"use client";

import { SUCCESS_MESSAGES } from "@/constants/messages";
import { useAuth } from "@/hooks/useAuth";
import {
  HouseIcon,
  InfoIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { ModalLogout } from "./modalLogout";

export function NavBar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const router = useRouter();

  const navigationLinks = [
    {
      href: "/dashboard",
      icon: <HouseIcon size={24} />,
      label: "Minha Área",
      showFor: ["provider"],
    },
    {
      href: "/",
      icon: <MagnifyingGlassIcon size={24} />,
      label: "Search",
      showFor: ["guest", "client", "provider"],
    },
    {
      href: "/profile",
      icon: <UserIcon size={24} />,
      label: "Perfil",
      showFor: ["provider"],
    },
    {
      href: "/about",
      icon: <InfoIcon size={24} />,
      label: "Sobre",
      showFor: ["guest", "client", "provider"],
    },
  ];

  const filteredLinks = user
    ? navigationLinks.filter((link) => link.showFor.includes(user.role))
    : navigationLinks.filter((link) => link.showFor.includes("guest"));

  function handleLogout() {
    logout();
    toast.success(SUCCESS_MESSAGES.LOGOUT_SUCCESS);
    setIsLogoutModalOpen(false);
  }

  return (
    <nav className="fixed bottom-2 left-0 w-full px-4 grid place-items-center md:hidden">
      <ul className="gap-6 max-w-2xl mx-4 flex items-center justify-between px-4 py-2 rounded-[36px] bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] relative before:content-[''] before:absolute before:inset-0 before:rounded-[36px] before:bg-gradient-to-b before:from-white/30 before:to-transparent before:pointer-events-none before:opacity-50">
        {filteredLinks.map(({ href, icon, label }) => {
          const isActive = pathname === href;

          return (
            <li
              key={label}
              className={`block p-2 rounded-full transition-colors ${
                isActive
                  ? "text-black-200 bg-lime-400"
                  : "text-black dark:text-white"
              }`}
            >
              <Link href={href} aria-label={label}>
                {icon}
              </Link>
            </li>
          );
        })}
      </ul>

      <ModalLogout
        open={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </nav>
  );
}
