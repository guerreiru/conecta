import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="min-h-[calc(100vh_-_24px)] grid place-items-center">
      <div className="grid gap-4">
        <h1 className="text-3xl text-center">Não autorizado!</h1>
        <div>
          <p>Você não tem permissão para acessar essa área</p>
          <p>
            Você deve ter cadastrado o perfil de Empresa ou Prestador de Serviço
            para acessar
          </p>
        </div>
        <Button>
          <Link href="/">Início</Link>
        </Button>
      </div>
    </main>
  );
}
