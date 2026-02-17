import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import DiaryCollection from './pages/DiaryCollection';
import WebDesignCollection from './pages/WebDesignCollection';
import MarketingCollection from './pages/MarketingCollection';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';

const Header: React.FC = () => {
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navLinks = [
    { label: 'Marketing', path: '/marketing' },
    { label: 'Copywriting', path: '/diary' },
    { label: 'Web Design', path: '/web-design' },
    { label: 'About', path: '/about' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-8 py-4 flex justify-between items-center bg-transparent">
      <Link to="/" className="flex items-center gap-1.5 group select-none">
        <span className="font-script text-[42px] text-primary leading-none transform transition-transform group-hover:scale-105">M</span>
        <div className="flex flex-col justify-center -mt-0.5">
          <span className="font-display text-lg leading-[0.8] tracking-tight text-serif-text">iruna</span>
          <span className="font-display text-lg leading-[0.8] tracking-tight text-serif-text">acsim</span>
        </div>
      </Link>
      
      {!isHome && (
        <nav className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={`font-display text-[10px] uppercase tracking-[0.2em] transition-all duration-300 hover:text-primary ${
                location.pathname === link.path ? 'text-primary' : 'text-serif-text/60'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-site-bg text-serif-text font-sans">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diary" element={<DiaryCollection />} />
          <Route path="/web-design" element={<WebDesignCollection />} />
          <Route path="/marketing" element={<MarketingCollection />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;