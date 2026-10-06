import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * On every route change: scroll to the top and move focus to the page's
 * main heading (announcing the new page to screen readers), the way a
 * traditional multi-page site would. Skipped on first mount so initial
 * load doesn't yank focus away from the URL bar / skip link.
 */
export default function useRouteFocus() {
  const { pathname } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      const heading = document.querySelector('main h1, h1');
      if (!heading) return;
      const hadTabIndex = heading.hasAttribute('tabindex');
      if (!hadTabIndex) heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
      if (!hadTabIndex) {
        heading.addEventListener('blur', () => heading.removeAttribute('tabindex'), { once: true });
      }
    }, 60);
    return () => clearTimeout(timer);
  }, [pathname]);
}
