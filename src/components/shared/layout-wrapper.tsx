"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";

const APP_ROUTES = ["/dashboard", "/settings", "/billing"];

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAppRoute = APP_ROUTES.some((route) => pathname.startsWith(route));

  if (isAppRoute) {
    return <>{children}</>;
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6">
      <Header />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  );
}
