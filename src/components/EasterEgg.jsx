import { useEffect, useRef, useState } from 'react';
import { isEditableTarget } from '../utils/dom';
import { dialogOpened, dialogClosed } from '../utils/dialogStack';
import useSfx from '../hooks/useSfx';

const SEQUENCE = 'joker';
const STORAGE_KEY = 'persona-portfolio:easter-egg';

/**
 * Type "joker" anywhere outside a form field for a brief calling-card
 * flourish, and to permanently unlock an alternate look for the Calling
 * Card dialog. Entirely optional — nothing essential lives behind it.
 */
export default function EasterEgg() {
  const [show, setShow] = useState(false);
  const bufferRef = useRef('');
  const { playConfirm } = useSfx();

  useEffect(() => {
    function onKeyDown(e) {
      if (isEditableTarget(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.length !== 1) return;
      bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(-SEQUENCE.length);
      if (bufferRef.current === SEQUENCE) {
        bufferRef.current = '';
        try {
          window.localStorage.setItem(STORAGE_KEY, '1');
        } catch {
          /* storage unavailable; the flourish still plays this session */
        }
        window.dispatchEvent(new CustomEvent('easter-egg-unlocked'));
        playConfirm();
        setShow(true);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [playConfirm]);

  useEffect(() => {
    if (!show) return;
    dialogOpened();
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = setTimeout(() => setShow(false), reduceMotion ? 1800 : 1400);
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        setShow(false);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => {
      dialogClosed();
      clearTimeout(timer);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className="egg-flourish" role="status" aria-live="polite" onClick={() => setShow(false)}>
      <div className="egg-flourish-card">
        <span className="egg-flourish-star" aria-hidden="true">&#9733;</span>
        <p className="egg-flourish-text">Calling Card Unlocked</p>
        <p className="egg-flourish-sub">Type &quot;joker&quot; anytime to replay.</p>
      </div>
    </div>
  );
}
