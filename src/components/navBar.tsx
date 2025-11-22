"use client";

import { useAuth } from "@/hooks/useAuth";
import { SignOutIcon, HouseIcon, MagnifyingGlassIcon, UserIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ModalLogout } from "./modalLogout";
import { logout } from "@/utils/logout";

export function NavBar() {
  const pathname = usePathname();
  const { logout: authLogout, user } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const navigationLinks = [
    { href: "/home", icon: <HouseIcon size={20} />, label: "Home", showFor: ["provider", "admin"] },
    { href: "/profile", icon: <UserIcon size={20} />, label: "Profile", showFor: ["client", "provider", "admin"] },
    { href: "/", icon: <MagnifyingGlassIcon size={20} />, label: "Search", showFor: ["client", "provider", "admin"] },
  ];

  const filteredLinks = user
    ? navigationLinks.filter(link => link.showFor.includes(user.role))
    : navigationLinks;

  function handleLogout() {
    authLogout();
    logout();
    setIsLogoutModalOpen(false);
  }

  return (
    <nav className="fixed bottom-2 left-0 w-full lg:hidden">
      <ul className="max-w-3xl mx-4 bg-black-200 text-white flex items-center justify-evenly p-7 rounded-[36px]">
        {filteredLinks.map(({ href, icon, label }) => {
          const isActive = pathname === href;

          return (
            <li key={label}>
              <Link
                href={href}
                className={`transition-colors ${isActive ? "text-lime-400" : "text-white"}`}
                aria-label={label}
              >
                {icon}
              </Link>
            </li>
          );
        })}

        {user && (
          <li>
            <button
              onClick={() => setIsLogoutModalOpen(true)}
              aria-label="Logout"
              className="text-white transition-colors hover:text-lime-400"
            >
              <SignOutIcon size={18} />
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
