---
name: nextjs-backend-frontend-integration
description: "Connect Next.js backend logic (server actions, route handlers, DB/services) with frontend components. Use when wiring forms, dashboards, lists, and mutation flows end-to-end with reporting, loading states, lazy loading, and performance optimization."
argument-hint: "What flow should be connected (example: add expense form to dashboard list refresh)?"
---

# Next.js Backend-Frontend Integration

Use this skill to connect existing backend logic with frontend components in a safe, performance-focused, and testable way.

## When To Use
- A backend flow already exists, but UI is not connected.
- A UI exists, but data fetching or mutations are missing.
- You need a structured integration report before coding.
- You need optimized loading behavior (lazy loading, loaders, streaming, and parallel fetching).

## Outcome
This skill produces:
1. Integration analysis report (what exists, what is missing, and integration plan).
2. End-to-end connection between backend and frontend.
3. Loading UX and optimization improvements.
4. Verification checklist with risk notes.

## Procedure
1. Inventory backend implementation.
Find and map:
- Data contracts: schema, DTO shape, return type, error shape.
- Entry points: server actions, route handlers, service functions.
- Side effects: DB writes, cache invalidation, revalidation, auth checks.

2. Inventory frontend implementation.
Find and map:
- Components and route structure.
- Current props/state shape and form fields.
- Existing loading, error, and empty states.
- Client vs server component boundaries.

3. Build integration contract matrix.
Create a concise mapping:
- UI event -> backend function.
- Input payload -> validation source.
- Response shape -> UI state updates.
- Failure type -> user-facing error state.

4. Generate pre-implementation report.
Report must include:
- Compatible parts (can be reused directly).
- Mismatches (naming/type/shape/lifecycle differences).
- Required adapters/transformers.
- Recommended integration approach.

5. Implement connection with proper logic.
Use this decision tree:
- If the interaction is user-initiated mutation from the same app boundary, prefer server actions.
- If external consumption, webhooks, or non-React clients are needed, use route handlers.
- If data is needed on initial render, fetch in server components.
- If data updates frequently from user interaction, use client-side refresh strategy.

6. Add loading and rendering strategy.
- Provide immediate feedback for all async actions.
- Use page or segment-level loading UI where supported.
- Use component-level fallback for isolated async sections.
- Never leave blank UI while waiting for data.

7. Optimize performance.
- Run independent requests in parallel (fetch-all pattern using Promise.all).
- Lazy load heavy or below-the-fold interactive components.
- Avoid duplicate fetches and unnecessary client state copies.
- Keep business logic on the server when possible.
- Revalidate only required paths/tags after mutations.

8. Validate and finalize.
Check:
- Types are aligned across backend and frontend.
- Success, error, loading, and empty paths all render correctly.
- No waterfall fetches for independent data requirements.
- No regressions in auth, validation, or cache behavior.

## Quality Gates
- Contract correctness: payload and response types match exactly.
- UX completeness: loading/error/empty states are visible and meaningful.
- Performance baseline: no obvious serial fetch bottlenecks.
- Maintainability: clear separation between UI, orchestration, and data logic.

## Output Format
When invoked, respond in this order:
1. Integration Report
2. Implementation Plan
3. Code Changes
4. Verification Results
5. Optimization Summary

## Guardrails
- Do not guess payload or response shapes; derive from existing backend code.
- Do not duplicate business logic in client components.
- Do not over-lazy-load critical above-the-fold content.
- Prefer minimal, focused changes over broad rewrites.
