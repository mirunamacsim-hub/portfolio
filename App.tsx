import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import DiaryCollection from './pages/DiaryCollection';
import ProjectDetail from './pages/ProjectDetail';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-12 py-8 flex justify-between items-center bg-transparent">
      <Link to="/" className="flex items-center gap-2 group select-none">
        {/* Large Script M - size reduced from 80px to 64px */}
        <span className="font-script text-[64px] text-primary leading-none transform transition-transform group-hover:scale-105">M</span>
        {/* Stacked Name */}
        <div className="flex flex-col justify-center -mt-1">
          <span className="font-display text-2xl leading-[0.8] tracking-tight text-serif-text">iruna</span>
          <span className="font-display text-2xl leading-[0.8] tracking-tight text-serif-text">acsim</span>
        </div>
      </Link>
      
      {/* Navigation removed as per request */}
      <nav></nav>
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
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;