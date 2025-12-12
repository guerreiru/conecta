export function ServiceSkeleton() {
  return (
    <div className="px-4 py-6 md:px-6 bg-gray-200 dark:bg-gray-800 rounded-2xl shadow-sm h-full border border-gray-300 dark:border-gray-700 animate-pulse">
      <div className="h-5 w-40 bg-gray-300 dark:bg-gray-600 rounded mb-4" />

      <div className="h-4 w-24 bg-gray-300 dark:bg-gray-600 rounded mb-6" />

      <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded mb-4" />
      <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-600 rounded mb-4" />

      <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded" />
    </div>
  );
}
