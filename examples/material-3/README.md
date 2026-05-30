# Material Design 3

Google's Material Design 3 (M3) encoded as a Physics Engine DESIGN.md.

**Theme:** Light · Purple primary · Roboto typeface

## What this example demonstrates

- **Any design system works** — Physics Engine is format, not style. M3 fits perfectly.
- **Color roles vs energy levels** — M3 uses semantic roles (primary, on-primary, container). Physics Engine encodes them without changing the M3 vocabulary.
- **15-step type scale** — M3's full Display → Label hierarchy in machine-readable tokens.
- **5 button variants** — Filled, Tonal, Elevated, Outlined, Text — all with correct M3 specs.
- **Motion translation** — M3 cubic-bezier curves mapped to spring physics for agent use.

## Key M3 differences from Physics Engine dark theme

| Property | Physics Engine | Material Design 3 |
|---|---|---|
| Background | `#050505` (near black) | `#FFFBFE` (near white) |
| Button shape | Dynamic radius formula | Always pill (`full`) |
| Button height | 44px (Fitts min) | 40px (M3 spec) |
| Press scale | 0.96 | 0.98 (lighter) |
| Type scale | 1.25 Major Third | 15 named roles |
| Color logic | Energy levels 0–3 | Tonal palette roles |

## Usage

```bash
# Lint the M3 design system
npx @dimkant/physics-engine lint DESIGN.md

# Export for Tailwind
npx @dimkant/physics-engine export --format tailwind DESIGN.md > tailwind.config.js

# Export for SwiftUI
npx @dimkant/physics-engine export --format swiftui DESIGN.md > DesignSystem.swift
```

## Source

Based on: [Material Design 3 — m3.material.io](https://m3.material.io/components)
