# Kinetic Commerce

A high-energy e-commerce product page where every interaction has physical weight.

**Energy signature:** Level 3 Add to Cart · Spring compression on purchase intent · Success state transition

## What this example demonstrates

- **Single kinetic focal point** — only the Add to Cart button emits Level 3 energy. Everything else sits at Level 1–2. The user's eye goes exactly where it should
- **Deeper press compression** — `scale: 0.94` (vs standard 0.96) on the CTA. The extra compression communicates that something significant is happening
- **Success state physics** — button transitions from Kinetic Blue → Success Green using Macro spring (`mass: 1, stiffness: 250, damping: 30`). Slower, deliberate — the feeling of a transaction settling
- **Variant selector state encoding** — active variants get a 2px kinetic border (vs inactive 1px). The difference is perceptible, not loud
- **Topology Collapse at two heights** — 56px CTA → 12px radius; 24px badges → 12px radius (pill). One formula, two very different shapes

## How an agent uses this file

```bash
physics-engine lint DESIGN.md
physics-engine export --format tailwind DESIGN.md > tailwind.config.js
physics-engine export --format dtcg DESIGN.md > design_tokens.json
```

An AI agent receiving this DESIGN.md knows:
- Which button gets Level 3 energy (and only that button)
- The two-stage animation for add-to-cart (press → success)
- Badge border-radius will be `min(12px, 24px/2) = 12px` — pill shape, no guessing
- Wishlist button active state color (destructive, not kinetic — intentional emotional difference)
- Hover state for product cards (border brightening, not shadow lifting)

## Key components

| Component | Energy Level | Key physics |
|---|---|---|
| `button-add-to-cart` | Level 3 Kinetic | scale(0.94) press + glow |
| `button-add-to-cart-success` | Success (#22C55E) | Macro spring transition |
| `button-wishlist-active` | Destructive accent | Emotional heat, not action |
| `product-card-hover` | Level 1 → border brightens | Illumination, not elevation |
| `variant-selector-active` | 2px kinetic border | Weight communicates selection |
| `badge-sale` | Destructive energy | Urgency is a form of warning |
