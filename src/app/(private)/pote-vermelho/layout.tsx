"use client";

import { ProtectedRoute } from "@/components/protectedRoute";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute allowedRoles={["nanal"]}>
      <main>{children}</main>
    </ProtectedRoute>
  );
}
