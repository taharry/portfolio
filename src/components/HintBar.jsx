export default function HintBar({ showBack = false }) {
  return (
    <div className="hint-bar" aria-hidden="true">
      <span className="hint-item"><kbd>&uarr;&darr;</kbd>Select</span>
      <span className="hint-item"><kbd>Enter</kbd>Confirm</span>
      {showBack && <span className="hint-item"><kbd>Esc</kbd>Back</span>}
    </div>
  );
}
