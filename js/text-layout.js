/* =============================================
   TEXT LAYOUT — pretext integration.

   Uses @chenglou/pretext for text measurement
   and line-level layout control. This enables:
   - Text flowing around shapes (kintsugi cracks, blueprint diagrams)
   - Variable-width line layouts per section
   - Canvas/SVG text rendering without DOM reflow
   - Measuring bilingual text pairs for balanced layouts

   NOTE: pretext ships as TypeScript source. This module
   is designed for use with a build tool (Vite, Astro, esbuild).
   When the project adds a build step, uncomment the import
   and these functions become live.

   For now, this serves as the API contract and documentation
   for how pretext will be used across leaf pages.
   ============================================= */

// Uncomment when build tool is added:
// import { prepareWithSegments, layoutWithLines, layoutNextLine } from '@chenglou/pretext';

/**
 * Measure and lay out text into lines at a given width.
 * Returns an array of { text, width } lines.
 *
 * Usage:
 *   const lines = flowText('Some long text...', '16px Inter', 600, 24);
 *   lines.forEach(l => console.log(l.text, l.width));
 */
export function flowText(text, font, maxWidth, lineHeight) {
  // const prepared = prepareWithSegments(text, font);
  // const { lines } = layoutWithLines(prepared, maxWidth, lineHeight);
  // return lines;
  console.warn('flowText: pretext not yet wired (needs build step)');
  return [];
}

/**
 * Flow text with variable widths per line.
 * widthFn(lineIndex, y) returns the available width for that line.
 * Useful for wrapping text around shapes — e.g. kintsugi cracks,
 * blueprint diagrams, or the irregular edges of a leaf.
 *
 * Usage:
 *   const lines = flowTextAround(text, '15px "IBM Plex Mono"', 22, (i, y) => {
 *     return y < imageBottom ? columnWidth - imageWidth : columnWidth;
 *   });
 */
export function flowTextAround(text, font, lineHeight, widthFn) {
  // const prepared = prepareWithSegments(text, font);
  // const result = [];
  // let cursor = { segmentIndex: 0, graphemeIndex: 0 };
  // let lineIndex = 0;
  // let y = 0;
  // while (true) {
  //   const width = widthFn(lineIndex, y);
  //   const line = layoutNextLine(prepared, cursor, width);
  //   if (line === null) break;
  //   result.push({ ...line, y, availableWidth: width });
  //   cursor = line.end;
  //   y += lineHeight;
  //   lineIndex++;
  // }
  // return result;
  console.warn('flowTextAround: pretext not yet wired (needs build step)');
  return [];
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
 * Returns an SVG group element string.
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
