import type { AuthSession, Subscription } from "@/types";

export type ErrorCode =
  | "UNAUTHENTICATED"
  | "NOT_FOUND"
  | "VALIDATION"
  | "NOT_CONFIGURED"
  | "UNAVAILABLE"
  | "UNKNOWN";

export class ServiceError extends Error {
  constructor(
    message: string,
    public code: ErrorCode = "UNKNOWN"
  ) {
    super(message);
    this.name = "ServiceError";
  }
}

export interface AuthService {
  getSession(): Promise<AuthSession | null>;
  signIn(input: { email: string; password: string }): Promise<AuthSession>;
  signUp(input: {
    email: string;
    password: string;
    name?: string;
  }): Promise<AuthSession>;
  signOut(): Promise<void>;
  requestPasswordReset(email: string): Promise<void>;
}

export interface DatabaseService {
  get<T>(table: string, id: string): Promise<T | null>;
  list<T>(table: string): Promise<T[]>;
  create<T>(table: string, value: T & { id?: string }): Promise<T>;
  update<T>(table: string, id: string, value: Partial<T>): Promise<T>;
  remove(table: string, id: string): Promise<void>;
}

export interface FileService {
  upload(path: string, file: File): Promise<{ path: string; url: string }>;
  getUrl(path: string): Promise<string>;
  remove(path: string): Promise<void>;
}

export interface EmailService {
  send(input: { to: string; subject: string; body: string }): Promise<void>;
}

export interface PaymentService {
  getSubscription(): Promise<Subscription>;
  createCheckout(input: { priceId: string }): Promise<{ url: string }>;
  openBillingPortal(): Promise<{ url: string }>;
}

export interface AnalyticsService {
  track(event: string, properties?: Record<string, unknown>): void;
}

export type ServiceBundle = {
  auth: AuthService;
  db: DatabaseService;
  files: FileService;
  email: EmailService;
  payments: PaymentService;
  analytics: AnalyticsService;
};
