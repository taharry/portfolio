import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

const ROUTES = ['/', '/about', '/projects', '/projects/lingoquest', '/projects/mujam', '/experience', '/education', '/contact'];

describe('App routing', () => {
  it.each(ROUTES)('renders %s with exactly one top-level heading', (path) => {
    render(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    );
    const headings = screen.getAllByRole('heading', { level: 1 });
    expect(headings).toHaveLength(1);
  });

  it('renders an unknown project slug without crashing', () => {
    render(
      <MemoryRouter initialEntries={['/projects/not-a-real-project']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1);
  });
});
