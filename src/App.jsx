import { Routes, Route, useLocation } from 'react-router-dom';
import Menu from './pages/Menu';
import About from './pages/About';
import Projects from './pages/Projects';
import Education from './pages/Education';
import Contact from './pages/Contact';
import StripeTransition from './components/StripeTransition';

export default function App() {
  const location = useLocation();

  return (
    <>
      <StripeTransition />
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Menu />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/education" element={<Education />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}
