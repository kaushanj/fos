# UI — Keells FoS

Owns: how a screen is composed and where visual styling lives.
Folder locations: [`architecture.md`](./architecture.md). Accessibility, screen states, and other code rules: [`engineering-guide.md`](./engineering-guide.md). Requirements and decisions: [`project-context.md`](./project-context.md).

No visual design is confirmed. Figma exists and still needs requirements verification. This document does not set colors, type sizes, spacing values, screens, or a component library. Do not copy another product's design system.

## How a screen is built

- A screen arranges shared pieces and connects them to that feature's rules.
- The look of a piece — padding, color, type, border — lives inside that piece, once.
- A screen does not repeat styling that a shared piece already owns.
- A screen may use `StyleSheet` only for a layout that belongs to that screen alone. Keep `StyleSheet.create` at the bottom of the file.

## Shared pieces

Create a piece when the first real screen needs it. Do not add empty pieces ahead of that screen.

| Piece | Where it lives |
|-------|----------------|
| App-wide text, field, button, screen container | `src/shared/ui/` |
| A piece used by one feature only | That feature's `ui/` |
| Color, type, and spacing from a confirmed design | One token module under `src/shared/ui/` |

Tokens are added from confirmed designs. Until then, shared pieces use plain React Native styling inside the piece.

## Not selected

No UI kit and no styling library is selected. Styling stays in React Native `StyleSheet` inside the shared pieces. Choosing a library is a decision recorded in [`project-context.md`](./project-context.md) before it is installed.

## Forms and the keyboard

A screen with several fields keeps the focused field above the keyboard, and a tap can move to the next field. Start with React Native's built-in keyboard APIs. Add a keyboard package only after an Android device shows those APIs are not enough, and record that choice in [`project-context.md`](./project-context.md) first. Device checks are still blocked ([`project-context.md`](./project-context.md) setup progress).
