import React from 'react';
import { Link } from 'react-router-dom';

const DiaryCollection: React.FC = () => {
  const collections = [
    { 
      id: '01', 
      title: 'Real Estate', 
      img: 'https://i.pinimg.com/1200x/a6/c2/91/a6c291b9aa480d3b6ceb5395ba37637e.jpg', 
      rot: '-rotate-2' 
    },
    { 
      id: '02', 
      title: 'Wedding Planning App', 
      img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80', 
      rot: 'rotate-1' 
    },
    { 
      id: '03', 
      title: 'Lifestyle', 
      img: 'https://i.pinimg.com/736x/e9/80/3f/e9803f7a2ef4205eba77d45f997ef01a.jpg', 
      rot: '-rotate-1' 
    },
    { 
      id: '04', 
      title: 'Creative Non-Fiction', 
      img: 'https://i.pinimg.com/1200x/2b/e4/fb/2be4fb34ddd18b94fbd37471ac089bdc.jpg', 
      rot: 'rotate-2' 
    },
    { 
      id: '05', 
      title: 'Interviews', 
      img: 'https://i.pinimg.com/736x/9e/9e/33/9e9e332172056d9b149d25a0b28bf351.jpg', 
      rot: '-rotate-1' 
    },
  ];

  return (
    <div className="bg-site-bg min-h-screen pt-16 animate-fade-in">
      {/* POSTCARD SECTION */}
      <section className="max-w-[1440px] mx-auto px-12 py-6 flex flex-col items-center">
        {/* Made the container less wide (max-w-5xl) */}
        <div className="relative w-full max-w-5xl bg-[#fdf8f1] p-1 shadow-2xl transform rotate-[-3deg]">
          <div className="postcard-border"></div>
          <div className="relative bg-[#fdf8f1] p-4 md:p-6 flex flex-col md:flex-row min-h-[140px] items-stretch">
            {/* Left side - Image centered vertically, background removed */}
            <div className="w-full md:w-1/3 flex items-center justify-center p-4 relative border-b md:border-b-0 md:border-r border-gray-300 overflow-hidden">
              <img 
                alt="A piece from the Archives" 
                src="https://i.imgur.com/0Al4IsT.png" 
                className="w-full h-full object-contain"
              />
            </div>
          
            {/* Right side - Text aligned left */}
            <div className="w-full md:w-2/3 flex flex-col p-0 md:pl-16 justify-between py-1 text-left">
              {/* Restored left alignment for the title */}
              <div className="text-left">
                <h1 className="font-script text-6xl text-primary leading-none">Diary Notes</h1>
              </div>
              
              {/* Aligned with Middle of Image */}
              <div className="text-left py-1">
                <p className="font-display italic text-4xl text-[#1d1d1b] leading-tight max-w-sm">
                  There is a particular kind of magic in the ink that bleeds...
                </p>
              </div>
              
              {/* Raised slightly from the very bottom */}
              <div className="text-left">
                <p className="text-slate-600 font-sans leading-relaxed text-sm max-w-md">
                  My personal essays trace the architecture of emotion, gathering the unsaid, the unresolved, and the vulnerable into something tangible. I write to remember what it feels like to be alive.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="text-center mb-20">
          <h2 className="font-display text-5xl md:text-7xl mb-4 text-serif-text">The Collection</h2>
          <span className="font-script text-primary text-3xl">curated works & projects</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 xl:gap-8">
          {collections.map((item) => (
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
                  <span className="font-script text-primary text-2xl block mb-1 leading-none">index_{item.id}</span>
                  <h3 className="font-display text-xl text-[#1d1d1b] leading-tight font-bold h-12 flex items-center">{item.title}</h3>
                </div>
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