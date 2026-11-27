# SaaS Starter v2 — Project Guide for Developers and AI Agents

> A provider-independent SaaS starter built with Next.js. Switch between demo and production services without rewriting your UI.

---

# 1. What Is This Project?

This project is a starter foundation for building SaaS applications.

It gives you the core structure needed to build:

- User authentication
- User dashboards
- Account settings
- Subscription and billing pages
- Database operations
- File uploads
- Email services
- Analytics
- Future third-party integrations

The app uses a provider-based architecture.

This means the application does not need to know where its data comes from.

For example:

- In demo mode, data comes from local browser storage.
- In production mode, data comes from Supabase.
- In the future, data can come from Firebase, PostgreSQL, or another provider.

The UI stays the same.

Only the service provider changes.

## The Main Architecture Rule

**The UI must never depend directly on a service provider.**

Pages, components, and application logic must communicate through service contracts.

The selected provider handles the actual work.

```text
                  APPLICATION
                       |
                       |
                SERVICE CONTRACTS
                       |
                       |
                SERVICE SELECTOR
                       |
              -------------------
              |                 |
           DEMO MODE        PRODUCTION
              |                 |
          LocalStorage        Supabase
```

This separation is the most important rule in the entire project.

---

# 2. Technology Stack

| Technology | Purpose |
|---|---|
| Next.js 15 | Application framework |
| React 19 | UI library |
| TypeScript | Type safety |
| Tailwind CSS v4 | Styling |
| Lucide React | Icons |
| clsx | Conditional CSS classes |
| tailwind-merge | Merge Tailwind classes |
| Supabase | Production backend adapter |
| LocalStorage | Demo data storage |
| Vitest | Unit testing |
| Playwright | Browser testing |

Node.js requirement:

```text
Node.js >= 22.12.0
```

Use a supported Node version before installing dependencies.

---

# 3. Project Structure

The project follows a modular structure.

```text
project-root/
│
├── public/
│
├── src/
│   │
│   ├── app/
│   │   ├── api/
│   │   │   └── health/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── signup/
│   │   ├── forgot-password/
│   │   ├── settings/
│   │   ├── billing/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── shared/
│   │   └── providers/
│   │
│   ├── services/
│   │   ├── contracts.ts
│   │   ├── index.ts
│   │   └── providers/
│   │       ├── demo.ts
│   │       └── supabase.ts
│   │
│   └── types/
│
├── supabase/
│   └── migrations/
│       └── 0001_initial.sql
│
├── .env.example
├── package.json
└── README.md
```

## Folder Responsibilities

### `src/app/`

Contains Next.js routes and pages.

Examples:

- `/` — Home page
- `/login` — Login page
- `/signup` — Registration page
- `/dashboard` — Main dashboard
- `/settings` — Account settings
- `/billing` — Subscription and billing
- `/api/health` — Health check endpoint

Pages should focus on displaying information and handling user interactions.

They should not contain provider-specific database or authentication code.

### `src/components/ui/`

Contains reusable UI elements.

Examples:

- Button
- Input
- Card
- Modal
- Dropdown
- Badge
- Tabs

These components should be reusable across the application.

### `src/components/shared/`

Contains shared application components.

Examples:

- Page headers
- Navigation
- Sidebar
- Loading states
- Empty states
- Error messages

### `src/components/providers/`

Contains React context providers.

Examples:

- ServiceProvider
- AuthProvider
- AppProviders

These providers make application services and authentication state available to components.

### `src/services/`

Contains the application's service architecture.

This is where the provider-independent business interfaces live.

### `src/services/providers/`

Contains actual provider implementations.

Examples:

- `demo.ts` — Local demo implementation
- `supabase.ts` — Supabase implementation

Future providers should also live here.

### `supabase/migrations/`

Contains SQL migration files.

These files define database tables, indexes, policies, and other database changes.

---

# 4. Provider-Based Architecture

This architecture must remain intact as the project grows.

There are three main parts.

## Part 1: Service Contracts

File:

```text
src/services/contracts.ts
```

Contracts define what each service must do.

They do not define how a provider performs the work.

For example, an authentication contract may define:

