
import React from 'react';
import { Link } from 'react-router-dom';

const DiaryCollection: React.FC = () => {
  const collections = [
    { id: '01', title: 'Real Estate', img: 'https://picsum.photos/seed/realestate-miruna/800/1000', rot: '-rotate-2' },
    { id: '02', title: 'Medical', img: 'https://picsum.photos/seed/medical-miruna/800/1000', rot: 'rotate-1' },
    { id: '03', title: 'Lifestyle', img: 'https://picsum.photos/seed/lifestyle-miruna/800/1000', rot: '-rotate-1' },
    { id: '04', title: 'Creative Non-Fiction', img: 'https://picsum.photos/seed/writing-miruna/800/1000', rot: 'rotate-2' },
    { id: '05', title: 'Interviews', img: 'https://picsum.photos/seed/interview-miruna/800/1000', rot: '-rotate-1' },
  ];

  return (
    <div className="bg-site-bg min-h-screen pt-32 animate-fade-in">
      {/* POSTCARD SECTION */}
      <section className="max-w-[1440px] mx-auto px-12 py-12 flex flex-col items-center">
        {/* Postcard tilted at a more pronounced angle as requested */}
        <div className="relative w-full max-w-6xl bg-[#fdf8f1] p-1 shadow-2xl transform rotate-[-3deg]">
          <div className="postcard-border"></div>
          {/* Reduced min-height to make the postcard shorter and more rectangular */}
          <div className="relative bg-[#fdf8f1] p-12 md:p-16 flex flex-col md:flex-row min-h-[550px]">
            {/* Left side: POST Background */}
            <div className="w-full md:w-1/2 flex items-center justify-center relative border-b md:border-b-0 md:border-r border-gray-300">
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
                <span className="text-8xl font-display uppercase tracking-[2rem] text-[#1d1d1b]">POST</span>
              </div>
              <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-full opacity-40"></div>
            </div>
            
            {/* Right side: Matches provided reference image exactly */}
            <div className="w-full md:w-1/2 flex flex-col p-8 md:pl-16 h-full justify-between">
              {/* Box 1: Top of the line, aligned left */}
              <div className="text-left pt-2">
                <h1 className="font-script text-6xl text-primary leading-tight">Diary Notes</h1>
              </div>
              
              {/* Box 2: Middle of the line, aligned left */}
              <div className="text-left py-8">
                <p className="font-display italic text-4xl text-[#1d1d1b] leading-tight max-w-sm">
                  There is a particular kind of magic in the ink that bleeds...
                </p>
              </div>
              
              {/* Box 3: End of the line, aligned left */}
              <div className="text-left pb-4">
                <p className="text-slate-600 font-sans leading-relaxed text-sm max-w-md">
                  My personal essays trace the architecture of emotion, gathering the unsaid, the unresolved, and the vulnerable into something tangible. I write to remember what it feels like to be alive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 py-24">
        <div className="text-center mb-20">
          <h2 className="font-display text-5xl md:text-7xl mb-4 text-serif-text">The Collection</h2>
          <span className="font-script text-primary text-3xl">curated works & projects</span>
        </div>

        {/* Horizontal Row for All Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 xl:gap-8">
          {collections.map((item) => (
            <div 
              key={item.id} 
              className={`group flex flex-col items-center transform ${item.rot} hover:rotate-0 hover:-translate-y-2 transition-all duration-500`}
            >
              <div className="bg-[#fdfbf7] p-3 pb-8 polaroid-shadow w-full flex flex-col h-full">
                {/* Changed aspect-ratio from [4/5] to [3/2] to make images and cards shorter */}
                <div className="aspect-[3/2] overflow-hidden mb-4 bg-slate-100">
                  <img 
                    alt={item.title} 
                    src={item.img} 
                    className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100" 
                  />
                </div>
                <div className="px-1 flex-grow">
                  <span className="font-script text-primary text-2xl block mb-1 leading-none">index_{item.id}</span>
                  <h3 className="font-display text-xl text-[#1d1d1b] leading-tight font-bold h-12 flex items-center">{item.title}</h3>
                </div>
                {/* Button container: only visible on hover */}
                <div className="mt-4 pt-4 border-t border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link 
                    to={`/project/${item.id}`}
                    className="inline-block w-full text-center py-2 bg-primary text-white font-display uppercase tracking-widest text-[10px] hover:bg-primary/90 transition-colors"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-12 text-center opacity-30">
        <p className="font-display tracking-[0.3em] uppercase text-xs text-serif-text">Miruna Macsim — 2024</p>
      </footer>
    </div>
  );
};

export default DiaryCollection;
