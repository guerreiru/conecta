import {
  CircleIcon,
  CrownSimpleIcon,
  LightningIcon,
  MedalIcon,
} from "@phosphor-icons/react/dist/ssr";

type Variant = "free" | "plus" | "premium" | "enterprise";

type PlanBadgesProps = {
  title: string;
  variant?: Variant;
};

export function PlanBadge({ title, variant = "free" }: PlanBadgesProps) {
  const variantStyles: Record<Variant, string> = {
    free: "from-neutral-950 to-gray-600 dark:from-neutral-500 dark:to-gray-700",
    plus: "from-yellow-500 to-yellow-700",
    premium: "from-blue-500 to-blue-700",
    enterprise: "from-violet-500 to-violet-900",
  };

  const selectedVariant = variantStyles[variant] || variantStyles["free"];

  const icon = {
    free: <CircleIcon size={14} />,
    plus: <MedalIcon size={14} />,
    premium: <CrownSimpleIcon size={14} />,
    enterprise: <LightningIcon size={14} />,
  };

  return (
    <div
      className={`text-sm px-3 py-2 rounded-full font-bold flex items-center gap-2 text-white bg-gradient-to-b ${selectedVariant}`}
    >
      <span className="rounded-full p-0.5 bg-white/25 grid place-items-center w-fit">
        {icon[variant]}
      </span>
      <p>{title}</p>
    </div>
  );
}
