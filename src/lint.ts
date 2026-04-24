/**
 * Physics Engine Linter
 * Validates a DESIGN.md file against the Physics Engine spec.
 * Compatible with @google/design.md finding schema.
 */

import { parseDesignMd, resolveRef, DesignSystem } from './parse.js';

export type Severity = 'error' | 'warning' | 'info';

export interface Finding {
  rule: string;
  severity: Severity;
  path: string;
  message: string;
}

export interface LintReport {
  findings: Finding[];
  summary: { errors: number; warnings: number; info: number };
  designSystem: DesignSystem | null;
}

// ─── Linting Rules ────────────────────────────────────────────────────────────

/**
 * Rule: broken-ref
 * Token references like {colors.kinetic} must resolve to a defined token.
 */
function checkBrokenRefs(ds: DesignSystem, findings: Finding[]) {
  const refRegex = /^\{.+\}$/;

  for (const [compName, comp] of Object.entries(ds.components || {})) {
    for (const [prop, value] of Object.entries(comp)) {
      if (typeof value === 'string' && refRegex.test(value)) {
        const resolved = resolveRef(value, ds);
        if (resolved === null) {
          findings.push({
            rule: 'broken-ref',
            severity: 'error',
            path: `components.${compName}.${prop}`,
            message: `Token reference "${value}" does not resolve to any defined token.`,
          });
        }
      }
    }
  }
}

/**
 * Rule: missing-primary
 * Colors must include a "kinetic" or "primary" token — agents need a primary action color.
 */
function checkMissingPrimary(ds: DesignSystem, findings: Finding[]) {
  const colors = ds.colors || {};
  const hasPrimary = 'primary' in colors || 'kinetic' in colors;
  if (!hasPrimary) {
    findings.push({
      rule: 'missing-primary',
      severity: 'warning',
      path: 'colors',
      message:
        'No primary action color defined (expected "kinetic" or "primary"). Agents will auto-generate one.',
    });
  }
}

/**
 * Rule: contrast-ratio
 * Component backgroundColor/textColor pairs must meet WCAG AA (4.5:1).
 */
function checkContrastRatios(ds: DesignSystem, findings: Finding[]) {
  for (const [compName, comp] of Object.entries(ds.components || {})) {
    const bgRef = comp.backgroundColor;
    const fgRef = comp.textColor;

    if (!bgRef || !fgRef) continue;

    const bg = resolveRef(bgRef, ds) ?? bgRef;
    const fg = resolveRef(fgRef, ds) ?? fgRef;

    if (!isHexColor(bg) || !isHexColor(fg)) continue;

    const ratio = contrastRatio(bg, fg);
    const ratioStr = ratio.toFixed(2);

    if (ratio < 3.0) {
      findings.push({
        rule: 'contrast-ratio',
        severity: 'error',
        path: `components.${compName}`,
        message: `textColor (${fg}) on backgroundColor (${bg}) has contrast ratio ${ratioStr}:1 — fails WCAG AA (minimum 4.5:1).`,
      });
    } else if (ratio < 4.5) {
      findings.push({
        rule: 'contrast-ratio',
        severity: 'warning',
        path: `components.${compName}`,
        message: `textColor (${fg}) on backgroundColor (${bg}) has contrast ratio ${ratioStr}:1 — fails WCAG AA for normal text (4.5:1), passes for large text (3:1).`,
      });
    } else {
      findings.push({
        rule: 'contrast-ratio',
        severity: 'info',
        path: `components.${compName}`,
        message: `textColor (${fg}) on backgroundColor (${bg}) has contrast ratio ${ratioStr}:1 — passes WCAG AA.`,
      });
    }
  }
}

/**
 * Rule: orphaned-tokens
 * Color tokens defined but never referenced by any component.
 */
function checkOrphanedTokens(ds: DesignSystem, findings: Finding[]) {
  const referenced = new Set<string>();

  for (const comp of Object.values(ds.components || {})) {
    for (const value of Object.values(comp)) {
      if (typeof value === 'string') {
        const match = value.match(/^\{colors\.(.+)\}$/);
        if (match) referenced.add(match[1]);
      }
    }
  }

  // Supplementary tokens used for elevation/kinematics, not component bg/text — skip
  const supplementary = ['-glow', '-border', '-muted'];

  for (const colorKey of Object.keys(ds.colors || {})) {
    if (referenced.has(colorKey)) continue;
    if (supplementary.some((s) => colorKey.endsWith(s))) continue;
    findings.push({
      rule: 'orphaned-tokens',
      severity: 'warning',
      path: `colors.${colorKey}`,
      message: `Color token "${colorKey}" is defined but never referenced by any component.`,
    });
  }
}

