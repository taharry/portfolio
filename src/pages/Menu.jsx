import { useCallback, useRef, useState } from 'react';
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

  // "About Me" reads as selected the instant the page loads, with no real
  // focus movement (the user hasn't pressed a key yet). A single index
  // drives the one "selected" look across mouse hover, keyboard focus, and
  // arrow-key navigation, so there's never a flicker or two items active
  // at once — mixing that with live :hover/:focus-visible CSS risked a
  // one-frame moment where both the old and new item looked selected.
  const [activeIndex, setActiveIndex] = useState(0);
  const activeRef = useRef(0);

  const select = useCallback((i) => {
    if (activeRef.current === i) return;
    activeRef.current = i;
    setActiveIndex(i);
    playHover();
  }, [playHover]);

  // Arrow-key roving focus, scoped to this list only — Tab/Shift+Tab still
  // work natively, and nothing here ever runs while a form field has focus
  // (there are none on this page, and the handler is scoped to the nav).
  const onKeyDown = useCallback((e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
    const items = itemRefs.current.filter(Boolean);
    const from = items.indexOf(document.activeElement);
    const fromIndex = from === -1 ? activeRef.current : from;
    e.preventDefault();
    const next = e.key === 'ArrowDown' ? (fromIndex + 1) % items.length : (fromIndex - 1 + items.length) % items.length;
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
                  className={`menu-link${i === activeIndex ? ' is-selected' : ''}`}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.label} (opens in a new tab)`}
                  onMouseEnter={() => select(i)}
                  onFocus={() => select(i)}
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
                  className={`menu-link${i === activeIndex ? ' is-selected' : ''}`}
                  to={item.path}
                  onMouseEnter={() => select(i)}
                  onFocus={() => select(i)}
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
