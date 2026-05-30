---
name: Material Design 3
description: "Google Material Design 3 (M3) design system encoded as Physics Engine DESIGN.md. Light theme baseline with purple primary. Source: m3.material.io"
version: "1.0"
colors:
  primary:                "#6750A4"
  on-primary:             "#FFFFFF"
  primary-container:      "#EADDFF"
  on-primary-container:   "#21005D"
  secondary:              "#625B71"
  on-secondary:           "#FFFFFF"
  secondary-container:    "#E8DEF8"
  on-secondary-container: "#1D192B"
  tertiary:               "#7D5260"
  on-tertiary:            "#FFFFFF"
  tertiary-container:     "#FFD8E4"
  on-tertiary-container:  "#31111D"
  error:                  "#B3261E"
  on-error:               "#FFFFFF"
  error-container:        "#F9DEDC"
  on-error-container:     "#410E0B"
  surface:                "#FFFBFE"
  on-surface:             "#1C1B1F"
  surface-variant:        "#E7E0EC"
  on-surface-variant:     "#49454F"
  surface-container-low:  "#F7F2FA"
  surface-container:      "#F3EDF7"
  surface-container-high: "#ECE6F0"
  outline:                "#79747E"
  outline-variant:        "#CAC4D0"
  background:             "#FFFBFE"
  on-background:          "#1C1B1F"
  inverse-surface:        "#313033"
  inverse-on-surface:     "#F4EFF4"
  inverse-primary:        "#D0BCFF"
typography:
  display-large:
    fontFamily: "Roboto, sans-serif"
    fontSize: "57px"
    fontWeight: 400
    lineHeight: 64px
    letterSpacing: "-0.25px"
  display-medium:
    fontFamily: "Roboto, sans-serif"
    fontSize: "45px"
    fontWeight: 400
    lineHeight: 52px
    letterSpacing: "0"
  display-small:
    fontFamily: "Roboto, sans-serif"
    fontSize: "36px"
    fontWeight: 400
    lineHeight: 44px
    letterSpacing: "0"
  headline-large:
    fontFamily: "Roboto, sans-serif"
    fontSize: "32px"
    fontWeight: 400
    lineHeight: 40px
    letterSpacing: "0"
  headline-medium:
    fontFamily: "Roboto, sans-serif"
    fontSize: "28px"
    fontWeight: 400
    lineHeight: 36px
    letterSpacing: "0"
  headline-small:
    fontFamily: "Roboto, sans-serif"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 32px
    letterSpacing: "0"
  title-large:
    fontFamily: "Roboto, sans-serif"
    fontSize: "22px"
    fontWeight: 400
    lineHeight: 28px
    letterSpacing: "0"
  title-medium:
    fontFamily: "Roboto, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 24px
    letterSpacing: "0.15px"
  title-small:
    fontFamily: "Roboto, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 20px
    letterSpacing: "0.1px"
  body-large:
    fontFamily: "Roboto, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 24px
    letterSpacing: "0.5px"
  body-medium:
    fontFamily: "Roboto, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 20px
    letterSpacing: "0.25px"
  body-small:
    fontFamily: "Roboto, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 16px
    letterSpacing: "0.4px"
  label-large:
    fontFamily: "Roboto, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 20px
    letterSpacing: "0.1px"
  label-medium:
    fontFamily: "Roboto, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 16px
    letterSpacing: "0.5px"
  label-small:
    fontFamily: "Roboto, sans-serif"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 16px
    letterSpacing: "0.5px"
spacing:
  extra-small: "4px"
  small: "8px"
  medium: "16px"
  large: "24px"
  extra-large: "32px"
  compact: "8px"
  optimal: "16px"
  loose: "24px"
  macro: "48px"
rounded:
  none: "0px"
  extra-small: "4px"
  small: "8px"
  medium: "12px"
  large: "16px"
  extra-large: "28px"
  full: "9999px"
  dynamic: "min(12px, calc(height / 2))"
  surface: "12px"
motion:
  standard:
    type: spring
    mass: 1.0
    stiffness: 200
    damping: 30
  emphasized:
    type: spring
    mass: 1.2
    stiffness: 120
    damping: 28
  micro:
    type: spring
    mass: 0.5
    stiffness: 400
    damping: 28
  tap-scale: 0.98
components:
  button-filled:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.full}"
    padding: "0 24px"
    height: "44px"
    motion: "{motion.micro}"
  button-filled-hover:
    backgroundColor: "#7965AF"
  button-tonal:
    backgroundColor: "{colors.secondary-container}"
    textColor: "{colors.on-secondary-container}"
    rounded: "{rounded.full}"
    padding: "0 24px"
    height: "44px"
    motion: "{motion.micro}"
  button-outlined:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "0 24px"
    height: "44px"
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "0 12px"
    height: "44px"
  button-elevated:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    padding: "0 24px"
    height: "44px"
  fab:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-primary-container}"
    rounded: "{rounded.large}"
    height: "56px"
    width: "56px"
  fab-extended:
    backgroundColor: "{colors.primary-container}"
    textColor: "{colors.on-primary-container}"
    rounded: "{rounded.large}"
    height: "56px"
    padding: "0 20px"
  input-filled:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.large}"
    padding: "{spacing.medium}"
    height: "56px"
  input-outlined:
    backgroundColor: "transparent"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.large}"
    padding: "{spacing.medium}"
    height: "56px"
  card-filled:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.extra-large}"
    padding: "{spacing.medium}"
  card-elevated:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.extra-large}"
    padding: "{spacing.medium}"
  card-outlined:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.extra-large}"
    padding: "{spacing.medium}"
  chip-assist:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.full}"
    height: "44px"
    padding: "0 16px"
  chip-filter:
    backgroundColor: "{colors.surface-container-low}"
    textColor: "{colors.on-surface-variant}"
    rounded: "{rounded.full}"
    height: "44px"
    padding: "0 16px"
  chip-filter-selected:
    backgroundColor: "{colors.secondary-container}"
    textColor: "{colors.on-secondary-container}"
  navigation-bar:
    backgroundColor: "{colors.surface-container}"
    textColor: "{colors.on-surface-variant}"
    height: "80px"
  navigation-bar-active:
    textColor: "{colors.on-secondary-container}"
  dialog:
    backgroundColor: "{colors.surface-container-high}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.extra-large}"
    padding: "{spacing.large}"
  snackbar:
    backgroundColor: "{colors.inverse-surface}"
    textColor: "{colors.inverse-on-surface}"
    rounded: "{rounded.extra-small}"
    padding: "0 16px"
    height: "48px"
  badge:
    backgroundColor: "{colors.error}"
    textColor: "{colors.on-error}"
    rounded: "{rounded.full}"
    height: "16px"
  switch-track-on:
    backgroundColor: "{colors.primary}"
    rounded: "{rounded.full}"
  switch-track-off:
    backgroundColor: "{colors.surface-variant}"
    rounded: "{rounded.full}"
