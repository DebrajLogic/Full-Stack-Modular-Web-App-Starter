"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  CreditCard,
  Shield,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";

const userNav = [
  ["/dashboard", "Dashboard", LayoutDashboard],
  ["/settings", "Settings", Settings],
  ["/billing", "Billing", CreditCard],
] as const;

const adminNav = [
  ["/admin", "Admin Overview", Shield],
  ["/dashboard", "User Workspace", LayoutDashboard],
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();
  const { session, signOut } = useAuth();

  const isAdmin = session?.user.role === "admin";
  const inAdminSection = path.startsWith("/admin");

  const nav = inAdminSection
    ? adminNav
    : isAdmin
      ? [...userNav, ["/admin", "Admin Panel", Shield] as const]
      : userNav;

  return (
    <div className="min-h-screen md:flex">
      <aside className="app-sidebar border-b p-4 md:min-h-screen md:w-60 md:border-b-0 md:border-r">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            SaaS Starter
          </Link>
          {isAdmin && (
            <span className="pill-badge rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider">
              Admin
            </span>
          )}
        </div>

        <nav className="mt-7 flex gap-2 md:flex-col">
          {nav.map(([href, label, Icon]) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${
                path === href ? "sidebar-link-active" : "sidebar-link"
              }`}
            >
              <Icon className="size-[1em]" />
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
          <LogOut className="size-[1em]" />
          Sign out
        </Button>
      </aside>

      <main className="min-w-0 flex-1 p-5 md:p-9">{children}</main>
    </div>
  );
}
