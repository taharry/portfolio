// Tiny shared counter so any open overlay (CallingCard, the Easter egg
// flourish) can tell Layout's global Escape-to-menu handler to stand down.
// A plain module-level counter rather than relying on keydown-listener
// registration order, which isn't reliable: a dialog's own listener is only
// attached when it opens (well after Layout's mounts), so it would never
// win a same-target "first listener wins" race.
let openCount = 0;

export function dialogOpened() {
  openCount += 1;
}

export function dialogClosed() {
  openCount = Math.max(0, openCount - 1);
}

export function isDialogOpen() {
  return openCount > 0;
}
