# Dark Command

An AI-powered developer console and chat interface built on Physics Engine laws.

**Energy signature:** Level 0 Void backgrounds · Level 3 Kinetic user messages · Monospace code surfaces

## What this example demonstrates

- **Energy Level system in practice** — the UI has exactly 4 visual layers (void, surface, interactive, kinetic), derived from physics, not hand-picked colors
- **Asymmetric conversation design** — user messages are Level 3 (the initiating force), AI responses are Level 1 (the answer at rest). Visually communicates direction without labels
- **Micro spring on send button** — `scale: 0.96`, `mass: 0.5, stiffness: 500, damping: 25` — snaps like a physical switch
- **Typography duality** — Inter for human language, JetBrains Mono for machine output. Two typefaces = two modes of thought
- **Topology Collapse on input bar** — `min(12px, 52px/2) = 12px` — the formula produces the right radius, no guessing

## How an agent uses this file

```bash
# Lint before building
physics-engine lint DESIGN.md

# Export for Tailwind
physics-engine export --format tailwind DESIGN.md > tailwind.config.js

# Export W3C tokens
physics-engine export --format dtcg DESIGN.md > design_tokens.json
```

An AI agent receiving this DESIGN.md knows:
- Every background color and its energy meaning
- Exact spring parameters for every interaction type
- Input focus ring color and offset (no guessing)
- Minimum tap target size (44px, enforced by linter)
- Typography for both prose and code contexts

## Key components

| Component | Energy Level | Key physics |
|---|---|---|
| `message-bubble-user` | Level 3 Kinetic | Blue bg + glow emission |
| `message-bubble-ai` | Level 1 Surface | Dark bg + whisper border |
| `input-bar` | Level 2 → Level 3 (focus) | Spring focus ring |
| `send-button` | Level 3 Kinetic | scale(0.96) on press |
| `code-block` | Sub-void (#0D0D0F) | Machine-nature signaling |
| `sidebar-item` | Transparent → Level 2 | Elevation on hover |
