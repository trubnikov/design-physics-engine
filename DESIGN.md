---
name: Physics Engine
version: "1.1"
description: "A structured dark UI design system with named energy levels, spring kinematics, and a built-in linter. Tokens are hand-curated — the value is in their naming, relationships, and enforcement rules."
colors:
  void:               "#050505"
  void-text:          "#71717A"
  surface:            "#111113"
  surface-text:       "#E4E4E7"
  surface-text-muted: "#71717A"
  surface-border:     "rgba(255, 255, 255, 0.08)"
  interactive:        "#1F1F24"
  interactive-hover:  "#2A2A30"
  interactive-text:   "#FFFFFF"
  kinetic:            "#3B82F6"
  kinetic-text:       "#FFFFFF"
  kinetic-glow:       "rgba(59, 130, 246, 0.25)"
  destructive:        "#EF4444"
  destructive-text:   "#FFFFFF"
  destructive-glow:   "rgba(239, 68, 68, 0.25)"
  success:            "#22C55E"
  success-text:       "#052e16"
  success-glow:       "rgba(34, 197, 94, 0.25)"
  warning:            "#F59E0B"
  warning-text:       "#000000"
  data-1:             "#3B82F6"
  data-2:             "#8B5CF6"
  data-3:             "#10B981"
  data-4:             "#F59E0B"
  data-5:             "#EF4444"
  data-6:             "#06B6D4"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.953rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  h1:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.953rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
  h2:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.5625rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  h3:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.01em"
  caption:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.02em"
  code:
    fontFamily: "JetBrains Mono, Fira Code, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
spacing:
  compact: "8px"
  optimal: "16px"
  loose:   "24px"
  macro:   "48px"
rounded:
  dynamic: "min(12px, calc(height / 2))"
  surface: "32px"
motion:
  micro:
    type: spring
    mass: 0.5
    stiffness: 500
    damping: 25
  macro:
    type: spring
    mass: 1.0
    stiffness: 250
    damping: 30
  tap-scale: 0.96
components:
  button-primary:
    backgroundColor: "{colors.kinetic}"
    textColor:       "{colors.kinetic-text}"
    rounded:         "{rounded.dynamic}"
    padding:         "{spacing.optimal}"
    height:          "44px"
    motion:          "{motion.micro}"
  button-primary-hover:
    backgroundColor: "#2563EB"
  button-primary-disabled:
    backgroundColor: "{colors.interactive}"
    textColor:       "{colors.surface-text-muted}"
    rounded:         "{rounded.dynamic}"
    padding:         "{spacing.optimal}"
    height:          "44px"
  button-secondary:
    backgroundColor: "{colors.interactive}"
    textColor:       "{colors.interactive-text}"
    rounded:         "{rounded.dynamic}"
    padding:         "{spacing.optimal}"
    height:          "44px"
  button-secondary-hover:
    backgroundColor: "{colors.interactive-hover}"
  button-destructive:
    backgroundColor: "{colors.destructive}"
    textColor:       "{colors.destructive-text}"
    rounded:         "{rounded.dynamic}"
    padding:         "{spacing.optimal}"
    height:          "44px"
  button-success:
    backgroundColor: "{colors.success}"
    textColor:       "{colors.success-text}"
    rounded:         "{rounded.dynamic}"
    padding:         "{spacing.optimal}"
    height:          "44px"
  input:
    backgroundColor: "{colors.interactive}"
    textColor:       "{colors.interactive-text}"
    rounded:         "{rounded.dynamic}"
    padding:         "{spacing.optimal}"
    height:          "44px"
  input-focus:
    backgroundColor: "{colors.interactive-hover}"
  input-error:
    backgroundColor: "{colors.interactive}"
    textColor:       "{colors.interactive-text}"
    rounded:         "{rounded.dynamic}"
    padding:         "{spacing.optimal}"
    height:          "44px"
  input-disabled:
    backgroundColor: "{colors.surface}"
    textColor:       "{colors.surface-text-muted}"
    rounded:         "{rounded.dynamic}"
    padding:         "{spacing.optimal}"
    height:          "44px"
  card:
    backgroundColor: "{colors.surface}"
    textColor:       "{colors.surface-text}"
    rounded:         "{rounded.surface}"
    padding:         "{spacing.loose}"
  card-loading:
    backgroundColor: "{colors.surface}"
    textColor:       "{colors.surface-text-muted}"
    rounded:         "{rounded.surface}"
    padding:         "{spacing.loose}"
  modal:
    backgroundColor: "{colors.surface}"
    textColor:       "{colors.surface-text}"
    rounded:         "{rounded.surface}"
    padding:         "{spacing.loose}"
  badge-success:
    backgroundColor: "{colors.success}"
    textColor:       "{colors.success-text}"
    rounded:         "{rounded.dynamic}"
    padding:         "4px 10px"
  badge-error:
    backgroundColor: "{colors.destructive}"
    textColor:       "{colors.destructive-text}"
    rounded:         "{rounded.dynamic}"
    padding:         "4px 10px"
  badge-warning:
    backgroundColor: "{colors.warning}"
    textColor:       "{colors.warning-text}"
    rounded:         "{rounded.dynamic}"
    padding:         "4px 10px"
  toast-success:
    backgroundColor: "{colors.success}"
    textColor:       "{colors.success-text}"
    rounded:         "{rounded.dynamic}"
    padding:         "{spacing.optimal}"
  toast-error:
    backgroundColor: "{colors.destructive}"
    textColor:       "{colors.destructive-text}"
    rounded:         "{rounded.dynamic}"
    padding:         "{spacing.optimal}"
---

## Overview

Physics Engine is a **structured dark UI design system** for AI-assisted product development. It provides a named token vocabulary, a linter that enforces geometric and accessibility constraints, and export targets for Tailwind, DTCG, and SwiftUI.

