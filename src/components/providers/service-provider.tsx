"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { ServiceBundle } from "@/services/contracts";
import { getServices } from "@/services";

const Context = createContext<ServiceBundle | null>(null);

export function ServiceProvider({ children }: { children: React.ReactNode }) {
  const [services, setServices] = useState<ServiceBundle | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;
    getServices()
      .then((v) => {
        if (alive) setServices(v);
      })
      .catch((e) => {
        if (alive) {
          setError(
            e instanceof Error ? e.message : "Service initialization failed"
          );
        }
      });

    return () => {
      alive = false;
    };
  }, []);

  if (error) {
    return (
      <main className="p-8">
        <h1 className="font-semibold">Service setup error</h1>
        <p className="mt-2 text-sm text-red-500">{error}</p>
      </main>
    );
  }

  if (!services) {
    return (
      <div className="grid min-h-screen place-items-center text-sm text-muted">
        Loading…
      </div>
    );
  }

  return <Context.Provider value={services}>{children}</Context.Provider>;
}

export function useServices() {
  const v = useContext(Context);
  if (!v) throw new Error("useServices must be inside ServiceProvider");
  return v;
}
