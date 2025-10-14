import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
    <header className="flex items-center justify-end ">
      <nav>
        <ul className="flex items-center gap-2.5">
          {!accessToken ? (
            <>
              <li>
                <Link href="/login">Entrar</Link>
              </li>
              <li>
                <Link href="/register">Cadastrar-se</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/home">Home</Link>
              </li>
              <li>
                <Link href="/">Buscar Serviço</Link>
              </li>
              <li>
                <form action={handleLogout}>
                  <button type="submit">Sair</button>
                </form>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
