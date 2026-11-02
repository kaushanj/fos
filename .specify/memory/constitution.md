# Keells FoS Constitution

Shared engineering principles for this repository. Keep this file concise.
Detailed requirements, sync states, and unresolved policies live in `docs/project-context.md`.
Architectural illustration: `docs/architecture.md`. Working instructions: `CLAUDE.md`.

## Core Principles

### I. Requirements before abstraction
Ship the minimum structure that supports confirmed needs; grow patterns from the first real feature.

### II. One place of truth
Each concern lives in one authoritative document or module; avoid parallel specs.

### III. Feature-first modules
Organize by feature; share only what multiple features truly need.

### IV. Practical layering
Keep UI, business rules, and data access separable without empty ceremony layers.

### V. Local durability where offline-capable
For offline-capable workflows, save durably on device before relying on the network; never report server success without confirmation. (Workflow rules and sync states: `docs/project-context.md`.)

### VI. Coordinated sync with safe retries
Use one coordinated sync mechanism for immediate submission and later retries. Require safe retries and duplicate prevention **coordinated with backend capabilities** — the client alone cannot guarantee idempotency. Do not blindly retry data that needs user correction. (Details: `docs/project-context.md`.)

### VII. Protect credentials and customer data
Exclude secrets and sensitive data from logs; use appropriate secure storage; enforce authorization on the backend. (Online login and unresolved offline-session policy: `docs/project-context.md`.)

### VIII. Small, reviewable increments
Deliver small, reviewable increments. Run relevant checks, report actual results and verification gaps, and maintain verified development commands in `CLAUDE.md`.

### IX. Usability and performance
Handle loading, empty, error, and offline states clearly; check accessibility and performance on representative Android devices as workflows are implemented.

## Documentation ownership

The authoritative document map and ownership table is the **Document map** in [`CLAUDE.md`](../../CLAUDE.md). This constitution owns only the shared engineering principles above.

## Governance

- Amendments to these principles require explicit approval and an update to this file’s version metadata.
- Do not duplicate detailed requirements from `docs/project-context.md` into this constitution.
- Do not generate speculative feature specs; specify features only when requirements are confirmed.
- Spec Kit skills under `.claude/skills/` support specify → plan → tasks → implement; they do not replace the document map in `CLAUDE.md`.

**Version**: 1.0.1 | **Ratified**: 2026-10-31 | **Last Amended**: 2026-11-01

<!-- 1.0.1 (2026-11-01): Documentation ownership table replaced by a link to the CLAUDE.md document map. Principles unchanged. -->

