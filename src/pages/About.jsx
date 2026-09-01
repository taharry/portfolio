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
            I'm a Computer Science grad student at Georgia State University, working on my M.S. after finishing my B.S. this year. I build full-stack web apps and the data pipelines behind them — React and TypeScript on the front, Node, FastAPI, and Spring Boot on the back, and a lot of Python, SQL, and ETL work in between.
          </p>
          <p style={{ fontSize: 18, lineHeight: 1.75, color: '#CFC9BE', maxWidth: '58ch', marginBottom: 20 }}>
            Lately most of my work sits where software engineering meets data and AI: shipping REST APIs over NASA aerospace datasets at RocketTech, wiring up LLM and NLP automation with n8n at Wayfair, and cleaning, validating, and reporting on institutional data as a Graduate Assistant at GSU.
          </p>
          <p style={{ fontSize: 18, lineHeight: 1.75, color: '#CFC9BE', maxWidth: '58ch' }}>
            I like problems where a messy dataset or a slow query turns into something people can actually use. Currently open to full-time software engineering and data roles for 2026.
          </p>
        </div>

        <ul className="rank-list">
          {[
            { title: 'Languages', sub: 'Python / SQL / Java / TypeScript / C++', rank: 4, fill: 82 },
            { title: 'Frontend', sub: 'React / TypeScript / HTML & CSS', rank: 3, fill: 68 },
            { title: 'Backend & APIs', sub: 'Node.js / Express / FastAPI / Spring Boot', rank: 4, fill: 78 },
            { title: 'Data & Analytics', sub: 'Pandas / NumPy / scikit-learn / Power BI', rank: 4, fill: 80 },
            { title: 'Databases & ETL', sub: 'MySQL / PostgreSQL / MongoDB / Data Pipelines', rank: 4, fill: 80 },
            { title: 'AI & Automation', sub: 'LLM Workflows / NLP / n8n / Prompt Engineering', rank: 3, fill: 66 },
            { title: 'Tools & Cloud', sub: 'Git / GitHub Actions / Docker / AWS', rank: 3, fill: 64 },
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
