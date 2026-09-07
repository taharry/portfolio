/**
 * Ransom-note lettering: every glyph gets its own deterministic rotation,
 * vertical bounce and scale, Persona 5 pause-menu style. Word-aware so long
 * multi-word titles still wrap on spaces.
 *
 * `amp` scales the jitter (1 = default, lower = calmer).
 */
export default function JitterText({ text, amp = 1, className = '' }) {
  const words = String(text).split(' ');
  let k = 0;

  return (
    <span className={`jt ${className}`.trim()} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi}>
          <span className="jt-word" aria-hidden="true">
            {word.split('').map((ch) => {
              const seed = k++ * 13 + ch.charCodeAt(0) + text.length * 5;
              const rot = (((seed % 11) - 5) / 5) * 5 * amp;
              const dy = (((seed >> 1) % 7) - 3) * 1.6 * amp;
              const sc = 1 + ((((seed >> 2) % 5) - 2) / 2) * 0.08 * amp;
              return (
                <span
                  key={k}
                  className="jt-ch"
                  style={{
                    '--rot': `${rot.toFixed(2)}deg`,
                    '--dy': `${dy.toFixed(2)}px`,
                    '--sc': sc.toFixed(3),
                  }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
          {wi < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}