```ts
interface AuthService {
  getSession(): Promise<Session | null>;

  signIn(
    email: string,
    password: string
  ): Promise<User>;

  signUp(
    email: string,
    password: string
  ): Promise<User>;

  signOut(): Promise<void>;

  requestPasswordReset(
    email: string
  ): Promise<void>;
}
```

Every authentication provider must follow this contract.

The same idea applies to database, files, email, payments, and analytics.

## Part 2: Provider Implementations

Provider implementations perform the actual work.

For example:

```text
Demo Provider
    |
    └── Uses LocalStorage

Supabase Provider
    |
    └── Uses Supabase
```

Each provider must implement the same service contracts.

This lets the application switch providers without changing its pages.

## Part 3: Central Service Selector

File:

```text
src/services/index.ts
```

This file decides which provider the application uses.

The environment variable controls the selection:

```env
NEXT_PUBLIC_APP_MODE=demo
```

For production:

```env
NEXT_PUBLIC_APP_MODE=production
```

The selector should dynamically load the Supabase provider only when production mode is selected.

Important:

- Demo mode must not initialize Supabase.
- Demo mode must not require Supabase credentials.
- Demo mode must not make hidden production requests.
- Production mode must not silently fall back to fake demo data.
- Missing production configuration must return a clear error.

---

# 5. Demo Mode

Demo mode lets developers run the application without setting up a backend.

It should work without:

- A Supabase account
- Supabase credentials
- A production database
- External network requests

Demo mode uses browser LocalStorage for basic data persistence.

## Demo Mode Behavior

| Feature | Demo Behavior |
|---|---|
| Authentication | Simulated authentication |
| User session | Stored locally |
| Database | LocalStorage |
| File uploads | Data URLs for small test files |
| Email | No real email is sent |
| Payments | No real payment or checkout |
| Analytics | Local or simulated behavior |

## Important Demo Limitations

Demo mode is for development and testing.

It is not production authentication.

It does not provide secure user accounts.

It does not send real emails.

It does not charge customers.

It does not provide real cloud file storage.

LocalStorage belongs to the current browser and origin.

Clearing browser storage can delete demo data.

Do not store sensitive customer information in demo mode.

**Never use demo mode for real customer accounts or production data.**

---

# 6. Production Mode with Supabase

Supabase is the production backend adapter.

It can provide:

- Authentication
- Database access
- File storage
- Row Level Security

However, selecting production mode does not automatically make every service production-ready.

Some integrations still need to be configured.

## Environment Variables

Create a `.env.local` file.

Example:

```env
NEXT_PUBLIC_APP_MODE=demo

NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

For production, change:

```env
NEXT_PUBLIC_APP_MODE=production
```

Then provide your Supabase project URL and public client key.

Never put a Supabase service-role key or other private secret in a `NEXT_PUBLIC_` variable.

Restart the development server after changing environment variables.

## Supabase Setup

1. Create a Supabase project.
2. Copy the project URL.
3. Copy the public client key.
4. Add both values to `.env.local`.
5. Set the application mode to `production`.
6. Apply the SQL migration files.
7. Configure authentication redirect URLs.
8. Configure database security policies.
9. Configure storage buckets and storage policies.

The migration file in this project provides a starting point for the profiles table.

Having a migration file does not mean it has already been applied to your database.

---

# 7. Service Contracts

The application uses these service groups.

## AuthService

Handles authentication.

Expected operations:

```text
getSession()
signIn()
signUp()
signOut()
requestPasswordReset()
```

## DatabaseService

Handles database operations.

Expected operations:

```text
get()
list()
create()
update()
remove()
```

## FileService

Handles file operations.

Expected operations:

```text
upload()
getUrl()
remove()
```

## EmailService

Handles email delivery.

Expected operation:

```text
send()
```

## PaymentService

Handles subscription and payment operations.

Expected operations:

```text
getSubscription()
createCheckout()
openBillingPortal()
```

## AnalyticsService

Handles application events.

Expected operation:

```text
track()
```

## Service Errors

Use clear, provider-independent error codes.

```text
UNAUTHENTICATED
NOT_FOUND
VALIDATION
NOT_CONFIGURED
UNAVAILABLE
UNKNOWN
```

Do not expose provider-specific errors directly to the UI.

Convert them into clear application errors.

If a service is not configured, return a `NOT_CONFIGURED` error.

Do not pretend that an operation succeeded.

---

# 8. How the UI Uses Services

Pages and components must use the application's service layer.

Example:

```tsx
"use client";

