import Layout from '../components/Layout';
import CutoutTitle from '../components/CutoutTitle';
import SplatterBackground from '../components/SplatterBackground';

const FEATURED = [
  {
    badge: 'FULL-STACK / AI',
    title: 'LingoQuest: AI Language Learning Platform',
    desc: "An AI language-learning platform with a conversational tutor that listens to your pronunciation and adapts each lesson to how you're doing, tracking your progress as you go.",
    status: 'React · Spring Boot · FastAPI · MySQL',
    href: 'https://github.com/taharry',
  },
  {
    badge: 'MULTI-AGENT AI',
    title: 'Adventra: Multi-Agent Travel Planner',
    desc: 'A travel planner that builds your itinerary for you: a team of AI agents researches destinations, hotels, and activities, then puts together a day-by-day plan you can save, tweak, and share.',
    status: 'React · Flask · Node.js · MongoDB · LangGraph',
    href: 'https://github.com/taharry',
  },
  {
    badge: 'MUSIC / WEB AUDIO',
    title: 'MuJam',
    desc: 'A web app for learning to play your favorite songs on any instrument, no sheet music required. Pick a song and follow synced chord charts and fingering diagrams, paced by an adjustable-speed metronome with loop mode and a strum-pattern guide.',
    status: 'React 19 · TypeScript · Vite · Web Audio API · React Router',
    href: 'https://github.com/taharry/MuJam',
  },
];

const REPOS = [
  { title: 'portfolio', lang: 'Javascript', desc: 'This site: a Persona 5-inspired developer portfolio built with React, React Router, and Framer Motion.', stars: 0, href: 'https://github.com/taharry/portfolio' },
  { title: 'WellCo', lang: 'REACT', desc: 'AI wellness chatbot: React + Firebase + Gemini API with sentiment analysis and real-time sync.', stars: 0, href: 'https://github.com/taharry/WellCo' },
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
