import type { ServiceBundle } from "./contracts";

let pending: Promise<ServiceBundle> | undefined;

/** One switch. Demo never imports the Supabase provider. */
export function getServices(): Promise<ServiceBundle> {
  if (!pending) {
    pending =
      process.env.NEXT_PUBLIC_APP_MODE === "production"
        ? import("./providers/supabase").then((m) => m.supabaseServices)
        : import("./providers/demo").then((m) => m.demoServices);
  }
  return pending;
}
