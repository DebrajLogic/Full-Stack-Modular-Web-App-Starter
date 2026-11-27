"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Layers, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";

function getInitials(email?: string, name?: string) {
  const source = (name || email || "U").trim();
  const parts = source.split(/[\s@._-]+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return source.slice(0, 2).toUpperCase();
}

export function Header() {
  const { session, signOut } = useAuth();
  const router = useRouter();

  const isAdmin = session?.user.role === "admin";
  const initials = getInitials(
    session?.user.email,
    (session?.user as { name?: string } | undefined)?.name
  );

  return (
    <header className="header-bar flex items-center justify-between px-5 py-3">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold tracking-tight"
        >
          <span className="brand-mark flex items-center justify-center rounded-lg text-sm">
            <Layers className="size-[1em]" />
          </span>
          <span>SaaS Starter</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/dashboard" className="nav-link">
            Dashboard
          </Link>
          <Link href="/billing" className="nav-link">
            Billing
          </Link>
          <Link href="/settings" className="nav-link">
            Settings
          </Link>
          {isAdmin && (
            <Link href="/admin" className="nav-link">
              Admin
            </Link>
          )}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        {session ? (
          <>
            {isAdmin && (
              <Link
                href="/admin"
                className="badge-admin inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] uppercase tracking-wider"
              >
                <Shield className="size-[1em]" />
                <span>Admin</span>
              </Link>
            )}

            <Button
              variant="ghost"
              onClick={async () => {
                await signOut();
                router.push("/login");
              }}
            >
              <LogOut className="size-[1em]" />
              Sign out
            </Button>

            <Link
              href={isAdmin ? "/admin" : "/settings"}
              title={`${session.user.email} (${session.user.role})`}
              className={`user-avatar flex items-center justify-center rounded-full text-xs tracking-wider ${
                isAdmin ? "user-avatar-admin" : ""
              }`}
            >
              {initials}
            </Link>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link href="/signup">
              <Button>Get started</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
