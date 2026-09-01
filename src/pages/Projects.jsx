import Layout from '../components/Layout';
import CutoutTitle from '../components/CutoutTitle';

const FEATURED = [
  {
    badge: 'FULL-STACK / AI',
    title: 'LingoQuest — AI Language Learning Platform',
    desc: 'Scalable full-stack platform (React, Spring Boot, FastAPI, MySQL) with JWT auth and REST APIs. LLM, NLP, and speech services power conversational tutoring and pronunciation analysis, with adaptive backend logic that tunes difficulty and tracks learner performance.',
    status: 'React · Spring Boot · FastAPI · MySQL',
    href: 'https://github.com/taharry',
  },
  {
    badge: 'AI CHATBOT',
    title: 'WellCo — AI Wellness Chatbot',
    desc: 'AI-powered web app (React, Firebase, Gemini API, NLP) that generates personalized wellness recommendations from user input. Firebase Auth and real-time sync handle secure sessions; a sentiment-analysis workflow reaches ~75% mood-classification accuracy.',
    status: 'React · Firebase · Gemini API · NLP',
    href: 'https://github.com/taharry/WellCo',
  },
];

const REPOS = [
  { title: 'portfolio', lang: 'CSS', desc: 'This site — a Persona 5-inspired developer portfolio built with React, React Router, and Framer Motion.', stars: 0, href: 'https://github.com/taharry/portfolio' },
  { title: 'WellCo', lang: 'REACT', desc: 'AI wellness chatbot: React + Firebase + Gemini API with sentiment analysis and real-time sync.', stars: 0, href: 'https://github.com/taharry/WellCo' },
  { title: 'BeastMode', lang: 'DART', desc: 'Flutter/Dart mobile app project.', stars: 0, href: 'https://github.com/taharry/BeastMode' },
];

export default function Projects() {
  return (
    <Layout crumb="PROJECTS">
      <header className="page-header page-header-bg halftone">
        <div className="page-eyebrow">// 02</div>
        <div className="page-title-wrap">
          <CutoutTitle text="Projects" />
        </div>
        <p className="page-sub">A few things I've built. More case files added as they ship.</p>
      </header>

      <section>
        <div className="projects-subhead">
          <span className="projects-subhead-bar"></span>
          <span className="projects-subhead-label display">Featured</span>
        </div>

        <div className="featured-grid">
          {FEATURED.map((p) => (
            <div className="featured-card" key={p.title}>
              <span className="featured-card-badge">{p.badge}</span>
              <div className="featured-card-title">{p.title}</div>
              <p className="featured-card-desc">{p.desc}</p>
              <div className="featured-card-foot">
                <span className="featured-card-status">{p.status}</span>
                <a className="gh-btn" href={p.href}>View on GitHub &rarr;</a>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-subhead">
          <span className="projects-subhead-bar"></span>
          <span className="projects-subhead-label display">All Repositories</span>
          <span className="projects-subhead-count">{REPOS.length} repositories &middot; github.com/taharry</span>
        </div>

        <div className="repo-grid">
          {REPOS.map((r) => (
            <div className="repo-card" key={r.title}>
              <div className="repo-card-top">
                <span className="repo-card-title">{r.title}</span>
                <span className="repo-lang-tag">{r.lang}</span>
              </div>
              <p className="repo-card-desc">{r.desc}</p>
              <div className="repo-card-foot">
                <span className="repo-stars">&#9733; {r.stars}</span>
                <a className="gh-btn" href={r.href}>View on GitHub &rarr;</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
