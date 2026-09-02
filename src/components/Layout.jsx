import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import HintBar from './HintBar';
import MuteToggle from './MuteToggle';
import SplatterBackground from './SplatterBackground';
import useSfx from '../hooks/useSfx';

// Stable-ish seed per route so each page's splatter layout differs but is consistent.
function seedFromPath(path) {
  let h = 0;
  for (let i = 0; i < path.length; i++) h = (h * 31 + path.charCodeAt(i)) | 0;
  return Math.abs(h) % 997 + 1;
}

export default function Layout({ crumb, children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { playHover, playConfirm, muted, toggleMuted } = useSfx();

  // click sfx is handled by the delegated listener below
  const goMenu = () => navigate('/');

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        playConfirm();
        navigate('/');
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navigate, playConfirm]);

  // Site-wide UI sfx: soft blip when the pointer enters a link/button,
  // sharper confirm when one is clicked.
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
      if (e.target.closest?.('a, button')) playConfirm();
    }
    document.addEventListener('mouseover', onOver);
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('click', onClick);
    };
  }, [playHover, playConfirm]);

  return (
    <>
      <div className="bg-splatter" aria-hidden="true">
        <SplatterBackground seed={seedFromPath(location.pathname)} />
      </div>

      <div className="topbar">
        <button className="topbar-back" onClick={goMenu}>
          <span className="bar" aria-hidden="true"></span>
          Menu
        </button>
        <span className="topbar-crumb">MENU / <span>{crumb}</span></span>
      </div>

      {children}

      <footer className="site-footer">
        <span>© 2026 Tazrian Ahsan</span>
        <button
          className="topbar-back"
          style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', cursor: 'pointer' }}
          onClick={goMenu}
        >
          Back to menu
        </button>
      </footer>
      <MuteToggle muted={muted} onToggle={toggleMuted} />
      <HintBar showBack={true} />
    </>
  );
}
