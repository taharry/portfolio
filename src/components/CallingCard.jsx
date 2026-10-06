import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '../data/site';
import CutoutTitle from './CutoutTitle';
import { dialogOpened, dialogClosed } from '../utils/dialogStack';
import useSfx from '../hooks/useSfx';

const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';
const EGG_KEY = 'persona-portfolio:easter-egg';

/**
 * A small always-present "CARD" tab that opens a Persona-5-calling-card
 * styled dialog: concentric red/black rings fill the whole card as a
 * background, with an original star-seal emblem and a banner headline over
 * them, and a clean cream plate for name/role/intro/actions below. All
 * generated shapes, no game assets. Sits off to the side so it never blocks
 * page content.
 */
export default function CallingCard() {
  const [open, setOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return window.localStorage.getItem(EGG_KEY) === '1';
    } catch {
      return false;
    }
  });
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const lastFocused = useRef(null);
  const { playHover, playConfirm, playBack } = useSfx();

  const close = useCallback(() => {
    playBack();
    setOpen(false);
  }, [playBack]);

  useEffect(() => {
    const onUnlock = () => setUnlocked(true);
    window.addEventListener('easter-egg-unlocked', onUnlock);
    return () => window.removeEventListener('easter-egg-unlocked', onUnlock);
  }, []);

  useEffect(() => {
    if (!open) return;
    dialogOpened();
    lastFocused.current = document.activeElement;
    const dialog = dialogRef.current;
    const focusables = dialog ? Array.from(dialog.querySelectorAll(FOCUSABLE)) : [];
    (focusables[0] || dialog)?.focus();

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === 'Tab' && focusables.length) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => {
      dialogClosed();
      window.removeEventListener('keydown', onKeyDown);
      lastFocused.current?.focus?.();
    };
  }, [open, close]);

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        className="card-tab"
        onMouseEnter={playHover}
        onFocus={playHover}
        onClick={() => {
          playConfirm();
          setOpen((v) => !v);
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="calling-card-dialog"
      >
        <span aria-hidden="true">&#9733;</span> Card
      </button>

      {open && (
        <div className="card-backdrop" onClick={close}>
          <div
            id="calling-card-dialog"
            className={`calling-card${unlocked ? ' calling-card--unlocked' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="calling-card-name"
            ref={dialogRef}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="calling-card-close"
              onClick={close}
              data-sfx="back"
              aria-label="Close calling card"
            >
              &times;
            </button>

            <div className="calling-card-art">
              <span className="calling-card-emblem" aria-hidden="true"></span>
              <span className="calling-card-banner" aria-hidden="true">Noticed</span>
            </div>

            <div className="calling-card-plate">
              <span className="calling-card-eyebrow">// Codename: Full-Stack</span>
              <CutoutTitle text={SITE.name} className="cutout-title--sm" as="h2" id="calling-card-name" />
              <p className="calling-card-role">{SITE.role}</p>
              <p className="calling-card-location">{SITE.location}</p>
              <p className="calling-card-intro">{SITE.intro}</p>
              <p className="calling-card-status">
                Open to Summer 2027 internships and full-time software engineering / data roles.
              </p>

              <div className="calling-card-actions">
                <Link
                  className="cut-btn case-btn--sm"
                  to="/contact"
                  onMouseEnter={playHover}
                  onFocus={playHover}
                  onClick={() => {
                    playConfirm();
                    setOpen(false);
                  }}
                >
                  Contact &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
