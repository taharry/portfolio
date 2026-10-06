/**
 * Original per-project emblem marks — simple inline SVG, thick outlines,
 * angular cutouts, limited red/black/cream palette. Shared between the
 * Projects listing cards and the project dossier headers so each project
 * reads as its own "case" at a glance.
 */
const EMBLEMS = {
  // MuJam: a guitar pick with a small chord-dot grid over two strings.
  mujam: (
    <svg viewBox="0 0 72 72" role="img" aria-label="Guitar pick and chord-grid emblem">
      <path
        d="M36 5 C53 5 64 20 64 36 C64 53 51 67 36 67 C21 67 8 53 8 36 C8 20 19 5 36 5 Z"
        fill="var(--red)"
        stroke="var(--black)"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      <line x1="26" y1="26" x2="26" y2="50" stroke="var(--cream)" strokeWidth="3" strokeLinecap="round" />
      <line x1="36" y1="22" x2="36" y2="52" stroke="var(--cream)" strokeWidth="3" strokeLinecap="round" />
      <line x1="46" y1="26" x2="46" y2="50" stroke="var(--cream)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="26" cy="34" r="4.5" fill="var(--black)" />
      <circle cx="36" cy="42" r="4.5" fill="var(--black)" />
      <circle cx="46" cy="34" r="4.5" fill="var(--black)" />
    </svg>
  ),
  // Adventra: a compass rose over a dashed route with a waypoint dot.
  adventra: (
    <svg viewBox="0 0 72 72" role="img" aria-label="Compass and route emblem">
      <circle cx="36" cy="32" r="26" fill="var(--red)" stroke="var(--black)" strokeWidth="4.5" />
      <polygon points="36,10 43,32 36,54 29,32" fill="var(--cream)" stroke="var(--black)" strokeWidth="2.5" strokeLinejoin="round" />
      <polygon points="14,32 36,25 58,32 36,39" fill="var(--cream)" opacity="0.55" stroke="var(--black)" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="36" cy="32" r="4.5" fill="var(--black)" />
      <path d="M10 62 L26 58 L42 63 L62 58" fill="none" stroke="var(--cream)" strokeWidth="3" strokeDasharray="2 6" strokeLinecap="round" />
      <circle cx="62" cy="58" r="4" fill="var(--cream)" stroke="var(--black)" strokeWidth="2" />
    </svg>
  ),
  // LingoQuest: a speech bubble with two language "lines" inside.
  lingoquest: (
    <svg viewBox="0 0 72 72" role="img" aria-label="Speech-bubble emblem">
      <path
        d="M10 12 H62 C64.2 12 66 13.8 66 16 V44 C66 46.2 64.2 48 62 48 H30 L16 60 V48 H10 C7.8 48 6 46.2 6 44 V16 C6 13.8 7.8 12 10 12 Z"
        fill="var(--red)"
        stroke="var(--black)"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />
      <rect x="16" y="22" width="40" height="5.5" rx="2.5" fill="var(--cream)" />
      <rect x="16" y="33" width="26" height="5.5" rx="2.5" fill="var(--cream)" />
    </svg>
  ),
};

export default function ProjectEmblem({ motif, className = '' }) {
  const svg = EMBLEMS[motif];
  if (!svg) return null;
  return <span className={`project-emblem ${className}`.trim()}>{svg}</span>;
}
