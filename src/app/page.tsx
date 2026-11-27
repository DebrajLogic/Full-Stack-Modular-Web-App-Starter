import Link from "next/link";
import {
  ArrowRight,
  Layers,
  Database,
  ShieldCheck,
  Lock,
  FolderUp,
  Mail,
  CreditCard,
  BarChart3,
  Rocket,
  Laptop,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const includedModules = [
  {
    icon: Lock,
    title: "Authentication & Roles",
    description:
      "Sign in, sign up, password resets, and separate workspaces for regular users and admins.",
  },
  {
    icon: Database,
    title: "Database Operations",
    description:
      "Create, read, update, and delete records through one clean interface—no vendor lock-in.",
  },
  {
    icon: FolderUp,
    title: "File Uploads",
    description:
      "Upload, manage, and serve user files seamlessly from local testing to cloud buckets.",
  },
  {
    icon: CreditCard,
    title: "Subscriptions & Billing",
    description:
      "Pre-wired plan status, checkout flows, and customer billing portal hooks.",
  },
  {
    icon: Mail,
    title: "Transactional Emails",
    description:
      "Ready to connect your favorite email provider whenever you are ready to send real messages.",
  },
  {
    icon: BarChart3,
    title: "Product Analytics",
    description:
      "Track key user actions cleanly without cluttering your pages with third-party scripts.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-24 py-14">
      <section className="grid items-center gap-16 py-6 md:grid-cols-2">
        <div>
          <div className="pill-badge mb-6 inline-flex items-center gap-2.5 rounded-full px-3.5 py-1 text-xs">
            <span className="status-dot h-1.5 w-1.5 rounded-full" />
            <span>A clean foundation for your next product</span>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight leading-[1.1] sm:text-5xl">
            Build your SaaS.{" "}
            <span className="text-liquid-chrome">
              Not the same setup, again.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-7 text-muted">
            Skip weeks of repetitive boilerplate. Design and test your entire
            product locally with zero backend setup—then flip one switch to go
            live on Supabase.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/signup">
              <Button>
                Start building <ArrowRight className="size-[1em]" />
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">Explore live demo</Button>
            </Link>
          </div>
        </div>

        <div className="grid gap-3.5">
          <Card className="flex items-start gap-4 p-5">
            <div className="icon-box mt-0.5 rounded-lg p-2.5">
              <Layers className="size-[1.1em]" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-foreground">
                Zero backend lock-in
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                Your screens stay completely independent from your database and
                auth provider.
              </p>
            </div>
          </Card>

          <Card className="flex items-start gap-4 p-5">
            <div className="icon-box mt-0.5 rounded-lg p-2.5">
              <Database className="size-[1.1em]" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-foreground">
                Switch providers effortlessly
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                Prototype offline today. Connect Supabase or any future backend
                without rewriting a single page.
              </p>
            </div>
          </Card>

          <Card className="flex items-start gap-4 p-5">
            <div className="icon-box mt-0.5 rounded-lg p-2.5">
              <ShieldCheck className="size-[1.1em]" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-foreground">
                Built for real teams
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-muted">
                Public pages, customer dashboards, and admin controls are
                separated from day one.
              </p>
            </div>
          </Card>
        </div>
      </section>

      <section className="border-t pt-20">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            How it works
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Three simple layers. Complete freedom.
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Most starters tangle your UI directly into one database vendor. We
            keep them cleanly separated so you can build faster and adapt
            anytime.
          </p>
        </div>

        <div className="mt-10 grid items-stretch gap-4 md:grid-cols-3">
          <Card className="flex flex-col justify-between p-6">
            <div>
              <span className="pill-badge inline-block rounded-md px-2.5 py-1 text-xs font-medium">
                Step 1 · Your Product UI
              </span>
              <h3 className="mt-4 text-base font-semibold">
                Focus on user experience
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Your pages, forms, and dashboards simply ask for what they
                need—like signing in a user or saving a record—without caring how
                it happens behind the scenes.
              </p>
            </div>
            <div className="mt-6 border-t pt-4 text-xs text-muted">
              Clean, readable screens
            </div>
          </Card>

          <Card className="flex flex-col justify-between p-6">
            <div>
              <span className="pill-badge inline-block rounded-md px-2.5 py-1 text-xs font-medium">
                Step 2 · The Smart Switch
              </span>
              <h3 className="mt-4 text-base font-semibold">
                One setting controls the backend
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                A single configuration switch decides whether your app runs in
                offline demo mode or connects to live production infrastructure.
              </p>
            </div>
            <div className="mt-6 border-t pt-4 text-xs text-foreground">
              Demo Mode ↔ Production Mode
            </div>
          </Card>

          <Card className="flex flex-col justify-between p-6">
            <div>
              <span className="pill-badge inline-block rounded-md px-2.5 py-1 text-xs font-medium">
                Step 3 · Pluggable Backends
              </span>
              <h3 className="mt-4 text-base font-semibold">
                Local today, cloud tomorrow
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Work on airplanes, test flows instantly in your browser, and
                connect Supabase with database security rules when you are ready
                to launch.
              </p>
            </div>
            <div className="mt-6 border-t pt-4 text-xs text-muted">
              Zero code rewrites required
            </div>
          </Card>
        </div>
      </section>

      <section className="border-t pt-20">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            Everything Included
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Every core SaaS building block, ready out of the box
          </h2>
          <p className="mt-3 text-sm leading-6 text-muted">
            Stop wiring up the same essentials on every project. Start with the
            foundations already in place and focus on what makes your product
            unique.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {includedModules.map(({ icon: Icon, title, description }) => (
            <Card key={title} className="p-6">
              <div className="icon-box inline-flex rounded-lg p-2.5">
                <Icon className="size-[1.1em]" />
              </div>
              <h3 className="mt-4 text-sm font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">
                {description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-t pt-20">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            Two Modes, One Codebase
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
            Build without friction. Launch with confidence.
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Laptop className="size-[1.1em] text-muted" />
                <h3 className="font-semibold">Instant Demo Mode</h3>
              </div>
              <span className="pill-badge rounded-full px-2.5 py-0.5 text-xs">
                Local & Offline
              </span>
            </div>
                       <p className="mt-3 text-sm text-muted">
              Start building the second you clone the repo. No API keys, no
              database setup, and no external accounts needed.
            </p>
            <ul className="mt-6 space-y-2.5 border-t pt-5 text-sm text-muted">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="size-[1em] text-foreground" />
                <span>Test user and admin logins right in your browser</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="size-[1em] text-foreground" />
                <span>Save records and test file uploads locally</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="size-[1em] text-foreground" />
                <span>Zero accidental calls to live production services</span>
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Rocket className="size-[1.1em] text-muted" />
                <h3 className="font-semibold">Production Mode</h3>
              </div>
              <span className="pill-badge rounded-full px-2.5 py-0.5 text-xs">
                Live on Supabase
              </span>
            </div>
            <p className="mt-3 text-sm text-muted">
              When you are ready for real customers, add your Supabase keys and
              flip one setting to go live safely.
            </p>
            <ul className="mt-6 space-y-2.5 border-t pt-5 text-sm text-muted">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="size-[1em] text-foreground" />
                <span>Real authentication with automatic user profiles</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="size-[1em] text-foreground" />
                <span>Database row-level security enabled out of the box</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="size-[1em] text-foreground" />
                <span>Strict safety checks so mock data never leaks live</span>
              </li>
            </ul>
          </Card>
        </div>
      </section>

      <section className="border-t pt-16">
        <Card className="flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">
              Try the full experience in seconds
            </h2>
            <p className="mt-1.5 text-sm text-muted">
              Sign in with{" "}
              <code className="text-foreground">admin@example.com</code> to
              explore the Admin Dashboard, or use any email for the User
              Workspace.
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <Link href="/signup">
              <Button>
                Get started <ArrowRight className="size-[1em]" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline">Open Workspace</Button>
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}

