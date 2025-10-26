import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NavHeader } from "./navHeader";

async function handleLogout() {
  "use server";

  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("roles");

  redirect("/login");
}

export async function Header() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return (
    <header className="items-center justify-between hidden md:flex py-4">
      <p className="text-black font-bold text-xl">ProMatch</p>
      <NavHeader accessToken={accessToken} handleLogout={handleLogout} />
    </header>
  );
}
