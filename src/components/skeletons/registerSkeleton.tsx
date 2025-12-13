"use client";

export function RegisterSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 px-6 md:px-12 py-7 md:min-h-[calc(100vh-65px)] gap-8 animate-pulse">
      <div className="hidden lg:flex flex-col justify-center gap-4">
        <div className="h-8 w-3/4 bg-gray-200 dark:bg-gray-700 rounded-lg" />
        <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>

      <section className="grid place-items-center">
        <div className="w-full max-w-lg px-6 py-6 md:py-8 bg-white dark:bg-black-200 rounded-3xl shadow-xl">
          <div className="h-7 md:h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-4" />

          <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-6" />

          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-4" />

          <div className="flex flex-col sm:flex-row gap-4 mb-7">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex-1 border-2 border-gray-200 dark:border-zinc-700 rounded-2xl p-5 flex flex-col items-center"
              >
                <div className="h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded-full mb-3" />
                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                <div className="h-3 w-36 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="h-11 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <div className="h-11 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <div className="h-11 bg-gray-200 dark:bg-gray-700 rounded-lg" />
            <div className="h-11 bg-gray-300 dark:bg-gray-600 rounded-lg mt-6" />
          </div>
        </div>
      </section>
    </div>
  );
}
