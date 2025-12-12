import { ServiceSkeleton } from "./serviceSkeleton";

export function ServiceSkeletonList() {
  return (
    <>
      <section className="grid grid-cols-3 gap-2 mt-4 animate-pulse">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-20 bg-gray-200 dark:bg-gray-700 rounded-xl"
          />
        ))}
      </section>

      <section className="py-4">
        <h2 className="text-2xl mt-5 font-semibold text-center opacity-70 animate-pulse">
          Carregando serviços...
        </h2>

        <ul className="grid mt-6 gap-4">
          {[1, 2, 3].map((i) => (
            <li key={i}>
              <ServiceSkeleton />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
