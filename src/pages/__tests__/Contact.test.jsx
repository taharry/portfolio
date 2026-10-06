import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Contact from '../Contact';

function renderContact() {
  return render(
    <MemoryRouter>
      <Contact />
    </MemoryRouter>
  );
}

describe('Contact form', () => {
  let originalLocation;

  beforeEach(() => {
    // jsdom can't actually follow a mailto: navigation; stub location.href
    // so the component's assignment is just a property set, not a crash.
    originalLocation = window.location;
    delete window.location;
    window.location = { ...originalLocation, href: '' };
  });

  afterEach(() => {
    window.location = originalLocation;
  });

  it('shows validation errors and preserves entered text instead of submitting', () => {
    renderContact();
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Rec Ruiter' } });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(screen.getByText(/enter a valid email address/i)).toBeInTheDocument();
    expect(screen.getByText(/enter a message/i)).toBeInTheDocument();
    // the name the visitor already typed is still there
    expect(screen.getByLabelText(/name/i)).toHaveValue('Rec Ruiter');
  });

  it('on valid submit, opens mailto and reports an honest, non-guaranteed status', async () => {
    renderContact();
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Rec Ruiter' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'recruiter@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "Let's talk." } });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(window.location.href).toContain('mailto:tazrianahsan148@gmail.com');

    await waitFor(() => {
      expect(screen.getByRole('status')).toHaveTextContent(/can't confirm delivery/i);
    });
  });

  it('disables the submit button while the mailto hand-off is in flight', () => {
    renderContact();
    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Rec Ruiter' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'recruiter@example.com' } });
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: "Let's talk." } });

    const button = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(button);
    expect(button).toBeDisabled();
  });
});
