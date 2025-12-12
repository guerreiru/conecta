type DashboardCardProps = {
  title?: string;
  value?: string;
  icon?: React.ReactNode;
};

export function DashboardCard({ title, value, icon }: DashboardCardProps) {
  return (
    <div className="py-3 px-2 md:px-6 border border-gray-200 rounded-2xl bg-white text-black shadow-md">
      <header className="flex items-center gap-2 md:gap-3.5 flex-wrap">
        {icon && (
          <span className="grid place-items-center p-2 bg-lime-400 rounded-full">
            {icon}
          </span>
        )}
        <p className="font-medium text-sm md:text-xl">{title}</p>
      </header>
      <p className="font-medium text-xl md:text-4xl text-center">{value}</p>
    </div>
  );
}
