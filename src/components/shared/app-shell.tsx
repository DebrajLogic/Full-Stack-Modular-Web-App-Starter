"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Settings, CreditCard, LogOut } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";

const nav = [
  ["/dashboard", "Dashboard", LayoutDashboard],
  ["/settings", "Settings", Settings],
  ["/billing", "Billing", CreditCard],
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const { session, signOut } = useAuth();

  return (
    <div className="min-h-screen md:flex">
      <aside className="app-sidebar border-b p-4 md:min-h-screen md:w-60 md:border-b-0 md:border-r">
        <Link href="/" className="font-semibold tracking-tight">
          SaaS Starter
        </Link>

        <nav className="mt-7 flex gap-2 md:flex-col">
          {nav.map(([href, label, Icon]) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                path === href ? "sidebar-link-active" : "sidebar-link"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>

        <p className="mt-8 hidden truncate border-t pt-4 text-xs text-muted md:block">
          {session?.user.email}
        </p>

        <Button
          variant="ghost"
          className="mt-2 hidden w-full justify-start md:flex"
          onClick={async () => {
            await signOut();
            router.push("/login");
          }}
        >
          <LogOut size={15} />
          Sign out
        </Button>
      </aside>

      <main className="min-w-0 flex-1 p-5 md:p-9">{children}</main>
    </div>
  );
}
