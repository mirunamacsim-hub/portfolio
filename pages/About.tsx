import React from 'react';
import { Link } from 'react-router-dom';

const StarField: React.FC = () => {
  const stars = React.useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 20 + 10,
      twinkleDuration: Math.random() * 3 + 1,
      delay: Math.random() * -30,
      opacity: Math.random() * 0.4 + 0.1,
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
            boxShadow: `0 0 ${star.size * 2}px #FFF176`,
            animation: `floatingStar ${star.duration}s infinite ease-in-out, twinkle ${star.twinkleDuration}s infinite ease-in-out`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const PinkPaperclip = () => (
  <svg width="20" height="48" viewBox="0 0 24 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
    <path 
      d="M10 5L10 45C10 48.3137 7.31371 51 4 51C0.686292 51 -2 48.3137 -2 45L-2 15C-2 11.6863 0.686292 9 4 9C7.31371 9 10 11.6863 10 15L10 38C10 40.2091 8.20914 42 6 42C3.79086 42 2 40.2091 2 38L2 15" 
      stroke="#FF007F" 
      strokeWidth="3" 
      strokeLinecap="round"
      transform="translate(8, 4)"
    />
  </svg>
);

const WashiTape = () => (
  <div 
    className="absolute -top-4 -left-10 w-32 h-8 rotate-[-35deg] opacity-90 shadow-sm border-x border-black/5 z-20"
    style={{ 
      backgroundColor: '#FFF59D',
      backgroundImage: `url("https://www.transparenttextures.com/patterns/pinstripe.png"), radial-gradient(circle at 20% 30%, #FFB7B2 4px, transparent 0), radial-gradient(circle at 70% 60%, #FFB7B2 3px, transparent 0), radial-gradient(circle at 40% 80%, white 3px, transparent 0)`,
      backgroundSize: 'auto, 20px 20px, 25px 25px, 15px 15px',
      clipPath: 'polygon(0% 10%, 100% 0%, 95% 90%, 5% 100%)'
    }}
  />
);

const Polaroid: React.FC<{
  src: string;
  rotation: string;
  className?: string;
  children?: React.ReactNode;
}> = ({ src, rotation, className = '', children }) => (
  <div className={`relative bg-white p-3 pb-12 polaroid-shadow border border-black/5 transform ${rotation} ${className}`}>
    <div className="aspect-square bg-slate-100 overflow-hidden relative z-10">
      <img src={src} alt="About Miruna" className="w-full h-full object-cover" />
    </div>
    {children}
  </div>
);

const About: React.FC = () => {
  return (
    <main className="relative min-h-screen pt-32 pb-24 flex items-center justify-center overflow-hidden bg-site-bg selection:bg-primary/30">
      <StarField />
      <div className="fixed inset-0 star-bg pointer-events-none opacity-20"></div>

      <div className="relative z-10 w-full max-w-6xl px-8 flex flex-col md:flex-row items-center gap-16 md:gap-24 animate-fade-in">
        {/* Left Side: Polaroid Collage */}
        <div className="w-full md:w-1/2 relative h-[500px] md:h-[600px] flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Top-left Polaroid (Picture 1) */}
            <div className="absolute top-0 left-0 z-20 w-64">
              <Polaroid 
                src="https://i.imgur.com/orq6U0a.jpeg" 
                rotation="-rotate-6"
              >
                {/* Flower + Paperclip Decoration moved to right top corner */}
                <div className="absolute -top-8 -right-4 flex flex-col items-center pointer-events-none z-30">
                  <div className="relative z-10 text-4xl -mb-3 drop-shadow-sm">🌼</div>
                  <PinkPaperclip />
                </div>
              </Polaroid>
            </div>

            {/* Middle-right Polaroid (Picture 2) */}
            <div className="absolute top-1/4 right-0 z-10 w-64">
              <Polaroid 
                src="https://i.imgur.com/Z6q8Szg.jpeg" 
                rotation="rotate-3"
              >
                {/* Paw Print Decorations - tucked under the picture but on top of polaroid border */}
                <div className="absolute bottom-4 right-2 flex flex-col gap-1 opacity-70 pointer-events-none z-0 grayscale brightness-0">
                  <span className="text-xs -rotate-12 translate-x-2">🐾</span>
                  <span className="text-sm rotate-6">🐾</span>
                </div>
                <div className="absolute top-6 left-1 flex gap-2 opacity-50 pointer-events-none z-0 grayscale brightness-0">
                  <span className="text-[10px] rotate-[-20deg]">🐾</span>
                  <span className="text-[10px] translate-y-1">🐾</span>
                </div>
              </Polaroid>
            </div>

            {/* Bottom-left Polaroid (Picture 3) */}
            <div className="absolute bottom-8 left-12 z-30 w-64">
              <Polaroid 
                src="https://i.imgur.com/C4hzYwp.jpeg" 
                rotation="-rotate-2"
              >
                {/* Washi Tape Decoration moved to top left corner */}
                <WashiTape />
              </Polaroid>
            </div>
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="w-full md:w-1/2 text-left">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-serif-text mb-8 leading-tight">
            Hey, I'm <span className="font-script text-primary text-6xl md:text-7xl lg:text-8xl inline-block translate-y-2">Miruna</span>
          </h1>
          
          <div className="space-y-6 font-display text-lg text-serif-text/80 leading-relaxed">
            <p className="text-serif-text font-bold text-xl border-l-4 border-primary/40 pl-6 italic">
              A storyteller who happens to be really good at strategy.
            </p>
            
            <p>
              I've spent 5+ years turning messy briefs and half-formed ideas into content that actually lands. I've helped brands find voices that feel genuinely human, climbed Google's front page, and written everything from SEO campaigns to personal essays that make people feel something.
            </p>
            
            <p>
              Stories have always been my obsession, especially the kind that pull you in and don't let go. Which is why, in my free time, you'll find me either lost in a fantasy novel or 40 hours deep into an RPG I swore I'd finish "just one more quest" ago. And honestly? That's not separate from the work. It is the work. Great worldbuilding teaches me to make people care about something from scratch. To build a world so vivid they want to live in it. That's what I try to do with every piece I write, whether it's a brand narrative or a personal essay.
            </p>
            
            <p>
              My sweet spot is that space where creativity meets data, where a beautifully told story also drives real results. I've worked across tech, wellness, lifestyle, and real estate, and I thrive when I'm trusted to bring both heart and strategy to the table.
            </p>
            
            <p className="font-script text-3xl text-primary pt-4">
              If you're building something worth talking about, I'd love to help you find the words.
            </p>
          </div>

          <div className="mt-12">
            <Link to="/" className="inline-flex items-center group text-serif-text/40 hover:text-primary transition-colors">
              <span className="font-display text-[10px] uppercase tracking-widest font-bold">BACK TO GALLERY</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;