export const PALETTE_COLORS = [
  '#6366f1', // Indigo
  '#10b981', // Emerald
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#8b5cf6', // Purple
  '#06b6d4', // Cyan
  '#3b82f6', // Blue
  '#f97316', // Orange
  '#14b8a6', // Teal
  '#a855f7', // Violet
  '#eab308', // Yellow
  '#ef4444', // Red
  '#84cc16', // Lime
];

/**
 * Generates a unique dynamic color deterministically for any driver, ID, or index.
 * Uses golden-ratio hue distribution so consecutive drivers get maximum visual distinction.
 */
export function getDriverColor(idOrIndex: string | number): string {
  if (typeof idOrIndex === 'number') {
    if (idOrIndex >= 0 && idOrIndex < PALETTE_COLORS.length) {
      return PALETTE_COLORS[idOrIndex];
    }
    const hue = Math.round((idOrIndex * 137.508) % 360);
    return `hsl(${hue}, 85%, 60%)`;
  }

  let hash = 0;
  const str = String(idOrIndex || 'driver');
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 80%, 58%)`;
}

export const ROUTE_COLORS = PALETTE_COLORS;
