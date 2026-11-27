import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center p-6 text-center">
      <div>
        <p className="text-sm text-muted">404</p>
        <h1 className="mt-2 text-3xl font-semibold">Page not found</h1>
        <Link href="/" className="mt-6 inline-block">
          <Button variant="outline">Back home</Button>
        </Link>
      </div>
    </main>
  );
}
