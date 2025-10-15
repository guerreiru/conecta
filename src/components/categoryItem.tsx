import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

type CategoryItemProps = {
  name: string;
  active: boolean;
  description?: string;
};

export function CategoryItem({ name, active, description }: CategoryItemProps) {
  return (
    <p
      className={`py-2 px-3 rounded-[20px] text-black w-fit block hover:brightness-90 ${active ? "bg-lime-400" : "bg-white"
        }`}
      title={description}
    >
      {capitalizeFirstLetter(name)}
    </p>
  );
}
