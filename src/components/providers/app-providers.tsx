"use client";

import { ServiceProvider } from "./service-provider";
import { AuthProvider } from "./auth-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ServiceProvider>
      <AuthProvider>{children}</AuthProvider>
    </ServiceProvider>
  );
}
