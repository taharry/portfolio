import Layout from '../components/Layout';
import CutoutTitle from '../components/CutoutTitle';
import SplatterBackground from '../components/SplatterBackground';

const FEATURED = [
  {
    badge: 'FULL-STACK / AI',
    title: 'LingoQuest: AI Language Learning Platform',
    desc: 'Scalable full-stack platform (React, Spring Boot, FastAPI, MySQL) with JWT auth and REST APIs. LLM, NLP, and speech services power conversational tutoring and pronunciation analysis, with adaptive backend logic that tunes difficulty and tracks learner performance.',
    status: 'React · Spring Boot · FastAPI · MySQL',
    href: 'https://github.com/taharry',
  },
  {
    badge: 'AI CHATBOT',
    title: 'WellCo: AI Wellness Chatbot',
    desc: 'AI-powered web app (React, Firebase, Gemini API, NLP) that generates personalized wellness recommendations from user input. Firebase Auth and real-time sync handle secure sessions; a sentiment-analysis workflow reaches ~75% mood-classification accuracy.',
    status: 'React · Firebase · Gemini API · NLP',
    href: 'https://github.com/taharry/WellCo',
  },
];

const REPOS = [
  { title: 'portfolio', lang: 'Javascript', desc: 'This site: a Persona 5-inspired developer portfolio built with React, React Router, and Framer Motion.', stars: 0, href: 'https://github.com/taharry/portfolio' },
  { title: 'BeastMode', lang: 'DART', desc: 'Flutter/Dart mobile app project.', stars: 0, href: 'https://github.com/taharry/BeastMode' },
];

export default function Projects() {
  return (
    <Layout crumb="PROJECTS">
      <header className="page-header page-header--split halftone">
        <SplatterBackground className="splatter-bg--header" seed={12} variant="split" />
        <div className="page-eyebrow">// 02</div>
        <div className="page-title-wrap">
          <CutoutTitle text="Projects" />
        </div>
        <p className="page-sub">A few things I've built. More case files added as they ship.</p>
      </header>

      <section className="projects-section">
        <div className="projects-subhead">
          <span className="section-tab"><span>Featured</span></span>
        </div>

        <div className="featured-grid">
          {FEATURED.map((p) => (
            <article className="case-card" key={p.title}>
              <span className="case-burst" aria-hidden="true"></span>
              <div className="case-card-head">
                <span className="case-badge">{p.badge}</span>
                <h3 className="case-title">{p.title}</h3>
              </div>
              <div className="case-card-body">
                <span className="case-rule" aria-hidden="true"></span>
                <p className="case-desc">{p.desc}</p>
                <ul className="case-tags">
                  {p.status.split(' · ').map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <a className="case-btn" href={p.href}>View on GitHub &rarr;</a>
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
                <span className="repo-stars">&#9733; {r.stars}</span>
                <a className="case-btn case-btn--sm" href={r.href}>View on GitHub &rarr;</a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