import { useServices } from
  "@/components/providers/service-provider";

export default function RecordsPage() {
  const services = useServices();

  async function loadRecords() {
    const records = await services.db.list("records");

    return records;
  }

  return (
    <div>
      <h1>Records</h1>
    </div>
  );
}
```

The UI should never import Supabase directly.

Bad:

```tsx
import { createClient } from
  "@supabase/supabase-js";
```

Good:

```tsx
const services = useServices();

await services.db.list("records");
```

Why?

Because the UI should not care whether the data comes from Supabase, LocalStorage, or another provider.

---

# 9. Provider Rules

Every provider must follow the same contracts.

For example:

```text
AuthService
    |
    ├── Demo Auth Provider
    |
    └── Supabase Auth Provider
```

Both providers must return the same application-level data types.

Provider-specific types should be converted into provider-neutral types inside the provider implementation.

## Where Provider Code Belongs

Provider SDK imports must stay inside provider-specific folders or provider-specific server modules.

Examples:

```text
src/services/providers/demo.ts

src/services/providers/supabase.ts
```

Do not import provider SDKs into:

- Pages
- UI components
- Shared components
- General application hooks

This keeps the architecture clean.

---

# 10. Adding a New Provider

Suppose you want to add Firebase.

Follow these steps.

1. Create a new provider file.

```text
src/services/providers/firebase.ts
```

2. Implement the existing service contracts.

3. Convert Firebase data into application-level types.

4. Add the provider to the central selector.

5. Add required environment variables.

6. Update `.env.example`.

7. Update this README.

8. Add tests for the new provider.

9. Confirm demo mode still works without Firebase.

10. Confirm production mode does not fall back to demo data.

The UI should not need to change just because you add a new provider.

---

# 11. Authentication and Security

Authentication requires more than hiding a page.

A client-side route guard is useful for user experience.

It is not a security boundary.

The current starter needs further production security work.

Before using it with real customers, implement:

- Supabase SSR authentication with `@supabase/ssr`
- Cookie-based sessions
- Server-side session validation
- Secure session refresh
- Protected API routes
- Server-side authorization
- Database Row Level Security
- Storage access policies
- Role and permission checks

Never trust the client to decide:

- User identity
- User role
- Subscription plan
- Account permissions
- Ownership of a database record

Always verify these values on the server.

## Database Security

Every table containing private user data must have proper Row Level Security policies.

For example:

A user should only access records they are allowed to access.

Do not assume that a hidden UI button protects database data.

## File Storage Security

The production file adapter needs a properly configured storage bucket.

If using the `user-files` bucket, create the bucket and configure its Storage policies.

A public file URL is not a replacement for access control.

---

# 12. Current Implementation Gaps

The starter provides a foundation.

It should not be treated as a finished production SaaS platform.

The following areas need attention.

| Area | Current Status |
|---|---|
| Next.js foundation | Included |
| UI structure | Included |
| Demo provider | Included |
| LocalStorage persistence | Included |
| Service contracts | Included |
| Central provider selection | Included |
| Supabase adapter | Starter implementation |
| Supabase SSR auth | Needs implementation |
| Cookie-based sessions | Needs implementation |
| Complete server authorization | Needs implementation |
| Database RLS | Needs full review |
| Email provider | Needs configuration |
| Payment provider | Needs configuration |
| Analytics provider | Needs configuration |
| Storage policies | Need configuration |
| Automated test coverage | Needs expansion |

Important notes:

- The current Supabase adapter uses a browser client and is not a complete SSR authentication setup.
- Generic database operations still need proper authorization and validation.
- Email and payment services need real provider integrations.
- Analytics may be a no-op until configured.
- File storage needs a properly configured bucket and access policies.
- The initial profile migration is not a complete SaaS database schema.

Do not call the app production-ready just because it builds successfully.

---

# 13. UI and Design Rules

Keep the UI consistent.

Use the shared components before creating new ones.

Common components include:

```text
Button
Card
PageTitle
Input
```

## Button Variants

Use existing variants where possible:

```text
primary
outline
ghost
```

## Icons

Use Lucide React.

## Styling

Use Tailwind CSS v4.

Keep design tokens consistent.

Current theme variables include:

```css
--background
--foreground
--muted
--surface
--border
```

## UI Guidelines

- Use reusable components.
- Keep pages simple.
- Avoid repeated code.
- Make layouts responsive.
- Add loading states.
- Add empty states.
- Add clear error states.
- Use accessible labels.
- Keep buttons and forms easy to understand.

---

# 14. Installation and Local Development

## Requirements

Install:

- Node.js 22.12.0 or newer
- npm
- Git

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure Environment

Create `.env.local`.

```env
NEXT_PUBLIC_APP_MODE=demo

