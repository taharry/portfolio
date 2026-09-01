import Layout from '../components/Layout';
import CutoutTitle from '../components/CutoutTitle';

export default function About() {
  return (
    <Layout crumb="ABOUT">
      <header className="page-header page-header-bg halftone">
        <div className="page-eyebrow">// 01</div>
        <div className="page-title-wrap">
          <CutoutTitle text="About Me" />
        </div>
        <p className="page-sub">Who I am, what I work with, and how I like to build.</p>
      </header>

      <section
        style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '80px' }}
      >
        <div className="about-text">
          <p style={{ fontSize: 18, lineHeight: 1.75, color: '#CFC9BE', maxWidth: '58ch', marginBottom: 20 }}>
            Placeholder bio — swap this out. Two or three sentences about who you are, what kind of problems you like solving, and what you're looking for right now (freelance, full-time, collabs, etc).
          </p>
          <p style={{ fontSize: 18, lineHeight: 1.75, color: '#CFC9BE', maxWidth: '58ch' }}>
            Keep it conversational and specific — this is the one place on the page people expect to hear your actual voice, not a résumé summary.
          </p>
        </div>

        <ul className="rank-list">
          {[
            { title: 'Languages', sub: 'JavaScript / TypeScript / Python', rank: 4, fill: 80 },
            { title: 'Frontend', sub: 'React / Vue / Tailwind', rank: 4, fill: 80 },
            { title: 'Backend', sub: 'Node.js / PostgreSQL / REST & GraphQL', rank: 3, fill: 60 },
            { title: 'Tools', sub: 'Git / Docker / Figma', rank: 3, fill: 60 },
          ].map((s) => (
            <li className="rank-row" key={s.title}>
              <div className="rank-title-group">
                <div className="rank-title">{s.title}</div>
                <div className="rank-sub">{s.sub}</div>
              </div>
              <div className="rank-badge">
                <span className="rank-badge-label">RANK</span>
                <span className="rank-badge-value">{s.rank}</span>
              </div>
              <div className="rank-bar-track">
                <div className="rank-bar-fill" style={{ width: `${s.fill}%` }}></div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
