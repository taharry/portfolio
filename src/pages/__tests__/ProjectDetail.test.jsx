import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProjectDetail from '../ProjectDetail';
import { PROJECTS } from '../../data/projects';

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('ProjectDetail', () => {
  it('renders the dossier for a known project with its tech stack', () => {
    const mujam = PROJECTS.find((p) => p.slug === 'mujam');
    renderAt('/projects/mujam');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('MuJam');
    mujam.stack.forEach((tech) => {
      expect(screen.getByText(tech)).toBeInTheDocument();
    });
    expect(screen.getByRole('link', { name: /view on github/i })).toHaveAttribute('href', mujam.href);
  });

  it('shows a friendly not-found state for an unknown slug instead of crashing', () => {
    renderAt('/projects/does-not-exist');
    // CutoutTitle renders each word as its own span with no text-node space
    // between them, so the DOM text content is concatenated.
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/casenotfound/i);
    expect(screen.getByRole('link', { name: /back to projects/i })).toHaveAttribute('href', '/projects');
  });
});
