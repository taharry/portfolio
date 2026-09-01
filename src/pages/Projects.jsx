import Layout from '../components/Layout';
import CutoutTitle from '../components/CutoutTitle';

const FEATURED = [
  {
    badge: 'LIVE APP',
    title: '7th Semester Project',
    desc: 'Project for EOE — placeholder description.',
    status: 'Live now',
    href: '#',
  },
  {
    badge: 'NLP',
    title: 'Oscilloscope',
    desc: 'Code for digital oscilloscope on Raspberry Pi — placeholder description.',
    status: 'Highlight',
    href: '#',
  },
  {
    badge: 'SECURITY',
    title: 'Important Page',
    desc: 'Just a page — placeholder description.',
    status: 'Highlight',
    href: '#',
  },
];

const REPOS = [
  { title: '7th Semester Project', lang: 'REPO', desc: 'Placeholder repo used for EOE.', stars: 3, href: '#' },
  { title: 'Oscilloscope', lang: 'PYTHON', desc: 'No description yet, but the code speaks for itself.', stars: 0, href: '#' },
  { title: 'Important Page', lang: 'HTML', desc: 'No description yet, but this code speaks for itself.', stars: 0, href: '#' },
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
          <span className="projects-subhead-count">{REPOS.length} repositories &middot; live from GitHub</span>
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

        <p className="card-placeholder-note" style={{ marginTop: 24 }}>
          Placeholder — swap the FEATURED and REPOS arrays in Projects.jsx with your real projects and GitHub links.
        </p>
      </section>
    </Layout>
  );
}
