# Physics Engine Specification v1.0

## Overview

The Physics Engine specification defines a format for describing a generative design system to AI coding agents. A system built on this spec does not store static values — it encodes physical laws from which all values are derived.

## File Format

A `DESIGN.md` file has two layers:

1. **YAML front matter** — Machine-readable design tokens, delimited by `---` fences at the top of the file.
2. **Markdown body** — Human-readable design rationale organized into `##` sections.

The tokens are normative. The prose explains why they exist.

## Token Schema

```yaml
name: <string>                     # required
version: <string>                  # optional
description: <string>              # optional
colors:
  <token-name>: <hex-color>
typography:
  <token-name>:
    fontFamily: <string>
    fontSize: <dimension>
    fontWeight: <number>
    lineHeight: <number>
    letterSpacing: <dimension | "normal">
spacing:
  compact | optimal | loose | macro: <dimension>
rounded:
  dynamic | surface | <custom>: <dimension | formula>
components:
  <component-name>:
    backgroundColor: <color | token-ref>
    textColor: <color | token-ref>
    rounded: <dimension | token-ref>
    padding: <dimension | token-ref>
    height: <dimension>
    width: <dimension>
```

## Token Types

| Type | Format | Example |
|------|--------|---------|
| Color | `#` + hex (sRGB) | `"#3B82F6"` |
| Dimension | number + unit | `"16px"`, `"1rem"` |
| Token Reference | `{path.to.token}` | `"{colors.kinetic}"` |

## Energy Level System

The Energy Level system is the Physics Engine's primary contribution to the design token model. It replaces flat color naming with a physics metaphor.

| Level | Name | Value | Use |
|-------|------|-------|-----|
| 0 | Void | `#050505` | Background universe, zero energy |
| 1 | Surface | `#111113` | Cards, panels, low-energy containers |
| 2 | Interactive | `#1F1F24` | Idle inputs, secondary controls |
| 2.5 | Hover | `#2A2A30` | Energy elevation on pointer hover |
| 3 | Kinetic Peak | `#3B82F6` | Primary actions, maximum energy |
| — | Destructive | `#EF4444` | Danger spectrum, follows Level 3 rules |

**Emission:** Elements at Level 3 emit glow as a physical side effect: `box-shadow: 0 8px 24px rgba(59, 130, 246, 0.25)`.

**State transitions follow energy laws:**
- Hover: Elevate by +0.5
- Press: Compress to `scale(0.96)`, elevate by +1

## Spatial Mathematics

All dimensions derive from **Base Unit: 4px**.

| Scale Name | Multiplier | Value | Use |
|------------|-----------|-------|-----|
| Compact | 2× | 8px | Icon-to-text gaps, internal component spacing |
| Optimal | 4× | 16px | Standard component padding (most common) |
| Loose | 6× | 24px | Spacing between distinct UI sections |
| Macro | 12× | 48px | Modal and overlay internal padding |

**Axiom:** No dimension in the system may exist outside a Base Unit multiple. Arbitrary values are forbidden.

## Topology Collapse (Border Radius)

```
Dynamic Radius = min(12px, height / 2)
Surface Radius = 16px
```

**Dynamic Radius** applies to interactive elements with a known, fixed height (buttons, inputs, badges). The formula prevents:
- Over-rounding: a 24px element with `12px` radius would become a pill — the formula caps at `12px`
- Under-rounding: a 48px element with just `4px` radius looks unintentionally sharp — the formula produces `16px`

**Surface Radius** applies to containers (cards, modals, dialogs) whose height is variable or unknown at design time.

## Kinematics

All transitions use spring physics. Linear and cubic-bezier transitions are forbidden.

### Preset 1 — Micro-interactions

For: buttons, toggles, checkboxes, chips, icon buttons.

```json
{ "type": "spring", "mass": 0.5, "stiffness": 500, "damping": 25 }
```

Press state: `transform: scale(0.96)`

### Preset 2 — Macro-topology

For: modals, sidebars, drawers, accordion panels, sheets.

```json
{ "type": "spring", "mass": 1.0, "stiffness": 250, "damping": 30 }
```

## Accessibility

### Fitts Law Minimum

Every interactive element (button, input, toggle, link) must have a minimum touch target of **44×44px**. This applies even if the visible element is smaller — use padding to extend the hit area.

### Focus Ring

Focus outlines must never be removed without replacement. The replacement is a 2px solid ring in the Kinetic color, offset 2px from the element's edge.

```css
outline: 2px solid #3B82F6;
outline-offset: 2px;
```

### ARIA

Every interactive element must carry:
- Semantic HTML (`<button>`, `<a>`, `<input>`, `<dialog>`)
- Relevant `aria-*` attributes (`aria-label`, `aria-expanded`, `aria-disabled`, etc.)
- `role` attribute where semantic HTML is insufficient

## Section Order

Sections in the markdown body use `##` headings and should appear in this order:

| # | Section |
|---|---------|
| 1 | Overview |
| 2 | Colors |
| 3 | Typography |
| 4 | Layout |
| 5 | Elevation & Depth |
| 6 | Shapes |
| 7 | Components |
| 8 | Do's and Don'ts |

## Linting Rules

| Rule | Severity | Description |
|------|----------|-------------|
| `broken-ref` | error | Token references must resolve to defined tokens |
| `missing-primary` | warning | A `kinetic` or `primary` color must be defined |
| `contrast-ratio` | warning | WCAG AA minimum 4.5:1 for all text/background pairs |
| `orphaned-tokens` | warning | Every defined color token should be used by at least one component |
| `fitts-law` | error | Interactive components must declare `height ≥ 44px` |
| `token-summary` | info | Summary count of tokens per section |
| `missing-typography` | warning | Typography tokens must exist if colors are defined |

## Compatibility

The Physics Engine `DESIGN.md` format is a strict extension of the `@google/design.md` format. Any valid Physics Engine file is a valid `@google/design.md` file. Physics Engine adds:

- Energy Level semantic naming convention for color tokens
- `fitts-law` linting rule
- Kinematics specification (spring physics presets)
- Topology Collapse formula for border radius

## Changelog

### v1.0 (2026)
- Initial release
- Full YAML token schema
- CLI: lint, export, spec
- Tailwind and DTCG export targets
- Seven linting rules including WCAG AA contrast check and Fitts Law
