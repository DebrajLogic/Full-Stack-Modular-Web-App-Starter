"use client";

import Link from "next/link";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Login() {
  const { session, signIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const isDemo = process.env.NEXT_PUBLIC_APP_MODE !== "production";

  useEffect(() => {
    if (session) {
      router.replace(session.user.role === "admin" ? "/admin" : "/dashboard");
    }
  }, [session, router]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await signIn({ email, password });
      const target = email.toLowerCase().includes("admin")
        ? "/admin"
        : "/dashboard";
      router.push(target);
    } catch (x) {
      setError(x instanceof Error ? x.message : "Sign in failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="my-auto grid place-items-center py-12">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="mt-2 text-sm text-muted">Sign in to your workspace.</p>

        {isDemo && (
          <div className="pill-badge mt-4 rounded-lg px-3 py-2 text-xs leading-relaxed">
            <span className="font-medium text-foreground">Demo Mode:</span> Use{" "}
            <code className="text-foreground">admin@example.com</code> for Admin
            or any other email for User (8+ char password).
          </div>
        )}

        <form onSubmit={submit} className="mt-6 space-y-4">
          <label className="block text-sm">
            Email
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input mt-2 w-full rounded-lg px-3 py-2.5 text-sm"
            />
          </label>

          <label className="block text-sm">
            Password
            <input
              required
              minLength={8}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input mt-2 w-full rounded-lg px-3 py-2.5 text-sm"
            />
          </label>

          {error && (
            <p role="alert" className="text-sm text-red-500">
              {error}
            </p>
          )}

          <Button disabled={busy} className="w-full">
            {busy ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <p className="mt-5 text-sm">
          <Link href="/forgot-password" className="underline">
            Forgot password?
          </Link>
        </p>

        <p className="mt-3 text-sm text-muted">
          New here?{" "}
          <Link href="/signup" className="text-foreground underline">
            Create an account
          </Link>
        </p>
      </Card>
    </div>
  );
}
