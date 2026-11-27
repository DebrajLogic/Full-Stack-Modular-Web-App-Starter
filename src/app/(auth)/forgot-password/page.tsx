"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useServices } from "@/components/providers/service-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ForgotPassword() {
  const s = useServices();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    setError("");
    try {
      await s.auth.requestPasswordReset(email);
      setMessage(
        "If this account exists, reset instructions will be sent. Demo mode does not send email."
      );
    } catch (x) {
      setError(x instanceof Error ? x.message : "Request failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="my-auto grid place-items-center py-12">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-semibold tracking-tight">
          Reset password
        </h1>
        <p className="mt-2 text-sm text-muted">
          Enter your email to receive password reset instructions.
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="form-input w-full rounded-lg px-3 py-2.5 text-sm"
          />

          {message && <p className="text-sm text-emerald-400">{message}</p>}
          {error && (
            <p role="alert" className="text-sm text-red-500">
              {error}
            </p>
          )}

          <Button disabled={busy} className="w-full">
            {busy ? "Sending…" : "Send reset instructions"}
          </Button>
        </form>

        <Link
          href="/login"
          className="mt-5 inline-block text-sm text-muted underline hover:text-foreground"
        >
          Back to sign in
        </Link>
      </Card>
    </div>
  );
}
