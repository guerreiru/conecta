import { Suspense } from "react";
import { Register } from "./register";
import { RegisterSkeleton } from "@/components/skeletons/registerSkeleton";

export default function RegisterPage() {
  return (
    <Suspense fallback={<RegisterSkeleton />}>
      <Register />
    </Suspense>
  );
}
