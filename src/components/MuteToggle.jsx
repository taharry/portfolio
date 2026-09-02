export default function MuteToggle({ muted, onToggle }) {
  return (
    <button
      type="button"
      className="mute-toggle"
      onClick={onToggle}
      aria-pressed={muted}
      aria-label={muted ? 'Unmute interface sounds' : 'Mute interface sounds'}
      title={muted ? 'Sound off' : 'Sound on'}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 9v6h4l5 4V5L8 9H4z"
          fill="currentColor"
        />
        {muted ? (
          <path
            d="M16 8l6 8M22 8l-6 8"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          <path
            d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
        )}
      </svg>
      <span className="mute-toggle-label">{muted ? 'SFX OFF' : 'SFX ON'}</span>
    </button>
  );
}
