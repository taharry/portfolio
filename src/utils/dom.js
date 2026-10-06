// Shared guard so page-level keyboard shortcuts (arrow-key menu nav, Escape
// to go back, the Easter egg sequence) never hijack typing in a real input.
export function isEditableTarget(el) {
  if (!el) return false;
  if (el.isContentEditable) return true;
  const tag = el.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
  return false;
}
