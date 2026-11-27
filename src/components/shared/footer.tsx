import Link from "next/link";
import { Layers } from "lucide-react";

export function Footer() {
  return (
    <footer className="footer-bar mt-12 pt-8 pb-6 text-xs">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-2 font-medium text-foreground">
            <Layers size={15} />
            <span>SaaS Starter</span>
          </Link>
          <p className="text-muted">
            Provider-independent foundation · Next.js & TypeScript
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <Link href="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link href="/billing" className="nav-link">
            Billing
          </Link>
          <Link href="/settings" className="nav-link">
            Settings
          </Link>
          <Link href="/login" className="nav-link">
            Sign in
          </Link>
        </div>
      </div>

      <div className="mt-8 flex flex-col justify-between gap-4 border-t pt-6 sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} SaaS Starter. All rights reserved.</p>
        <div className="pill-badge inline-flex w-fit items-center gap-2 rounded-full px-3 py-1">
          <span className="status-dot h-1.5 w-1.5 rounded-full" />
          <span>Adapter Architecture Ready</span>
        </div>
      </div>
    </footer>
  );
}
