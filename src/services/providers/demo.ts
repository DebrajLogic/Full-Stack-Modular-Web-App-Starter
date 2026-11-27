import type { ServiceBundle } from "../contracts";
import { ServiceError } from "../contracts";
import type { AuthSession, Subscription, User } from "@/types";

const SESSION = "starter:demo:session";
const TABLE = "starter:demo:table:";
const FILE = "starter:demo:file:";

function win() {
  if (typeof window === "undefined") {
    throw new ServiceError("Demo adapter is browser-only", "UNAVAILABLE");
  }
  return window;
}

function read<T>(key: string, fallback: T): T {
  const raw = win().localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    throw new ServiceError("Stored demo data is invalid", "VALIDATION");
  }
}

function session() {
  return read<AuthSession | null>(SESSION, null);
}

function requireUser() {
  const s = session();
  if (!s) throw new ServiceError("Please sign in first", "UNAUTHENTICATED");
  return s;
}

function user(email: string, name?: string): User {
  return {
    id: "demo_" + email.toLowerCase().replace(/[^a-z0-9]/g, "_"),
    email,
    name,
    createdAt: new Date().toISOString(),
  };
}

function validate(email: string, password: string) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || password.length < 8) {
    throw new ServiceError(
      "Enter a valid email and password (8+ characters)",
      "VALIDATION"
    );
  }
}

export const demoServices: ServiceBundle = {
  auth: {
    async getSession() {
      return session();
    },
    async signIn({ email, password }) {
      validate(email, password);
      const s = {
        user: user(email),
        accessToken: "demo-token-not-secure",
      };
      win().localStorage.setItem(SESSION, JSON.stringify(s));
      return s;
    },
    async signUp({ email, password, name }) {
      validate(email, password);
      const s = {
        user: user(email, name),
        accessToken: "demo-token-not-secure",
      };
      win().localStorage.setItem(SESSION, JSON.stringify(s));
      return s;
    },
    async signOut() {
      win().localStorage.removeItem(SESSION);
    },
    async requestPasswordReset(email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new ServiceError("Enter a valid email", "VALIDATION");
      }
    },
  },

  db: {
    async get<T>(table, id) {
      requireUser();
      return read<Record<string, T>>(TABLE + table, {})[id] ?? null;
    },
    async list<T>(table) {
      requireUser();
      return Object.values(read<Record<string, T>>(TABLE + table, {}));
    },
    async create<T>(table, value) {
      requireUser();
      const id = value.id ?? crypto.randomUUID();
      const rows = read<Record<string, T>>(TABLE + table, {});
      if (rows[id]) {
        throw new ServiceError("Record exists", "VALIDATION");
      }
      const row = { ...value, id };
      rows[id] = row;
      win().localStorage.setItem(TABLE + table, JSON.stringify(rows));
      return row;
    },
    async update<T>(table, id, value) {
      requireUser();
      const rows = read<Record<string, T>>(TABLE + table, {});
      if (!rows[id]) {
        throw new ServiceError("Record not found", "NOT_FOUND");
      }
      const row = { ...rows[id], ...value };
      rows[id] = row;
      win().localStorage.setItem(TABLE + table, JSON.stringify(rows));
      return row;
    },
    async remove(table, id) {
      requireUser();
      const rows = read<Record<string, unknown>>(TABLE + table, {});
      delete rows[id];
      win().localStorage.setItem(TABLE + table, JSON.stringify(rows));
    },
  },

  files: {
    async upload(path, file) {
      requireUser();
      const url = await new Promise<string>((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(String(r.result));
        r.onerror = () =>
          reject(new ServiceError("File read failed", "UNAVAILABLE"));
        r.readAsDataURL(file);
      });
      win().localStorage.setItem(FILE + path, url);
      return { path, url };
    },
    async getUrl(path) {
      requireUser();
      const url = win().localStorage.getItem(FILE + path);
      if (!url) throw new ServiceError("File not found", "NOT_FOUND");
      return url;
    },
    async remove(path) {
      requireUser();
      win().localStorage.removeItem(FILE + path);
    },
  },

  email: {
    async send() {
      /* Demo email is simulated; no message is sent. */
    },
  },

  payments: {
    async getSubscription(): Promise<Subscription> {
      requireUser();
      return { status: "inactive", plan: "Free demo" };
    },
    async createCheckout() {
      throw new ServiceError(
        "Payments are not enabled in demo mode",
        "NOT_CONFIGURED"
      );
    },
    async openBillingPortal() {
      throw new ServiceError(
        "Billing portal is not enabled in demo mode",
        "NOT_CONFIGURED"
      );
    },
  },

  analytics: {
    track(event, properties) {
      if (process.env.NODE_ENV === "development") {
        console.info("[demo analytics]", event, properties ?? {});
      }
    },
  },
};
