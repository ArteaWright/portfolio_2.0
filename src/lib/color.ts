// Small color helpers used to derive tonal gradients from a single brand color.

interface Hsl {
  h: number; // 0–360
  s: number; // 0–1
  l: number; // 0–1
}

export function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const n = parseInt(full, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
}

export function hexToHsl(hex: string): Hsl {
  const [r, g, b] = hexToRgb(hex).map((v) => v / 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  const l = (max + min) / 2;
  if (d === 0) return { h: 0, s: 0, l };

  const s = d / (1 - Math.abs(2 * l - 1));
  let h: number;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return { h: (h * 60 + 360) % 360, s, l };
}

export function hslToHex({ h, s, l }: Hsl): string {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  const [r, g, b] =
    h < 60 ? [c, x, 0] :
    h < 120 ? [x, c, 0] :
    h < 180 ? [0, c, x] :
    h < 240 ? [0, x, c] :
    h < 300 ? [x, 0, c] :
    [c, 0, x];
  return rgbToHex((r + m) * 255, (g + m) * 255, (b + m) * 255);
}

/** WCAG relative luminance. */
function luminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio between two hex colors (1–21). */
export function contrastRatio(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export interface TonalGradient {
  from: string;
  to: string;
  css: string;
  /** Contrast of the given text color against each end of the gradient. */
  contrastFrom: number;
  contrastTo: number;
}

/**
 * Builds a monochromatic gradient from `base` to a lighter tint of the same hue
 * and saturation. The tint is lightened by up to `lift` (in HSL lightness), but
 * is stopped early if going further would push `textColor` below `minContrast`,
 * so text stays legible across the whole gradient rather than only at the base.
 */
export function tonalGradient(
  base: string,
  textColor: string,
  { lift = 0.2, minContrast = 4.5, angle = 135 }: { lift?: number; minContrast?: number; angle?: number } = {}
): TonalGradient {
  const hsl = hexToHsl(base);
  let to = base;
  for (let step = 1; step <= 100; step++) {
    const l = Math.min(hsl.l + (lift * step) / 100, 0.95);
    const candidate = hslToHex({ ...hsl, l });
    if (contrastRatio(textColor, candidate) < minContrast) break;
    to = candidate;
  }
  return {
    from: base,
    to,
    css: `linear-gradient(${angle}deg, ${base} 0%, ${to} 100%)`,
    contrastFrom: contrastRatio(textColor, base),
    contrastTo: contrastRatio(textColor, to),
  };
}
