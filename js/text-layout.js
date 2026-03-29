/* =============================================
   TEXT LAYOUT — pretext integration.

   Uses @chenglou/pretext for text measurement
   and line-level layout control. Vite handles
   the TypeScript import at build time.
   ============================================= */

import { prepareWithSegments, layoutWithLines, layoutNextLine } from '@chenglou/pretext';

/**
 * Measure and lay out text into lines at a given width.
 * Returns an array of { text, width } lines.
 */
export function flowText(text, font, maxWidth, lineHeight) {
  const prepared = prepareWithSegments(text, font);
  const { lines } = layoutWithLines(prepared, maxWidth, lineHeight);
  return lines;
}

/**
 * Flow text with variable widths per line.
 * widthFn(lineIndex, y) returns the available width for that line.
 * Useful for wrapping text around shapes.
 */
export function flowTextAround(text, font, lineHeight, widthFn) {
  const prepared = prepareWithSegments(text, font);
  const result = [];
  let cursor = { segmentIndex: 0, graphemeIndex: 0 };
  let lineIndex = 0;
  let y = 0;

  while (true) {
    const width = widthFn(lineIndex, y);
    const line = layoutNextLine(prepared, cursor, width);
    if (line === null) break;
    result.push({ ...line, y, availableWidth: width });
    cursor = line.end;
    y += lineHeight;
    lineIndex++;
  }

  return result;
}

/**
 * Render pre-laid-out lines to a canvas 2D context.
 */
export function renderLinesToCanvas(ctx, lines, x, startY, lineHeight, options = {}) {
  const { color = '#C8D8E8', font = '15px "IBM Plex Mono"' } = options;
  ctx.font = font;
  ctx.fillStyle = color;
  lines.forEach((line, i) => {
    ctx.fillText(line.text, x, startY + i * lineHeight);
  });
}

/**
 * Render lines to SVG text elements.
 */
export function renderLinesToSVG(lines, x, startY, lineHeight, options = {}) {
  const { className = '', fill = 'currentColor' } = options;
  const texts = lines.map((line, i) => {
    const y = startY + i * lineHeight;
    const escaped = line.text.replace(/&/g, '&amp;').replace(/</g, '&lt;');
    return `<text x="${x}" y="${y}" fill="${fill}">${escaped}</text>`;
  });
  return `<g class="${className}">${texts.join('\n')}</g>`;
}
