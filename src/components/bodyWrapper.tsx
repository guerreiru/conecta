"use client";

import { CaretLeftIcon } from "@phosphor-icons/react";
import { usePathname, useRouter } from "next/navigation";

export function BodyWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <main className="relative">
      {pathname !== "/" && (
        <div className="px-4 py-4 md:px-6 absolute">
          <button
            onClick={() => router.back()}
            aria-label="Logout"
            className="transition-colors hover:text-lime-400 rounded-full"
          >
            <CaretLeftIcon className="text-2xl md:text-3xl" />
          </button>
        </div>
      )}

      <div
        className={`${pathname == "/" || pathname == "/about" ? "" : "pt-14"}`}
      >
        {children}
      </div>
    </main>
  );
}
