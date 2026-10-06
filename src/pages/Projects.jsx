import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import CutoutTitle from '../components/CutoutTitle';
import SplatterBackground from '../components/SplatterBackground';
import ProjectEmblem from '../components/ProjectEmblem';
import { PROJECTS } from '../data/projects';

const REPOS = [
  { title: 'portfolio', lang: 'Javascript', desc: 'This site: a Persona 5-inspired developer portfolio built with React, React Router, and Framer Motion.', stars: 0, href: 'https://github.com/taharry/portfolio' },
  { title: 'WellCo', lang: 'REACT', desc: 'AI wellness chatbot: React + Firebase + Gemini API with sentiment analysis and real-time sync.', stars: 0, href: 'https://github.com/taharry/WellCo' },
  { title: 'BeastMode', lang: 'DART', desc: 'Flutter/Dart mobile app project.', stars: 0, href: 'https://github.com/taharry/BeastMode' },
];

export default function Projects() {
  return (
    <Layout crumb="PROJECTS">
      <header className="page-header page-header--split page-header--compact halftone">
        <SplatterBackground className="splatter-bg--header" seed={12} variant="split" />
        <div className="page-eyebrow">// 02</div>
        <div className="page-title-wrap">
          <CutoutTitle text="Projects" />
        </div>
        <p className="page-sub">A few things I've built. Open a case file for the full write-up.</p>
      </header>

      <section className="projects-section">
        <div className="projects-subhead">
          <span className="section-tab"><span>Featured</span></span>
        </div>

        <div className="featured-stack">
          {PROJECTS.map((p, i) => (
            <article className={`case-card motif-${p.motif}${i % 2 ? ' case-card--flip' : ''}`} key={p.slug}>
              <div className="case-card-visual">
                <span className="case-card-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <ProjectEmblem motif={p.motif} className="project-emblem--lg" />
              </div>
              <div className="case-card-info">
                <span className="case-badge">{p.badge}</span>
                <h3 className="case-title">
                  <Link to={`/projects/${p.slug}`}>{p.title}</Link>
                </h3>
                <span className="case-rule" aria-hidden="true"></span>
                <p className="case-desc">{p.summary}</p>
                <ul className="case-tags">
                  {p.stack.slice(0, 4).map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className="case-card-actions">
                  <Link className="case-btn" to={`/projects/${p.slug}`}>Open File &rarr;</Link>
                  <a className="case-btn case-btn--ghost" href={p.href}>Source Code &#8599;</a>
                  {p.demo && (
                    <a className="case-btn case-btn--ghost" href={p.demo}>Live Demo &#8599;</a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="projects-subhead">
          <span className="section-tab"><span>All Repositories</span></span>
        </div>

        <div className="repo-grid">
          {REPOS.map((r) => (
            <article className="repo-card" key={r.title}>
              <span className="repo-lang-tag">{r.lang}</span>
              <h4 className="repo-card-title">{r.title}</h4>
              <p className="repo-card-desc">{r.desc}</p>
              <div className="repo-card-foot">
                {r.stars > 0 && <span className="repo-stars">&#9733; {r.stars}</span>}
                <a className="case-btn case-btn--sm" href={r.href}>Source Code &rarr;</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
