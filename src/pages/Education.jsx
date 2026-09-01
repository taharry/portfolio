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
            <div className="timeline-year">2026 — Expected May 2028</div>
            <h3 className="timeline-title">Master of Science in Computer Science</h3>
            <div className="timeline-school">Georgia State University — Atlanta, GA</div>
            <p className="timeline-desc">
              Graduate coursework focused on data science, big data systems, and machine learning, alongside work as a Graduate Administrative Assistant in Data Management.
            </p>
            <div className="timeline-tags">
              <span className="tag">Data Science</span>
              <span className="tag">Big Data</span>
              <span className="tag">Machine Learning</span>
              <span className="tag">Linear Algebra</span>
            </div>
          </div>

          <div className="timeline-item">
            <span className="timeline-marker" aria-hidden="true"></span>
            <div className="timeline-year">2022 — May 2026</div>
            <h3 className="timeline-title">Bachelor of Science in Computer Science</h3>
            <div className="timeline-school">Georgia State University — Atlanta, GA</div>
            <p className="timeline-desc">
              Undergraduate CS with a strong systems and web-development core, plus internships in software engineering, AI agent development, and data analytics.
            </p>
            <div className="timeline-tags">
              <span className="tag">Data Structures</span>
              <span className="tag">Design &amp; Analysis of Algorithms</span>
              <span className="tag">Database Systems</span>
              <span className="tag">Web Programming</span>
              <span className="tag">System-Level Programming</span>
              <span className="tag">Software Development</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
