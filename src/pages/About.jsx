import Layout from '../components/Layout';
import CutoutTitle from '../components/CutoutTitle';
import SplatterBackground from '../components/SplatterBackground';
import BioCard from '../components/BioCard';

const BIO_ENTRIES = [
  {
    title: 'Tazrian Ahsan',
    tagline: 'Full-Stack Developer · AI & Data Engineering',
    body: "CS grad student at Georgia State, finishing my B.S. this year and continuing into the M.S. I build full-stack web apps and the data pipelines behind them, and I like problems where a messy dataset or a slow query turns into something people can actually use.",
  },
  {
    title: 'RocketTech',
    tagline: 'Software Engineering Intern · 2026',
    body: 'Built ETL pipelines and REST APIs over NASA aerospace datasets, making 1,000+ material records queryable. Tuned relational schemas and SQL for ~35% faster retrieval, and shipped React / Node / TypeScript data-entry flows that cut input time ~30%.',
  },
  {
    title: 'Wayfair',
    tagline: 'AI Agent Engineering Extern · 2025',
    body: 'Built automated data pipelines with APIs, n8n, and LLM workflows to ingest multi-source competitor and market data. Automated collection, tracking, NLP analysis, and reporting (~40% less manual work) behind a dashboard with GitHub Actions CI/CD.',
  },
  {
    title: 'Georgia State',
    tagline: 'Graduate Assistant · Data Management · 2026',
    body: 'Cleaning, transforming, validating, and reconciling institutional datasets into analysis-ready form. I build repeatable workflows to consolidate records across sources and surface KPIs for trend analysis and stakeholder decisions.',
  },
  {
    title: 'Off the clock',
    tagline: 'Fun fact',
    body: "This portfolio's look is built from scratch: every diagonal cut, halftone dot, torn edge, and the little UI blips are original CSS, SVG, and Web Audio. No game assets were harmed.",
  },
];

export default function About() {
  return (
    <Layout crumb="ABOUT">
      <header className="page-header page-header--split halftone">
        <SplatterBackground className="splatter-bg--header" seed={3} variant="split" />
        <div className="page-eyebrow">// 01</div>
        <div className="page-title-wrap">
          <CutoutTitle text="About Me" />
        </div>
        <p className="page-sub">Who I am, what I work with, and how I like to build.</p>
      </header>

      <section
        className="about-grid"
        style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '80px' }}
      >
        <div className="about-text">
          <BioCard entries={BIO_ENTRIES} />

          <p style={{ fontSize: 18, lineHeight: 1.75, color: '#CFC9BE', maxWidth: '58ch', marginTop: 36, marginBottom: 20 }}>
            My core is full-stack web development with React, TypeScript, Node, Express, FastAPI, and Spring Boot, backed by solid SQL and relational database design across MySQL, PostgreSQL, and MongoDB. On the data side I work in Python with Pandas, NumPy, and scikit-learn for cleaning, transformation, validation, and analysis, plus ETL pipelines, REST API design, and Power BI dashboards. I also build LLM and NLP automation with tools like n8n, and ship with Git, GitHub Actions, Docker, and AWS.
          </p>
          <p style={{ fontSize: 18, lineHeight: 1.75, color: '#CFC9BE', maxWidth: '58ch' }}>
            Away from the keyboard I spend a lot of time with music, and with film I like watching closely and working out why a scene lands the way it does. I read widely and enjoy pulling apart what I read. I pick up new tools and domains fast and adapt quickly when things shift, which is the part of this work I enjoy most. Currently open to full-time software engineering and data roles for 2026.
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
