export type UserRole = "user" | "admin";

export type User = {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  createdAt: string;
};

export type AuthSession = {
  user: User;
  accessToken: string;
};

export type Subscription = {
  status: "inactive" | "trialing" | "active" | "past_due" | "canceled";
  plan: string;
  currentPeriodEnd?: string;
};