The tokens are hand-curated — the value is not that values are calculated automatically, but that they are **named by intent** (energy levels, kinematics, topology) and **enforced by rules** (Fitts Law, contrast ratios, nested radius law). An AI agent reading this file knows not just what a color is, but what it means and when to use it.

## Colors

The palette uses an **Energy Level** naming convention — a z-axis metaphor that describes semantic purpose, not just visual value.

- **Void (`#050505`):** The background. The lowest energy state.
- **Surface (`#111113`):** Containers, cards, panels. Slightly elevated from void.
- **Surface Muted (`#71717A`):** Secondary text. Labels, captions, placeholder text.
- **Interactive (`#1F1F24`):** Elements that can receive input. Inputs, secondary buttons.
- **Interactive Hover (`#2A2A30`):** Interactive state after hover. Energy +0.5.
- **Kinetic (`#3B82F6`):** Primary actions. Maximum intentionality. Emits glow.
- **Destructive (`#EF4444`):** Danger actions. Follows Kinetic emission rules.
- **Success (`#22C55E`):** Confirmation, completion, positive states. Follows Kinetic emission rules.
- **Warning (`#F59E0B`):** Caution, non-blocking alerts. Dark text on warm background.

These values are chosen by hand for perceptual balance on dark backgrounds. The naming convention is the system — it tells agents when to use each color, not just what the color is.

### Data Visualization Palette

Six distinct hues for charts, graphs, and multi-series data. Ordered by perceptual distance:

- `data-1` (#3B82F6) — blue (matches kinetic, use for primary series)
- `data-2` (#8B5CF6) — purple
- `data-3` (#10B981) — green
- `data-4` (#F59E0B) — amber
- `data-5` (#EF4444) — red (matches destructive — use for negative values)
- `data-6` (#06B6D4) — cyan

## Typography

Scale ratio: **1.25 (Major Third)**. Base: 16px (1rem).

| Token | Size | Weight | Use |
|-------|------|--------|-----|
| `display` / `h1` | 31px | 700 | Hero text, page titles |
| `h2` | 25px | 600 | Section headers |
| `h3` | 20px | 500 | Card titles, dialog headers |
| `body` | 16px | 400 | Paragraph text, descriptions |
| `label` | 14px | 500 | Button text, form labels, tab text |
| `caption` | 12px | 400 | Metadata, timestamps, helper text |
| `code` | 14px | 400 | Monospace — code blocks, file paths |

Negative letter-spacing on headings (−0.03em to −0.01em) compensates for optical spread at large sizes. Positive tracking on caption (0.02em) improves legibility at small sizes.

## Layout

All spacing derives from a **Base Unit of 4px**.

- `Compact (8px = 2×)` — gaps between icon and text, internal chip padding.
- `Optimal (16px = 4×)` — standard component padding. The most-used value.
- `Loose (24px = 6×)` — separation between distinct UI sections.
- `Macro (48px = 12×)` — large layout gaps, overlay internal padding.

Note: The multipliers are 2×, 4×, 6×, 12× — not a geometric sequence. These are pragmatic values that cover the four common density needs. Macro skips ahead to 12× because 8× (32px) and 10× (40px) are rarely useful at the macro level.

## Elevation & Depth

Elevation is expressed through **energy level color**, not drop shadows. A surface at Level 1 (`#111113`) sits above the void (`#050505`) because it is brighter, not because it casts a shadow.

The glow (`box-shadow`) on Kinetic and Destructive elements is not decoration — it is the visual emission of a high-energy state. It signals that something is actionable.

## Shapes

The system has two shape primitives:

**Dynamic Radius:** `min(12px, height / 2)`
For interactive elements with a known fixed height. At 44px height → 12px radius. At 22px height → 11px radius (pill). The formula prevents over-rounding small elements and under-rounding tall ones.

**Surface Radius:** `32px`
For containers (cards, modals) whose height is variable. Fixed at 32px — larger than any expected padding value — to satisfy the nested radius law (outer radius must exceed padding).

## Components

Components are defined by their energy state, not by arbitrary style choices.

### Kinematic States (all interactive elements)

- **Idle:** Base energy level for that component type.
- **Hover:** Energy +0.5 (background brightens one step).
- **Press:** `scale(0.96)` + energy +1. Spring Micro preset.
- **Focus:** 2px Kinetic ring, 2px offset. Never remove without replacement.
- **Disabled:** Drop to Surface energy. Muted text. No hover or press response.
- **Loading:** Surface background + muted text. Skeleton pattern or spinner.
- **Error:** Destructive border or background. Error message in caption size.
- **Success:** Success color. Confirmation icon or message.

### Accessibility

- **Fitts Law:** Every interactive element minimum `44×44px` hitbox.
- **Focus Ring:** `2px solid {colors.kinetic}`, offset `2px`.
- **Contrast:** Text on interactive backgrounds ≥ 4.5:1 (WCAG AA).
- **ARIA:** All interactive elements carry semantic HTML and `aria-*` states.

## Do's and Don'ts

**Do:**
- Use `surface-text-muted` for secondary text, timestamps, and helper text.
- Use `caption` (12px) for metadata — never shrink `body` text in-line.
- Use `data-1` through `data-6` for any chart or multi-series visualization.
- Use `success` to confirm completed actions, not just `kinetic`.
- Use `badge-warning` for non-blocking alerts — not destructive.

**Don't:**
- Use `kinetic` for decorative or informational elements — it signals primary action.
- Remove focus rings. Replace them if needed, never suppress.
- Use inline arbitrary hex values in components — reference tokens only.
- Use `ease-in-out` or `linear` transitions — use spring presets.
- Use `body` (16px) where `label` (14px) or `caption` (12px) is appropriate.
