"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import type { UserRole } from "@/types";

export function Protected({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: UserRole;
}) {
  const { session, loading } = useAuth();
  const router = useRouter();

  const isUnauthorized =
    !loading &&
    session &&
    requiredRole &&
    session.user.role !== requiredRole;

  useEffect(() => {
    if (loading) return;
    if (!session) {
      router.replace("/login");
    } else if (isUnauthorized) {
      router.replace("/dashboard");
    }
  }, [loading, session, isUnauthorized, router]);

  if (loading || !session || isUnauthorized) {
    return (
      <div className="grid min-h-[60vh] place-items-center text-sm text-muted">
        Checking access…
      </div>
    );
  }

  return children;
}
