import Link from "next/link";
import { ArrowRight, Layers, Database, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <section className="my-auto grid items-center gap-16 py-12 md:grid-cols-2">
      <div>
        <div className="pill-badge mb-6 inline-flex items-center gap-2.5 rounded-full px-3.5 py-1 text-xs">
          <span className="status-dot h-1.5 w-1.5 rounded-full" />
          <span>A clean foundation for your next product</span>
        </div>

        <h1 className="text-5xl font-semibold tracking-tight leading-[1.08]">
          Build your SaaS.{" "}
          <span className="text-liquid-chrome">
            Not the same setup, again.
          </span>
        </h1>

        <p className="mt-6 max-w-md text-base leading-7 text-muted">
          Authentication, shared UI and provider-independent service adapters.
          Start locally. Connect production services when ready.
        </p>

        <div className="mt-9 flex items-center gap-3">
          <Link href="/signup">
            <Button>
              Start building <ArrowRight size={15} />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4">
        <Card className="flex items-start gap-4 p-5">
          <div className="icon-box mt-0.5 rounded-xl p-2.5">
            <Layers size={18} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              One application layer
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Pages call contracts, never provider SDKs.
            </p>
          </div>
        </Card>

        <Card className="flex items-start gap-4 p-5">
          <div className="icon-box mt-0.5 rounded-xl p-2.5">
            <Database size={18} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Swap providers cleanly
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Demo adapters now. Supabase adapters later.
            </p>
          </div>
        </Card>

        <Card className="flex items-start gap-4 p-5">
          <div className="icon-box mt-0.5 rounded-xl p-2.5">
            <ShieldCheck size={18} />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">
              Clear boundaries
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-muted">
              Demo mode works without external credentials.
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}
