"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/shared/app-shell";
import { Protected } from "@/components/shared/protected";
import { PageTitle } from "@/components/shared/page-title";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/components/providers/auth-provider";
import { useServices } from "@/components/providers/service-provider";
import { Header } from "@/components/shared/header";

export default function Dashboard() {
  const { session } = useAuth();
  const s = useServices();
  const [count, setCount] = useState(0);

  useEffect(() => {
    s.db
      .list<{ id: string }>("notes")
      .then((x) => setCount(x.length))
      .catch(() => setCount(0));
  }, [s]);

  return (
    <Protected>
      <AppShell>
        <PageTitle
          title="Dashboard"
          description="Your workspace at a glance."
        />
        
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <p className="text-sm text-muted">Signed in as</p>
            <p className="mt-2 font-semibold">{session?.user.email}</p>
          </Card>

          <Card>
            <p className="text-sm text-muted">Saved records</p>
            <p className="mt-2 text-3xl font-semibold">{count}</p>
          </Card>
        </div>

        <Card className="mt-5">
          <h2 className="font-semibold">This is your Dashboard page.</h2>
          <p className="mt-2 text-sm text-muted">
            Add your product dashboard here.
          </p>
        </Card>
      </AppShell>
    </Protected>
  );
}
