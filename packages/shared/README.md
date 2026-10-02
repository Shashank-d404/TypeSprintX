# @typesprintx/shared

Platform-neutral types, constants and schemas shared by the TypeSprintX web app (`apps/web`),
API (`apps/api`) and desktop shell (`apps/desktop`).

## Purpose

One definition of the things the three apps must agree on, so they cannot drift apart:

- **Constants**: application name, API base path and route paths.
- **Keyboard layout model**: layout identifiers, physical key codes and the schema layouts are
  written in. Layouts are data, so adding AZERTY or QWERTZ later means adding data, not changing
  engine code.
- **API contracts**: the health-check response shapes, with Zod schemas for runtime validation.

## What belongs here

- Types, constants and Zod schemas that more than one workspace needs.
- Pure functions with no side effects and no environment assumptions (for example the
  `isPhysicalKeyCode` type guard).
- Anything that must behave identically in a browser, in Node and in Electron.

## What must NOT belong here

- Browser-only code: `window`, `document`, `localStorage`, React, DOM event types.
- Node-only code: `fs`, `path`, `process`, `Buffer`, Express types.
- Electron-only code: `ipcRenderer`, `ipcMain`, anything from the `electron` package.
- Database code: MySQL drivers, queries, connection settings, table or row types.
- Secrets, credentials, tokens, session handling or storage. Authentication and offline /
  session-recovery behaviour belong in the apps; this package stays free of them so it can be
  shared without widening the security surface.
- Typing-engine logic, AI code, or models for features that do not exist yet.

The compiler enforces part of this: the package builds with `lib: ["ES2022"]` and `types: []`, so
DOM and Node globals are not available to it.

## Layout

```
src/
  constants/   APP_NAME, API_SERVICE_NAME, API_BASE_PATH, API_ROUTES
  keyboard/    layout ids, physical key codes (KeyboardEvent.code), modifier layers
  schemas/     Zod schemas: health responses and keyboard layout definitions
  types/       TypeScript types inferred from the schemas
  index.ts     the only public entry point
```

Schemas are the source of truth for object shapes. Types in `types/` are inferred from them with
`z.infer`, never written out a second time.

## Keyboard layouts

A layout is a list of physical keys and what each produces on each modifier layer
(`base`, `shift`, `altGr`, `shiftAltGr`):

```ts
import { keyboardLayoutDefinitionSchema } from "@typesprintx/shared";

const layout = keyboardLayoutDefinitionSchema.parse({
  id: "qwerty",
  displayName: "QWERTY",
  keys: [{ code: "KeyA", outputs: { base: "a", shift: "A" } }],
});
```

Keys are identified by `KeyboardEvent.code` (the physical position), not by the character, so the
same key code maps to a different character in each layout.

Not modelled yet, to be decided when the typing engine is designed: dead keys and composed
characters, and non-character keys such as Enter or Backspace.

To add a layout: add its id to `KEYBOARD_LAYOUT_IDS`, fill in `KEYBOARD_LAYOUT_DISPLAY_NAMES`
(the compiler requires it), then write the layout data and validate it with
`keyboardLayoutDefinitionSchema`.

## Consuming the package

Add it to the consumer's `package.json` (npm workspaces link it from this repository):

```json
{
  "dependencies": {
    "@typesprintx/shared": "*"
  }
}
```

Then import from the package root only:

```ts
import { APP_NAME, API_BASE_PATH, API_ROUTES, healthResponseSchema } from "@typesprintx/shared";
import type { HealthResponse } from "@typesprintx/shared";
```

The package is ESM-only. Vite (web), tsx and Node ESM (API) and electron-vite (desktop) consume it
directly. A CommonJS consumer on Node 22.12 or later can `require()` it.

## Building

Consumers resolve the package through `dist/`, so it must be built before they typecheck, build or
run:

```bash
npm run build -w @typesprintx/shared      # one-off build to dist/
npm run dev -w @typesprintx/shared        # rebuild on change
npm run typecheck -w @typesprintx/shared  # type-check without emitting
```

`dist/` is not committed.
