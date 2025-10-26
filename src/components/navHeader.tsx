'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

function ListItem({ href, isActive, title }: { href: string, isActive: boolean, title: string }) {
  return <li>
    <Link
      href={href}
      className={`px-6 py-2 font-medium rounded-xl ${isActive ? 'bg-lime-400' : ''}`}
    >
      {title}
    </Link>
  </li>
}

export function NavHeader({ accessToken, handleLogout }: { accessToken: string | undefined, handleLogout: () => Promise<void> }) {
  const pathName = usePathname();

  const isActive = (path: string) => pathName === path;

  return (
    <nav>
      <ul className="flex items-center gap-1 md:gap-2 py-4">
        {!accessToken ? (
          <>
            <ListItem href="/login" isActive={isActive('/login')} title="Entrar" />
            <ListItem href="/register" isActive={isActive('/register')} title="Cadastrar-se" />
          </>
        ) : (
          <>
            <ListItem href="/home" isActive={isActive('/home')} title="Início" />
            <ListItem href="/" isActive={isActive('/')} title="Serviços" />
          </>
        )}

        <ListItem href="/plans" isActive={isActive('/plans')} title="Planos" />

        {accessToken && <>
          <ListItem href="/profile" isActive={isActive('/profile')} title="Perfil" />


          <li>
            <form action={handleLogout}>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl font-medium"
              >
                Sair
              </button>
            </form>
          </li>
        </>}

      </ul>
    </nav>
  );
}