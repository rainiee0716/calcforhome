import type { APIRoute } from 'astro';
import { FROST_REGIONS } from '../lib/frost';

// A downloadable copy of the state table for people writing about this.
// A CSV survives being pasted into a spreadsheet; a screenshot does not, and
// the writer who can take the data with them is the one who ends up citing it.

const UPDATED = '2026-10-29';
const PAGE = 'https://www.calcforhome.com/frost-depth-by-state/';

function cell(value: string | number): string {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export const GET: APIRoute = () => {
  const header = [
    'state',
    'abbr',
    'zone',
    'required_depth_in',
    'required_depth_mm',
    'code_basis',
    'scope',
  ];

  const rows = FROST_REGIONS.map((r) => [
    r.state,
    r.abbr,
    r.zone ?? 'statewide',
    r.depth,
    Math.round(r.depth * 25.4),
    r.basis,
    r.statewide ? 'statewide' : 'local or largest city',
  ]);

  const csv = [
    `# Frost depth by state, required footing depth in inches below finished grade`,
    `# Source: ${PAGE}  Updated: ${UPDATED}`,
    `# Code values, not climate averages. Free to reuse with a link back to the page.`,
    header.join(','),
    ...rows.map((r) => r.map(cell).join(',')),
  ].join('\n');

  return new Response(`${csv}\n`, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="frost-depth-by-state.csv"',
    },
  });
};
