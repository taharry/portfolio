import Layout from '../components/Layout';
import CutoutTitle from '../components/CutoutTitle';
import SplatterBackground from '../components/SplatterBackground';
import BioCard from '../components/BioCard';
import SkillList from '../components/SkillList';

const BIO_ENTRIES = [
  {
    title: 'Tazrian Ahsan',
    tagline: 'Full-Stack Developer · AI & Data Engineering',
    body: "Starting my graduate studies at Georgia State University, I graduated with a B.S. in Computer Science this year. I build full-stack web apps and the data pipelines behind them, and I like problems where a messy dataset or a slow query turns into something people can actually use.",
  },
];

const ABOUT_BLOCKS = [
  {
    label: 'What I Build',
    body: 'Based in Atlanta, GA. My core is full-stack web development with React, TypeScript, Node, Express, FastAPI, and Spring Boot, backed by solid SQL and relational database design across MySQL, PostgreSQL, and MongoDB.',
  },
  {
    label: 'Relevant Experience',
    body: "On the data side I've worked in Python with Pandas, NumPy, and scikit-learn for cleaning, transformation, validation, and analysis, plus ETL pipelines, REST API design, and Power BI dashboards. I also have hands-on experience building LLM and NLP automation with tools like n8n, and ship with Git, GitHub Actions, Docker, and AWS. Full write-ups on each role are on the Experience page.",
  },
  {
    label: 'Personal Interests',
    body: 'Away from the keyboard I spend a lot of time with music, and with film I like watching closely and working out why a scene lands the way it does. I read widely and enjoy pulling apart what I read. I pick up new tools and domains fast and adapt quickly when things shift, which is the part of this work I enjoy most.',
  },
  {
    label: 'Current Opportunities',
    body: "I'm looking for a Summer 2027 software engineering or data internship as part of my M.S., and I'm also open to full-time software engineering and data roles.",
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

      <section className="about-grid">
        <div className="about-text">
          <BioCard entries={BIO_ENTRIES} />

          <div className="about-blocks">
            {ABOUT_BLOCKS.map((b) => (
              <div className="about-block" key={b.label}>
                <span className="about-block-label">{b.label}</span>
                <p className="about-copy">{b.body}</p>
              </div>
            ))}
          </div>
        </div>

        <SkillList />
      </section>
    </Layout>
  );
}
