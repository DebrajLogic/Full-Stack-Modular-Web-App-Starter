import type { SupabaseClient } from "@supabase/supabase-js";
import type { ServiceBundle } from "../contracts";
import { ServiceError } from "../contracts";
import type { AuthSession, User } from "@/types";

let clientPromise: Promise<SupabaseClient> | undefined;

async function client() {
  if (!clientPromise) {
    clientPromise = (async () => {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      if (!url || !key) {
        throw new ServiceError(
          "Production mode requires Supabase URL and anon key",
          "NOT_CONFIGURED"
        );
      }
      const { createClient } = await import("@supabase/supabase-js");
      return createClient(url, key, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
      });
    })();
  }
  return clientPromise;
}

function mapUser(u: {
  id: string;
  email?: string;
  created_at?: string;
  app_metadata?: Record<string, unknown>;
  user_metadata?: Record<string, unknown>;
}): User {
  const rawRole = u.app_metadata?.role ?? u.user_metadata?.role;
  return {
    id: u.id,
    email: u.email ?? "",
    name:
      typeof u.user_metadata?.name === "string"
        ? u.user_metadata.name
        : undefined,
    role: rawRole === "admin" ? "admin" : "user",
    createdAt: u.created_at ?? new Date().toISOString(),
  };
}


function mapSession(
  s: {
    access_token: string;
    user: Parameters<typeof mapUser>[0];
  } | null
): AuthSession | null {
  return s ? { accessToken: s.access_token, user: mapUser(s.user) } : null;
}

export const supabaseServices: ServiceBundle = {
  auth: {
    async getSession() {
      const c = await client();
      const { data, error } = await c.auth.getSession();
      if (error) throw new ServiceError(error.message, "UNAVAILABLE");
      return mapSession(
        data.session
          ? { access_token: data.session.access_token, user: data.session.user }
          : null
      );
    },
    async signIn({ email, password }) {
      const c = await client();
      const { data, error } = await c.auth.signInWithPassword({
        email,
        password,
      });
      if (error || !data.session) {
        throw new ServiceError(error?.message ?? "Sign in failed", "UNAVAILABLE");
      }
      return mapSession({
        access_token: data.session.access_token,
        user: data.session.user,
      })!;
    },
    async signUp({ email, password, name }) {
      const c = await client();
      const { data, error } = await c.auth.signUp({
        email,
        password,
        options: { data: { name } },
      });
      if (error) throw new ServiceError(error.message, "UNAVAILABLE");
      if (!data.session) {
        throw new ServiceError(
          "Check your email to confirm your account, then sign in",
          "UNAVAILABLE"
        );
      }
      return mapSession({
        access_token: data.session.access_token,
        user: data.session.user,
      })!;
    },
    async signOut() {
      const { error } = await (await client()).auth.signOut();
      if (error) throw new ServiceError(error.message, "UNAVAILABLE");
    },
    async requestPasswordReset(email) {
      const { error } = await (await client()).auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${
            process.env.NEXT_PUBLIC_APP_URL ?? window.location.origin
          }/auth/callback`,
        }
      );
      if (error) throw new ServiceError(error.message, "UNAVAILABLE");
    },
  },

  db: {
    async get<T>(table, id) {
      const { data, error } = await (await client())
        .from(table)
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw new ServiceError(error.message, "UNAVAILABLE");
      return data as T | null;
    },
    async list<T>(table) {
      const { data, error } = await (await client()).from(table).select("*");
      if (error) throw new ServiceError(error.message, "UNAVAILABLE");
      return (data ?? []) as T[];
    },
    async create<T>(table, value) {
      const { data, error } = await (await client())
        .from(table)
        .insert(value)
        .select("*")
        .single();
      if (error) throw new ServiceError(error.message, "UNAVAILABLE");
      return data as T;
    },
    async update<T>(table, id, value) {
      const { data, error } = await (await client())
        .from(table)
        .update(value)
        .eq("id", id)
        .select("*")
        .single();
      if (error) throw new ServiceError(error.message, "UNAVAILABLE");
      return data as T;
    },
    async remove(table, id) {
      const { error } = await (await client())
        .from(table)
        .delete()
        .eq("id", id);
      if (error) throw new ServiceError(error.message, "UNAVAILABLE");
    },
  },

  files: {
    async upload(path, file) {
      const c = await client();
      const { error } = await c.storage
        .from("user-files")
        .upload(path, file, { upsert: true });
      if (error) throw new ServiceError(error.message, "UNAVAILABLE");
      return {
        path,
        url: c.storage.from("user-files").getPublicUrl(path).data.publicUrl,
      };
    },
    async getUrl(path) {
      return (await client()).storage.from("user-files").getPublicUrl(path).data
        .publicUrl;
    },
    async remove(path) {
      const { error } = await (await client()).storage
        .from("user-files")
        .remove([path]);
      if (error) throw new ServiceError(error.message, "UNAVAILABLE");
    },
  },

  email: {
    async send() {
      throw new ServiceError(
        "Configure an email provider adapter",
        "NOT_CONFIGURED"
      );
    },
  },

  payments: {
    async getSubscription() {
      throw new ServiceError(
        "Configure a billing provider adapter",
        "NOT_CONFIGURED"
      );
    },
    async createCheckout() {
      throw new ServiceError(
        "Configure a billing provider adapter",
        "NOT_CONFIGURED"
      );
    },
    async openBillingPortal() {
      throw new ServiceError(
        "Configure a billing provider adapter",
        "NOT_CONFIGURED"
      );
    },
  },

  analytics: {
    track() {
      /* No-op until analytics provider is configured. */
    },
  },
};