/**
 * Rule: fitts-law
 * Components with height must meet the 44px minimum hitbox.
 */
function checkFittsLaw(ds: DesignSystem, findings: Finding[]) {
  const interactiveTypes = ['button', 'input', 'toggle', 'checkbox'];
  // State variants inherit geometry from their base — skip them
  const stateVariants = ['-hover', '-focus', '-active', '-pressed', '-disabled'];

  for (const [compName, comp] of Object.entries(ds.components || {})) {
    const isInteractive = interactiveTypes.some((t) => compName.includes(t));
    if (!isInteractive) continue;
    const isVariant = stateVariants.some((v) => compName.endsWith(v));
    if (isVariant) continue;

    const height = comp.height;
    if (!height) {
      findings.push({
        rule: 'fitts-law',
        severity: 'warning',
        path: `components.${compName}`,
        message: `Interactive component "${compName}" has no height defined. Fitts Law minimum is 44px.`,
      });
      continue;
    }

    const px = parsePx(height);
    if (px !== null && px < 44) {
      findings.push({
        rule: 'fitts-law',
        severity: 'error',
        path: `components.${compName}.height`,
        message: `Component height ${height} is below Fitts Law minimum (44px).`,
      });
    }
  }
}

/**
 * Rule: token-summary
 * Info-level summary of token counts.
 */
function checkTokenSummary(ds: DesignSystem, findings: Finding[]) {
  findings.push({
    rule: 'token-summary',
    severity: 'info',
    path: 'root',
    message: [
      `colors: ${Object.keys(ds.colors || {}).length}`,
      `typography: ${Object.keys(ds.typography || {}).length}`,
      `spacing: ${Object.keys(ds.spacing || {}).length}`,
      `rounded: ${Object.keys(ds.rounded || {}).length}`,
      `components: ${Object.keys(ds.components || {}).length}`,
    ].join(', '),
  });
}

/**
 * Rule: missing-typography
 * Colors without typography tokens will cause agents to use defaults.
 */
function checkMissingTypography(ds: DesignSystem, findings: Finding[]) {
  const hasColors = Object.keys(ds.colors || {}).length > 0;
  const hasTypography = Object.keys(ds.typography || {}).length > 0;

  if (hasColors && !hasTypography) {
    findings.push({
      rule: 'missing-typography',
      severity: 'warning',
      path: 'typography',
      message: 'Colors are defined but no typography tokens exist. Agents will use system defaults.',
    });
  }
}

// ─── Main Lint Function ───────────────────────────────────────────────────────

export function lint(content: string): LintReport {
  const findings: Finding[] = [];
  const { frontMatter, error } = parseDesignMd(content);

  if (error || !frontMatter) {
    findings.push({
      rule: 'parse-error',
      severity: 'error',
      path: 'root',
      message: error ?? 'Failed to parse DESIGN.md',
    });
    return {
      findings,
      summary: { errors: 1, warnings: 0, info: 0 },
      designSystem: null,
    };
  }

  checkBrokenRefs(frontMatter, findings);
  checkMissingPrimary(frontMatter, findings);
  checkContrastRatios(frontMatter, findings);
  checkOrphanedTokens(frontMatter, findings);
  checkFittsLaw(frontMatter, findings);
  checkTokenSummary(frontMatter, findings);
  checkMissingTypography(frontMatter, findings);

  const summary = {
    errors: findings.filter((f) => f.severity === 'error').length,
    warnings: findings.filter((f) => f.severity === 'warning').length,
    info: findings.filter((f) => f.severity === 'info').length,
  };

  return { findings, summary, designSystem: frontMatter };
}

// ─── WCAG Utilities ───────────────────────────────────────────────────────────

function isHexColor(value: string): boolean {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);
}

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace('#', '');
  const full = clean.length === 3
    ? clean.split('').map((c) => c + c).join('')
    : clean;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return [r, g, b];
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const sRGB = v / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(bg: string, fg: string): number {
  const L1 = relativeLuminance(bg);
  const L2 = relativeLuminance(fg);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

function parsePx(value: string): number | null {
  const match = value.match(/^(\d+(?:\.\d+)?)px$/);
  return match ? parseFloat(match[1]) : null;
}
