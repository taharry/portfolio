import { beforeEach, describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useSfx from '../useSfx';

describe('useSfx', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('defaults to muted for a first-time visitor (no stored preference)', () => {
    const { result } = renderHook(() => useSfx());
    expect(result.current.muted).toBe(true);
  });

  it('respects a previously-stored preference instead of the default', () => {
    window.localStorage.setItem('persona-portfolio:sfx-muted', '0');
    const { result } = renderHook(() => useSfx());
    expect(result.current.muted).toBe(false);
  });

  it('persists the choice once a visitor toggles it', () => {
    const { result } = renderHook(() => useSfx());
    expect(result.current.muted).toBe(true);

    act(() => result.current.toggleMuted());

    expect(result.current.muted).toBe(false);
    expect(window.localStorage.getItem('persona-portfolio:sfx-muted')).toBe('0');
  });

  it('exposes distinct hover, confirm, and back cues', () => {
    const { result } = renderHook(() => useSfx());
    expect(typeof result.current.playHover).toBe('function');
    expect(typeof result.current.playConfirm).toBe('function');
    expect(typeof result.current.playBack).toBe('function');
  });
});
