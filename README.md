# ⚡ Physics Engine

> A structured dark UI design system with semantic token naming, spring kinematics, and a built-in linter.

Most design systems are dictionaries — you look up a value and apply it. Physics Engine adds two things on top: **semantic naming** (tokens describe intent, not just value) and **enforcement rules** (a linter that validates Fitts Law, WCAG contrast, and geometric consistency). The tokens are hand-curated. The value is in what they mean and what the linter catches.

```bash
npx @dimkant/physics-engine lint DESIGN.md
npx @dimkant/physics-engine export --format tailwind DESIGN.md
npx @dimkant/physics-engine export --format swiftui DESIGN.md
```

---

## The Idea

UI elements obey **physical laws**. A button press is not a CSS state change — it is an energy elevation and a physical compression. A card doesn't have a shadow — it has a low energy level that puts it above the void.

This metaphor makes design decisions **self-explanatory** to any AI agent. Instead of "use #3B82F6 for the primary button", you say: "primary actions are at Kinetic Peak (Level 3) and emit glow as a side effect of their energy state."

The agent knows not just what a color is — but when and why to use it.

---

## DESIGN.md Format

Physics Engine uses the [DESIGN.md](https://github.com/google-labs-code/design.md) format — YAML front matter for machine-readable tokens, markdown prose for the rationale.

```md
---
name: My App
colors:
  void:     "#050505"   # Level 0 — Background
  surface:  "#111113"   # Level 1 — Cards, panels
  kinetic:  "#3B82F6"   # Level 3 — Primary actions, emits glow
  success:  "#22C55E"   # Confirmation, completion
  warning:  "#F59E0B"   # Non-blocking alerts
spacing:
  compact: "8px"        # 2× Base Unit
  optimal: "16px"       # 4× Base Unit
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
    height:          "44px"
    motion:          "{motion.micro}"
  button-primary-disabled:
    backgroundColor: "{colors.interactive}"
    textColor:       "{colors.surface-text-muted}"
    height:          "44px"
---
```

An AI agent reading this file knows: the button color, its disabled state, its animation spring parameters, its minimum touch size — without guessing any of it.

---

## The Physics

### Energy Levels (Color System)

| Level | Name | Value | Use |
|-------|------|-------|-----|
| 0 | Void | `#050505` | Background |
| 1 | Surface | `#111113` | Cards, panels, containers |
| 2 | Interactive | `#1F1F24` | Idle inputs, secondary buttons |
| 2.5 | Hover | `#2A2A30` | Energy elevation on hover |
| 3 | Kinetic | `#3B82F6` | Primary actions, emits glow |
| — | Destructive | `#EF4444` | Danger actions |
| — | Success | `#22C55E` | Confirmation, completion |
| — | Warning | `#F59E0B` | Non-blocking alerts |

### Typography Scale

| Token | Size | Weight | Use |
|-------|------|--------|-----|
| `h1` | 31px | 700 | Page titles |
| `h2` | 25px | 600 | Section headers |
| `h3` | 20px | 500 | Card titles |
| `body` | 16px | 400 | Paragraph text |
| `label` | 14px | 500 | Button text, form labels |
| `caption` | 12px | 400 | Metadata, timestamps |
| `code` | 14px | 400 | Code blocks (monospace) |

### Spatial Mathematics

All dimensions derive from a single **Base Unit: 4px**.

```
Compact  =  2× =  8px  →  icon-to-text gap
Optimal  =  4× = 16px  →  standard component padding
Loose    =  6× = 24px  →  section spacing
Macro    = 12× = 48px  →  layout gaps
```

### Topology Collapse (Border Radius)

```
Dynamic Radius = min(12px, height / 2)
Surface Radius = 32px
```

Radius is a function of geometry, not a designer's choice.

### Kinematics (Spring Physics)

No `ease-in-out`. No `linear`. Physics Engine uses **spring presets** as machine-readable tokens:

```yaml
motion:
  micro:                      # Buttons, toggles, chips
    type: spring
    mass: 0.5
    stiffness: 500
    damping: 25
  macro:                      # Modals, sidebars, drawers
    type: spring
    mass: 1.0
    stiffness: 250
    damping: 30
  tap-scale: 0.96
```

### Data Visualization

Six perceptually distinct colors for charts and multi-series data:
`data-1` (#3B82F6) · `data-2` (#8B5CF6) · `data-3` (#10B981) · `data-4` (#F59E0B) · `data-5` (#EF4444) · `data-6` (#06B6D4)

### Accessibility

- **Fitts Law** — Every interactive element must be at least `44×44px`
- **Focus Ring** — `2px solid {colors.kinetic}`, offset `2px`
- **ARIA** — All interactive elements carry semantic HTML and `aria-*` states

---

## CLI

### Install

```bash
npm install -g @dimkant/physics-engine
# or run without installing:
npx @dimkant/physics-engine lint DESIGN.md
```

### `lint` — Validate your DESIGN.md

```bash
npx @dimkant/physics-engine lint DESIGN.md
```

```json
{
  "findings": [
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
npx @dimkant/physics-engine export --format tailwind DESIGN.md > tailwind.config.js

# W3C Design Token Format (DTCG)
npx @dimkant/physics-engine export --format dtcg DESIGN.md > design_tokens.json

# SwiftUI Design System
npx @dimkant/physics-engine export --format swiftui DESIGN.md > DesignSystem.swift
```

### `spec` — Print the specification

```bash
npx @dimkant/physics-engine spec
```

---

## Programmatic API

```typescript
import { lint } from '@dimkant/physics-engine/linter';
import { exportTokens } from '@dimkant/physics-engine/exporter';

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

Drop `DESIGN.md` into your AI agent's context and ask it to build UI. The agent derives every property from the file — no guessing.

**Prompt:**
```
Build a login form using this DESIGN.md. Use only values from the file.
```

**What the agent knows without being told:**
- Input backgrounds at Level 2 (`#1F1F24`)
- Focus state: Level 2.5 (`#2A2A30`) + 2px kinetic ring
- Submit button: Level 3 (`#3B82F6`) + glow + 44px height
- All padding multiples of 4px
- Spring physics (`mass: 0.5, stiffness: 500`) for all transitions
- Disabled state uses muted text on surface background

---

## Linting Rules

| Rule | Severity | What it checks |
|------|----------|----------------|
| `broken-ref` | error | Token references must resolve |
| `missing-primary` | warning | A kinetic or primary color must exist |
| `contrast-ratio` | warning | WCAG AA minimum 4.5:1 |
| `orphaned-tokens` | warning | Colors should be used by components |
| `fitts-law` | error | Interactive elements must be ≥ 44×44px |
| `energy-conservation` | error | Kinetic must contrast against Void |
| `nested-radius-law` | error | Outer radius must be ≥ padding |
| `token-summary` | info | Count of tokens per section |
| `missing-typography` | warning | Typography must exist alongside colors |

---

## Examples

| Example | Theme | Demonstrates |
|---------|-------|--------------|
| [`dark-command`](examples/dark-command/) | AI chat / dev console | Energy levels, motion layer, dual typography |
| [`kinetic-commerce`](examples/kinetic-commerce/) | E-commerce product page | Single kinetic focal point, success state |
| [`calm-focus`](examples/calm-focus/) | Productivity / notes | Physics of restraint, prose typography |
| [`material-3`](examples/material-3/) | Google Material Design 3 | Any design system can be encoded |

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
│   ├── dark-command/
│   ├── kinetic-commerce/
│   ├── calm-focus/
│   └── material-3/        ← Google M3 encoded as Physics Engine
└── docs/
    └── spec.md            ← Full specification v1.1
```

---

## Compatibility

Physics Engine's `DESIGN.md` is compatible with and extends [`@google-labs-code/design.md`](https://github.com/google-labs-code/design.md).

Physics Engine adds: `motion` tokens · `success`/`warning` colors · data viz palette · `label`/`caption`/`code` typography · component states (disabled, error, loading) · SwiftUI export · stricter linting (Fitts Law, energy-conservation, nested-radius-law).

```bash
npx @google-labs-code/design.md lint DESIGN.md   # Google's linter
npx @dimkant/physics-engine lint DESIGN.md        # Physics Engine (stricter)
```

---

## Roadmap

- **v1.1** — Motion token validation in linter · Framer Motion code generation
- **v1.2** — OKLCH color space (`L` axis maps to Energy Levels)
- **v2.0** — VS Code extension · Figma Variables sync

---


---

## Part of the Exo-Somatic research program

This repository is one layer of a single research program on verifiable cognition:

**[Exo-Somatic](https://github.com/trubnikov/Exo-Somatic)** (theory: substrate-independent minds)
→ **[SES](https://github.com/trubnikov/SES)** (contract: signed identity snapshots)
→ **[qca-cycle](https://github.com/trubnikov/qca-cycle)** (mechanism: the cognitive loop)
→ **[Evidence](https://github.com/NousResearch/hermes-agent/pull/43306)** (substrate transition test)

Adjacent track: **[Liquid-Context-Protocol](https://github.com/trubnikov/Liquid-Context-Protocol)** — the same contract-first idea applied to LLM tool execution.

---

## License

MIT ©2026 [Dima Trubnikov](https://github.com/trubnikov)