NEXT_PUBLIC_APP_URL=http://localhost:3000

NEXT_PUBLIC_SUPABASE_URL=

NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## Step 3: Start the App

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

The app should run in demo mode without Supabase credentials.

---

# 15. Available Commands

Use these commands during development.

| Command | Purpose |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run typecheck` | Check TypeScript |
| `npm run lint` | Run lint checks |
| `npm run test` | Run unit tests |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run test:e2e` | Run browser tests |

Note:

Testing dependencies and scripts do not prove that a complete test suite exists.

Check the actual test files and configuration before relying on these commands.

---

# 16. Rules for AI Coding Agents

This section is especially important.

Any AI agent working on this project must follow these rules.

## Rule 1: Read Before Editing

Read this README before making changes.

Inspect the existing source files before changing the architecture.

Do not assume a feature exists just because it is described here.

## Rule 2: Protect the Provider Architecture

Never connect UI components directly to Supabase, Firebase, or another provider.

Always use service contracts.

## Rule 3: Keep Provider SDKs Isolated

Provider SDK imports belong inside provider-specific folders or server modules.

Do not spread provider code across the application.

## Rule 4: Demo Mode Must Be Independent

Demo mode must work without:

- Supabase credentials
- Supabase accounts
- Production databases
- External network requests

Do not initialize production providers in demo mode.

## Rule 5: Never Fake Production Success

If a production service is missing, return a clear `NOT_CONFIGURED` error.

Do not return fake success messages.

Do not silently switch to demo mode.

## Rule 6: Use TypeScript Properly

- Keep strict TypeScript enabled.
- Avoid `any`.
- Define clear interfaces.
- Use reusable types.
- Handle errors.
- Validate external data.

## Rule 7: Keep Contracts Provider-Neutral

Do not expose Supabase-specific types in general application contracts.

Convert provider-specific results into shared application types.

## Rule 8: Protect User Data

Never trust client-side roles or permissions.

Use server-side authorization and database security policies.

## Rule 9: Test Changes

When changing authentication, services, providers, or business logic:

- Add or update tests.
- Test demo mode.
- Test production configuration.
- Test error states.
- Check TypeScript.
- Run lint checks.
- Run the production build.

## Rule 10: Update Documentation

Update this README when you change:

- Project structure
- Architecture
- Service contracts
- Provider selection
- Environment variables
- Installation steps
- Available commands
- Security requirements

## Rule 11: Do Not Break Existing Features

Before removing or replacing a feature:

1. Inspect where it is used.
2. Understand why it exists.
3. Check its dependencies.
4. Make the smallest safe change.
5. Test the result.

## Rule 12: Report What You Actually Did

At the end of every coding task, report:

- Files changed
- Features added
- Features removed
- Tests run
- Tests passed or failed
- Known issues
- Remaining work

Never claim that something works without checking it.

---

# 17. Recommended AI Workflow

When an AI agent receives a new task, it should follow this process.

```text
1. Read README.md
       |
       v
2. Inspect relevant source files
       |
       v
3. Understand existing architecture
       |
       v
4. Identify the required change
       |
       v
5. Decide whether it affects UI,
   contracts, or providers
       |
       v
6. Implement the smallest safe change
       |
       v
7. Add or update tests
       |
       v
8. Run typecheck and lint
       |
       v
9. Run tests and production build
       |
       v
10. Report changes and remaining gaps
```

## Before Writing Code, Ask:

