# DrPhysioAI — Clinical Platform Development Plan

> **Vision:** the AI-powered clinical operating system for physiotherapy —
> assessment, transparent clinical reasoning, documentation, exercise
> prescription, outcomes and practice management.
>
> **Non-negotiable principle:** DrPhysioAI is clinical **decision support** for
> qualified clinicians. It is **not a medical device**, does not diagnose, and
> never replaces professional judgment. Every AI suggestion is transparent,
> ranked, and evidence-referenced; the treating physiotherapist decides.

## Current status (this session)

Foundation + flagship reasoning demo are **built, static-rendered and pushed**:

- Clinician homepage (`/`) — positioning, 6 platform pillars, 10 specialty
  modules, evidence + security, SaaS pricing (Solo / Clinic / Enterprise).
- **AI Clinical Assistant** (`/assistant`) — an interactive 5-step assessment
  wizard (Patient → Region → Red-flag screening → Objective/special tests →
  ranked differential suggestions with rationale + evidence + management +
  exercises). Region data for Knee / Low back / Shoulder in `lib/clinical.ts`.
- Auth (`/login`, `/signup`) and a dashboard (`/dashboard`) carried over.
- Design system, SEO/JSON-LD, PWA — all in place.

Everything below the demo is **sample/illustrative data**, not validated
clinical content, and the reasoning is rule-based, not yet a real AI model.

---

## Recommended architecture

| Layer | Choice | Why |
|---|---|---|
| Frontend | Next.js 14 (App Router) + TS + Tailwind | Already in place; fast, SSR/ISR, PWA. |
| Backend | Next.js Route Handlers → extract to services as scale demands | Start modular monolith, not premature microservices. |
| Auth | Supabase Auth (available in repo) | RBAC, SSO later for enterprise. |
| Primary DB | Postgres (Supabase) with row-level security | Clinic-level data isolation via RLS. |
| Vector DB | pgvector (same Postgres) → dedicated store if needed | RAG over licensed evidence. |
| LLM | Claude (Anthropic) via server routes | Reasoning, drafting, summarisation. |
| Retrieval (RAG) | Chunk + embed licensed/open evidence; cite sources | Transparent, updateable knowledge base. |
| Storage | Supabase Storage / S3 | Documents, images, handouts. |
| Search | Postgres FTS + vector hybrid | Natural-language clinical search. |
| Infra/CI-CD | Vercel + GitHub Actions | Preview deploys, tests on PR. |
| Observability | Structured logs, audit trail table, error tracking | Compliance + debugging. |

---

## Phases

### Phase 1 — Foundation ✅ (started)
Design system, marketing site, auth shell, assistant demo. Add: real Supabase
auth, protected routes, tenant (clinic) model, roles (clinician/admin/student).

### Phase 2 — Assessment engine
Data-model the assessment pathways (regions → subjective/objective → special
tests → outcome measures → red/yellow flags). Persist assessments per patient.
Expand beyond the 3 demo regions to all major regions.

### Phase 3 — Clinical documentation
SOAP notes, initial assessment, progress notes, discharge, referral/GP/insurance
/ NDIS / WorkCover letters. LLM drafts from structured assessment data; always
editable; versioned; e-signature + finalise/lock.

### Phase 4 — Knowledge base (RAG)
Ingest licensed/open-access/public-domain evidence only. Chunk, embed (pgvector),
retrieve with citations. Admin pipeline to add/update sources. Never store
copyrighted books.

### Phase 5 — AI clinical assistant (real)
Replace rule-based demo with Claude + RAG: ranked differentials with rationale
and cited evidence, recommended further assessment, management options. Guardrails,
confidence display, mandatory "clinician decides" framing, red-flag escalation.

### Phase 6 — Exercise engine
Evidence-tagged exercise library (purpose, indications, contraindications,
dosage, progressions/regressions, media, common errors, handouts). AI
prescription assistant with parameters.

### Phase 7 — Practice management
Scheduling, appointments, patient records, billing/invoices, consent forms,
digital signatures, telehealth, messaging, notifications.

### Phase 8 — Subscriptions & billing
Trial + 3/6/12-month, 5-year Pro, Clinic multi-user, University, Enterprise.
Role-based feature gating. Stripe (and/or Shopify) checkout, invoices, GST.

### Phase 9 — Enterprise features
SSO, granular RBAC, audit logs, data-isolation guarantees, hospital/university
dashboards, analytics (outcomes, documentation completion, engagement), API.

### Phase 10 — Global expansion
Multilingual UI + translation, region-specific guidelines/measures,
localisation, marketplace/integrations, mobile apps.

Each phase ships with: schema + migrations, API contracts, UI screens, unit +
integration tests, and a preview deploy before merge.

---

## Compliance & safety backlog (cross-cutting)
- Prominent clinical disclaimers on every AI surface (done on demo).
- Audit logging of AI suggestions vs. clinician decisions.
- Human-in-the-loop for all outputs; no autonomous clinical action.
- Data privacy: encryption, RLS isolation, retention policy, DPA.
- Only licensed/authorized evidence sources in the knowledge base.
