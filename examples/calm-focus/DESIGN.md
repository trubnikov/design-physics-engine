---
name: Calm Focus
description: Minimalist productivity and note-taking app built for deep work
version: "1.0"
colors:
  void: "#050505"
  surface: "#111113"
  interactive: "#1F1F24"
  interactive-hover: "#2A2A30"
  kinetic: "#3B82F6"
  kinetic-glow: "rgba(59, 130, 246, 0.25)"
  kinetic-text: "#FFFFFF"
  destructive: "#EF4444"
  muted: "#71717A"
  surface-text: "#E4E4E7"
  void-text: "#71717A"
  note-yellow: "#854D0E"
  note-yellow-surface: "rgba(234, 179, 8, 0.08)"
  note-green: "#166534"
  note-green-surface: "rgba(34, 197, 94, 0.08)"
  note-purple: "#6B21A8"
  note-purple-surface: "rgba(168, 85, 247, 0.08)"
  divider: "rgba(255, 255, 255, 0.06)"
  selection: "rgba(59, 130, 246, 0.15)"
spacing:
  compact: "8px"
  optimal: "16px"
  loose: "24px"
  macro: "48px"
  prose: "40px"
rounded:
  dynamic: "min(12px, calc(height / 2))"
  surface: "16px"
  tag: "6px"
typography:
  display:
    fontFamily: Inter
    fontSize: 31px
    fontWeight: "700"
    lineHeight: 34px
    letterSpacing: -0.03em
  section:
    fontFamily: Inter
    fontSize: 25px
    fontWeight: "600"
    lineHeight: 30px
    letterSpacing: -0.02em
  component:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: "500"
    lineHeight: 28px
    letterSpacing: -0.01em
  body:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 26px
  label:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: "500"
    lineHeight: 20px
  prose:
    fontFamily: "Georgia, serif"
    fontSize: 18px
    fontWeight: "400"
    lineHeight: 32px
    letterSpacing: 0.01em
  note-title:
    fontFamily: Inter
    fontSize: 25px
    fontWeight: "600"
    lineHeight: 32px
    letterSpacing: -0.02em
motion:
  micro:
    type: spring
    mass: 0.5
    stiffness: 500
    damping: 25
  macro:
    type: spring
    mass: 1
    stiffness: 250
    damping: 30
  tap-scale: 0.96
accessibility:
  min-tap-target: "44px"
  focus-ring: "2px solid {colors.kinetic}"
  focus-ring-offset: "2px"
components:
  editor-surface:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.surface-text}"
    rounded: "{rounded.surface}"
    padding: "{spacing.prose}"
    border: "1px solid rgba(255, 255, 255, 0.08)"
  editor-prose:
    fontFamily: "Georgia, serif"
    fontSize: "18px"
    lineHeight: "32px"
    textColor: "{colors.surface-text}"
    letterSpacing: "0.01em"
  note-list-item:
    backgroundColor: "transparent"
    textColor: "{colors.surface-text}"
    rounded: "{rounded.dynamic}"
    padding: "{spacing.compact}"
    height: "52px"
  note-list-item-active:
    backgroundColor: "{colors.interactive}"
    border: "1px solid rgba(255, 255, 255, 0.08)"
  note-list-item-hover:
    backgroundColor: "{colors.interactive}"
  tag:
    backgroundColor: "{colors.interactive}"
    textColor: "{colors.muted}"
    rounded: "{rounded.tag}"
    padding: "2px 8px"
    height: "22px"
  tag-yellow:
    backgroundColor: "{colors.note-yellow-surface}"
    textColor: "{colors.note-yellow}"
    rounded: "{rounded.tag}"
    padding: "2px 8px"
  tag-green:
    backgroundColor: "{colors.note-green-surface}"
    textColor: "{colors.note-green}"
    rounded: "{rounded.tag}"
    padding: "2px 8px"
  tag-purple:
    backgroundColor: "{colors.note-purple-surface}"
    textColor: "{colors.note-purple}"
    rounded: "{rounded.tag}"
    padding: "2px 8px"
  button-new-note:
    backgroundColor: "{colors.kinetic}"
    textColor: "{colors.kinetic-text}"
    rounded: "{rounded.dynamic}"
    height: "44px"
    padding: "0 16px"
    shadow: "0 8px 24px {colors.kinetic-glow}"
  button-icon:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.dynamic}"
    height: "44px"
    width: "44px"
  button-icon-hover:
    backgroundColor: "{colors.interactive}"
    textColor: "{colors.surface-text}"
  toolbar-item:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.dynamic}"
    height: "32px"
    padding: "0 8px"
  toolbar-item-active:
    backgroundColor: "{colors.interactive}"
    textColor: "{colors.surface-text}"
  search-input:
    backgroundColor: "{colors.interactive}"
    textColor: "{colors.surface-text}"
    rounded: "{rounded.dynamic}"
    height: "44px"
    padding: "0 {spacing.optimal}"
    border: "1px solid rgba(255, 255, 255, 0.08)"
  search-input-focus:
    border: "1px solid {colors.kinetic}"
  divider:
    height: "1px"
    backgroundColor: "{colors.divider}"
  word-count:
    textColor: "{colors.void-text}"
    typography: "{typography.label}"
