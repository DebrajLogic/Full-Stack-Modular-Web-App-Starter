"use client";

import { AppShell } from "@/components/shared/app-shell";
import { Protected } from "@/components/shared/protected";
import { PageTitle } from "@/components/shared/page-title";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/components/providers/auth-provider";

export default function Settings() {
  const { session } = useAuth();

  return (
    <Protected>
      <AppShell>
        <PageTitle
          title="Settings"
          description="Manage your account preferences."
        />

        <Card>
          <h2 className="font-semibold">Account</h2>
          <p className="mt-2 text-sm text-muted">{session?.user.email}</p>
          <p className="mt-5 text-sm">This is your Settings page.</p>
        </Card>
      </AppShell>
    </Protected>
  );
}
