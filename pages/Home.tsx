
import React from 'react';
import { Link } from 'react-router-dom';

const StarField: React.FC = () => {
  const stars = React.useMemo(() => {
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      size: Math.random() * 4 + 1.5,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      twinkleDuration: Math.random() * 3 + 1,
      delay: Math.random() * -30,
      opacity: Math.random() * 0.5 + 0.3,
      blur: Math.random() * 1,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star-particle bg-[#FFF59D]"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            opacity: star.opacity,
            filter: `blur(${star.blur}px)`,
            boxShadow: `0 0 ${star.size * 2}px #FFF176`,
            animation: `floatingStar ${star.duration}s infinite ease-in-out, twinkle ${star.twinkleDuration}s infinite ease-in-out`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <main className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-site-bg">
      <div className="fixed inset-0 star-bg pointer-events-none"></div>
      <StarField />
      
      <div className="relative z-10 w-full max-w-6xl px-6 md:px-12 text-center animate-fade-in flex flex-col items-center justify-center">
        {/* Headline Section */}
        <div className="mb-16 md:mb-24">
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-tight text-serif-text">
            Creating magical <br/>
            <span className="font-script text-primary text-6xl md:text-9xl inline-block mt-4 mx-2">digital</span> 
            corners
          </h2>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 items-center w-full">
          {/* Marketing Card */}
          <Link to="/marketing" className="group relative transform -rotate-2 hover:rotate-0 transition-all duration-500">
            <div className="absolute -top-4 left-4 w-24 h-8 bg-[#E5989B]/90 -rotate-3 z-20 shadow-sm border-x border-white/10" 
                 style={{ clipPath: 'polygon(2% 0%, 98% 2%, 100% 98%, 0% 100%)' }}></div>
            
            <div className="bg-[#fdfbf7] p-4 pb-8 polaroid-shadow border border-white/20">
              <div className="aspect-square bg-slate-200 overflow-hidden mb-4">
                <img alt="Marketing" src="https://i.pinimg.com/1200x/24/5d/c9/245dc9e0fa753ec6c163da103fa0c1c8.jpg" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
              </div>
              <h3 className="font-display text-2xl text-[#1d1d1b] text-left">Marketing</h3>
            </div>
          </Link>

          {/* Copywriting Card */}
          <Link to="/diary" className="group relative transform rotate-3 hover:rotate-0 transition-all duration-500">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-28 h-9 bg-[#FAD2E1] rotate-[-2deg] z-20 shadow-sm border-x border-white/20 flex items-center justify-center overflow-hidden"
                 style={{ clipPath: 'polygon(0% 5%, 100% 0%, 98% 95%, 2% 100%)' }}>
              <div className="flex gap-1.5 opacity-40">
                {[...Array(5)].map((_, i) => <span key={i} className="text-rose-400 text-[10px]">♥</span>)}
              </div>
            </div>
            
            <div className="bg-[#fdfbf7] p-4 pb-8 polaroid-shadow border-2 border-primary/10">
              <div className="aspect-square bg-rose-50 overflow-hidden mb-4">
                <img alt="Copywriting" src="https://i.pinimg.com/736x/0c/da/5d/0cda5dfd800186df464653691b5d75a9.jpg" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
              </div>
              <h3 className="font-display text-2xl text-[#1d1d1b] text-left">Copywriting</h3>
            </div>
          </Link>

          {/* Web Design Card */}
          <Link to="/web-design" className="group relative transform -rotate-1 hover:rotate-0 transition-all duration-500">
            <div className="absolute -top-5 right-6 w-24 h-9 rotate-6 z-20 shadow-sm border-x border-white/10"
                 style={{ 
                   background: 'repeating-linear-gradient(90deg, #FFB5A7, #FFB5A7 10px, #fec5bb 10px, #fec5bb 20px)',
                   clipPath: 'polygon(5% 0%, 95% 5%, 100% 90%, 0% 100%)',
                   opacity: 0.85
                 }}></div>
            
            <div className="bg-[#fdfbf7] p-4 pb-8 polaroid-shadow border border-white/20">
              <div className="aspect-square bg-emerald-50 overflow-hidden mb-4">
                <img alt="Web Design" src="https://i.pinimg.com/736x/2b/7a/7a/2b7a7a805016be51897914f59db95a4b.jpg" className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
              </div>
              <h3 className="font-display text-2xl text-[#1d1d1b] text-left">Web Design</h3>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
