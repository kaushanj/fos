# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]

**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command; its definition describes the execution workflow.

<!--
  Keells FoS project override of the Spec Kit core plan template
  (.specify/templates/overrides/plan-template.md). It replaces the generic
  source-layout options with the project's structure and adds boundary,
  offline, and verification checks. This plan is the only implementation
  plan for the feature; do not create a parallel plan elsewhere.
  Read first: docs/architecture.md (structure and dependency rules) and
  docs/engineering-guide.md (conventions, testing, verification levels).
-->


## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [TypeScript (strict); Expo SDK / React Native versions as installed in package.json]

**Primary Dependencies**: [Existing packages used, plus any NEW package with justification; add with `npx expo install`]

**Storage**: [N/A, or the local storage this feature needs; a new storage technology is a decision to record in docs/project-context.md]

**Testing**: [Jest (jest-expo) + React Native Testing Library; list the test levels used]

**Target Platform**: [Android; minimum version per docs/project-context.md or NEEDS CLARIFICATION]

**Project Type**: [mobile-app]

**Performance Goals**: [from the spec, or NEEDS CLARIFICATION]

**Constraints**: [from the spec, including offline-capable actions, or NEEDS CLARIFICATION]

**Scale/Scope**: [from the spec, or NEEDS CLARIFICATION]

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

[Gates determined based on constitution file]

**Boundary check** (docs/architecture.md "Dependency rules"):

- [ ] Route files stay thin and render feature screens
- [ ] No feature imports another feature's internals
- [ ] `shared/` and `infra/` additions have a current consumer (no speculative layers)
- [ ] New infrastructure (storage, HTTP client, sync, background work) is recorded as a decision

**Connectivity check** (spec "Connectivity & Offline Behavior"):

- [ ] Every action in the spec's connectivity table is handled as classified
- [ ] Offline-capable actions follow docs/project-context.md intended behavior; deltas are listed under Offline & Sync Design
- [ ] No action is treated as offline-capable without a recorded source

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# Keep only the paths this feature creates or changes. Create a folder only
# when it receives files. Folder responsibilities: docs/architecture.md.
src/
├── app/                      # Expo Router routes this feature adds or changes (thin)
├── features/[feature]/
│   ├── index.ts              # public API used by routes and other features
│   ├── ui/                   # screens, components, presentation hooks
│   ├── logic/                # pure business rules: validation, mapping, state transitions
│   └── data/                 # remote API calls and local persistence for this feature
├── shared/                   # only code with two or more real consumers
└── infra/                    # app-wide technical adapters this feature needs
__tests__/                    # route-level tests (tests may not live under src/app/)
```

Tests for `features/`, `shared/`, and `infra/` are colocated as `*.test.ts(x)` beside the code.

**Structure Decision**: [List the real paths above and explain any deviation from
docs/architecture.md. A deviation that changes project structure needs approval.]

## Offline & Sync Design *(only if the spec has Offline-capable actions)*

- **Local persistence**: [what is stored, where, and the storage decision it relies on]
- **Sync states and transitions**: [how this feature uses the states in docs/project-context.md]
- **Duplicate prevention**: [request identifier and the backend capability it depends on]
- **Failure handling**: [network failure, server validation errors, needs-attention correction]
- **Coordination**: [how immediate submission and later retries share one mechanism]

## Verification Plan

Verification levels are defined in docs/engineering-guide.md.

- **Automated**: [unit, component, and route tests to add; `npm run check`]
- **Bundle**: [`npx expo export --platform android` if dependencies, config, or native modules change]
- **Android device**: [behaviors that remain unverified until tested on a device: storage, background, permissions, performance, TalkBack]

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [principle] | [current need] | [why the simpler approach fails] |
