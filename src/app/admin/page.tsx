"use client";

import { AppShell } from "@/components/shared/app-shell";
import { Protected } from "@/components/shared/protected";
import { PageTitle } from "@/components/shared/page-title";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/components/providers/auth-provider";

export default function AdminDashboard() {
  const { session } = useAuth();

  return (
    <Protected requiredRole="admin">
      <AppShell>
        <PageTitle
          title="Admin Dashboard"
          description="System overview, users, and platform controls."
        />

        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <p className="text-sm text-muted">Role</p>
            <p className="mt-2 font-semibold capitalize">
              {session?.user.role}
            </p>
          </Card>

          <Card>
            <p className="text-sm text-muted">Active Mode</p>
            <p className="mt-2 font-semibold uppercase">
              {process.env.NEXT_PUBLIC_APP_MODE ?? "demo"}
            </p>
          </Card>

          <Card>
            <p className="text-sm text-muted">Admin Account</p>
            <p className="mt-2 truncate font-semibold">
              {session?.user.email}
            </p>
          </Card>
        </div>

        <Card className="mt-5">
          <h2 className="font-semibold">Admin Controls</h2>
          <p className="mt-2 text-sm text-muted">
            Add user management, system metrics, and billing overrides here.
          </p>
        </Card>
      </AppShell>
    </Protected>
  );
}
