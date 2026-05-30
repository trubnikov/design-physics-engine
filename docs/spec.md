# Physics Engine Specification v1.1

## Overview

Physics Engine is a structured dark UI design system with a built-in linter and multi-target export. It provides a named token vocabulary, geometric and accessibility enforcement rules, and export targets for Tailwind CSS, W3C DTCG, and SwiftUI.

Tokens are hand-curated. The value is in their semantic naming (what a color means, not just what it is) and in the linter rules that enforce correctness automatically.

## File Format

A `DESIGN.md` file has two layers:

1. **YAML front matter** — machine-readable design tokens, delimited by `---` fences.
2. **Markdown body** — human-readable design rationale in `##` sections.

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
motion:
  micro | macro:
    type: spring
    mass: <number>
    stiffness: <number>
    damping: <number>
  tap-scale: <number>
components:
  <component-name>:
    backgroundColor: <color | token-ref>
    textColor: <color | token-ref>
    rounded: <dimension | token-ref>
    padding: <dimension | token-ref>
    height: <dimension>
    width: <dimension>
    motion: <token-ref>
```

## Token Types

| Type | Format | Example |
|------|--------|---------|
| Color | `#` + hex (sRGB) | `"#3B82F6"` |
| Dimension | number + unit | `"16px"`, `"1rem"` |
| Token Reference | `{path.to.token}` | `"{colors.kinetic}"` |

## Energy Level System

The Energy Level system is Physics Engine's color naming convention. It describes semantic purpose, not just visual value. This helps AI agents know when to use each color.

| Level | Name | Value | Use |
|-------|------|-------|-----|
| 0 | Void | `#050505` | Background |
| 1 | Surface | `#111113` | Cards, panels, containers |
| 2 | Interactive | `#1F1F24` | Idle inputs, secondary controls |
| 2.5 | Hover | `#2A2A30` | Energy elevation on hover |
| 3 | Kinetic | `#3B82F6` | Primary actions |
| — | Destructive | `#EF4444` | Danger actions |
| — | Success | `#22C55E` | Confirmation, completion |
| — | Warning | `#F59E0B` | Non-blocking alerts |

**Emission:** Level 3 elements emit glow: `box-shadow: 0 8px 24px rgba(59, 130, 246, 0.25)`.

**State transitions:**
- Hover: Energy +0.5
- Press: `scale(0.96)` + Energy +1

## Typography Scale

Scale ratio: **1.25 (Major Third)**. Base: 16px (1rem).

| Token | Size | Weight | Use |
|-------|------|--------|-----|
| `display` / `h1` | 31px | 700 | Hero text, page titles |
| `h2` | 25px | 600 | Section headers |
| `h3` | 20px | 500 | Card titles, dialog headers |
| `body` | 16px | 400 | Paragraph text |
| `label` | 14px | 500 | Button text, form labels |
| `caption` | 12px | 400 | Metadata, timestamps, helper text |
| `code` | 14px | 400 | Code blocks, file paths (monospace) |

## Spatial Mathematics

All dimensions derive from **Base Unit: 4px**.

| Scale | Multiplier | Value | Use |
|-------|-----------|-------|-----|
| Compact | 2× | 8px | Icon-to-text gaps, internal spacing |
| Optimal | 4× | 16px | Standard component padding |
| Loose | 6× | 24px | Between UI sections |
| Macro | 12× | 48px | Layout gaps, overlay padding |

Note: Multipliers are 2×, 4×, 6×, 12× — pragmatic values covering four density needs, not a geometric sequence.

## Topology Collapse (Border Radius)

```
Dynamic Radius = min(12px, height / 2)
Surface Radius = 32px
```

**Dynamic Radius** — for interactive elements with known fixed height.
**Surface Radius** — for containers (cards, modals) with variable height. 32px ensures it always exceeds typical padding values (satisfies nested radius law).

**Nested Radius Law:** Outer radius must be ≥ inner padding. Otherwise the inner radius would be negative — a geometric impossibility.

## Kinematics

All transitions use spring physics. Linear and cubic-bezier transitions are forbidden.

### Micro-interactions (buttons, toggles, chips)
```json
{ "type": "spring", "mass": 0.5, "stiffness": 500, "damping": 25 }
```
Press state: `transform: scale(0.96)`

### Macro-topology (modals, sidebars, drawers)
```json
{ "type": "spring", "mass": 1.0, "stiffness": 250, "damping": 30 }
```

## Component States

Every interactive component must define these states:

| State | Visual rule |
|-------|-------------|
| Idle | Base energy level |
| Hover | Energy +0.5 (background brightens) |
| Press | `scale(0.96)` + Energy +1 |
| Focus | 2px Kinetic ring, 2px offset |
| Disabled | Surface energy, muted text, no interaction response |
| Error | Destructive border or background |
| Loading | Surface background, muted text, skeleton or spinner |
| Success | Success color, confirmation feedback |

## Data Visualization Palette

Six perceptually distinct hues for charts and multi-series data:

| Token | Value | Use |
|-------|-------|-----|
| `data-1` | `#3B82F6` | Primary series (matches kinetic) |
| `data-2` | `#8B5CF6` | Purple |
| `data-3` | `#10B981` | Green |
| `data-4` | `#F59E0B` | Amber (matches warning) |
| `data-5` | `#EF4444` | Red (matches destructive — negative values) |
| `data-6` | `#06B6D4` | Cyan |

## Accessibility

### Fitts Law
Every interactive element must have a minimum touch target of **44×44px**.

### Focus Ring
```css
outline: 2px solid #3B82F6;
outline-offset: 2px;
```
Never remove without replacement.

### Contrast
Text on backgrounds must meet WCAG AA minimum 4.5:1 for normal text, 3:1 for large text.

### ARIA
Every interactive element must carry semantic HTML and `aria-*` attributes.

## Linting Rules

| Rule | Severity | Description |
|------|----------|-------------|
| `broken-ref` | error | Token references must resolve to defined tokens |
| `missing-primary` | warning | A `kinetic` or `primary` color must be defined |
| `contrast-ratio` | warning/error | WCAG AA minimum for text/background pairs |
| `orphaned-tokens` | warning | Every color should be used by at least one component |
| `fitts-law` | error | Interactive components must declare `height ≥ 44px` |
| `energy-conservation` | error | Kinetic color must contrast against Void background |
| `nested-radius-law` | error | Outer radius must be ≥ component padding |
| `token-summary` | info | Count of tokens per section |
| `missing-typography` | warning | Typography must exist alongside colors |

## Section Order

Markdown body sections should appear in this order:

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

## Compatibility

Physics Engine DESIGN.md files are compatible with `@google-labs-code/design.md`. Physics Engine adds: motion tokens, additional linting rules (Fitts Law, energy-conservation, nested-radius-law), SwiftUI export, and semantic Energy Level naming.

## Changelog

### v1.1 (2026)
- Added: `success`, `warning`, `data-1`–`data-6` color tokens
- Added: `label`, `caption`, `code` typography tokens
- Added: disabled, error, loading, success component states
- Added: data visualization palette
- Fixed: surface radius prose/token inconsistency (now consistently 32px)
- Fixed: removed incorrect claim that all values are "calculated from first principles"
- Updated: description now accurately reflects the system

### v1.0 (2026)
- Initial release
- Energy Level color system
- CLI: lint, export (tailwind, dtcg, swiftui), spec
- Nine linting rules including WCAG AA and Fitts Law
