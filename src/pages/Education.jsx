import Layout from '../components/Layout';
import CutoutTitle from '../components/CutoutTitle';

export default function Education() {
  return (
    <Layout crumb="EDUCATION">
      <header className="page-header page-header-bg halftone">
        <div className="page-eyebrow">// 03</div>
        <div className="page-title-wrap">
          <CutoutTitle text="Education" />
        </div>
        <p className="page-sub">Degrees, coursework, and how I got here.</p>
      </header>

      <section>
        <div className="timeline">
          <div className="timeline-item">
            <span className="timeline-marker" aria-hidden="true"></span>
            <div className="timeline-year">2022 — 2026</div>
            <h3 className="timeline-title">Degree Name</h3>
            <div className="timeline-school">University Name</div>
            <p className="timeline-desc">
              Placeholder — one or two sentences on focus areas, standout coursework, or a thesis/capstone project worth mentioning.
            </p>
            <div className="timeline-tags">
              <span className="tag">Data Structures</span>
              <span className="tag">Algorithms</span>
              <span className="tag">Databases</span>
            </div>
          </div>

          <div className="timeline-item">
            <span className="timeline-marker" aria-hidden="true"></span>
            <div className="timeline-year">2021</div>
            <h3 className="timeline-title">Certificate / Bootcamp Name</h3>
            <div className="timeline-school">Program Name</div>
            <p className="timeline-desc">
              Placeholder — swap in a real credential, bootcamp, or self-directed learning milestone if relevant.
            </p>
            <div className="timeline-tags">
              <span className="tag">Full-Stack Web Dev</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
