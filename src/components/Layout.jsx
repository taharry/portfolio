import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import HintBar from './HintBar';

export default function Layout({ crumb, children }) {
  const navigate = useNavigate();

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') navigate('/');
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [navigate]);

  return (
    <>
      <div className="topbar">
        <button className="topbar-back" onClick={() => navigate('/')}>
          <span className="bar" aria-hidden="true"></span>
          Menu
        </button>
        <span className="topbar-crumb">MENU / <span>{crumb}</span></span>
      </div>

      {children}

      <footer className="site-footer">
        <span>© 2026 Your Name</span>
        <button
          className="topbar-back"
          style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          Back to menu
        </button>
      </footer>
      <HintBar showBack={true} />
    </>
  );
}
