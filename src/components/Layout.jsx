import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import MuteToggle from './MuteToggle';
import SplatterBackground from './SplatterBackground';
import CallingCard from './CallingCard';
import useSfx from '../hooks/useSfx';
import { isEditableTarget } from '../utils/dom';
import { isDialogOpen } from '../utils/dialogStack';

// Stable-ish seed per route so each page's splatter layout differs but is consistent.
function seedFromPath(path) {
  let h = 0;
  for (let i = 0; i < path.length; i++) h = (h * 31 + path.charCodeAt(i)) | 0;
  return Math.abs(h) % 997 + 1;
}

export default function Layout({ crumb, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { playHover, playConfirm, playBack, muted, toggleMuted } = useSfx();

  // click sfx is handled by the delegated listener below
  const goMenu = () => navigate('/');

  useEffect(() => {
    function onKeyDown(e) {
      // Never hijack Escape while the visitor is typing, and let an open
      // dialog (the hidden CallingCard, a project preview lightbox) close
      // on Escape instead of also navigating away underneath it.
      if (e.key === 'Escape' && !isEditableTarget(e.target) && !isDialogOpen()) {
        playBack();
        navigate('/');
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navigate, playBack]);

  // Site-wide UI sfx: soft blip when the pointer enters a link/button, a
  // falling tone for anything marked as a "back" action, a rising confirm
  // tone for every other activation.
  useEffect(() => {
    let last = null;
    function onOver(e) {
      const el = e.target.closest?.('a, button');
      if (el && el !== last) {
        last = el;
        playHover();
      } else if (!el) {
        last = null;
      }
    }
    function onClick(e) {
      const el = e.target.closest?.('a, button');
      if (!el) return;
      if (el.dataset.sfx === 'back') playBack();
      else playConfirm();
    }
    document.addEventListener('mouseover', onOver);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('click', onClick);
    };
  }, [playHover, playConfirm, playBack]);

  return (
    <>
      <div className="bg-splatter" aria-hidden="true">
        <SplatterBackground seed={seedFromPath(location.pathname)} />
      </div>

      <div className="topbar">
        <button className="topbar-back" onClick={goMenu} data-sfx="back">
          <span className="bar" aria-hidden="true"></span>
          Back
        </button>
        <span className="topbar-crumb">MENU / <span>{crumb}</span></span>
      </div>

      <main id="main-content">{children}</main>

      <footer className="site-footer">
        {location.pathname !== '/contact' && (
          <Link className="footer-contact" to="/contact">Contact me &rarr;</Link>
        )}
        <span>© 2026 Tazrian Ahsan</span>
      </footer>

      <CallingCard />
      <MuteToggle muted={muted} onToggle={toggleMuted} />
    </>
  );
}
