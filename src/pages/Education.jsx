import Layout from '../components/Layout';
import CutoutTitle from '../components/CutoutTitle';
import SplatterBackground from '../components/SplatterBackground';

const TIMELINE = [
  {
    year: '2026 to Expected May 2028',
    abbr: 'M.S.',
    title: 'Master of Science in Computer Science',
    school: 'Georgia State University, Atlanta, GA',
    desc: 'Graduate coursework in robotics, advanced machine learning, and the fundamentals of data science, alongside work as a Graduate Administrative Assistant in Data Management.',
    courses: ['Introduction to Robotics', 'Advanced Machine Learning', 'Fundamentals of Data Science'],
  },
  {
    year: '2022 to May 2026',
    abbr: 'B.S.',
    title: 'Bachelor of Science in Computer Science',
    school: 'Georgia State University, Atlanta, GA',
    desc: 'Undergraduate CS with a strong systems and web-development core, plus internships in software engineering, AI agent development, and data analytics.',
    courses: [
      'Data Structures',
      'Design & Analysis of Algorithms',
      'Database Systems',
      'Web Programming',
      'System-Level Programming',
      'Software Development',
      'Data Science',
      'Big Data',
      'Machine Learning',
      'Linear Algebra',
    ],
  },
];

export default function Education() {
  return (
    <Layout crumb="EDUCATION">
      <header className="page-header page-header--split page-header--compact halftone">
        <SplatterBackground className="splatter-bg--header" seed={21} variant="split" />
        <div className="page-eyebrow">// 04</div>
        <div className="page-title-wrap">
          <CutoutTitle text="Education" />
        </div>
        <p className="page-sub">Degrees, coursework, and how I got here.</p>
      </header>

      <section>
        <div className="record-timeline">
          {TIMELINE.map((t) => (
            <div className="record-item" key={t.title}>
              <span className="record-stamp" aria-hidden="true">{t.abbr}</span>
              <article className="record-card">
                <span className="record-tape" aria-hidden="true"></span>
                <span className="record-year">{t.year}</span>
                <h2 className="record-title">{t.title}</h2>
                <div className="record-school">{t.school}</div>
                <span className="record-rule" aria-hidden="true"></span>
                <p className="record-desc">{t.desc}</p>
                <ul className="record-tags">
                  {t.courses.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </article>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
