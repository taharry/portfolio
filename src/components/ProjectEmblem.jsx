/**
 * Original per-project emblem marks — simple inline SVG, thick outlines,
 * angular cutouts, limited red/black/cream palette. Shared between the
 * Projects listing cards and the project dossier headers so each project
 * reads as its own "case" at a glance.
 */
const EMBLEMS = {
  // MuJam: a guitar pick with a bold chord-dot grid over three strings.
  mujam: (
    <svg viewBox="0 0 72 72" role="img" aria-label="Guitar pick and chord-grid emblem">
      <path
        d="M36 4 C54 4 66 19 66 36 C66 54 51 68 36 68 C21 68 6 54 6 36 C6 19 18 4 36 4 Z"
        fill="var(--red)"
        stroke="var(--black)"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <line x1="25" y1="24" x2="25" y2="52" stroke="var(--cream)" strokeWidth="4" strokeLinecap="round" />
      <line x1="36" y1="20" x2="36" y2="54" stroke="var(--cream)" strokeWidth="4" strokeLinecap="round" />
      <line x1="47" y1="24" x2="47" y2="52" stroke="var(--cream)" strokeWidth="4" strokeLinecap="round" />
      <circle cx="25" cy="33" r="5.5" fill="var(--black)" />
      <circle cx="36" cy="43" r="5.5" fill="var(--black)" />
      <circle cx="47" cy="33" r="5.5" fill="var(--black)" />
    </svg>
  ),
  // Adventra: a compass rose over a dashed route with a waypoint dot.
  adventra: (
    <svg viewBox="0 0 72 72" role="img" aria-label="Compass and route emblem">
      <circle cx="36" cy="30" r="27" fill="var(--red)" stroke="var(--black)" strokeWidth="6" />
      <circle cx="36" cy="30" r="27" fill="none" stroke="var(--cream)" strokeWidth="1.5" opacity="0.5" />
      <polygon points="36,7 44,30 36,53 28,30" fill="var(--cream)" stroke="var(--black)" strokeWidth="3.5" strokeLinejoin="round" />
      <polygon points="13,30 36,22 59,30 36,38" fill="var(--cream)" opacity="0.6" stroke="var(--black)" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="36" cy="30" r="5.5" fill="var(--black)" />
      <path d="M8 63 L26 58 L44 64 L64 58" fill="none" stroke="var(--cream)" strokeWidth="4" strokeDasharray="2 7" strokeLinecap="round" />
      <circle cx="64" cy="58" r="5.5" fill="var(--cream)" stroke="var(--black)" strokeWidth="3" />
    </svg>
  ),
  // LingoQuest: a speech bubble with two bold language "lines" inside.
  lingoquest: (
    <svg viewBox="0 0 72 72" role="img" aria-label="Speech-bubble emblem">
      <path
        d="M9 10 H63 C65.8 10 68 12.2 68 15 V45 C68 47.8 65.8 50 63 50 H31 L15 63 V50 H9 C6.2 50 4 47.8 4 45 V15 C4 12.2 6.2 10 9 10 Z"
        fill="var(--red)"
        stroke="var(--black)"
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <rect x="15" y="21" width="42" height="7" rx="3" fill="var(--cream)" />
      <rect x="15" y="34" width="27" height="7" rx="3" fill="var(--cream)" />
    </svg>
  ),
};

export default function ProjectEmblem({ motif, className = '' }) {
  const svg = EMBLEMS[motif];
  if (!svg) return null;
  return <span className={`project-emblem ${className}`.trim()}>{svg}</span>;
}
