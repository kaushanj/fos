# Engineering guide — Keells FoS

Owns: coding conventions, quality practices (security, accessibility, performance, offline reliability, testing), verification levels, and the risk-based review checklist.
Principles: [constitution](../.specify/memory/constitution.md). Structure and dependency rules: [`architecture.md`](./architecture.md). Screen composition and styling: [`ui.md`](./ui.md). Process: [`development-workflow.md`](./development-workflow.md).

## Sources of truth

1. Confirmed requirements and decisions: feature specs under `specs/` and [`project-context.md`](./project-context.md).
2. This repository's docs and constitution.
3. Versioned Expo docs for the installed SDK (`https://docs.expo.dev/versions/v58.0.0/`) and library docs for installed versions.
4. Third-party skills under `.claude/skills/`. They are advice; where they conflict with 1–3, the project wins.

## Code conventions

- TypeScript strict. Avoid `any`; if unavoidable, explain why at the call site.
- File names in kebab-case (`record-form.tsx`). Named exports, except route files, which default-export the screen.
- Visual styling lives in shared UI pieces ([`ui.md`](./ui.md)). When a file has a `StyleSheet`, keep `StyleSheet.create` at the bottom.
- Keep route files thin: read params, render a feature screen.
- Match surrounding code; comment only constraints the code cannot show.
- Dependencies: add only for a current need, with `npx expo install <pkg>`. Check maintenance, license, and Expo SDK compatibility. Record foundational choices (storage, HTTP client, state library) as decisions in `project-context.md` before adopting them.
- There is no `android/` directory. Do not add one. Expo generates it for a native build, and it is not committed. Configure native behavior through `app.json` and config plugins.

## Screen states and user input

- Design loading, empty, error, and content states for every screen that loads data. Offline is a distinct state for online-required actions.
- Never lose user input: on failure keep the form values, show the error, allow retry.
- Disable repeat submission while a submission is in progress.

## Offline reliability

Applies only to actions a spec classifies as offline-capable. Required behavior: [`project-context.md`](./project-context.md) "Intended behavior". Implementation expectations:

- Save durably before any network attempt; report "Submitted" only after server confirmation.
- One coordinator owns submission and retries for a record; no parallel ad-hoc retries.
- Persist sync state and server validation errors so they survive app restarts.
- Do not retry unchanged data in `needs_attention`.
- Duplicate prevention needs a stable request identifier honored by the backend; record the backend capability in the spec.
- Native storage and background behavior are **unverified until tested on an Android device**.

## Security

- Never expose secret values in responses, logs, documentation, commits, or uploads. Refer to a secret by name.
- `EXPO_PUBLIC_*` variables are compiled into the app and are public. Never put secrets in them.
- Store tokens in platform secure storage (candidate: `expo-secure-store`), never in plain AsyncStorage or files.
- Do not log tokens, credentials, or personal data. Keep logs free of request bodies containing customer data.
- Validate deep-link and route parameters before use. Authorization is enforced by the backend; the client only hides what the user cannot do.

## Accessibility

- Give interactive elements a role and an accessible name; prefer the `role` and `aria-*` props.
- Touch targets at least 48×48 dp; support system font scaling without clipping.
- Do not convey meaning by color alone; meet contrast requirements from the designs.
- Screen reader (TalkBack) behavior is verified only on a device.

## Performance

- Measure before optimizing; do not add memoization without evidence.
- Use virtualized lists (`FlatList` or equivalent) for unbounded data.
- Keep heavy work off render paths; avoid large synchronous work on the JS thread.
- Check on representative low-end Android devices once available ([`project-context.md`](./project-context.md) open question 11).

## Testing

| Level | What | Where |
|-------|------|-------|
| Unit | `logic/` rules, mappers, pure utilities | Colocated `*.test.ts` |
| Component | Screens and components with React Native Testing Library (see the `react-native-testing` skill) | Colocated `*.test.tsx` |
| Route | Navigation and route wiring with `expo-router/testing-library` | `__tests__/` |
| Data access | Feature `data/` against a mocked `infra/` boundary | Colocated |

- Derive tests from the requirement and acceptance criteria, not from the implementation.
- For every validation limit, test the valid boundary value and the first invalid value outside it.
- For offline-capable actions, test each sync-state transition and the failure outcomes in `project-context.md`.
- Never delete, skip, or weaken a test to make it pass.

## Verification levels

Report the highest level reached for each change and the gaps that remain.

| Level | Evidence | How |
|-------|----------|-----|
| 1. Static | Lint, type-check, formatting pass | `npm run lint`, `npm run typecheck`, `npm run format:check` |
| 2. Automated tests | Jest passes, including new tests | `npm test` (all of level 1–2: `npm run check`) |
| 3. Bundle | Android JS bundle builds | `npx expo export --platform android` |
| 4. Android device | Behavior observed in a development build on a device or emulator | Not available yet (see `project-context.md` setup progress) |

Level 4 is required before claiming that native storage, background work, permissions, camera or files, performance, or TalkBack behavior works. Until then, report these as verification gaps.

## Risk-based review checklist

Used by the `reviewer` agent and by anyone reviewing a change. Apply the sections the change touches.

| Area | Triggered by | Check |
|------|--------------|-------|
| Requirements | Every change | Matches the spec or task; nothing invented; unclear points raised, not guessed |
| Structure | New files or imports | Folder responsibilities and dependency rules in `architecture.md`; no speculative layers |
| Security | Auth, tokens, env vars, logging, deep links, new dependencies | Rules in Security above; dependency provenance |
| Offline reliability | Persistence, sync, network calls in offline-capable actions | Rules in Offline reliability above; failure paths tested |
| Accessibility | UI changes | Roles, names, targets, scaling |
| Performance | Lists, heavy computation, startup, large assets | Rules in Performance above |
| Native config | `app.json`, config plugins, native packages | `npx expo-doctor@latest` and bundle export; device verification flagged |
| Tests | Behavior changes | Requirement-derived cases, boundaries, failures; no weakened tests |
| Maintainability | Every change | Naming, duplication, unrelated edits, unexplained complexity |