- Does this feature already exist?
- Can an existing component handle it?
- Does this change require a new service contract?
- Does this change require a new provider method?
- Will demo mode still work?
- Will production mode still work?
- Does this expose private data?
- Does this require a database migration?
- Are loading and error states handled?
- Are tests needed?

The goal is to improve the project without damaging its foundation.

---

# 18. Production Deployment Checklist

Before deploying to real customers, check every item.

## Application

- [ ] Use Node.js 22.12.0 or newer.
- [ ] Set the correct application URL.
- [ ] Set production mode.
- [ ] Configure all required environment variables.
- [ ] Run TypeScript checks.
- [ ] Run lint checks.
- [ ] Run tests.
- [ ] Run the production build.

## Supabase

- [ ] Configure the correct Supabase project.
- [ ] Apply all migrations.
- [ ] Configure authentication redirect URLs.
- [ ] Enable Row Level Security.
- [ ] Review every database policy.
- [ ] Configure Storage buckets.
- [ ] Configure Storage access policies.
- [ ] Test user data isolation.

## Authentication

- [ ] Implement SSR authentication.
- [ ] Use secure cookie-based sessions.
- [ ] Implement session refresh.
- [ ] Protect server-side routes.
- [ ] Validate permissions on the server.
- [ ] Test login and logout.
- [ ] Test password reset.
- [ ] Test unauthorized access.

## SaaS Features

- [ ] Configure real email delivery.
- [ ] Configure payment processing.
- [ ] Configure subscription management.
- [ ] Configure analytics.
- [ ] Test billing flows.
- [ ] Test account management.

## Operations

- [ ] Configure error monitoring.
- [ ] Configure application logging.
- [ ] Set up database backups.
- [ ] Add rate limits where needed.
- [ ] Review data privacy requirements.
- [ ] Test recovery and failure scenarios.

Never deploy demo mode as a real customer-facing production backend.

---

# 19. How to Extend This Starter

The architecture should support new features without forcing a complete rewrite.

Examples:

| New Feature | Recommended Location |
|---|---|
| New dashboard page | `src/app/dashboard/` |
| Reusable button | `src/components/ui/` |
| Shared navigation | `src/components/shared/` |
| New authentication method | Auth service contract and providers |
| New database operation | Database service contract and providers |
| New email provider | Email service provider |
| New payment provider | Payment service provider |
| New storage provider | File service provider |
| New database table | Supabase migration |
| New application type | `src/types/` |

Always keep application logic separate from provider-specific code.

---

# 20. Final Architecture Principle

This project is built around one idea:

**Your application should not care where its services come from.**

The UI talks to service contracts.

The service selector chooses the provider.

The provider performs the work.

That separation makes it easier to:

- Change backend providers.
- Run the app without a backend.
- Build and test features locally.
- Add new integrations.
- Keep code clean.
- Reduce provider lock-in.
- Grow the app without rewriting the UI.

Treat this architecture as a core project requirement.

Do not remove it just to make a feature work faster.

---

# Quick Project Summary for AI Agents

```text
PROJECT:
Provider-independent SaaS starter.

FRAMEWORK:
Next.js 15 App Router.

LANGUAGE:
TypeScript with strict mode.

UI:
React 19 + Tailwind CSS v4.

DEMO PROVIDER:
LocalStorage.

PRODUCTION PROVIDER:
Supabase.

PROVIDER SELECTION:
NEXT_PUBLIC_APP_MODE.

SERVICE CONTRACTS:
src/services/contracts.ts

SERVICE SELECTOR:
src/services/index.ts

PROVIDER IMPLEMENTATIONS:
src/services/providers/

REACT PROVIDERS:
src/components/providers/

DATABASE MIGRATIONS:
supabase/migrations/

MAIN ARCHITECTURE RULE:
UI must never depend directly on provider SDKs.

DEMO RULE:
Demo mode must work without Supabase credentials
or production network calls.

PRODUCTION RULE:
Missing production services must return clear errors.
Never silently fall back to demo data.

SECURITY RULE:
Client-side route guards are not security.
Use server-side authorization and database RLS.

AI CODING RULE:
Read this README before editing the project.
Preserve the service architecture.
Test changes.
Update documentation.
Report actual results.
```

**End of Project Guide.**