import React from 'react';
import { Link } from 'react-router-dom';

const WebDesignCollection: React.FC = () => {
  const projects = [
    {
      id: 'web-01',
      title: 'The Orange Bus',
      img: 'https://i.imgur.com/lrXBumX.png',
      tag: 'branding & web design',
      rot: '-rotate-2'
    },
    {
      id: 'web-02',
      title: 'Wedding Planning App',
      img: 'https://i.imgur.com/dRWSQIl.png',
      tag: 'app design | mock project',
      rot: 'rotate-1'
    },
    {
      id: 'web-03',
      title: 'Digest - a The Publics product',
      img: 'https://i.imgur.com/Xqngld5.png',
      tag: 'branding & web design | startup',
      rot: '-rotate-1'
    },
    {
      id: 'web-04',
      title: 'Invictus Labs',
      img: 'https://i.imgur.com/jIn7iZ0.png',
      tag: 'branding & web design | startup',
      rot: 'rotate-2'
    },
    {
      id: 'web-05',
      title: 'witchy brew',
      img: 'https://i.imgur.com/W669QSW.png',
      tag: 'logo design | mock project',
      rot: '-rotate-2'
    },
    {
      id: 'web-06',
      title: 'Floof app',
      img: 'https://i.imgur.com/tm8zwQ0.png',
      tag: 'app design | mock project',
      rot: 'rotate-1'
    }
  ];

  return (
    <div className="bg-site-bg min-h-screen pt-16 animate-fade-in">
      {/* BACK BUTTON */}
      <div className="max-w-[1440px] mx-auto px-12 pt-8">
        <Link to="/" className="inline-flex items-center gap-2 group text-serif-text/40 hover:text-primary transition-colors">
          <span className="font-display text-[10px] uppercase tracking-widest">Back</span>
        </Link>
      </div>

      {/* BROWSER VIEWPORT HEADER */}
      <section className="max-w-[1440px] mx-auto px-12 pt-16 pb-12 flex flex-col items-center">
        <div className="w-full max-w-5xl bg-[#fdfbf7] rounded-lg shadow-2xl overflow-hidden border border-slate-200">
          {/* Browser Toolbar Area */}
          <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-400"></div>
              <div className="w-3 h-3 rounded-full bg-amber-400"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
            </div>
            <div className="hidden md:flex bg-white px-4 py-1.5 rounded text-[10px] font-sans text-slate-400 items-center gap-2 border border-slate-200 w-1/2">
              <span className="material-symbols-outlined text-xs">lock</span>
              mirunamacsim.studio/pixels-and-colors
            </div>
            <div className="w-12"></div>
          </div>
          
          {/* Browser Main Body Content */}
          <div className="p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 bg-[#fdfbf7] relative overflow-hidden">
            {/* Subtle Blueprint Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1d1d1b 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }}></div>
            
            <div className="md:w-1/2 z-10">
              <h1 className="font-script text-7xl text-primary leading-none mb-6">Pixels & Colors</h1>
              <p className="font-display italic text-4xl text-[#1d1d1b] leading-tight mb-8">
                The architecture of the virtual world...
              </p>
              <p className="text-slate-600 font-sans leading-relaxed text-sm max-w-md">
                I build digital homes that are as functional as they are beautiful. My process blends rigorous UX research with an editorial aesthetic to create seamless, responsive experiences that breathe life into a brand's digital presence.
              </p>
            </div>
            
            <div className="md:w-1/2 relative z-10">
              <div className="relative group p-2 bg-white shadow-lg rounded-sm border border-slate-200">
                <img 
                  alt="Web Design Workspace" 
                  src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=800&q=80" 
                  className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                {/* Decorative Cursor Mockup */}
                <div className="absolute -top-4 -right-4 bg-primary text-white p-2 rounded shadow-xl animate-bounce">
                   <span className="material-symbols-outlined text-lg">near_me</span>
                </div>
                {/* Decorative Color Swatches */}
                <div className="absolute -bottom-6 -left-6 bg-white p-2.5 rounded shadow-xl border border-slate-100 flex gap-2">
                   <div className="w-5 h-5 rounded-sm bg-primary"></div>
                   <div className="w-5 h-5 rounded-sm bg-site-bg"></div>
                   <div className="w-5 h-5 rounded-sm bg-[#457b9d]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="text-center mb-20">
          <h2 className="font-display text-5xl md:text-7xl mb-4 text-serif-text">Projects</h2>
          <span className="font-script text-primary text-3xl">digital architecture & design</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 xl:gap-8 max-w-7xl mx-auto">
          {projects.map((item) => (
            <div 
              key={item.id} 
              className={`group flex flex-col items-center transform ${item.rot} hover:rotate-0 hover:-translate-y-2 transition-all duration-500`}
            >
              <div className="bg-[#fdfbf7] p-3 pb-8 polaroid-shadow w-full flex flex-col h-full">
                <div className="aspect-[3/2] overflow-hidden mb-4 bg-slate-100">
                  <img 
                    alt={item.title} 
                    src={item.img} 
                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" 
                  />
                </div>
                <div className="px-1 flex-grow">
                  <span className="font-script text-primary text-2xl block mb-1 leading-none">{item.tag}</span>
                  <h3 className="font-display text-xl text-[#1d1d1b] leading-tight font-bold h-12 flex items-center">{item.title}</h3>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link 
                    to={`/project/${item.id}`}
                    className="inline-block w-full text-center py-2 bg-primary text-white font-display uppercase tracking-widest text-[10px] hover:bg-primary/90 transition-colors"
                  >
                    View Case Study
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-12 text-center opacity-30">
        <p className="font-display tracking-[0.3em] uppercase text-xs text-serif-text">Miruna Macsim ✦ Web Portfolio 2024</p>
      </footer>
    </div>
  );
};

export default WebDesignCollection;