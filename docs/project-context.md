# Project context — Keells FoS

Authoritative record of requirements, direction, candidates, open questions, and progress.
Do not treat candidates as selected. High-level design illustration: [`docs/architecture.md`](./architecture.md).

Last updated: 2026-11-01

---

## Confirmed requirements

| Item | Detail |
|------|--------|
| Product | Keells FoS — Android field service application |
| Client / nature | Real customer project |
| Client stack | React Native with Expo |
| Business features | Not confirmed. No feature, screen, or form is in scope until the customer provides it |
| Auth | Login requires internet; backend verifies credentials and issues JWT |
| Designs | Figma exists; needs requirements verification |
| Backend contracts | Not confirmed |
| Full business workflows | Not confirmed |
| Which business actions must work offline | **Unconfirmed** |
| Delivery inputs | Customer provides requirements, designs, and an office computer; no existing application source. This repository is the project starter |
| Task tracking | Not confirmed. A task may be a tracker key or pasted details. Jira is a candidate only |

---

## Accepted architectural direction

| Item | Detail |
|------|--------|
| Organization | Lightweight feature-based modular structure |
| Separation | Presentation, business logic, and data access kept separate in a practical way |
| Abstraction rule | Do not create empty layers or abstractions only to match diagram boxes |
| Feature scope from diagram | Illustrative labels only — do not scaffold unconfirmed modules from the diagram |
| Design reference | [`docs/architecture.md`](./architecture.md) — proposed high-level design; implementation details subject to requirements validation |
| Sync implementation approach | Do **not** build a generic sync framework up front. Establish minimum app foundation, then implement and validate synchronization through the **first confirmed feature** |
| Background scheduling | Pending records for an offline-capable workflow are retried while the app is minimized or closed, through Expo `expo-background-task` (WorkManager on Android). Do not add WorkManager as a separate package. Do not promise the upload at the exact moment internet returns. Add the package with the first offline-capable feature, not before |

### Intended behavior — offline-capable workflows

Applies only to workflows designated offline-capable. **Not** a requirement that every operation works offline.

**Happy path**

1. Validate the form locally.
2. Save the data durably on the device.
3. When online, immediately attempt submission through the sync mechanism (do not wait for a scheduled background job).

**Outcome handling**

| Outcome | UX / data |
|---------|-----------|
| Server accepts | Show “Submitted successfully”; complete the form |
| Server validation errors | Keep form open; preserve entered values; show field/form errors |
| Offline or network failure | Preserve data; show “Saved on device · Pending sync.” Do **not** treat as server success |

**Sync states**

| State | Meaning |
|-------|---------|
| `pending` | Waiting to send |
| `syncing` | Request in progress |
| `synced` | Server confirmed success |
| `failed` | Retryable failure |
| `needs_attention` | Requires user correction |

**Later sync / correction**

- If validation errors arrive during a later sync, show a persistent “Action required” indicator.
- User can reopen the record, see errors, correct them, and submit again.
- Do **not** repeatedly retry unchanged invalid data.
- A record still waiting to send is retried while the app is minimized or closed through `expo-background-task`. Until the server confirms, the list keeps showing “Saved on device · Pending sync.” The phone chooses when that retry runs.

**Coordination and duplicates**

- Immediate submission and later retries use **one coordinated sync mechanism**, which serializes in-flight work for the same record.
- Duplicate prevention is required, including the case where the server succeeds but the response is lost.
- Safe retries and duplicate prevention must be **coordinated with backend capabilities**; the client alone cannot guarantee idempotency.

**Auth / session (related)**

- Login requires internet (JWT issuance) — see Confirmed requirements.
- Whether previously signed-in users may continue working offline, and for how long, remains an **open question**.

---

## Candidate implementation choices

Validate against requirements / first feature before adopting:

| Candidate | Notes |
|-----------|--------|
| SQLite | Local durable records (and possibly outbox) |
| Outbox-style queue | Fits intended pending → syncing → synced/failed/needs_attention flow |
| Background scheduling | Selected: Expo `expo-background-task`. See Accepted architectural direction. Not installed until the first offline-capable feature |
| Managed / private attachment storage | Images, PDFs, cleanup after successful sync |
| Shared HTTP API client | Likely needed early; not formally selected |
| Advanced conflict handling | Open until rules are known |
| On-device copy for an offline-capable screen | See the candidate approach below. Not confirmed |

### Candidate approach — showing data on an offline-capable screen

Not a confirmed requirement. Use it only when a feature spec classifies that screen's read as offline-capable, and validate it with the first such screen. It does not choose a database product, an API contract, or a sync framework.

1. While online, download the records that screen needs and save them on the device.
2. When the screen opens, read that on-device copy and show it.
3. If the device is online, refresh that same copy from the server and show the updated copy. If the refresh fails, keep showing the last saved copy.
4. Send records that are still waiting to upload before applying a refresh. A refresh does not overwrite a record that is still waiting to be sent.

Saving and submitting stay under "Intended behavior — offline-capable workflows" above.

---

## Open questions

1. Exactly which business actions must work offline?
2. May previously signed-in users continue working offline, and for how long (JWT lifetime / refresh / offline session policy)?
3. Must sync run while the app is minimized or closed? **Resolved:** yes. See Background scheduling above.
4. Conflict rules when records are changed elsewhere?
5. What is the first confirmed feature, and which slice of it should validate sync?
6. Backend ownership, API style beyond JWT login? (incl. idempotency support)
7. Attachment types, retention, upload constraints?
8. Final Android package ID (currently placeholder `com.example.keellsfos`; permanent once published) — customer to confirm.
9. How to produce development builds without local Android Studio (EAS cloud build vs local command-line Gradle vs another machine/CI)? Includes whether the customer permits source upload to a third-party build service.
10. Release build and signing approach (who holds signing keys)?
11. Minimum supported Android version and representative test devices?
12. Project license / ownership terms (Expo template MIT license was intentionally not copied)?
13. Figma ↔ requirements verification process and owners?
14. Which task tracker is used? Jira (Cloud or Data Center), its project key, and whether its MCP access is permitted are all open. Until one is confirmed, tasks are pasted.
15. Customer git host, branching, and pull request conventions?
16. Does the customer permit AI coding tools and third-party MCP services (Atlassian, Figma) on project data?

---

## Setup progress

| Step | Status |
|------|--------|
| Inspect repository | Done |
| Documentation ownership | Document map in `CLAUDE.md` |
| Engineering principles | Approved → `.specify/memory/constitution.md` v1.0.0 |
| GitHub Spec Kit | Initialized v1.2.5, Claude integration; no feature specs generated |
| App structure / tooling proposal | Approved 2026-10-31 |
| Scaffold application foundation | Done — placeholder route only; `npm run check`, `expo-doctor`, and Android bundle export pass |
| On-device run | Blocked — this Mac cannot run Android Studio; no test device; `adb` not installed. Checks are lint, type-check, Jest, and the Android JS bundle |
| Generic sync framework | Explicitly deferred |
| Engineering foundation (2026-11-01) | Done — docs, `/orchestrator`, agents (`developer`, `reviewer`, `tester`), Spec Kit overrides, permissions, vendored `react-native-testing`. Claude Code is not installed on this Mac, so discovery is unverified |
| MCP | None configured; Jira (Atlassian) documented as optional per developer; Figma and Expo MCP deferred (`docs/tooling.md`) |

---

## Decision log

