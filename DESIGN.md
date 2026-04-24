---
name: Physics Engine
version: "1.0"
description: "A generative design system based on physical laws, not static values. Every dimension, color, and motion is calculated — never hardcoded."
colors:
  void:               "#050505"
  void-text:          "#71717A"
  surface:            "#111113"
  surface-text:       "#E4E4E7"
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
typography:
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  h3:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  h2:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.5625rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  h1:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.953rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.03em"
spacing:
  compact: "8px"
  optimal: "16px"
  loose:   "24px"
  macro:   "48px"
rounded:
  dynamic: "min(12px, calc(height / 2))"
  surface: "16px"
components:
  button-primary:
    backgroundColor: "{colors.kinetic}"
    textColor:       "{colors.kinetic-text}"
    rounded:         "{rounded.dynamic}"
    padding:         "{spacing.optimal}"
    height:          "44px"
  button-primary-hover:
    backgroundColor: "#2563EB"
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
  input:
    backgroundColor: "{colors.interactive}"
    textColor:       "{colors.interactive-text}"
    rounded:         "{rounded.dynamic}"
    padding:         "{spacing.optimal}"
    height:          "44px"
  input-focus:
    backgroundColor: "{colors.interactive-hover}"
  card:
    backgroundColor: "{colors.surface}"
    textColor:       "{colors.surface-text}"
    rounded:         "{rounded.surface}"
    padding:         "{spacing.loose}"
  modal:
    backgroundColor: "{colors.surface}"
    textColor:       "{colors.surface-text}"
    rounded:         "{rounded.surface}"
    padding:         "{spacing.macro}"
---

## Overview

Physics Engine is a **generative design system** built on a single axiom: UI elements obey physical laws, not designer whims. Every value is calculated from first principles. There are no magic numbers.

The system operates on the metaphor of **energy** — elements exist at different energy levels, and transitions between states follow the laws of kinematics. A button press is not a CSS state change; it is an energy elevation and a physical compression.

This creates a UI that feels alive without feeling arbitrary. Consistent, predictable, and self-explanatory to any AI agent that reads this file.

## Colors

The palette is defined by **Energy Levels** — a z-axis system that describes how much "energy" a surface emits.

- **Void (#050505):** The background universe. Zero energy. Where all UI exists.
- **Surface (#111113):** Containers, cards, panels. Low-energy surfaces that emerge from the void.
- **Interactive (#1F1F24):** Idle inputs and secondary buttons. Ready to receive energy.
- **Interactive Hover (#2A2A30):** Energy elevation +0.5 on hover. A subtle but physical response.
- **Kinetic (#3B82F6):** Primary actions at peak energy. Emits a glow as a side effect of its energy state.
- **Destructive (#EF4444):** A separate energy spectrum. Follows Kinetic emission rules but signals danger.

The glow (`box-shadow`) on Kinetic and Destructive is not a decoration — it is the visual emission of a high-energy state.

## Typography

Scale ratio: **1.25 (Major Third)**. Base: 16px. Every size is derived mathematically — no arbitrary intermediate sizes.

The scale creates a natural hierarchy where each heading level feels categorically different from the one below it, not just slightly larger.

Negative letter-spacing on headings compensates for optical spread at large sizes — a physical correction for how human vision perceives letterforms.

## Layout

All dimensions derive from a single **Base Unit: 4px**.

- `Compact (8px)` — internal spacing within components (icon to text gap).
- `Optimal (16px)` — standard component padding. The most common value.
- `Loose (24px)` — spacing between distinct UI sections.
- `Macro (48px)` — modal and overlay internal padding.

**Topology Collapse** governs border radius on interactive elements: `min(12px, height/2)`. This formula prevents two failure states — over-rounding a small element into a pill, and under-rounding a tall element into a rectangle. Radius is a function of the element's own geometry.

Cards and modals use a fixed `Surface Radius (16px)` because their height is variable and the formula would produce inconsistent results at large sizes.

## Elevation & Depth

Elevation in this system is expressed through **energy level**, not drop shadows. A higher-energy element does not cast a shadow — it emits light.

The glow values are calibrated so they are perceptible but not decorative. They signal state, not style.

Z-index follows energy level numerically: Void = 0, Surface = 1, Modal = 10. Interactive elements never occlude higher-energy surfaces.

## Shapes

Shape is governed by the **Topology Collapse formula**. The system has exactly two shape primitives:

1. **Dynamic Radius** — for interactive elements whose height is known at render time.
2. **Surface Radius** — for containers whose height is variable or unknown.

There is no "slight rounding" or "fully rounded" as arbitrary choices. Shape emerges from geometry.

## Components

All components are synthesized, not templated. An AI agent reading this file builds a button by applying:
`Kinetic background + Optimal padding + Dynamic Radius + Fitts Law minimum + Micro-interaction kinematics + Focus Ring`

### Kinematic States

- **Hover:** Energy elevation +0.5 (Interactive → Interactive Hover)
- **Press:** Scale compression to `0.96` + Energy elevation +1
- **Focus:** 2px Kinetic-colored ring, offset 2px from element edge

### Accessibility Bounds

- **Fitts Law Minimum:** Every interactive element must have a minimum hitbox of `44×44px`.
- **Focus Ring:** Never suppress without replacement. Ring color = `{colors.kinetic}`.
- **ARIA:** All interactive elements must carry semantic HTML and relevant `aria-*` attributes.

## Do's and Don'ts

**Do:**
- Derive all dimensions from Base Unit multiples.
- Use Energy Level to determine background color — never pick colors directly.
- Apply Dynamic Radius to any element with a known, fixed height.
- Use spring physics for all transitions.

**Don't:**
- Use arbitrary pixel values not derivable from Base Unit.
- Use `ease-in-out` or `linear` CSS transitions — they feel mechanical.
- Remove focus rings without providing an equivalent.
- Use Kinetic color for non-primary, non-action elements (it signals high energy).
