# Stonehaus OS

> **Internal CRM & Operations Platform for institutional land and powered-site development.**

---

## Overview

Stonehaus OS is the internal operating system for Stonehaus Holdings. It centralizes every stage of the land development lifecycle — from origination through exit — into one secure, auditable, role-based platform.

Built on [`next-shadcn-admin-dashboard`](https://github.com/arhamkhnz/next-shadcn-admin-dashboard) with the Stonehaus brand system applied on top.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16, TypeScript, Tailwind v4, shadcn/ui |
| Backend | Next.js App Router, Server Actions, API Routes |
| Database | PostgreSQL |
| Auth | SSO + MFA (RBAC enforced server-side) |
| Storage | Cloud object storage (signed URLs) |
| Security | OWASP ASVS Level 2, NIST SSDF practices |
| Deployment | AWS (primary) / Vercel (staging) |

---

## Modules (v1)

| Module | Description |
|---|---|
| Portfolio | All projects/SPVs with stage, MW, acres, capital, health status |
| Critical Dates | Contract, diligence, permitting, and financing deadlines with alerts |
| Tasks & Approvals | Assignments, approval queues, automated task generation |
| Contracts | LOIs, PSAs, easements, consultant and utility agreements |
| Finance | Budget, committed, invoiced, paid, variance, CSV import/export |
| Risks & Issues | Risk register with severity, mitigation, and closure workflows |

---

## Branch Strategy

```
main                          # production-ready, protected
develop                       # integration branch, PRs merge here first
feature/stonehaus-theme       # brand tokens, logo, Uiverse components
feature/portfolio-module      # portfolio dashboard and project detail
feature/critical-dates-module # critical dates table, alerts, status logic
feature/contracts-module      # contract registry and renewal alerts
feature/finance-module        # budget, invoices, CSV import/export
feature/risks-module          # risk register and workflows
feature/tasks-approvals-module # tasks board and approval queue
feature/auth-rbac             # SSO, MFA, role-based access control
```

**Flow:** `feature/*` → `develop` (PR + review) → `main` (PR + approval)

---

## Stage-Gate Model

1. Origination
2. Screening
3. LOI / Term Sheet
4. Site Control / PSA
5. Diligence
6. Entitlements
7. Power / Utility / Interconnection
8. Preconstruction
9. Capital Formation
10. Exit / NTP-Ready / Hold

---

## Brand System

| Token | Hex | Usage |
|---|---|---|
| `stone.primary` | `#0d2840` | Navy — primary actions, sidebar |
| `stone.accent` | `#c9a668` | Gold — highlights, focus rings |
| `stone.support.bluegray` | `#4a5f6d` | Secondary elements |
| `stone.support.sage` | `#889887` | Tertiary / chart series |
| `stone.neutral.900` | `#1c1c1c` | Near-black text |
| `stone.surface` | `#f8f6f1` | Off-white backgrounds |

**Uiverse components** (`src/components/stonehaus/`):
- `StonehausPrimaryButton`
- `StonehausSecondaryButton`
- `StonehausPill` (status chips)
- `StonehausToggle`
- `StonehausMetricCard`
- `StonehausLoader`
- `StonehausStageProgress`

---

## Security

- OWASP ASVS Level 2 target
- SSO + MFA for all users
- Backend-enforced RBAC on all reads/writes/exports
- Immutable audit logs: login, data changes, exports, approvals
- Encryption at rest and in transit
- CI/CD: dependency scanning, SAST, code review gates
- NIST SSDF: threat modeling, secure build, vulnerability response

---

## Roles

| Role | Access |
|---|---|
| Super Admin | Full admin, user provisioning, audit logs |
| Executive | Read-all, approve stage changes and major decisions |
| Acquisitions | Pipeline, deal data, contacts, LOIs |
| Development | Milestones, entitlements, utilities, risks |
| Legal | Contracts, obligations, legal risks |
| Finance | Budgets, invoices, exports |
| Analyst | Contribute under supervision |
| Read-only | Dashboards and reports only |

---

## Deployment

### AWS (Production)
- App: AWS App Runner or ECS Fargate
- DB: Amazon RDS (PostgreSQL)
- Storage: S3 with signed URLs
- Auth: AWS Cognito or third-party SSO provider
- CDN: CloudFront
- Secrets: AWS Secrets Manager
- Logs: CloudWatch

### Vercel (Staging)
- Next.js deployment via Vercel
- Preview deployments per PR on `develop`
- Environment variables via Vercel dashboard

---

## Getting Started (Local)

```bash
git clone https://github.com/denimdc8008/stonehaus-os.git
cd stonehaus-os
npm install
cp .env.example .env.local
# Fill in .env.local with DB, auth, and storage credentials
npm run dev
```

---

## Project Structure

```
src/
  app/
    (auth)/           # Login, MFA screens
    (dashboard)/
      portfolio/      # Portfolio dashboard
      projects/       # Project detail pages
      critical-dates/ # Critical dates module
      tasks/          # Tasks & approvals
      contracts/      # Contract registry
      finance/        # Financial controls
      risks/          # Risk register
      documents/      # Document center
      admin/          # Admin panel
  components/
    stonehaus/        # Stonehaus-branded Uiverse components
    ui/               # shadcn/ui base components
    layout/           # Sidebar, header, AppLogo
  lib/
    db/               # Database client and queries
    auth/             # Auth helpers and RBAC
    services/         # Business logic layer
  types/              # Shared TypeScript types
public/
  stonehaus-logo.svg  # Primary logo asset
```

---

## Delivery Phases

| Phase | Focus | Status |
|---|---|---|
| 1 | Requirements, stage criteria, field definitions | Planning |
| 2 | Theme tokens, logo, Uiverse components, wireframes | In Progress |
| 3 | MVP modules + auth/RBAC/audit | Pending |
| 4 | Pilot on 2-4 live projects | Pending |
| 5 | Security hardening, pen test, production rollout | Pending |

---

## Spec Document

Full product, design, and security spec is maintained in the team Notion/drive or can be found in `docs/stonehaus-os-spec.md`.

---

*Internal use only. All data is confidential and subject to Stonehaus Holdings information security policies.*
