import { NavHeader } from "./navHeader";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/imgs/logo.svg";

export async function Header() {
  return (
    <header className="items-center bg-white dark:bg-black-200 justify-between flex py-3 px-4 md:px-6 border-b border-gray-200 dark:border-zinc-700">
      <Link href="/">
        <div className="flex items-end gap-2">
          <Image src={Logo} alt="Logo" width={32} height={32} />
          <div className="min-h-9 grid items-center">
            <div className="flex items-center">
              <p className="leading-1 text-xl font-anton">PRO</p>
              <p className="leading-1 text-xl font-anton text-lime-400">
                LOCAL
              </p>
            </div>
            <span className="text-[9px] leading-0">
              Conectando Profissionais
            </span>
          </div>
        </div>
      </Link>
      <NavHeader />
    </header>
  );
}
