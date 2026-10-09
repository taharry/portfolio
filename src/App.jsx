import { Routes, Route, useLocation } from 'react-router-dom';
import Menu from './pages/Menu';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Experience from './pages/Experience';
import Education from './pages/Education';
import Contact from './pages/Contact';
import StripeTransition from './components/StripeTransition';
import useRouteFocus from './hooks/useRouteFocus';

export default function App() {
  const location = useLocation();
  useRouteFocus();

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <StripeTransition />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/education" element={<Education />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}
