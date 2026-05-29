# ⚡ Physics Engine

> A generative design system based on physical laws, not static values.

Most design systems are dictionaries — you look up a value and apply it. Physics Engine is different. Every dimension, color, and motion is **derived from first principles**. There are no magic numbers.

```bash
npx @trubnikov/physics-engine lint DESIGN.md
npx @trubnikov/physics-engine export --format tailwind DESIGN.md
```

---

## The Idea

UI elements obey **physical laws**. A button press is not a CSS state change — it is an energy elevation and a physical compression. A card doesn't have a shadow — it has a low energy level that puts it above the void.

This metaphor makes design decisions **self-explanatory** to any AI agent. Instead of "use #3B82F6 for the primary button", you say: "primary actions are at Kinetic Peak (Level 3) and emit glow as a side effect of their energy state."

The agent never needs to guess. It derives the right value from the law.

---

## DESIGN.md Format

Physics Engine uses the [DESIGN.md](https://github.com/google-labs-code/design.md) format — YAML front matter for machine-readable tokens, markdown prose for the rationale.

```md
---
name: Physics Engine
colors:
  void:     "#050505"   # Level 0 — Background universe
  surface:  "#111113"   # Level 1 — Cards, panels
  kinetic:  "#3B82F6"   # Level 3 — Primary actions, emits glow
spacing:
  compact: "8px"        # 2× Base Unit
  optimal: "16px"       # 4× Base Unit — most common value
motion:
  micro:
    type: spring
    mass: 0.5
    stiffness: 500
    damping: 25
components:
  button-primary:
    backgroundColor: "{colors.kinetic}"
    textColor:       "{colors.kinetic-text}"
    height:          "44px"   # Fitts Law minimum
    motion:          "{motion.micro}"
---

## Overview
A generative system where every value is derived, not chosen.
```

An AI agent that reads this file will produce a UI where primary buttons glow at `#3B82F6`, all spacing is divisible by 4, interactive elements never drop below the 44px touch minimum, and animations use calibrated spring physics — without you telling it any of that explicitly.

---

## The Physics

### Energy Levels (Color System)

| Level | Name | Material | Use |
|-------|------|----------|-----|
| 0 | Void | `#050505` | Background universe |
| 1 | Surface | `#111113` | Cards, panels, containers |
| 2 | Interactive | `#1F1F24` | Idle inputs, secondary buttons |
| 2.5 | Hover | `#2A2A30` | Energy elevation on hover |
| 3 | Kinetic Peak | `#3B82F6` | Primary actions, emits glow |
| — | Destructive | `#EF4444` | Danger, follows Level 3 rules |

### Spatial Mathematics

All dimensions derive from a single **Base Unit: 4px**.

```
Compact  =  2× =  8px  →  icon-to-text gap
Optimal  =  4× = 16px  →  standard component padding
Loose    =  6× = 24px  →  section spacing
Macro    = 12× = 48px  →  modal internal padding
```

### Topology Collapse (Border Radius)

```
Dynamic Radius = min(12px, height / 2)
```

This formula prevents two failure states: over-rounding a small element into an unintended pill, and under-rounding a tall element into a rectangle. Radius is a function of the element's geometry, not a designer's choice.

### Kinematics (Spring Physics)

No `ease-in-out`. No `linear`. Physics Engine uses **spring presets** defined as machine-readable tokens:

```yaml
motion:
  micro:                          # Buttons, toggles, checkboxes
    type: spring
    mass: 0.5
    stiffness: 500
    damping: 25
  macro:                          # Modals, sidebars, drawers
    type: spring
    mass: 1.0
    stiffness: 250
    damping: 30
  tap-scale: 0.96
```

State transitions follow energy laws:
- **Hover** → Elevate energy +0.5
- **Press** → Compress to `scale(0.96)`, elevate energy +1

### Accessibility

- **Fitts Law** — Every interactive element must be at least `44×44px`
- **Focus Ring** — Never suppress without replacement. Always `2px Kinetic-colored ring`
- **ARIA** — All interactive elements carry semantic HTML and `aria-*` states

---

## CLI

### Install

```bash
npm install -g @trubnikov/physics-engine
# or run without installing:
npx @trubnikov/physics-engine lint DESIGN.md
```

### `lint` — Validate your DESIGN.md

```bash
npx @trubnikov/physics-engine lint DESIGN.md
```

```json
{
  "findings": [
    {
      "rule": "contrast-ratio",
      "severity": "info",
      "path": "components.button-primary",
      "message": "textColor (#FFFFFF) on backgroundColor (#3B82F6) has contrast ratio 4.51:1 — passes WCAG AA."
    },
    {
      "rule": "fitts-law",
      "severity": "info",
      "path": "components.button-primary",
      "message": "height 44px meets Fitts Law minimum."
    }
  ],
  "summary": { "errors": 0, "warnings": 0, "info": 3 }
}
```

Exit code `1` if errors are found.

### `export` — Convert to other formats

```bash
# Tailwind theme config
npx @trubnikov/physics-engine export --format tailwind DESIGN.md > tailwind.config.js

# W3C Design Token Format (DTCG)
npx @trubnikov/physics-engine export --format dtcg DESIGN.md > design_tokens.json

# SwiftUI Design System
npx @trubnikov/physics-engine export --format swiftui DESIGN.md > DesignSystem.swift
```

### `spec` — Print the specification

```bash
npx @trubnikov/physics-engine spec
npx @trubnikov/physics-engine spec --format json
```

---

## Programmatic API

```typescript
import { lint } from '@trubnikov/physics-engine/linter';
import { exportTokens } from '@trubnikov/physics-engine/exporter';

const report = lint(designMdString);
console.log(report.findings);     // Finding[]
console.log(report.summary);      // { errors, warnings, info }
console.log(report.designSystem); // Parsed DesignSystem

const tailwind = exportTokens(designMdString, 'tailwind');
const dtcg     = exportTokens(designMdString, 'dtcg');
const swiftui  = exportTokens(designMdString, 'swiftui');
```

---

## Generating UI with AI

Drop `DESIGN.md` into your AI agent's context. The agent now has everything it needs to generate correct, physics-consistent UI.

**Prompt:**
```
Build a login form using DESIGN.md.
```

**What the agent derives — without being told:**
- Input backgrounds at Level 2 (`#1F1F24`)
- Focus state elevates to Level 2.5 (`#2A2A30`)
- Submit button at Level 3 (`#3B82F6`) with glow emission
- All padding multiples of 4px
- Spring physics (`mass: 0.5, stiffness: 500, damping: 25`) for all transitions
- ARIA labels on all fields
- Minimum 44px tap targets on all interactive elements

---

## Linting Rules

| Rule | Severity | What it checks |
|------|----------|----------------|
| `broken-ref` | error | Token references `{path.to.token}` must resolve |
| `missing-primary` | warning | A kinetic or primary color must exist |
| `contrast-ratio` | warning | WCAG AA minimum 4.5:1 for text/background pairs |
| `orphaned-tokens` | warning | Defined colors should be referenced by components |
| `fitts-law` | error | Interactive elements must be ≥ 44×44px |
| `energy-conservation` | error | Kinetic color must contrast against Void background |
| `nested-radius-law` | error | Outer radius must be ≥ padding |
| `token-summary` | info | Count of tokens in each section |
| `missing-typography` | warning | Typography tokens should exist alongside colors |

---

## Examples

Three reference implementations — each a complete product design system derived from Physics Engine laws:

| Example | Theme | Demonstrates |
|---------|-------|--------------|
| [`dark-command`](examples/dark-command/) | AI chat / dev console | Energy levels, dual typography, motion layer |
| [`kinetic-commerce`](examples/kinetic-commerce/) | E-commerce product page | Single kinetic focal point, success state physics |
| [`calm-focus`](examples/calm-focus/) | Productivity / notes | Physics of restraint, prose typography |

Each example includes `DESIGN.md`, `design_tokens.json`, `tailwind.config.js`, and `README.md`.

---

## Project Structure

```
design-physics-engine/
├── DESIGN.md              ← The design system spec (start here)
├── src/
│   ├── cli.ts             ← CLI entry point
│   ├── lint.ts            ← Linter (9 rules)
│   ├── export.ts          ← Export to Tailwind / DTCG / SwiftUI
│   └── parse.ts           ← DESIGN.md parser
├── examples/
│   ├── dark-command/      ← AI chat interface example
│   ├── kinetic-commerce/  ← E-commerce example
│   └── calm-focus/        ← Productivity app example
└── docs/
    └── spec.md            ← Full specification
```

---

## Compatibility

Physics Engine's `DESIGN.md` format is compatible with and extends [`@google-labs-code/design.md`](https://github.com/google-labs-code/design.md). Any valid Physics Engine file is a valid `@google-labs-code/design.md` file.

Physics Engine adds:
- `motion` token section (spring physics presets) — absent from Google's spec
- `energy-conservation` and `nested-radius-law` linting rules
- `fitts-law` linting rule
- Energy Level semantic naming convention
- SwiftUI export target

```bash
npx @google-labs-code/design.md lint DESIGN.md        # Google's linter
npx @trubnikov/physics-engine lint DESIGN.md           # Physics Engine linter (stricter + motion)
```

---

## Roadmap

- **v1.1** — Motion token validation in linter + Framer Motion code generation
- **v1.2** — OKLCH color space (`L` axis maps directly to Energy Levels)
- **v2.0** — VS Code extension (live linting) · Figma Variables sync

---

## License

MIT ©2026 [Dima Trubnikov](https://github.com/trubnikov)
