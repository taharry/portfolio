import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MuteToggle from '../components/MuteToggle';
import SplatterBackground from '../components/SplatterBackground';
import JitterText from '../components/JitterText';
import useSfx from '../hooks/useSfx';

const ITEMS = [
  { index: '01', label: 'About Me', desc: 'Background & skills', path: '/about', external: false },
  { index: '02', label: 'Projects', desc: 'Selected work', path: '/projects', external: false },
  { index: '03', label: 'Education', desc: 'Degrees & coursework', path: '/education', external: false },
  { index: '04', label: 'Contact', desc: 'Get in touch', path: '/contact', external: false },
  { index: '05', label: 'GitHub', desc: null, path: 'https://github.com/taharry', external: true },
  { index: '06', label: 'LinkedIn', desc: null, path: 'https://linkedin.com/in/tazrian-ahsan', external: true },
];

export default function Menu() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0);
  const navigate = useNavigate();
  const { playHover, playConfirm, muted, toggleMuted } = useSfx();

  const activate = useCallback((item) => {
    playConfirm();
    if (item.external) {
      window.open(item.path, '_blank', 'noopener,noreferrer');
    } else {
      navigate(item.path);
    }
  }, [navigate, playConfirm]);

  const focusIndex = useCallback((i) => {
    if (activeRef.current === i) return;
    activeRef.current = i;
    setActiveIndex(i);
    playHover();
  }, [playHover]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        focusIndex((activeIndex + 1) % ITEMS.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        focusIndex((activeIndex - 1 + ITEMS.length) % ITEMS.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        activate(ITEMS[activeIndex]);
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, activate, focusIndex]);

  return (
    <div className="menu-page halftone">
      <SplatterBackground className="splatter-bg--menu" seed={42} />
      <div className="menu-header">
        <div className="menu-eyebrow">// Select a section</div>
        <div className="menu-name-wrap">
          <span className="menu-slash-bar" aria-hidden="true"></span>
          <h1 className="menu-name display">Tazrian Ahsan</h1>
        </div>
        <p className="menu-role">Full-Stack Developer &middot; AI &amp; Data Engineering</p>
      </div>

      <nav aria-label="Main sections">
        <ul className="menu-list">
          {ITEMS.map((item, i) => (
            <li
              key={item.label}
              className={`menu-item${i === activeIndex ? ' is-active' : ''}`}
            >
              {item.external ? (
                <a
                  className={`menu-link${i === activeIndex ? ' is-active' : ''}`}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.label} (opens in a new tab)`}
                  onMouseEnter={() => focusIndex(i)}
                  onFocus={() => focusIndex(i)}
                  onClick={playConfirm}
                >
                  <span className="menu-index">{item.index}</span>
                  <span className="menu-label display"><JitterText text={item.label} /></span>
                  <span className="menu-external-tag">&#8599; external</span>
                </a>
              ) : (
                <button
                  className={`menu-link${i === activeIndex ? ' is-active' : ''}`}
                  onClick={() => activate(item)}
                  onMouseEnter={() => focusIndex(i)}
                  onFocus={() => focusIndex(i)}
                  aria-label={`${item.label}${item.desc ? `, ${item.desc}` : ''}`}
                >
                  <span className="menu-index">{item.index}</span>
                  <span className="menu-label display"><JitterText text={item.label} /></span>
                  <span className="menu-desc">{item.desc}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <p className="menu-footer">© 2026 Tazrian Ahsan</p>
      <MuteToggle muted={muted} onToggle={toggleMuted} />
    </div>
  );
}
