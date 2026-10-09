import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import CutoutTitle from '../components/CutoutTitle';
import SplatterBackground from '../components/SplatterBackground';
import ProjectEmblem from '../components/ProjectEmblem';
import ProjectPreview from '../components/ProjectPreview';
import { getProject, PROJECTS } from '../data/projects';

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);

  if (!project) {
    return (
      <Layout crumb="PROJECTS">
        <header className="page-header page-header--split page-header--compact halftone">
          <SplatterBackground className="splatter-bg--header" seed={7} variant="split" />
          <div className="page-eyebrow">// 404</div>
          <div className="page-title-wrap">
            <CutoutTitle text="Case Not Found" />
          </div>
          <p className="page-sub">There's no project at that address.</p>
        </header>
        <section className="projects-section">
          <Link className="case-btn" to="/projects" data-sfx="back">&larr; Back</Link>
        </section>
      </Layout>
    );
  }

  const seed = (project.slug.length * 37) % 997;
  const others = PROJECTS.filter((p) => p.slug !== project.slug);
  const caseNumber = PROJECTS.findIndex((p) => p.slug === project.slug) + 1;

  return (
    <Layout crumb="PROJECTS">
      <header className={`page-header page-header--split page-header--compact page-header--case halftone motif-${project.motif}`}>
        <SplatterBackground className="splatter-bg--header" seed={seed} variant="split" />
        <span className="case-burst" aria-hidden="true"></span>
        <ProjectEmblem motif={project.motif} className="project-emblem--hero" />
        <div className="page-eyebrow">// Project File</div>
        <div className="page-title-wrap">
          <CutoutTitle text={project.title.split(':')[0]} />
        </div>
        <p className="page-sub">{project.category}</p>
        <div className="case-stamps" aria-hidden="true">
          <span className="case-stamp">Case No. {String(caseNumber).padStart(2, '0')}</span>
          <span className="case-stamp">{project.stack.length} Technologies</span>
        </div>
      </header>

      <section className="projects-section project-detail">
        <nav aria-label="Breadcrumb" className="project-detail-crumb">
          <Link to="/projects" data-sfx="back">&larr; All Projects</Link>
        </nav>

        <p className="project-detail-intro">{project.summary}</p>

        <div className="project-doc">
          <ProjectPreview
            project={{
              ...project,
              emblemNode: <ProjectEmblem motif={project.motif} className="project-doc-preview-emblem" />,
            }}
          />

          <div className="project-doc-annotations">
            <article className="dossier-card">
              <h2 className="dossier-card-title">The Problem</h2>
              <p>{project.problem}</p>
            </article>
            <article className="dossier-card">
              <h2 className="dossier-card-title">Who It's For</h2>
              <p>{project.users}</p>
            </article>
          </div>
        </div>

        <div className="project-detail-stack">
          <h2 className="dossier-card-title">Tech Stack</h2>
          <ul className="case-tags">
            {project.stack.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>

        {others.length > 0 && (
          <nav aria-label="Other projects" className="project-detail-next">
            <span className="project-detail-next-label">More case files</span>
            <ul>
              {others.map((p) => (
                <li key={p.slug}>
                  <Link to={`/projects/${p.slug}`}>{p.title.split(':')[0]} &rarr;</Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </section>
    </Layout>
  );
}
