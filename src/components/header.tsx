import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NavHeader } from "./navHeader";

export async function Header() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return (
    <header className="items-center bg-white dark:bg-black-200 justify-between hidden md:flex py-4 px-4 md:px-6 border-b border-gray-200 dark:border-zinc-700">
      <p className="font-bold text-xl">ProMatch</p>
      <NavHeader accessToken={accessToken} />
    </header>
  );
}
