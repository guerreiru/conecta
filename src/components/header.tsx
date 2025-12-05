import { NavHeader } from "./navHeader";
import Link from "next/link";

export async function Header() {
  return (
    <header className="items-center bg-white dark:bg-black-200 justify-between hidden md:flex py-2 px-4 md:px-6 border-b border-gray-200 dark:border-zinc-700">
      <Link href="/" className="font-bold text-xl">
        ProLocal
      </Link>
      <NavHeader />
    </header>
  );
}