---

## Brand & Style

Calm Focus is a note-taking and writing environment built on one guiding principle: **the interface should have less energy than the work**. The physics are deliberately restrained — surfaces sit quietly at Level 1, interactions are subtle Level 2 elevations, and Level 3 kinetic energy appears only once, on the "New Note" button, to signal the beginning of new thought.

Everything else stays out of the way. This is a space for thinking, not a space for the interface to perform.

## Colors

The color palette uses the full Energy Level scale but applies it with maximum restraint:

**Void, Surface, and Interactive** carry the entire visual weight. No accent color competes with the prose itself. The text color (`#E4E4E7`) is deliberately cooler than pure white — warmer than `#71717A` muted, but not harsh against the dark surface.

**Kinetic Blue** appears exactly once in the primary layout: the "New Note" button. Every other interactive element either lives in the dark (icon buttons, toolbar) or at Level 2 without glow emission.

**Semantic tags** use ultra-low-opacity tinted surfaces (`rgba(234, 179, 8, 0.08)`) — present enough to read, invisible enough not to distract. The tag label colors are deep and muted: `#854D0E` not `#EAB308`. A note about climate research should feel calm, not neon.

**Selection** uses `rgba(59, 130, 246, 0.15)` — kinetic blue at 15% opacity. When text is selected, there's a whisper of energy, not a flood of it.

## Typography

Two font families in intentional contrast:

**Inter** governs the application shell — navigation, labels, buttons, note list, metadata. Clean, neutral, digital. 

**Georgia (serif)** governs the editor itself. Prose reads better in serif at reading sizes. At `18px / 32px line-height`, text is generous and unhurried. The slightly positive letter-spacing (`0.01em`) opens up the line, reducing density in long-form reading.

The `note-title` (`25px, 600 weight`) lives at the section scale but uses Inter — title and body font are distinct languages. The title is interface; the body is thought.

## Layout & Spacing

A three-panel layout: narrow sidebar (240px), medium note list (280px), and the editor fills the remaining width.

**Prose spacing** (`40px`) is a special value — `10 × Base_Unit` — applied as horizontal padding in the editor. This creates comfortable reading line lengths at typical screen widths (65–80 characters), following typographic conventions for long-form reading.

Between sidebar sections, `loose` spacing (24px) creates visual breathing room. Within the note list, `compact` (8px) keeps notes dense and scannable — users with 50+ notes need efficient scanning, not spacious whitespace.

## Kinematics

Calm Focus uses physics minimally, by design:

**Note list transitions:** When a note becomes active, the background transition uses Micro spring — fast and clean. No drama. The note list item does not scale or translate; the color is the only thing that changes.

**New Note button:** Micro spring, `scale: 0.96` on press. The only place in the UI where kinetic energy is physically felt.

**Editor:** Zero animation. The editor surface doesn't animate. Writing is continuous; the interface shouldn't punctuate it.

**Toolbar toggles** (bold, italic, headings): Micro spring on the active state background fill — quick, confirmatory, gone. You apply bold; the button acknowledges; you keep writing.

## Shapes

**Topology Collapse** applied uniformly: `min(12px, height/2)`. Most elements are 44px tall, getting 12px radius — a soft rectangle, not a pill. 

**Tags** use a deliberate override: `6px` fixed radius. Tags are categorical labels, not actions. A slightly more rectangular tag signals "data" rather than "button," creating a semantic distinction through shape vocabulary.

**The editor surface** gets `surface` radius (16px) — it's a container, and containers use the larger value. The interior prose itself has no radius; it's content, not chrome.

## Components

### Editor
The writing surface is a Level 1 container with 40px prose padding. The prose font is Georgia at 18px with 32px line-height. No forced structure — the editor presents an open field. Word count appears at the bottom in `void-text` color, barely visible, keeping focus on the work.

### Note List
52px item height (larger than the 44px minimum because notes benefit from slightly more breathing room in a scannable list). Active state uses Level 2 background with the faint border to lift the item without harsh color contrast. The active note should feel "selected," not "highlighted."

### Tags
Applied at the note level to convey category or status. The three semantic tints (yellow/green/purple) correspond to user-defined collections — they're the only place in the UI where color has semantic richness beyond the Energy Level scale.

### Toolbar
The writing toolbar buttons sit at `height: 32px` — smaller than the 44px minimum, which would normally violate the Fitts Law rule. Exception: toolbar buttons are keyboard-driven primarily. The visual treatment (32px) is for scannable icon groups; keyboard shortcuts are the actual interaction surface.
