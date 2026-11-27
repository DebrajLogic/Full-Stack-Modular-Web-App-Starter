"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { AuthSession } from "@/types";
import { useServices } from "./service-provider";

type AuthValue = {
  session: AuthSession | null;
  loading: boolean;
  signIn: (x: { email: string; password: string }) => Promise<void>;
  signUp: (x: { email: string; password: string; name?: string }) => Promise<void>;
  signOut: () => Promise<void>;
};

const Context = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const s = useServices();
  const [session, setSession] = useState<AuthSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    s.auth
      .getSession()
      .then((v) => {
        if (alive) setSession(v);
      })
      .catch(() => {
        if (alive) setSession(null);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [s]);

  const value = useMemo<AuthValue>(
    () => ({
      session,
      loading,
      async signIn(x) {
        setSession(await s.auth.signIn(x));
      },
      async signUp(x) {
        setSession(await s.auth.signUp(x));
      },
      async signOut() {
        await s.auth.signOut();
        setSession(null);
      },
    }),
    [session, loading, s]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useAuth() {
  const v = useContext(Context);
  if (!v) throw new Error("useAuth must be inside AuthProvider");
  return v;
}
