import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Menu from '../Menu';

function renderMenuNav() {
  render(
    <MemoryRouter>
      <Menu />
    </MemoryRouter>
  );
  return within(screen.getByRole('navigation', { name: /main sections/i }));
}

describe('Menu', () => {
  it('renders every section as a real, independently-focusable link', () => {
    const nav = renderMenuNav();
    const links = nav.getAllByRole('link');
    const hrefs = links.map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(
      expect.arrayContaining(['/about', '/projects', '/experience', '/education', '/contact'])
    );
    // external links open in a new tab, internal ones don't
    const github = links.find((a) => a.getAttribute('href')?.includes('github.com'));
    expect(github).toHaveAttribute('target', '_blank');
    expect(github).toHaveAttribute('rel', expect.stringContaining('noopener'));
  });

  it('moves focus between items with ArrowDown/ArrowUp without blocking Tab', () => {
    const nav = renderMenuNav();
    const links = nav.getAllByRole('link');
    links[0].focus();
    expect(document.activeElement).toBe(links[0]);

    fireEvent.keyDown(links[0], { key: 'ArrowDown' });
    expect(document.activeElement).toBe(links[1]);

    fireEvent.keyDown(links[1], { key: 'ArrowUp' });
    expect(document.activeElement).toBe(links[0]);

    // wraps around at the ends
    fireEvent.keyDown(links[0], { key: 'ArrowUp' });
    expect(document.activeElement).toBe(links[links.length - 1]);
  });

  it('does not intercept Tab (native focus order is left alone)', () => {
    const nav = renderMenuNav();
    const links = nav.getAllByRole('link');
    links[0].focus();
    const notCancelled = fireEvent.keyDown(links[0], { key: 'Tab' });
    // our handler only preventDefaults on ArrowDown/ArrowUp, so Tab's default
    // (native focus advance) is never cancelled
    expect(notCancelled).toBe(true);
  });
});
