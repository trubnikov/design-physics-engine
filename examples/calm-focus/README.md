# Calm Focus

A minimalist productivity and note-taking app. The interface has less energy than the work.

**Energy signature:** Restrained Level 1–2 · Single kinetic entry point · Prose-optimized typography

## What this example demonstrates

- **Physics of restraint** — Level 3 kinetic energy appears exactly once (New Note button). Every other interactive element stays at Level 2 or below. This is intentional physics, not minimalism for aesthetic reasons
- **Dual typography system** — Inter for interface chrome, Georgia serif for editor prose. Two typefaces = two cognitive modes. The transition between them signals "you are now writing"
- **Prose spacing as a physics variable** — `prose: "40px"` (10 × Base_Unit) is a dedicated spacing token that produces comfortable 65–80 character line lengths. Typography physics, not arbitrary padding
- **Semantic tag tints at 8% opacity** — `rgba(234, 179, 8, 0.08)` — present enough to read category, invisible enough not to distract from content
- **Intentional Fitts Law exception** — toolbar buttons sit at 32px height (below the 44px minimum). Documented exception: they are keyboard-driven primarily. The linter flags this; the exception is explicit

## How an agent uses this file

```bash
physics-engine lint DESIGN.md  # will flag toolbar-item height exception
physics-engine export --format tailwind DESIGN.md > tailwind.config.js
physics-engine export --format dtcg DESIGN.md > design_tokens.json
```

An AI agent receiving this DESIGN.md knows:
- Editor prose font is Georgia, not Inter (distinct from the app shell)
- Line height in the editor is 32px — generous, reading-optimized
- Tags use 6px fixed radius (semantic distinction from 12px interactive elements)
- Selection color is kinetic at 15% opacity — energy whisper, not flood
- New Note is the one kinetic element; all other buttons are icon/muted

## Key components

| Component | Energy Level | Key physics |
|---|---|---|
| `editor-prose` | Georgia serif | Cognitive mode switch |
| `note-list-item-active` | Level 2 | Lift without color shout |
| `button-new-note` | Level 3 Kinetic | Only one kinetic surface |
| `tag-yellow/green/purple` | 8% tint | Semantic color, ultra-low energy |
| `toolbar-item` | 32px (exception) | Keyboard-primary, documented |
| `search-input-focus` | Level 3 border | Focus ring = kinetic energy |