| Date | Decision | Status |
|------|----------|--------|
| 2026-10-31 | RN + Expo confirmed | Confirmed |
| 2026-10-31 | Lightweight feature-based organization; practical P / business / data separation | Accepted direction |
| 2026-10-31 | Diagram feature names illustrative; no feature folders from diagram alone | Accepted |
| 2026-10-31 | SQLite, outbox, background scheduling, attachment cleanup remain candidates | Accepted (as candidates) |
| 2026-10-31 | `CLAUDE.md` is repo navigation / working instructions | Accepted |
| 2026-10-31 | Intended offline-capable workflow behavior + sync states (see above) | Accepted intended behavior |
| 2026-10-31 | Login requires network (JWT); offline session policy unresolved | Confirmed / open |
| 2026-10-31 | No generic sync framework up front; validate via first confirmed feature | Accepted |
| 2026-10-31 | Background scheduling and advanced conflict handling remain open | Accepted |
| 2026-10-31 | Engineering principles (edited) ratified in Spec Kit constitution v1.0.0 | Approved |
| 2026-10-31 | Spec Kit in-repo init with Claude Code integration | Done |
| 2026-10-31 | Expo SDK 58, strict TypeScript, Expo Router (routes in `src/app/`), npm, Node 22 pinned | Approved |
| 2026-10-31 | Development builds (`expo-dev-client`) on a physical Android device; Continuous Native Generation (`android/` not committed) | Approved |
| 2026-10-31 | Checks: ESLint (expo) + Prettier (code only), `tsc --noEmit`, Jest (`jest-expo`) | Approved |
| 2026-10-31 | Placeholder Android package ID `com.example.keellsfos` until customer confirms | Approved (temporary) |
| 2026-10-31 | npm `overrides` pins `react-dom` to 19.3.0 to match SDK 58's `react` (peer of Expo Router web-only deps) | Done |
| 2026-11-01 | Repository is the actual project starter; development continues on the customer's office computer | Confirmed |
| 2026-11-01 | Task tracker is not confirmed. Jira stays a candidate. Intake accepts a task key or pasted details | Confirmed |
| 2026-11-01 | `/orchestrator` delegates code to `developer`. `reviewer` and `tester` are read-only. Spec Kit owns specs, plans, and tasks. Generated tasks require tests. Procedure: `docs/development-workflow.md` | Approved |
| 2026-11-01 | Project skills live in `.claude/skills/`; external skills reviewed before adding; `react-native-testing` vendored | Approved |
| 2026-11-01 | Spec Kit spec, plan, and tasks template overrides | Approved |
| 2026-11-01 | Constitution 1.0.1: ownership table replaced by link to `CLAUDE.md` document map | Approved |
| 2026-11-01 | Claude Code permissions: allow verified check scripts; ask on every `git push` and Atlassian MCP call; bypass mode disabled; `.env` readable | Approved |
| 2026-11-01 | Application structure `src/features/<feature>/{ui,logic,data}`, `src/shared/`, `src/infra/`, colocated tests; dependency rules in `docs/architecture.md` | Proposed default; confirm with first feature plan |
| 2026-11-01 | ESLint import-boundary rule and `@/` import alias | Deferred until `src/features/` exists |
| 2026-11-01 | Agent does not commit or push unless asked | Approved |
| 2026-11-01 | No business feature, screen, or form is in scope until the customer provides it | Confirmed |
| 2026-11-01 | Screen composition and styling rules live in `docs/ui.md`. Screens arrange shared pieces; styling stays inside those pieces. No UI kit or styling library is selected | Accepted |
| 2026-11-01 | Sync behavior stays in this file. No separate sync document until a confirmed feature makes those rules stable enough to own their own file | Confirmed |
| 2026-11-01 | Showing data on an offline-capable screen is a candidate only: the screen reads the on-device copy; when online, refresh that copy after pending uploads; a refresh does not overwrite a record still waiting to be sent | Accepted (as candidate) |
| 2026-11-01 | Pending records retry while the app is minimized or closed through Expo `expo-background-task`. Immediate send while the app is open and online stays. Do not promise upload at the instant internet returns. Not installed until the first offline-capable feature | Accepted direction |
