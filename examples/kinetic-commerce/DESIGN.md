---
name: Kinetic Commerce
description: High-energy e-commerce product page with spring-powered interactions
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
  success-glow: "rgba(34, 197, 94, 0.2)"
  price-highlight: "#FACC15"
  badge-sale: "#EF4444"
  badge-new: "#3B82F6"
spacing:
  compact: "8px"
  optimal: "16px"
  loose: "24px"
  macro: "48px"
rounded:
  dynamic: "min(12px, calc(height / 2))"
  surface: "16px"
  image: "12px"
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
  price:
    fontFamily: Inter
    fontSize: 31px
    fontWeight: "700"
    lineHeight: 36px
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
  add-to-cart-scale: 0.94
accessibility:
  min-tap-target: "44px"
  focus-ring: "2px solid {colors.kinetic}"
  focus-ring-offset: "2px"
components:
  button-add-to-cart:
    backgroundColor: "{colors.kinetic}"
    textColor: "{colors.kinetic-text}"
    rounded: "{rounded.dynamic}"
    height: "56px"
    padding: "0 32px"
    shadow: "0 8px 24px {colors.kinetic-glow}"
    typography: "{typography.component}"
  button-add-to-cart-hover:
    shadow: "0 12px 32px {colors.kinetic-glow}"
  button-add-to-cart-press:
    scale: 0.94
    shadow: "0 4px 12px {colors.kinetic-glow}"
  button-add-to-cart-success:
    backgroundColor: "{colors.success}"
    shadow: "0 8px 24px {colors.success-glow}"
  button-wishlist:
    backgroundColor: "{colors.interactive}"
    textColor: "{colors.muted}"
    rounded: "{rounded.dynamic}"
    height: "56px"
    width: "56px"
    border: "1px solid rgba(255, 255, 255, 0.08)"
  button-wishlist-active:
    textColor: "{colors.destructive}"
    border: "1px solid {colors.destructive}"
  product-card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.surface}"
    border: "1px solid rgba(255, 255, 255, 0.08)"
    padding: "{spacing.optimal}"
  product-card-hover:
    border: "1px solid rgba(255, 255, 255, 0.16)"
    shadow: "0 8px 32px rgba(0, 0, 0, 0.4)"
  product-image-container:
    backgroundColor: "{colors.interactive}"
    rounded: "{rounded.image}"
  variant-selector:
    backgroundColor: "{colors.interactive}"
    textColor: "{colors.surface-text}"
    rounded: "{rounded.dynamic}"
    height: "44px"
    padding: "0 16px"
    border: "1px solid rgba(255, 255, 255, 0.08)"
  variant-selector-active:
    border: "2px solid {colors.kinetic}"
    textColor: "{colors.kinetic}"
  badge-sale:
    backgroundColor: "{colors.badge-sale}"
    textColor: "{colors.kinetic-text}"
    rounded: "{rounded.dynamic}"
    padding: "4px 10px"
  badge-new:
    backgroundColor: "{colors.badge-new}"
    textColor: "{colors.kinetic-text}"
    rounded: "{rounded.dynamic}"
    padding: "4px 10px"
  quantity-stepper:
    backgroundColor: "{colors.interactive}"
    rounded: "{rounded.dynamic}"
    height: "44px"
    border: "1px solid rgba(255, 255, 255, 0.08)"
  quantity-button:
    backgroundColor: "transparent"
    textColor: "{colors.surface-text}"
    height: "44px"
    width: "44px"
  review-star-filled:
    textColor: "{colors.price-highlight}"
  review-star-empty:
    textColor: "{colors.interactive-hover}"
  price-current:
    textColor: "{colors.surface-text}"
    typography: "{typography.price}"
  price-original:
    textColor: "{colors.muted}"
    textDecoration: line-through
---

## Brand & Style

Kinetic Commerce is a dark-theme e-commerce product page where every interaction communicates energy and intent. The design language is built on a single principle: **the more kinetic an action, the more energy it emits.** Browsing is passive (Level 1 surface). Hovering is interest (Level 2). Adding to cart is maximum intention — Level 3 with full glow emission and spring compression.

