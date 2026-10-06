export default function CutoutTitle({ text, className = '', as: Tag = 'h1', id }) {
  const words = text.split(' ');

  return (
    <Tag id={id} className={`cutout-title display ${className}`}>
      {words.map((word, wi) => (
        <span className="cutout-word" key={wi}>
          {word.split('').map((ch, i) => {
            const seed = wi * 10 + i;
            const rotate = ((seed % 5) - 2) * 1.6;
            const dark = seed % 3 === 0;
            return (
              <span
                key={i}
                className={`cutout-letter${dark ? ' is-dark' : ''}`}
                style={{ '--r': `${rotate}deg` }}
              >
                {ch}
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
