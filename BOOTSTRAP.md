# Stonehaus OS — Bootstrap Guide

This document is your complete setup and context document for continuing development on a new machine (e.g. Antigravity).

---

## Project Overview

**Stonehaus OS** is a modern, secure internal dashboard and CRM for an institutional-level land development company. It handles:

- Deal pipeline management (prospecting → LOI → due diligence → under contract → closed)
- Property tracking (land parcels, acreage, zoning, utilities, power infrastructure)
- Contact CRM (investors, brokers, landowners, attorneys, lenders, partners)
- Task management across deals and teams
- Contract lifecycle management
- Financial tracking (budgets, costs, capital stack)
- Document management
- Activity feeds and audit logs

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Database ORM | Prisma |
| Database | PostgreSQL |
| Auth | NextAuth v5 (Auth.js) |
| Linting | Biome |
| CI/CD | GitHub Actions |
| Style Reference | next-shadcn-admin (arhamkhnz) |

---

## Repository

- **Repo:** `https://github.com/denimdc8008/stonehaus-os`
- **Active Branch:** `feat/stonehaus-scaffold`
- **Base:** Forked from `arhamkhnz/next-shadcn-admin`

---

## Local Setup

### Prerequisites

- Node.js 20+
- npm
- PostgreSQL 15+ (local or Docker)
- Git

### 1. Clone the repository

```bash
git clone https://github.com/denimdc8008/stonehaus-os.git
cd stonehaus-os
git checkout feat/stonehaus-scaffold
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment

```bash
cp .env.example .env.local
```

Edit `.env.local` and fill in:

```env
# Database (PostgreSQL)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/stonehaus_dev"

# NextAuth
NEXTAUTH_SECRET="your-secret-32-chars-minimum"  # openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000"

# Optional: OAuth providers (add as needed)
# GOOGLE_CLIENT_ID=
# GOOGLE_CLIENT_SECRET=
```

### 4. Set up the database

```bash
# Start PostgreSQL (if using Docker)
docker run --name stonehaus-pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:15

# Push the Prisma schema to the database
npx prisma db push

# Generate Prisma client
npx prisma generate

# (Optional) Seed initial admin user
npx prisma db seed
```

### 5. Run the development server

```bash
npm run dev
```

Open `http://localhost:3000`

---

## Database Schema (Key Models)

All models are in `prisma/schema.prisma`:

- **User** — Internal team members with roles (ADMIN, MANAGER, ANALYST, VIEWER)
- **Property** — Land parcels with GIS data, zoning, acreage, utilities, power capacity
- **Deal** — Acquisition pipeline (PROSPECTING → LETTER_OF_INTENT → DUE_DILIGENCE → UNDER_CONTRACT → CLOSED)
- **Contact** — CRM contacts (INVESTOR, BROKER, LANDOWNER, ATTORNEY, LENDER, PARTNER, VENDOR)
- **Task** — Action items with priority (LOW, MEDIUM, HIGH, URGENT) and status
- **Contract** — Legal agreements with status tracking
- **Document** — File management linked to deals/properties
- **Activity** — Audit log of all actions
- **Budget** — Financial tracking per deal
- **BudgetLineItem** — Granular cost line items

---

## Folder Structure

```
stonehaus-os/
├── .github/
│   └── workflows/
│       └── ci.yml               # Lint + typecheck + build pipeline
├── prisma/
│   └── schema.prisma            # Full CRM data model (14 models)
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/
│   │   │       └── page.tsx     # Login page with credentials auth
│   │   └── (dashboard)/
│   │       ├── layout.tsx       # Auth guard + sidebar shell
│   │       ├── page.tsx         # KPI dashboard home
│   │       ├── deals/
│   │       │   └── page.tsx     # Deals pipeline table
│   │       ├── properties/
│   │       │   └── page.tsx     # Properties table
│   │       ├── contacts/
│   │       │   └── page.tsx     # Contacts CRM table
│   │       └── tasks/
│   │           └── page.tsx     # Tasks table
│   ├── components/
│   │   └── layout/
│   │       └── app-sidebar.tsx  # Collapsible nav sidebar
│   └── lib/
│       ├── auth.ts              # NextAuth v5 config + RBAC
│       └── db.ts                # Prisma client singleton
├── .env.example                 # All required environment variables
└── BOOTSTRAP.md                 # This file
```

---

## GitHub Issues (19 Open)

All issues are labeled and organized on the project board "Stonehaus OS — Development Board":

| # | Title | Labels |
|---|---|---|
| 1 | Initialize Next.js project scaffold | module: core, priority: critical |
| 2 | Configure Prisma with PostgreSQL | module: database, priority: critical |
| 3 | Implement NextAuth v5 authentication | module: auth, priority: critical |
| 4 | Role-Based Access Control (RBAC) | module: auth, priority: high |
| 5 | Properties module | module: properties, priority: high |
| 6 | Deal Pipeline / CRM module | module: deals, priority: high |
| 7 | Contacts & Relationship module | module: contacts, priority: high |
| 8 | Task Management module | module: tasks, priority: high |
| 9 | Document Management | module: documents, priority: medium |
| 10 | Contract Lifecycle module | module: contracts, priority: medium |
| 11 | Financial tracking & budget module | module: financials, priority: medium |
| 12 | Dashboard & KPI analytics | module: analytics, priority: medium |
| 13 | GIS / Map integration | module: gis, priority: medium |
| 14 | Activity feed & audit log | module: activity, priority: medium |
| 15 | User & team management | module: admin, priority: medium |
| 16 | Notifications system | module: notifications, priority: low |
| 17 | API layer (REST/tRPC) | module: api, priority: medium |
| 18 | Testing setup (Vitest + Playwright) | type: testing, priority: medium |
| 19 | Deployment & infrastructure | module: infra, priority: medium |

---

## Branch Protection Rules

- `main` is protected: requires PR + review + CI pass
- All feature work goes to `feat/*` branches
- Current active branch: `feat/stonehaus-scaffold`

---

## Next Steps

1. **Create PR** from `feat/stonehaus-scaffold` → `main`
2. **Implement CRUD forms** for Deals, Properties, Contacts, Tasks
3. **Add server actions** in `src/app/(dashboard)/*/actions.ts`
4. **Build detail pages** `src/app/(dashboard)/deals/[id]/page.tsx`
5. **Seed database** with test data
6. **Add GIS integration** for property map view (Mapbox or Leaflet)
7. **Wire up financials** with budget line items
8. **Set up Vercel/Railway** deployment for production

---

## Style Guide

Based on `next-shadcn-admin` (arhamkhnz/next-shadcn-admin):

- Dark/light mode via `next-themes`
- shadcn/ui components for all UI elements
- Sidebar layout with collapsible navigation groups
- Data tables using shadcn Table components
- Badge color coding for statuses and priorities
- Lucide React icons throughout

---

*Last updated: feat/stonehaus-scaffold branch*
