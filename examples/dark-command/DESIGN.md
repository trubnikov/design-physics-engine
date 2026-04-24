---
name: Dark Command
description: AI-powered developer console and chat interface
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
  destructive-glow: "rgba(239, 68, 68, 0.25)"
  muted: "#71717A"
  surface-text: "#E4E4E7"
  void-text: "#71717A"
  success: "#22C55E"
  warning: "#F59E0B"
  code-surface: "#0D0D0F"
  code-string: "#86EFAC"
  code-keyword: "#93C5FD"
  code-comment: "#52525B"
spacing:
  compact: "8px"
  optimal: "16px"
  loose: "24px"
  macro: "48px"
rounded:
  dynamic: "min(12px, calc(height / 2))"
  surface: "16px"
  code: "8px"
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
  code:
    fontFamily: "JetBrains Mono, monospace"
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 22px
    letterSpacing: 0
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
  message-bubble-user:
    backgroundColor: "{colors.kinetic}"
    textColor: "{colors.kinetic-text}"
    rounded: "{rounded.surface}"
    padding: "{spacing.optimal}"
    shadow: "0 8px 24px {colors.kinetic-glow}"
  message-bubble-ai:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.surface-text}"
    rounded: "{rounded.surface}"
    padding: "{spacing.optimal}"
    border: "1px solid rgba(255, 255, 255, 0.08)"
  input-bar:
    backgroundColor: "{colors.interactive}"
    textColor: "{colors.surface-text}"
    rounded: "{rounded.dynamic}"
    padding: "{spacing.optimal}"
    height: "52px"
    border: "1px solid rgba(255, 255, 255, 0.08)"
  input-bar-focus:
    border: "1px solid {colors.kinetic}"
    shadow: "0 0 0 4px {colors.kinetic-glow}"
  send-button:
    backgroundColor: "{colors.kinetic}"
    textColor: "{colors.kinetic-text}"
    rounded: "{rounded.dynamic}"
    height: "44px"
    width: "44px"
    shadow: "0 8px 24px {colors.kinetic-glow}"
  send-button-hover:
    shadow: "0 12px 32px {colors.kinetic-glow}"
  code-block:
    backgroundColor: "{colors.code-surface}"
    textColor: "{colors.surface-text}"
    rounded: "{rounded.code}"
    padding: "{spacing.optimal}"
    border: "1px solid rgba(255, 255, 255, 0.06)"
  sidebar-item:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "{rounded.dynamic}"
    padding: "{spacing.compact}"
    height: "44px"
  sidebar-item-active:
    backgroundColor: "{colors.interactive}"
    textColor: "{colors.surface-text}"
  sidebar-item-hover:
    backgroundColor: "{colors.interactive}"
    textColor: "{colors.surface-text}"
  status-badge-success:
    backgroundColor: "rgba(34, 197, 94, 0.12)"
    textColor: "{colors.success}"
    rounded: "{rounded.dynamic}"
    padding: "4px 10px"
  status-badge-error:
    backgroundColor: "rgba(239, 68, 68, 0.12)"
    textColor: "{colors.destructive}"
    rounded: "{rounded.dynamic}"
    padding: "4px 10px"
---

## Brand & Style

Dark Command is an AI-powered developer console built entirely on Physics Engine energy laws. The interface inhabits the deep **Level 0 Void** — the universe where computation lives. Every surface, every element, every interaction obeys the same physics: matter at rest sits at Level 1, matter that can be touched rises to Level 2, and matter in kinetic motion emits Level 3 blue light.

The aesthetic is deliberately stark: no decorative gradients, no arbitrary colors. The only color with chromatic identity is **Kinetic (#3B82F6)** — the color of electricity, of execution, of things happening. Code surfaces drop to a sub-void `#0D0D0F` to signal their machine nature.

## Colors

The color system is derived entirely from the Energy Level scale. There are no arbitrary hex values — every color is a physical state:

- **Level 0 Void (`#050505`):** The background. Where nothing yet exists.
- **Level 1 Surface (`#111113`):** AI message bubbles and containers. Matter at rest.
- **Level 2 Interactive (`#1F1F24`):** The input bar and sidebar items. Matter that knows it can be touched.
- **Level 2.5 Hover (`#2A2A30`):** What Level 2 becomes when energy is applied.
- **Level 3 Kinetic (`#3B82F6`):** User messages and the send button. Maximum energy, maximum intentionality.
- **Semantic states:** Success (`#22C55E`) and Error (`#EF4444`) are the only exceptions — they carry universal meaning.

The Glow emission (`rgba(59, 130, 246, 0.25)`) on Level 3 elements is not decoration — it's the shadow of energy, showing the element's charge affecting the space around it.

## Typography

Two font families serve two different modes of consciousness:

**Inter** handles human language — conversations, labels, navigation. It follows the 1.25 Major Third scale: 16px body → 20px component titles → 25px section headers → 31px display.

**JetBrains Mono** handles machine language — code blocks, command output, file paths. Fixed-width, 14px, breathing room in line-height (22px) to make dense output scannable.

All type sits on `line-height: 1.6` at body scale. Larger headings compress to `1.1` — they don't need breathing room because they carry weight.

## Layout & Spacing

The Base Unit is 4px. All spacing is a multiple:
- **Compact (2×=8px):** Icon-to-label gaps, badge padding, tight internal spacing.
- **Optimal (4×=16px):** Message bubble padding, input padding, standard card content.
- **Loose (6×=24px):** Between sidebar sections, between message groups.
- **Macro (12×=48px):** Page margins, top-level layout gaps.

The sidebar is 240px — a deliberate choice at 30 × Base_Unit, keeping it in the grid.

## Kinematics

Every interaction has physical weight. There are two presets:

**Micro (Buttons, toggles, badges):** `mass: 0.5, stiffness: 500, damping: 25` — snaps like a physical switch. The send button compresses to `scale: 0.96` on press, releasing with a satisfying rebound.

**Macro (Message appearance, sidebar panels):** `mass: 1.0, stiffness: 250, damping: 30` — messages slide in with the weight of something that has arrived. Not instant, not slow — precisely the duration of something important landing.

## Shapes

**Topology Collapse:** `min(12px, height / 2)`. A 44px button gets `12px` radius. A 24px badge gets `12px` radius, becoming a pill. Nothing is ever arbitrarily rounded — the formula ensures geometric coherence at every size.

**Code blocks** use a fixed `8px` — code is machine-generated and doesn't need the organic feel of interactive elements. It stays sharp-ish.

## Components

### Message Bubbles
User messages use Level 3 energy — they are the initiating force. AI responses use Level 1 surface — they are the answer that comes to rest. The visual asymmetry communicates the conversation's direction without labels.

### Input Bar
Level 2 at rest, Level 3 focus ring at attention. The 4px glow ring on focus (`0 0 0 4px rgba(59, 130, 246, 0.25)`) is not a style — it's the Kinetic emission showing that the field is charged.

### Sidebar
Navigation items sit at transparent/muted until hovered or activated. The state transition is Level 2 background + Level 1 text color — the item surfaces but doesn't shout.

### Code Blocks
Sub-void background (`#0D0D0F`) separates machine output from human conversation. Syntax coloring uses desaturated, energy-appropriate hues: strings in soft green, keywords in soft blue — never harsh, never arbitrary.
