import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectPreview from '../ProjectPreview';

const baseProject = { title: 'Test Project', emblemNode: <span>emblem</span> };

describe('ProjectPreview', () => {
  it('shows an honest placeholder when no screenshot is configured', () => {
    render(<ProjectPreview project={{ ...baseProject, screenshot: null }} />);
    expect(screen.getByText(/screenshot coming soon/i)).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('opens and closes an accessible lightbox when a screenshot is configured', () => {
    render(<ProjectPreview project={{ ...baseProject, screenshot: '/screenshots/test.png' }} />);

    const trigger = screen.getByRole('button', { name: /enlarge screenshot/i });
    // jsdom, unlike a real browser, doesn't auto-focus a button on click
    trigger.focus();
    fireEvent.click(trigger);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    // focus returns to the trigger that opened it
    expect(document.activeElement).toBe(trigger);
  });
});
