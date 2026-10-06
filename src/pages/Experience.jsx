import Layout from '../components/Layout';
import CutoutTitle from '../components/CutoutTitle';
import SplatterBackground from '../components/SplatterBackground';
import JitterText from '../components/JitterText';
import { EXPERIENCE } from '../data/experience';

export default function Experience() {
  return (
    <Layout crumb="EXPERIENCE">
      <header className="page-header page-header--split page-header--compact halftone">
        <SplatterBackground className="splatter-bg--header" seed={55} variant="split" />
        <div className="page-eyebrow">// 03</div>
        <div className="page-title-wrap">
          <CutoutTitle text="Experience" />
        </div>
        <p className="page-sub">Internships and roles, most recent first.</p>
      </header>

      <section>
        <div className="timeline">
          {EXPERIENCE.map((job) => (
            <div className="edu-item" key={job.org + job.role}>
              <span className="edu-marker" aria-hidden="true"></span>
              <article className="edu-card">
                <span className="case-burst" aria-hidden="true"></span>
                <div className="edu-card-head">
                  <span className="edu-year">{job.dates}</span>
                  <h2 className="edu-title">
                    <JitterText text={job.role} amp={0.8} />
                  </h2>
                  <div className="edu-school">{job.org} &middot; {job.location}</div>
                </div>
                <div className="edu-card-body">
                  <span className="case-rule" aria-hidden="true"></span>
                  <p className="edu-desc">{job.summary}</p>
                  <ul className="edu-highlights">
                    {job.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                  <ul className="case-tags">
                    {job.stack.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
