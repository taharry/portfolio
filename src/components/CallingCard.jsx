import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { SITE } from '../data/site';
import CutoutTitle from './CutoutTitle';
import { dialogOpened, dialogClosed } from '../utils/dialogStack';
import { isEditableTarget } from '../utils/dom';
import useSfx from '../hooks/useSfx';

const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';
const SEQUENCE = 'dev';

/**
 * A hidden Persona-5-styled calling card. There's no visible button for
 * it — type "dev" anywhere outside a form field and it appears. The only
 * clue on screen is a small riddle, never the card itself.
 */
export default function CallingCard() {
  const [open, setOpen] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const dialogRef = useRef(null);
  const lastFocused = useRef(null);
  const bufferRef = useRef('');
  const hintButtonRef = useRef(null);
  const hintPopoverRef = useRef(null);
  const { playHover, playConfirm, playBack } = useSfx();

  const close = useCallback(() => {
    playBack();
    setOpen(false);
  }, [playBack]);

  useEffect(() => {
    function onKeyDown(e) {
      if (isEditableTarget(e.target) || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key.length !== 1) return;
      bufferRef.current = (bufferRef.current + e.key.toLowerCase()).slice(-SEQUENCE.length);
      if (bufferRef.current === SEQUENCE) {
        bufferRef.current = '';
        playConfirm();
        setOpen(true);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [playConfirm]);

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

  // The hint popover is a lightweight disclosure, not a modal — no focus
  // trap, since there's nothing focusable inside it to trap. It still
  // registers on the shared dialog stack so a stray Escape closes the
  // popover instead of also navigating to the hub menu underneath it.
  useEffect(() => {
    if (!hintOpen) return;
    dialogOpened();
    function onPointerDown(e) {
      if (hintPopoverRef.current?.contains(e.target) || hintButtonRef.current?.contains(e.target)) return;
      setHintOpen(false);
    }
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        setHintOpen(false);
      }
    }
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      dialogClosed();
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [hintOpen]);

  return (
    <>
      <div className="hint-widget">
        <button
          type="button"
          ref={hintButtonRef}
          className="hint-tab"
          aria-expanded={hintOpen}
          aria-controls="hint-popover"
          onMouseEnter={playHover}
          onFocus={playHover}
          onClick={() => {
            if (hintOpen) playBack();
            else playConfirm();
            setHintOpen((v) => !v);
          }}
        >
          <span className="hint-tab-mark" aria-hidden="true">&#9733;</span>
          <span className="hint-tab-label">Hint</span>
        </button>

        {hintOpen && (
          <div id="hint-popover" role="note" ref={hintPopoverRef} className="hint-popover">
            <span className="pin-mark hint-popover-pin" aria-hidden="true"></span>
            <span className="hint-popover-eyebrow">// Overheard</span>
            <p className="hint-popover-body">
              There's a card for those who know the three-letter word for people who build sites like this one.
            </p>
          </div>
        )}
      </div>

      {open && (
        <div className="card-backdrop" onClick={close}>
          <div
            id="calling-card-dialog"
            className="calling-card"
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
