import { useEffect, useRef, useState } from 'react';
import { dialogOpened, dialogClosed } from '../utils/dialogStack';
import useSfx from '../hooks/useSfx';

const FOCUSABLE = 'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])';

/**
 * Project preview area. If `project.screenshot` is set, shows the real
 * screenshot framed as layered dossier evidence (corner tab + tape),
 * reserves its aspect ratio to avoid layout shift, and opens an accessible
 * enlarged lightbox on click (focus-trapped, Escape-to-close, restores
 * focus). With no screenshot configured, shows an honest placeholder —
 * never a fabricated image. Visible directly on mobile either way.
 */
export default function ProjectPreview({ project }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const triggerRef = useRef(null);
  const lastFocused = useRef(null);
  const { playConfirm, playBack } = useSfx();

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
        playBack();
        setOpen(false);
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
  }, [open, playBack]);

  if (!project.screenshot) {
    return (
      <div className="project-doc-preview">
        <span className="project-doc-preview-label">Preview</span>
        {project.emblemNode}
        <p className="project-doc-preview-note">Screenshot coming soon. This file is still in the field.</p>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        ref={triggerRef}
        className="project-shot"
        onClick={() => {
          playConfirm();
          setOpen(true);
        }}
        aria-label={`Enlarge screenshot of ${project.title}`}
      >
        <span className="project-shot-tab" aria-hidden="true">Exhibit A</span>
        <span className="project-shot-pin" aria-hidden="true"></span>
        <img
          src={project.screenshot}
          alt={`${project.title} screenshot`}
          width="640"
          height="400"
          loading="lazy"
        />
        <span className="project-shot-hint" aria-hidden="true">Click to enlarge</span>
      </button>

      {open && (
        <div className="card-backdrop" onClick={() => setOpen(false)}>
          <div
            className="project-shot-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} screenshot, enlarged`}
            ref={dialogRef}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="calling-card-close"
              data-sfx="back"
              onClick={() => setOpen(false)}
              aria-label="Close enlarged screenshot"
            >
              &times;
            </button>
            <img src={project.screenshot} alt={`${project.title} screenshot, enlarged`} />
          </div>
        </div>
      )}
    </>
  );
}