This is commerce without noise. No rainbow gradients, no competing colors. The product is the hero. The UI is physics.

## Colors

The color hierarchy serves a commercial purpose:

**Void and Surface** create depth. Products appear to float in dark space — this is deliberate, making product imagery pop without competition.

**Kinetic Blue (`#3B82F6`)** is reserved exclusively for the single most important action: **Add to Cart**. When one button on the page glows blue, the user's eye goes there. This is not a coincidence. It's Fitts' Law + Color Energy combined.

**Success Green (`#22C55E`)** appears only when the add-to-cart succeeds — the button transforms from kinetic blue to success green, providing physical confirmation that the action landed.

**Destructive Red (`#EF4444`)** is used for the wishlist heart when active — counterintuitively, a passionate save-for-later carries emotional heat. Sale badges also use destructive energy — urgency is a form of warning.

**Price Highlight (`#FACC15`)** is the one warm element. Prices need to feel human and tangible in a way that blue-cold blue doesn't achieve.

## Typography

The type scale follows the 1.25 Major Third ratio from a 16px base. One special case: the **price** receives the same display-weight treatment as the product title (31px, 700 weight, tight tracking at -0.02em). Price is as important as name — it gets equal visual hierarchy.

Labels for variant selectors, badges, and quantities use the 13px label scale with medium weight — present but not demanding attention.

## Layout & Spacing

Product pages have two modes of density:

**Gallery mode** (image + title + price): Uses `loose` spacing (24px) between major blocks. The eye needs room to absorb the product before being asked to decide.

**Decision mode** (variants, quantity, CTA): Compresses to `optimal` spacing (16px). When the user is configuring a purchase, tight spacing speeds up scanning and decision-making.

The product grid uses a 12-column layout at 1440px, collapsing to 4 columns at 768px. Product cards get `surface` radius (16px) — they are containers, not interactive elements themselves.

## Kinematics

The Add to Cart button has the most dramatic kinetic spec in the system:

**Press:** `scale: 0.94` (deeper than the standard 0.96) — this extra compression communicates that something significant is happening. The spring `mass: 0.5, stiffness: 500, damping: 25` means it snaps back with satisfying firmness.

**Success transition:** The button background changes from Kinetic Blue to Success Green using the Macro spring (`mass: 1, stiffness: 250, damping: 30`) — slower, more deliberate, the feeling of a thing settling into place.

**Product card hover:** Elevation through border brightening (`rgba(255,255,255, 0.08)` → `0.16`) and a deep shadow. The card doesn't move — it illuminates. Like turning on a light.

**Quantity stepper buttons:** Standard Micro spring, `scale: 0.96`. They are utilitarian — snappy, immediate, no drama.

## Shapes

**Topology Collapse** governs all interactive elements. The 56px CTA button gets 12px radius. The 44px variant selectors and quantity buttons get 12px radius — approaching pill territory but maintaining the "button" feeling.

**Product images** use a fixed `12px` corner radius — slightly softer than the interactive elements, signaling that they are content (not interactive) while still feeling modern.

**Badges** (Sale, New) use the Topology Collapse formula at their small height (~24px), producing perfect pills. No hardcoded `border-radius: 9999px` — the formula handles it.

## Components

### Add to Cart
The hero component. Full Kinetic energy (Level 3) with glow emission. Wider padding (32px horizontal) to give the action visual weight. Spring compression on press gives tactile feedback before the success state confirms the transaction.

### Variant Selectors
Size, color, and configuration options live at Level 2 energy. Active state gets a 2px Kinetic border — the selected variant is charged. The 2px vs 1px border weight is intentional: the difference is physically perceptible without being loud.

### Product Cards (in grid view)
Level 1 surface containers with a whisper-thin 1px border. Hover brightens the border — the card "lights up" rather than lifting. This keeps the grid calm while still responding to user attention.

### Price
Typography is the design element. No background, no badge — just the right font weight (700) at the right scale (31px) in the right color (white against the dark surface). Struck-through original price uses `muted` color to recede.
