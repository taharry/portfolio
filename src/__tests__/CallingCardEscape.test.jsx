import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Escape key priority', () => {
  it('closes the open Calling Card dialog instead of navigating to the menu', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );

    // We're on the About page, not the menu.
    expect(screen.getByText(/who i am, what i work with/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /card/i }));
    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });

    // The dialog is gone, but Escape did NOT also navigate to the hub menu —
    // we're still looking at the About page underneath.
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByText(/who i am, what i work with/i)).toBeInTheDocument();
  });

  it('Escape does navigate to the menu when no dialog is open', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/who i am, what i work with/i)).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(screen.queryByText(/who i am, what i work with/i)).not.toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /main sections/i })).toBeInTheDocument();
  });
});
