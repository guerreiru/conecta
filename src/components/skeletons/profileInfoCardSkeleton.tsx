export function ProfileInfoCardSkeleton() {
  return (
    <div className="shadow border border-gray-200 dark:border-black rounded-3xl mt-2 p-6 bg-white dark:bg-black-200 w-full max-w-2xl mx-auto animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-6 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-5 w-5 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>

      <div className="mt-6">
        <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
        <div className="h-5 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>

      <div className="my-4">
        <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
        <div className="h-5 w-56 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>

      <div className="mb-6">
        <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
        <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>

      <div className="mb-6">
        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded mb-2" />
        <div className="h-5 w-full bg-gray-300 dark:bg-gray-700 rounded" />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-xl" />
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-xl" />
      </div>
    </div>
  );
}
