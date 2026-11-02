# CLAUDE.md — Keells FoS

Android field service app for a real customer. React Native, Expo SDK 58, TypeScript, Expo Router. No business feature is in scope until the customer provides it. Nothing beyond `docs/project-context.md` is confirmed.

## Document map

Each topic has one home. Read that file instead of repeating it here.

| Path | Read when |
|------|-----------|
| `.specify/memory/constitution.md` | Planning or reviewing a change |
| `docs/project-context.md` | Before deciding a requirement or an open question |
| `docs/architecture.md` | Adding files, folders, or imports |
| `docs/ui.md` | Composing a screen or placing visual styling |
| `docs/engineering-guide.md` | Implementing, testing, or reviewing |
| `docs/development-workflow.md` | Starting or finishing a task |
| `docs/tooling.md` | Machine setup, agents, skills, permissions, MCP |
| `specs/NNN-name/` | Working on that feature |

## Layout

`src/app/` is Expo Router routes only. Route tests live in `__tests__/`, because tests cannot live in `src/app/`. Feature folders are in `docs/architecture.md` and are created only when they receive files. Agents are `.claude/agents/` (`developer`, `reviewer`, `tester`). Skills are `.claude/skills/`.

## Commands

Node 22.13 or newer. Run `nvm use` in the repo root. Setup on a new machine: `docs/tooling.md`.

| Command | Result |
|---------|--------|
| `npm run check` | Lint, type-check, format check, and tests. Run this before calling a change done |
| `npm test -- <path>` | One test file |
| `npm start` | Metro |
| `npx expo export --platform android` | Android JS bundle. No Android SDK needed |
| `npx expo-doctor@latest` | Passed, 20/20 |
| `npm run android` | Does not run on this Mac. Needs the Android SDK |

Prettier checks code only. Markdown is excluded. Record a newly verified command in this table.

## Gotchas

- Do not invent requirements, API contracts, or offline behavior.
- There is no `android/` directory. Do not add one. Expo generates it for a native build, and it is not committed. Add a package with `npx expo install` and the [Expo SDK 58 docs](https://docs.expo.dev/versions/v58.0.0/).
- Do not commit or push unless asked. Do not expose a secret value; refer to it by name.
- Start a development task with `/orchestrator`.
