import { useState } from 'react';
import CutoutTitle from './CutoutTitle';

/**
 * Torn-scrap-of-paper card. With more than one entry it cycles through them
 * on the CHANGE button with a quick fade/slide; with just one, it's a plain
 * static card (no pager UI). Each entry: { title, tagline, body }.
 */
export default function BioCard({ entries }) {
  const [index, setIndex] = useState(0);
  const entry = entries[index];
  const multiple = entries.length > 1;

  const next = () => setIndex((i) => (i + 1) % entries.length);

  return (
    <div className="biocard">
      <div className="biocard-tape" aria-hidden="true"></div>

      {/* keyed so the swap animation restarts on every change */}
      <div className="biocard-body" key={index}>
        {multiple && (
          <span className="biocard-eyebrow">
            {String(index + 1).padStart(2, '0')} / {String(entries.length).padStart(2, '0')}
          </span>
        )}
        <CutoutTitle text={entry.title} className="cutout-title--sm" as="h2" />
        <p className="biocard-tagline">{entry.tagline}</p>
        <p className="biocard-text">{entry.body}</p>
      </div>

      {multiple && (
        <button type="button" className="biocard-change" onClick={next}>
          CHANGE <span aria-hidden="true">&#9656;</span>
        </button>
      )}
    </div>
  );
}
