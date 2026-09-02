import Layout from '../components/Layout';
import CutoutTitle from '../components/CutoutTitle';
import SplatterBackground from '../components/SplatterBackground';

export default function Education() {
  return (
    <Layout crumb="EDUCATION">
      <header className="page-header page-header--split halftone">
        <SplatterBackground className="splatter-bg--header" seed={21} variant="split" />
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
            <div className="timeline-year">2026 to Expected May 2028</div>
            <h3 className="timeline-title">Master of Science in Computer Science</h3>
            <div className="timeline-school">Georgia State University, Atlanta, GA</div>
            <p className="timeline-desc">
              Graduate coursework in robotics, advanced machine learning, and the fundamentals of data science, alongside work as a Graduate Administrative Assistant in Data Management.
            </p>
            <div className="timeline-tags">
              <span className="tag">Introduction to Robotics</span>
              <span className="tag">Advanced Machine Learning</span>
              <span className="tag">Fundamentals of Data Science</span>
            </div>
          </div>

          <div className="timeline-item">
            <span className="timeline-marker" aria-hidden="true"></span>
            <div className="timeline-year">2022 to May 2026</div>
            <h3 className="timeline-title">Bachelor of Science in Computer Science</h3>
            <div className="timeline-school">Georgia State University, Atlanta, GA</div>
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
              <span className="tag">Data Science</span>
              <span className="tag">Big Data</span>
              <span className="tag">Machine Learning</span>
              <span className="tag">Linear Algebra</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
