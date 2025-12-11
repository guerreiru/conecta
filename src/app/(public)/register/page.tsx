import { Suspense } from "react";
import { Register } from "./register";

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <Register />
    </Suspense>
  );
}
