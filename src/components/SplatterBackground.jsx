import { useMemo } from 'react';

/**
 * Decorative "concentric star burst + ink splatter" layer, drawn entirely
 * from generated SVG paths (no external images). Deterministic per `seed`
 * so it stays put across re-renders.
 *
 * Give the parent `position: relative`; this fills it via
 * `position: absolute; inset: 0` (see .splatter-bg in CSS).
 */

const VB_W = 1200;
const VB_H = 600;

const RED = 'var(--red)';
const BLACK = 'var(--black)';
const GREY = 'var(--grey)';

// Small deterministic PRNG (mulberry32).
function makeRng(seed) {
  let a = seed >>> 0;
  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = (rng, min, max) => min + rng() * (max - min);
const pick = (rng, arr) => arr[Math.floor(rng() * arr.length)];

// Star outline points: alternating outer spikes / inner valleys.
// `jit` is a fixed per-vertex jitter array so concentric rings nest cleanly.
function starPoints(cx, cy, spikes, outerR, innerR, rot, jit) {
  const step = Math.PI / spikes;
  const pts = [];
  for (let i = 0; i < spikes * 2; i++) {
    const base = i % 2 === 0 ? outerR : innerR;
    const r = base * jit[i % jit.length];
    const a = rot + i * step - Math.PI / 2;
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
  }
  return pts;
}

function ptsToPath(pts) {
  return pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ') + ' Z';
}

// A filled star wrapped in a couple of progressively larger star outlines.
// `anchor` = { x, y } in viewBox units so bursts can be spaced deliberately.
function concentricStar(rng, anchor, tone) {
  const cx = anchor.x;
  const cy = anchor.y;
  const spikes = Math.floor(rand(rng, 6, 9));
  const rot = rand(rng, 0, Math.PI * 2);
  const innerRatio = rand(rng, 0.4, 0.5);
  const baseR = rand(rng, 34, 60);
  const rings = Math.floor(rand(rng, 3, 5));
  const ringGap = rand(rng, 0.34, 0.5);
  const stroke = Math.max(2, baseR * rand(rng, 0.09, 0.13));

  const jit = [];
  for (let i = 0; i < spikes * 2; i++) jit.push(rand(rng, 0.96, 1.04));

  const shapes = [];

  shapes.push({
    kind: 'path',
    d: ptsToPath(starPoints(cx, cy, spikes, baseR, baseR * innerRatio, rot, jit)),
    fill: tone,
    opacity: rand(rng, 0.14, 0.24),
  });

  for (let r = 1; r <= rings; r++) {
    const scale = 1 + r * ringGap;
    shapes.push({
      kind: 'path',
      d: ptsToPath(starPoints(cx, cy, spikes, baseR * scale, baseR * innerRatio * scale, rot, jit)),
      fill: 'none',
      stroke: tone,
      strokeWidth: stroke,
      opacity: rand(rng, 0.13, 0.2) * (1 - (r - 1) / (rings + 2)),
    });
  }

  return shapes;
}

// Irregular ink blob: closed cubic-bezier loop with jittered lobe radii.
function blobPath(rng, cx, cy, r, lobes) {
  const pts = [];
  for (let i = 0; i < lobes; i++) {
    const a = (i / lobes) * Math.PI * 2;
    const rr = r * rand(rng, 0.72, 1.2);
    pts.push({ x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr, a });
  }
  let d = `M${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)} `;
  for (let i = 0; i < lobes; i++) {
    const p0 = pts[i];
    const p1 = pts[(i + 1) % lobes];
    const h = r * rand(rng, 0.5, 0.75);
    const c1x = p0.x + Math.cos(p0.a + Math.PI / 2) * h;
    const c1y = p0.y + Math.sin(p0.a + Math.PI / 2) * h;
    const c2x = p1.x - Math.cos(p1.a + Math.PI / 2) * h;
    const c2y = p1.y - Math.sin(p1.a + Math.PI / 2) * h;
    d += `C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} `;
  }
  return d + 'Z';
}

// Simple 5/6-point solid star (small accent flecks).
function solidStar(rng, toneOf) {
  const spikes = Math.floor(rand(rng, 5, 7));
  const cx = rand(rng, 0, VB_W);
  const cy = rand(rng, 0, VB_H);
  const outerR = rand(rng, 5, 14);
  const jit = new Array(spikes * 2).fill(1);
  return {
    kind: 'path',
    d: ptsToPath(starPoints(cx, cy, spikes, outerR, outerR * 0.42, rand(rng, 0, Math.PI * 2), jit)),
    fill: toneOf(cx),
    opacity: rand(rng, 0.12, 0.26),
  };
}

// Non-overlapping anchor points, spread across the canvas on a jittered grid.
function spreadAnchors(rng, n) {
  const cols = n <= 2 ? n : 2;
  const rows = Math.ceil(n / cols);
  const out = [];
  for (let i = 0; i < n; i++) {
    const c = i % cols;
    const r = Math.floor(i / cols);
    out.push({
      x: VB_W * ((c + 0.5) / cols + rand(rng, -0.12, 0.12)),
      y: VB_H * ((r + 0.5) / rows + rand(rng, -0.14, 0.14)),
    });
  }
  return out;
}

function buildShapes(seed, variant) {
  const rng = makeRng(seed * 2654435761 + 12345);
  // Pick a tone that stays legible against whatever sits behind that spot.
  // "split" = red panel left half, black panel right half (About header).
  // "dark"  = black throughout (every other page).
  const toneOf = (x) =>
    variant === 'split' ? (x < VB_W * 0.5 ? BLACK : RED) : pick(rng, [RED, GREY]);
  let shapes = [];

  // Bursts, spaced apart, each toned for the panel it sits on.
  const anchors = spreadAnchors(rng, 3);
  for (const a of anchors) shapes = shapes.concat(concentricStar(rng, a, toneOf(a.x)));

  // Soft ink blobs, well spaced, low contrast.
  for (const a of spreadAnchors(rng, 7)) {
    shapes.push({
      kind: 'path',
      d: blobPath(rng, a.x, a.y, rand(rng, 12, 28), Math.floor(rand(rng, 8, 12))),
      fill: toneOf(a.x),
      opacity: rand(rng, 0.07, 0.14),
    });
  }

  // Small solid stars.
  for (let i = 0; i < 6; i++) shapes.push(solidStar(rng, toneOf));

  // Scattered flecks / dots.
  for (let i = 0; i < 32; i++) {
    const cx = rand(rng, 0, VB_W);
    shapes.push({
      kind: 'circle',
      cx,
      cy: rand(rng, 0, VB_H),
      r: rand(rng, 1, 4.5),
      fill: toneOf(cx),
      opacity: rand(rng, 0.1, 0.3),
    });
  }

  return shapes;
}

export default function SplatterBackground({ className = '', seed = 7, variant = 'dark' }) {
  const shapes = useMemo(() => buildShapes(seed, variant), [seed, variant]);

  return (
    <svg
      className={`splatter-bg ${className}`}
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      {shapes.map((s, i) =>
        s.kind === 'circle' ? (
          <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={s.fill} opacity={s.opacity} />
        ) : (
          <path
            key={i}
            d={s.d}
            fill={s.fill}
            stroke={s.stroke}
            strokeWidth={s.strokeWidth}
            strokeLinejoin="miter"
            opacity={s.opacity}
          />
        )
      )}
    </svg>
  );
}
