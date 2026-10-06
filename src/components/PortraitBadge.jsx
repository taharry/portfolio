/**
 * Personal visual centerpiece for the About page.
 *
 * No portrait photo is configured for this site yet, so this renders an
 * original abstract monogram placeholder (initials in a cutout badge) —
 * not a fabricated likeness. To swap in a real photo later: replace the
 * <span className="portrait-badge-initials"> below with an <img>, and the
 * existing `.portrait-badge-shape` treatment (monochrome filter, red offset
 * outline, black backing plate) carries over unchanged.
 */
export default function PortraitBadge({ initials = 'TA' }) {
  return (
    <div className="portrait-badge" aria-hidden="true">
      <span className="paper-plate" aria-hidden="true"></span>
      <span className="portrait-badge-shape">
        <span className="portrait-badge-initials">{initials}</span>
      </span>
      <span className="tape-strip portrait-badge-tape" aria-hidden="true"></span>
      <span className="reg-mark reg-mark--tl" aria-hidden="true"></span>
      <span className="reg-mark reg-mark--br" aria-hidden="true"></span>
    </div>
  );
}
