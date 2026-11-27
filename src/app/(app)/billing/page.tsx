"use client";

import { useEffect, useState } from "react";
import { AppShell } from "@/components/shared/app-shell";
import { Protected } from "@/components/shared/protected";
import { PageTitle } from "@/components/shared/page-title";
import { Card } from "@/components/ui/card";
import { useServices } from "@/components/providers/service-provider";

export default function Billing() {
  const s = useServices();
  const [notice, setNotice] = useState("Loading subscription…");

  useEffect(() => {
    s.payments
      .getSubscription()
      .then((x) => setNotice(`${x.plan} · ${x.status}`))
      .catch((e) =>
        setNotice(e instanceof Error ? e.message : "Billing not configured")
      );
  }, [s]);

  return (
    <Protected>
      <AppShell>
        <PageTitle
          title="Billing"
          description="Manage your plan and subscription."
        />

        <Card>
          <h2 className="font-semibold">Subscription</h2>
          <p className="mt-2 text-sm text-muted">{notice}</p>
          <p className="mt-5 text-sm">
            Payment processing is not enabled until a billing provider is
            configured.
          </p>
        </Card>
      </AppShell>
    </Protected>
  );
}
