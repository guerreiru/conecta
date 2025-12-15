"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const router = useRouter();

  const isAuthenticated = !!user;
  const isAuthorized =
    !allowedRoles || (user && allowedRoles.includes(user.role));

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (!isAuthorized) {
      router.replace("/unauthorized");
    }
  }, [loading, isAuthenticated, isAuthorized, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh_-_65px)]">
        <p className="text-lg">Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated || !isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
