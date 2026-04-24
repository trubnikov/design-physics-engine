/**
 * Physics Engine Exporter
 * Converts DESIGN.md tokens to Tailwind config and W3C DTCG format.
 */

import { parseDesignMd, resolveRef, DesignSystem } from './parse.js';

export type ExportFormat = 'tailwind' | 'dtcg';

// ─── Tailwind Export ──────────────────────────────────────────────────────────

function toTailwind(ds: DesignSystem): Record<string, any> {
  const colors: Record<string, string> = {};
  for (const [key, value] of Object.entries(ds.colors || {})) {
    // Convert kebab-case to camelCase for Tailwind
    const camel = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    colors[camel] = value;
  }

  const spacing: Record<string, string> = {};
  for (const [key, value] of Object.entries(ds.spacing || {})) {
    spacing[key] = value;
  }

  const borderRadius: Record<string, string> = {};
  for (const [key, value] of Object.entries(ds.rounded || {})) {
    borderRadius[key] = value;
  }

  const fontSize: Record<string, [string, Record<string, string | number>]> = {};
  for (const [key, token] of Object.entries(ds.typography || {})) {
    fontSize[key] = [
      token.fontSize ?? '1rem',
      {
        lineHeight: String(token.lineHeight ?? 1.5),
        fontWeight: String(token.fontWeight ?? 400),
        letterSpacing: token.letterSpacing ?? 'normal',
      },
    ];
  }

  return {
    theme: {
      extend: {
        colors,
        spacing,
        borderRadius,
        fontSize,
      },
    },
  };
}

// ─── DTCG Export ──────────────────────────────────────────────────────────────

function dtcgToken(value: string, type: string, description?: string) {
  const token: Record<string, any> = { $value: value, $type: type };
  if (description) token.$description = description;
  return token;
}

function toDtcg(ds: DesignSystem): Record<string, any> {
  const output: Record<string, any> = {};

  // Colors
  output.colors = {};
  for (const [key, value] of Object.entries(ds.colors || {})) {
    output.colors[key] = dtcgToken(value, 'color');
  }

  // Typography
  output.typography = {};
  for (const [key, token] of Object.entries(ds.typography || {})) {
    output.typography[key] = {
      $type: 'typography',
      $value: {
        fontFamily: token.fontFamily,
        fontSize: token.fontSize,
        fontWeight: token.fontWeight,
        lineHeight: token.lineHeight,
        letterSpacing: token.letterSpacing,
      },
    };
  }

  // Spacing
  output.spacing = {};
  for (const [key, value] of Object.entries(ds.spacing || {})) {
    output.spacing[key] = dtcgToken(value, 'dimension');
  }

  // Border radius
  output.borderRadius = {};
  for (const [key, value] of Object.entries(ds.rounded || {})) {
    output.borderRadius[key] = dtcgToken(value, 'dimension');
  }

  // Components (as composite tokens)
  output.components = {};
  for (const [compName, comp] of Object.entries(ds.components || {})) {
    const resolved: Record<string, string> = {};
    for (const [prop, value] of Object.entries(comp)) {
      if (typeof value === 'string') {
        resolved[prop] = resolveRef(value, ds) ?? value;
      }
    }
    output.components[compName] = { $type: 'composite', $value: resolved };
  }

  return output;
}

// ─── Main Export Function ─────────────────────────────────────────────────────

export function exportTokens(content: string, format: ExportFormat): string {
  const { frontMatter, error } = parseDesignMd(content);

  if (error || !frontMatter) {
    throw new Error(error ?? 'Failed to parse DESIGN.md');
  }

  if (format === 'tailwind') {
    return JSON.stringify(toTailwind(frontMatter), null, 2);
  }

  if (format === 'dtcg') {
    return JSON.stringify(toDtcg(frontMatter), null, 2);
  }

  throw new Error(`Unknown format: ${format}. Use "tailwind" or "dtcg".`);
}
