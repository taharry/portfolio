import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Synthesized UI sound effects via the Web Audio API (no audio files).
 *
 * Exposes:
 *   playHover()   soft, short "blip" for moving between menu items
 *   playConfirm() sharper two-note rising tone for select / activate
 *   playBack()    a short falling tone, distinct from confirm, for back/close
 *   muted, setMuted, toggleMuted: mute state, respected by all three
 *
 * Off by default for first-time visitors; once a visitor has touched the
 * mute toggle, their choice is remembered and always respected.
 */

const STORAGE_KEY = 'persona-portfolio:sfx-muted';
const MIN_REPEAT_GAP = 0.045; // seconds — guards against the same cue overlapping itself

let sharedCtx = null;
const lastPlayedAt = { hover: -Infinity, confirm: -Infinity, back: -Infinity };

function getCtx() {
  if (typeof window === 'undefined') return null;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!sharedCtx) sharedCtx = new AC();
  return sharedCtx;
}

function readStoredMuted() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === null ? true : stored === '1';
  } catch {
    return true;
  }
}

/**
 * One oscillator + gain envelope. Times are in seconds, gain is linear peak.
 */
function blip(ctx, { type, from, to, duration, peak, delay = 0 }) {
  const start = ctx.currentTime + delay;
  const end = start + duration;

  const osc = ctx.createOscillator();
  const amp = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(from, start);
  osc.frequency.exponentialRampToValueAtTime(Math.max(1, to), end);

  amp.gain.setValueAtTime(0.0001, start);
  amp.gain.exponentialRampToValueAtTime(peak, start + 0.006);
  amp.gain.exponentialRampToValueAtTime(0.0001, end);

  osc.connect(amp).connect(ctx.destination);
  osc.start(start);
  osc.stop(end + 0.02);
}

export default function useSfx() {
  const [muted, setMuted] = useState(readStoredMuted);
  const mutedRef = useRef(muted);

  useEffect(() => {
    mutedRef.current = muted;
    try {
      window.localStorage.setItem(STORAGE_KEY, muted ? '1' : '0');
    } catch {
      /* storage unavailable; in-memory state still works */
    }
  }, [muted]);

  const play = useCallback((kind, voices) => {
    if (mutedRef.current) return;
    const ctx = getCtx();
    if (!ctx) return;
    // Browsers start the context suspended until a user gesture.
    if (ctx.state === 'suspended') ctx.resume();
    // Skip if the same cue just fired — stops rapid repeats (e.g. fast
    // hover across several menu items) from piling up into a mush of tone.
    if (ctx.currentTime - lastPlayedAt[kind] < MIN_REPEAT_GAP) return;
    lastPlayedAt[kind] = ctx.currentTime;
    voices.forEach((v) => blip(ctx, v));
  }, []);

  const playHover = useCallback(() => {
    play('hover', [{ type: 'sine', from: 660, to: 900, duration: 0.06, peak: 0.035 }]);
  }, [play]);

  const playConfirm = useCallback(() => {
    play('confirm', [
      { type: 'triangle', from: 520, to: 660, duration: 0.09, peak: 0.06 },
      { type: 'square', from: 780, to: 1180, duration: 0.14, peak: 0.03, delay: 0.05 },
    ]);
  }, [play]);

  const playBack = useCallback(() => {
    play('back', [
      { type: 'triangle', from: 680, to: 480, duration: 0.09, peak: 0.05 },
      { type: 'sine', from: 420, to: 280, duration: 0.1, peak: 0.03, delay: 0.04 },
    ]);
  }, [play]);

  const toggleMuted = useCallback(() => setMuted((m) => !m), []);

  return { playHover, playConfirm, playBack, muted, setMuted, toggleMuted };
}
