/**
 * DESIGN.md Parser
 * Extracts YAML front matter and markdown body from a DESIGN.md file.
 */

export interface ColorTokens {
  [key: string]: string;
}

export interface TypographyToken {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: number;
  lineHeight?: number;
  letterSpacing?: string;
}

export interface ComponentToken {
  backgroundColor?: string;
  textColor?: string;
  rounded?: string;
  padding?: string;
  height?: string;
  width?: string;
  size?: string;
  typography?: string;
  [key: string]: string | undefined;
}

export interface DesignSystem {
  name: string;
  version?: string;
  description?: string;
  colors: ColorTokens;
  typography: { [key: string]: TypographyToken };
  spacing: { [key: string]: string };
  rounded: { [key: string]: string };
  components: { [key: string]: ComponentToken };
}

export interface ParseResult {
  frontMatter: DesignSystem | null;
  body: string;
  error?: string;
}

/**
 * Parse a DESIGN.md file string into structured data.
 */
export function parseDesignMd(content: string): ParseResult {
  const fenceRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(fenceRegex);

  if (!match) {
    return {
      frontMatter: null,
      body: content,
      error: 'No YAML front matter found. DESIGN.md must start with --- fences.',
    };
  }

  const yamlStr = match[1];
  const body = match[2];

  try {
    const frontMatter = parseYaml(yamlStr) as DesignSystem;
    return { frontMatter, body };
  } catch (e: any) {
    return {
      frontMatter: null,
      body,
      error: `YAML parse error: ${e.message}`,
    };
  }
}

/**
 * Minimal YAML parser for the DESIGN.md token schema.
 * Handles nested objects, string values, numbers.
 */
function parseYaml(yaml: string): Record<string, any> {
  const lines = yaml.split('\n');
  const result: Record<string, any> = {};
  const stack: Array<{ obj: Record<string, any>; indent: number }> = [
    { obj: result, indent: -1 },
  ];

  for (const line of lines) {
    if (line.trim() === '' || line.trim().startsWith('#')) continue;

    const indent = line.search(/\S/);
    const trimmed = line.trim();

    // Pop stack to correct parent
    while (stack.length > 1 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    const parent = stack[stack.length - 1].obj;

    if (trimmed.includes(':')) {
      const colonIdx = trimmed.indexOf(':');
      const key = trimmed.slice(0, colonIdx).trim();
      const rawVal = trimmed.slice(colonIdx + 1).trim();

      if (rawVal === '' || rawVal === '{}') {
        // nested object follows
        const nested: Record<string, any> = {};
        parent[key] = nested;
        stack.push({ obj: nested, indent });
      } else {
        parent[key] = coerceValue(rawVal);
      }
    }
  }

  return result;
}

function coerceValue(val: string): string | number | boolean {
  if (val === 'true') return true;
  if (val === 'false') return false;
  // Strip surrounding quotes
  if ((val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))) {
    return val.slice(1, -1);
  }
  const num = Number(val);
  if (!isNaN(num) && val !== '') return num;
  return val;
}

/**
 * Resolve a token reference like {colors.kinetic} to its value.
 */
export function resolveRef(
  ref: string,
  designSystem: DesignSystem
): string | null {
  const match = ref.match(/^\{(.+)\}$/);
  if (!match) return ref; // not a reference

  const path = match[1].split('.');
  let current: any = designSystem;
  for (const segment of path) {
    if (current == null || typeof current !== 'object') return null;
    current = current[segment];
  }
  return typeof current === 'string' ? current : null;
}