---

## Overview

This DESIGN.md encodes **Google Material Design 3** (M3) as a Physics Engine file. It captures the complete M3 token system — color roles, type scale, shape scale, and component specs — so any AI agent can generate M3-compliant UI from a single file.

Material Design 3 is a light-first design system built around **tonal color palettes** — colors derived algorithmically from a single seed color. The baseline uses a purple primary (`#6750A4`), but all color roles scale together when the seed changes.

## Colors

M3 uses **color roles**, not names. Every color token describes a semantic function:

- `primary` — the most prominent action color. Buttons, links, focus rings.
- `on-primary` — text/icons that sit on `primary` backgrounds.
- `primary-container` — a tonal, lower-saturation version for FABs and chips.
- `surface` / `surface-container` — layered neutrals for elevation without shadows.
- `error` — destructive actions. Same role structure as primary.

Unlike Physics Engine's dark Energy Levels, M3 operates in **light space**: surfaces are near-white (`#FFFBFE`), containers are soft tonal washes, and dark text sits on light backgrounds.

## Typography

M3 defines a **15-step type scale** using Roboto. Each step has a precise role:

- **Display** (57/45/36px) — Hero text, large numbers, splash screens.
- **Headline** (32/28/24px) — Section headers, dialog titles.
- **Title** (22/16/14px) — Card headers, list item primaries.
- **Body** (16/14/12px) — Paragraph text, descriptions.
- **Label** (14/12/11px) — Buttons, tabs, captions. Always medium weight (500).

Button text uses **Label Large** (14px, 500 weight, 0.1px tracking) — not body text.

## Layout & Spacing

M3 uses a **4dp base grid**. All component dimensions are multiples of 4:
- Touch targets minimum: **48×48dp** (Fitts Law equivalent)
- Standard component height: **40dp** (buttons) or **56dp** (inputs)
- FAB: **56×56dp**, Extended FAB: **56dp** height

## Shapes

M3 has a **6-level shape scale** from None (0dp) to Full (pill):
- **Extra Small (4dp)** — Chips, snackbars, menu items
- **Small (8dp)** — Outlined cards with subtle rounding
- **Medium (12dp)** — Cards, dialogs (inner elements)
- **Large (16dp)** — FABs, navigation drawers
- **Extra Large (28dp)** — Dialogs, bottom sheets, side sheets
- **Full (9999px)** — Buttons, badges, sliders — always pill-shaped

M3 buttons are **always pills** (`rounded: full`). This is a key M3 signature.

## Motion

M3 uses **cubic-bezier** curves natively. This file maps them to Physics Engine spring presets for agent compatibility:

- **Standard** (M3 cubic-bezier 0.2,0,0,1 / 300ms) → spring mass:1, stiffness:200, damping:30
- **Emphasized** (M3 cubic-bezier 0.2,0,0,1 / 500ms) → spring mass:1.2, stiffness:120, damping:28
- **Micro** (button press) → spring mass:0.5, stiffness:400, damping:28, scale:0.98

Note: M3 uses `0.98` press scale (vs Physics Engine's `0.96`) — M3 feels lighter.

## Components

### Buttons
M3 has 5 button variants in priority order:
1. **Filled** — highest emphasis, primary actions
2. **Tonal** — medium emphasis, secondary actions (uses secondary-container)
3. **Elevated** — medium emphasis with shadow
4. **Outlined** — low emphasis, alternative actions
5. **Text** — lowest emphasis, inline actions

All buttons: 40dp height, full pill radius, Label Large typography.

### Text Fields
Two variants: **Filled** (rounded top only, 4dp) and **Outlined** (4dp all corners). Height: 56dp. Both use surface-container-high background (filled) or transparent (outlined).

### Cards
Three variants: **Elevated** (surface-container-low), **Filled** (surface-container-high), **Outlined** (surface + border). All use Medium shape (12dp).

### Navigation
Navigation Bar: 80dp height, surface-container background. Active destination uses secondary-container indicator (64×32dp pill behind icon).

## Do's and Don'ts

**Do:**
- Use `primary` for the single most important action per screen.
- Use `secondary-container` for active/selected states (chips, nav bar).
- Keep button text as **Label Large** — never Body or Title.
- Always use pill shape (`rounded: full`) for buttons.

**Don't:**
- Mix filled and tonal buttons at the same hierarchy level.
- Use `error` color for warnings — M3 has no warning color role.
- Use shadows for elevation above level 2 — prefer tonal surface containers instead.
- Use Roboto Bold (700) — M3 caps at Medium (500) for UI text.
