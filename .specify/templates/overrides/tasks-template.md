---

description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

<!--
  Keells FoS project override of the Spec Kit core tasks template
  (.specify/templates/overrides/tasks-template.md). It replaces the core
  template completely. Tests are required. After a Spec Kit upgrade, compare
  this file with .specify/templates/tasks-template.md and carry over upstream
  changes without restoring "tests are optional".
  Test levels and locations: docs/engineering-guide.md (Testing).
  Paths come from the feature plan.md, which follows docs/architecture.md.
-->

**Tests**: Required for every user story. Generate test tasks in that story's phase, before its implementation tasks. Derive them from the story's acceptance criteria and independent test. Use the levels in `docs/engineering-guide.md` (Testing): colocated `*.test.ts` for `logic/` and `data/`, colocated `*.test.tsx` for screens and components, and `__tests__/` for routes. For every validation limit, include the valid boundary value and the first invalid value. For each offline-capable action, include every sync-state transition and the failure outcomes in `docs/project-context.md`. Do not mark tests optional, and do not wait for a separate request to include them.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

Use the paths in the feature `plan.md`. The project default is `src/features/<feature>/{ui,logic,data}`, `src/shared/`, `src/infra/`, and `src/app/` for routes (`docs/architecture.md`). Tests are colocated, except route tests in `__tests__/`. Do not create `android/`. Sample paths below are illustrations and must be replaced.

<!--
  Samples only. Replace them from spec.md and plan.md. Do not copy them into tasks.md.
-->

## Phase 1: Setup

**Purpose**: Only setup this feature actually needs. Omit tasks for tooling that already exists.

- [ ] T001 [paths from plan.md]

---

## Phase 2: Foundational

**Purpose**: Shared work that blocks every user story. Omit this phase when the stories need nothing shared. No user story starts before this phase is complete.

- [ ] T002 [for example, a record this feature stores, under src/infra/ or the feature data/]

**Checkpoint**: Story work can start.

---

## Phase 3: User Story 1 - [Title] (Priority: P1)

**Goal**: [what this story delivers]

**Independent Test**: [how to verify this story alone]

### Tests for User Story 1 (REQUIRED)

- [ ] T010 [P] [US1] Unit tests for [rule], including boundary values, in src/features/[feature]/logic/[name].test.ts
- [ ] T011 [P] [US1] Component test for [screen] in src/features/[feature]/ui/[name].test.tsx

### Implementation for User Story 1

- [ ] T012 [US1] [behavior] in src/features/[feature]/logic/[name].ts
- [ ] T013 [US1] [screen or data access] in src/features/[feature]/ui/[name].tsx

**Checkpoint**: User Story 1 works on its own.

---

[Repeat Phase 3 for each further story: tests first, then implementation, then a checkpoint. Number tasks in order.]

---

## Phase N: Polish

**Purpose**: Work that spans stories. Omit tasks the stories do not need.

- [ ] TXXX [P] Add any acceptance-criteria tests still missing, colocated with the code they cover

---

## Order

- Setup, then foundational work, then stories by priority (P1, then P2, …), then polish.
- Each story's tests come before its implementation tasks and are finished with the story. Derive them from the acceptance criteria. A failing-test-first cycle is not required.
- A story may use an earlier story but must stay independently testable.
- Tasks marked [P] touch different files and can run together.
- Do not commit unless the user asks.
- Replace every sample path with a real path from plan.md. Do not keep these sample tasks in the generated file.
