import { useCallback, useEffect, useRef, useState } from 'react';
import useSfx from '../hooks/useSfx';

const SKILLS = [
  { title: 'Languages', sub: 'Python / SQL / Java / TypeScript / C++', rank: 4, fill: 82 },
  { title: 'Frontend', sub: 'React / TypeScript / HTML & CSS', rank: 3, fill: 68 },
  { title: 'Backend & APIs', sub: 'Node.js / Express / FastAPI / Spring Boot', rank: 4, fill: 78 },
  { title: 'Data & Analytics', sub: 'Pandas / NumPy / scikit-learn / Power BI', rank: 4, fill: 80 },
  { title: 'Databases & ETL', sub: 'MySQL / PostgreSQL / MongoDB / Data Pipelines', rank: 4, fill: 80 },
  { title: 'AI & Automation', sub: 'LLM Workflows / NLP / n8n / Prompt Engineering', rank: 3, fill: 66 },
  { title: 'Tools & Cloud', sub: 'Git / GitHub Actions / Docker / AWS', rank: 3, fill: 64 },
];

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

export default function SkillList() {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const prevRef = useRef(0);
  const rowRefs = useRef([]);
  const listRef = useRef(null);
  const hoverRef = useRef(false);
  const firstRun = useRef(true);
  const { playHover } = useSfx();

  // Wraps past either end, so up/down cycle the menu around.
  const move = useCallback((next) => {
    const n = ((next % SKILLS.length) + SKILLS.length) % SKILLS.length;
    activeRef.current = n;
    setActive(n);
  }, []);

  useEffect(() => {
    const el = rowRefs.current[active];
    const wrapped = Math.abs(active - prevRef.current) > 1;
    if (el) {
      el.scrollIntoView({
        block: 'nearest',
        behavior: firstRun.current || wrapped ? 'auto' : 'smooth',
      });
    }
    if (!firstRun.current) playHover();
    firstRun.current = false;
    prevRef.current = active;
  }, [active, playHover]);

  // Arrow keys work while the list is hovered or focused (no click needed).
  useEffect(() => {
    function onKey(e) {
      const engaged = hoverRef.current || listRef.current?.contains(document.activeElement);
      if (!engaged) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        move(activeRef.current + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        move(activeRef.current - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        move(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        move(SKILLS.length - 1);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [move]);

  return (
    <div
      className="rank-shell"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      <div className="rank-heading"><span>Skillset</span></div>
      <ul
        className="rank-list"
        role="listbox"
        aria-label="Skill areas"
        aria-activedescendant={`skill-${active}`}
        tabIndex={0}
        ref={listRef}
      >
        {SKILLS.map((s, i) => (
          <li
            key={s.title}
            id={`skill-${i}`}
            ref={(el) => (rowRefs.current[i] = el)}
            role="option"
            aria-selected={i === active}
            className={`rank-row${i === active ? ' is-active' : ''}`}
            onMouseEnter={() => move(i)}
            onClick={() => move(i)}
          >
            <span className="rank-cursor" aria-hidden="true" />
            <span className="rank-arcana" aria-hidden="true">{ROMAN[i]}</span>
            <div className="rank-title-group">
              <div className="rank-title">{s.title}</div>
              <div className="rank-sub">{s.sub}</div>
            </div>
            <div className="rank-badge">
              <span className="rank-badge-label">RANK</span>
              <span className="rank-badge-value">{s.rank >= 4 ? 'MAX' : s.rank}</span>
            </div>
            <div className="rank-bar-track">
              <div className="rank-bar-fill" style={{ width: `${s.fill}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
