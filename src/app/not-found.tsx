import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black-200 px-4">
      <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
        Página Não Encontrada
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Desculpe, a página que você está procurando não existe.
      </p>
      <Link href="/" className="text-lime-500 hover:underline font-semibold">
        Voltar para a página inicial
      </Link>
    </div>
  );
}
