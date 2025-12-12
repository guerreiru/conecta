import { ServiceSkeleton } from "./serviceSkeleton";

export function UserSkeleton() {
  return (
    <div className="max-w-3xl mx-auto w-full px-4 animate-pulse">
      <header className="py-5 md:py-10 flex md:items-center justify-between gap-x-2 gap-y-4 flex-col md:flex-row flex-wrap">
        <section className="w-full md:w-auto">
          <div className="flex items-center gap-5">
            <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>

          <div className="h-4 w-60 bg-gray-300 dark:bg-gray-700 rounded mt-2" />
        </section>

        <section className="flex flex-col gap-2">
          <div className="h-10 w-40 bg-gray-300 dark:bg-gray-700 rounded-xl" />
          <div className="h-3 w-48 bg-gray-300 dark:bg-gray-700 rounded" />
        </section>
      </header>

      <ServiceSkeleton />
    </div>
  );
}
