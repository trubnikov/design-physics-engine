#!/usr/bin/env node
/**
 * Physics Engine CLI
 * npx @trubnikov/physics-engine <command> [options] [file]
 */

import { readFileSync } from 'fs';
import { lint } from './lint.js';
import { exportTokens, ExportFormat } from './export.js';

const SPEC_VERSION = '1.0';

const HELP = `
Physics Engine — Generative Design System CLI
Version ${SPEC_VERSION}

USAGE
  npx @trubnikov/physics-engine <command> [options] <file>
  cat DESIGN.md | npx @trubnikov/physics-engine <command> -

COMMANDS
  lint    Validate a DESIGN.md file
  export  Export tokens to another format
  spec    Print the Physics Engine specification

OPTIONS
  --format  Output format (json, tailwind, dtcg)  [default: json]
  --help    Show this help message

EXAMPLES
  npx @trubnikov/physics-engine lint DESIGN.md
  npx @trubnikov/physics-engine export --format tailwind DESIGN.md
  npx @trubnikov/physics-engine export --format dtcg DESIGN.md
  npx @trubnikov/physics-engine spec
`;

const SPEC = `
# Physics Engine Specification v${SPEC_VERSION}

## File Format
A DESIGN.md file has two layers:
1. YAML front matter — machine-readable design tokens, delimited by --- fences.
2. Markdown body — human-readable design rationale organized into ## sections.

## Token Schema
  name: <string>          required
  version: <string>       optional
  description: <string>   optional
  colors:                 map of <token-name>: <hex-color>
  typography:             map of <token-name>: <TypographyObject>
  spacing:                map of compact|optimal|loose|macro: <dimension>
  rounded:                map of dynamic|surface|<custom>: <dimension>
  components:             map of <component-name>: <ComponentObject>

## Component Token Properties
  backgroundColor, textColor, rounded, padding, height, width, size, typography

## Token References
  Use {path.to.token} to reference another token. Example: {colors.kinetic}

## Energy Levels (Physics Engine Extension)
  Level 0 (Void)        — Background universe
  Level 1 (Surface)     — Cards, panels, containers
  Level 2 (Interactive) — Idle inputs, secondary buttons
  Level 2.5 (Hover)     — Energy elevation on hover
  Level 3 (Kinetic)     — Primary actions, peak energy — emits glow
  Destructive           — Danger spectrum, follows Level 3 emission rules

## Spatial Mathematics
  Base Unit: 4px
  Compact:   2× Base Unit (8px)
  Optimal:   4× Base Unit (16px)
  Loose:     6× Base Unit (24px)
  Macro:     12× Base Unit (48px)

## Topology Collapse (Border Radius)
  Dynamic Radius: min(12px, height / 2)   — for elements with known height
  Surface Radius: 16px                    — for containers with variable height

## Kinematics
  Micro (buttons, toggles): spring { mass: 0.5, stiffness: 500, damping: 25 }
  Macro (modals, drawers):  spring { mass: 1.0, stiffness: 250, damping: 30 }
  Press compression: scale(0.96)

## Linting Rules
  broken-ref          error    Token references must resolve to defined tokens
  missing-primary     warning  A kinetic or primary color must be defined
  contrast-ratio      warning  WCAG AA minimum 4.5:1 for text/background pairs
  orphaned-tokens     warning  Defined colors should be referenced by components
  fitts-law           error    Interactive elements must be at least 44×44px
  token-summary       info     Count of tokens in each section
  missing-typography  warning  Typography tokens should exist alongside colors
`;

function readInput(filePath: string): string {
  if (filePath === '-') {
    return readFileSync(process.stdin.fd, 'utf8');
  }
  return readFileSync(filePath, 'utf8');
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(HELP);
    process.exit(0);
  }

  const command = args[0];

  // ── lint ──────────────────────────────────────────────────────────────────
  if (command === 'lint') {
    const filePath = args[args.length - 1];
    if (!filePath || filePath === 'lint') {
      console.error('Error: provide a file path. Example: physics-engine lint DESIGN.md');
      process.exit(1);
    }

    let content: string;
    try {
      content = readInput(filePath);
    } catch {
      console.error(`Error: cannot read file "${filePath}"`);
      process.exit(1);
    }

    const report = lint(content);
    console.log(JSON.stringify(report, null, 2));
    process.exit(report.summary.errors > 0 ? 1 : 0);
  }

  // ── export ────────────────────────────────────────────────────────────────
  if (command === 'export') {
    const formatIdx = args.indexOf('--format');
    const format = (formatIdx !== -1 ? args[formatIdx + 1] : 'dtcg') as ExportFormat;
    const filePath = args[args.length - 1];

    if (!filePath || filePath === 'export' || filePath === format) {
      console.error('Error: provide a file path. Example: physics-engine export --format tailwind DESIGN.md');
      process.exit(1);
    }

    let content: string;
    try {
      content = readInput(filePath);
    } catch {
      console.error(`Error: cannot read file "${filePath}"`);
      process.exit(1);
    }

    try {
      const output = exportTokens(content, format);
      console.log(output);
    } catch (e: any) {
      console.error(`Export error: ${e.message}`);
      process.exit(1);
    }
    return;
  }

  // ── spec ──────────────────────────────────────────────────────────────────
  if (command === 'spec') {
    const formatIdx = args.indexOf('--format');
    const format = formatIdx !== -1 ? args[formatIdx + 1] : 'markdown';

    if (format === 'json') {
      console.log(JSON.stringify({ spec: SPEC.trim(), version: SPEC_VERSION }, null, 2));
    } else {
      console.log(SPEC);
    }
    return;
  }

  console.error(`Unknown command: "${command}". Run with --help for usage.`);
  process.exit(1);
}

main();
