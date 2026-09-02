import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Synthesized UI sound effects via the Web Audio API (no audio files).
 *
 * Exposes:
 *   playHover()   soft, short "blip" for moving between menu items
 *   playConfirm() sharper two-note "confirm" for select / navigate
 *   muted, setMuted, toggleMuted: mute state, respected by both play fns
 */

const STORAGE_KEY = 'persona-portfolio:sfx-muted';

let sharedCtx = null;

function getCtx() {
  if (typeof window === 'undefined') return null;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  if (!sharedCtx) sharedCtx = new AC();
  return sharedCtx;
}

function readStoredMuted() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
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

  const play = useCallback((voices) => {
    if (mutedRef.current) return;
    const ctx = getCtx();
    if (!ctx) return;
    // Browsers start the context suspended until a user gesture.
    if (ctx.state === 'suspended') ctx.resume();
    voices.forEach((v) => blip(ctx, v));
  }, []);

  const playHover = useCallback(() => {
    play([{ type: 'sine', from: 660, to: 900, duration: 0.06, peak: 0.035 }]);
  }, [play]);

  const playConfirm = useCallback(() => {
    play([
      { type: 'triangle', from: 520, to: 660, duration: 0.09, peak: 0.06 },
      { type: 'square', from: 780, to: 1180, duration: 0.14, peak: 0.03, delay: 0.05 },
    ]);
  }, [play]);

  const toggleMuted = useCallback(() => setMuted((m) => !m), []);

  return { playHover, playConfirm, muted, setMuted, toggleMuted };
}
