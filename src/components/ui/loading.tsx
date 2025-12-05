export function Loading() {
  return <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div className="border rounded-lg p-6 shadow-md bg-white dark:bg-black-200">
      <p className="font-bold text-2xl">Carregando...</p>
    </div>
  </div>
}