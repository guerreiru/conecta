import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) redirect("/login");

  return <div>Área logada</div>;
}
