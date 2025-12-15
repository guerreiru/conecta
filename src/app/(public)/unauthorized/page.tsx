import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="min-h-[calc(100vh-65px)] grid place-items-center">
      <div className="grid gap-4">
        <h1 className="text-3xl text-center">Não autorizado!</h1>
        <div>
          <p>Você não tem permissão para acessar essa área!!!!!!!</p>
        </div>
        <Link href="/">
          <Button>Início</Button>
        </Link>
      </div>
    </main>
  );
}
