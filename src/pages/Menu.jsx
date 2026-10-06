import { useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import MuteToggle from '../components/MuteToggle';
import SplatterBackground from '../components/SplatterBackground';
import JitterText from '../components/JitterText';
import CallingCard from '../components/CallingCard';
import useSfx from '../hooks/useSfx';
import { SITE } from '../data/site';

const ITEMS = [
  { index: '01', label: 'About Me', desc: 'Background & skills', path: '/about', external: false },
  { index: '02', label: 'Projects', desc: 'Selected work', path: '/projects', external: false },
  { index: '03', label: 'Experience', desc: 'Internships & roles', path: '/experience', external: false },
  { index: '04', label: 'Education', desc: 'Degrees & coursework', path: '/education', external: false },
  { index: '05', label: 'Contact', desc: 'Get in touch', path: '/contact', external: false },
  { index: '06', label: 'GitHub', desc: null, path: SITE.github, external: true },
  { index: '07', label: 'LinkedIn', desc: null, path: SITE.linkedin, external: true },
];

export default function Menu() {
  const { playHover, playConfirm, muted, toggleMuted } = useSfx();
  const itemRefs = useRef([]);

  const onHover = useCallback(() => playHover(), [playHover]);

  // Arrow-key roving focus, scoped to this list only — Tab/Shift+Tab still
  // work natively, and nothing here ever runs while a form field has focus
  // (there are none on this page, and the handler is scoped to the nav).
  const onKeyDown = useCallback((e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    const items = itemRefs.current.filter(Boolean);
    const from = items.indexOf(document.activeElement);
    if (from === -1) return;
    e.preventDefault();
    const next = e.key === 'ArrowDown' ? (from + 1) % items.length : (from - 1 + items.length) % items.length;
    items[next].focus();
  }, []);

  return (
    <main className="menu-page halftone" id="main-content">
      <SplatterBackground className="splatter-bg--menu" seed={42} />
      <div className="menu-header">
        <div className="menu-eyebrow">// Select a section</div>
        <div className="menu-name-wrap">
          <span className="menu-slash-bar" aria-hidden="true"></span>
          <h1 className="menu-name display">{SITE.name}</h1>
        </div>
        <p className="menu-role">{SITE.role}</p>
      </div>

      <nav aria-label="Main sections">
        <ul className="menu-list" onKeyDown={onKeyDown}>
          {ITEMS.map((item, i) => (
            <li key={item.label} className="menu-item">
              {item.external ? (
                <a
                  ref={(el) => (itemRefs.current[i] = el)}
                  className="menu-link"
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.label} (opens in a new tab)`}
                  onMouseEnter={onHover}
                  onFocus={onHover}
                  onClick={playConfirm}
                >
                  <span className="menu-link-accent" aria-hidden="true"></span>
                  <span className="menu-index">{item.index}</span>
                  <span className="menu-label display"><JitterText text={item.label} /></span>
                  <span className="menu-external-tag">&#8599; external</span>
                </a>
              ) : (
                <Link
                  ref={(el) => (itemRefs.current[i] = el)}
                  className="menu-link"
                  to={item.path}
                  onMouseEnter={onHover}
                  onFocus={onHover}
                  onClick={playConfirm}
                  aria-label={`${item.label}${item.desc ? `, ${item.desc}` : ''}`}
                >
                  <span className="menu-link-accent" aria-hidden="true"></span>
                  <span className="menu-index">{item.index}</span>
                  <span className="menu-label display"><JitterText text={item.label} /></span>
                  <span className="menu-desc">{item.desc}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <p className="menu-footer">© 2026 {SITE.name}</p>
      <CallingCard />
      <MuteToggle muted={muted} onToggle={toggleMuted} />
    </main>
  );
}
