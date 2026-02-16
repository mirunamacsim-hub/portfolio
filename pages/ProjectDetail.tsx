import React from 'react';
import { useParams, Link } from 'react-router-dom';

const StarField: React.FC = () => {
  const stars = React.useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 15 + 10,
      delay: Math.random() * -20,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star-particle bg-white"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            top: `${star.top}%`,
            left: `${star.left}%`,
            opacity: 0.15,
            animation: `floatingStar ${star.duration}s infinite ease-in-out`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const ProjectCard: React.FC<{
  title: string;
  image?: string;
  iframeSrc?: string;
  link?: string;
  children: React.ReactNode;
  footerLabel?: string;
  isMedical?: boolean;
  hideScroll?: boolean;
  isWeb?: boolean;
}> = ({ title, image, iframeSrc, link, children, footerLabel, isMedical = false, hideScroll = false, isWeb = false }) => {
  const Content = (
    <div className={`bg-[#fdf8f1] p-0 polaroid-shadow overflow-hidden flex flex-col md:flex-row h-full md:min-h-[550px] w-full max-w-5xl ${isWeb ? 'border-2 border-primary/20' : ''}`}>
      <div className="md:w-1/2 h-[400px] md:h-auto overflow-hidden border-b md:border-b-0 md:border-r border-black/5 shrink-0 bg-white relative">
        {iframeSrc ? (
          <iframe 
            src={iframeSrc}
            className="w-full h-full border-0 absolute inset-0"
            allowFullScreen
            title={title}
          />
        ) : (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
      </div>
      <div className="md:w-1/2 p-10 text-[#1d1d1b] flex flex-col h-full relative bg-[#fdf8f1]">
        <div className={`${hideScroll ? 'overflow-hidden' : 'overflow-y-auto'} pr-4 flex-grow ${isMedical ? 'delicate-scrollbar show-scroll-indicator' : (hideScroll ? '' : 'scrollbar-thin scrollbar-thumb-primary/20')}`}>
          <h2 className={`font-display text-3xl font-bold mb-6 leading-tight ${isWeb ? 'text-primary italic' : 'text-primary'}`}>{title}</h2>
          <div className="font-display text-base leading-relaxed text-slate-800 space-y-6">
            {children}
          </div>
        </div>
        
        {footerLabel && (
          <div className="mt-8 pt-4 border-t border-slate-200 shrink-0">
            <span className={`font-display text-[11px] uppercase tracking-[0.25em] font-bold text-primary`}>
              {footerLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="group block w-full max-w-5xl transform transition-transform hover:-translate-y-2 duration-500 mb-12">
        {Content}
      </a>
    );
  }

  return (
    <div className="group block w-full max-w-5xl transform transition-transform hover:-translate-y-2 duration-500 mb-12">
      {Content}
    </div>
  );
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams();

  const isWebDesignProject = id && id.startsWith('web-');

  const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <main className={`relative min-h-screen pt-32 pb-24 flex flex-col items-center animate-fade-in overflow-hidden bg-site-bg`}>
      <StarField />
      <div className="max-w-6xl w-full px-12 z-10">
        <Link 
          to={isWebDesignProject ? "/web-design" : "/diary"} 
          className={`group inline-flex items-center font-display mt-12 mb-20 hover:opacity-70 transition-opacity text-primary`}
        >
          <span className={`uppercase tracking-[0.4em] text-[15px] font-bold border-b-2 pb-2 border-primary`}>
            Back to {isWebDesignProject ? "Archive" : "Collection"}
          </span>
        </Link>
        <div className="flex flex-col items-start gap-8 py-12">
          {children}
        </div>
      </div>
    </main>
  );

  // Web Design Projects
  if (id === 'web-01') {
    // Figma Prototype URL
    const figmaProtoUrl = "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FEIfYUAE7nlZ829vCnl90ou%2FThe-Orange-Bus%3Fnode-id%3D2008-31%26p%3Df%26t%3DDG0dKOKq1T43aHDe-1%26scaling%3Dscale-down%26content-scaling%3Dfixed%26page-id%3D0%253A1%26starting-point-node-id%3D2008%253A31";

    return (
      <PageWrapper>
        <ProjectCard 
          title="The Orange Bus: Branding & Web Design Case Study" 
          iframeSrc={figmaProtoUrl}
          isWeb={true}
          footerLabel="Digital Experience & Brand Transformation"
        >
          <p>
            The Orange Bus brand identity blends vintage VW nostalgia with contemporary design through a warm color palette of oranges, creams, and browns pulled from classic 1970s buses. Clean typography and sun-drenched lifestyle photography position the service as a premium experience rather than a commodity, while playful retro touches keep the brand approachable and fun.
          </p>
          <p>
            The website prioritizes visual storytelling with large, immersive imagery and a streamlined booking flow—view packages, check availability, book. Subtle design elements like rounded corners and warm gradients maintain the vintage aesthetic while modern UX patterns ensure the experience feels professional and intuitive across all devices.
          </p>
          <p>
            The result is a cohesive digital presence that extends the brand experience beyond the physical bus, making the booking process as memorable as the photo booth itself.
          </p>
          <div className="pt-4">
            <a 
              href="https://cabinefoto.ro/bw-photo-bus/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-display italic text-primary font-bold border-b border-primary/30 pb-1 hover:border-primary transition-all"
            >
              <span className="material-symbols-outlined text-sm">history</span>
              View the "Before" Concept
            </a>
          </div>
        </ProjectCard>
      </PageWrapper>
    );
  }

  if (id === 'web-02') {
    return (
      <PageWrapper>
        <ProjectCard 
          title="studio archive" 
          image="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
          isWeb={true}
          footerLabel="UI/UX + React Animation Case Study"
        >
          <p>A digital home for a high-energy creative agency. This project was a playground for custom animations and bold typography.</p>
          <p>Built with React and GSAP, the site features fluid transitions and a horizontal scrolling portfolio that mimics the experience of flipping through a physical archive.</p>
        </ProjectCard>
      </PageWrapper>
    );
  }

  if (id === 'web-03') {
    return (
      <PageWrapper>
        <ProjectCard 
          title="mindful app" 
          image="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80"
          isWeb={true}
          footerLabel="App Design + UX Research"
        >
          <p>Wellness app focused on mental health and daily journaling. The UX research phase identified a need for "calm design"—avoiding notification fatigue and using soothing gradients.</p>
          <p>The prototype includes mood tracking, guided meditations, and a secure, private journaling space with voice-to-text integration.</p>
        </ProjectCard>
      </PageWrapper>
    );
  }

  if (id === 'web-04') {
    return (
      <PageWrapper>
        <ProjectCard 
          title="frequency festival" 
          image="https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&w=800&q=80"
          isWeb={true}
          footerLabel="Event Branding + Interactive Site"
        >
          <p>Event branding and marketing site for an annual experimental music festival. We pushed the visual limits with neon colors and glitch effects to match the festival's cutting-edge vibe.</p>
          <p>The site features a real-time artist lineup that updates based on the festival schedule and an interactive 3D map of the grounds.</p>
        </ProjectCard>
      </PageWrapper>
    );
  }

  // Legacy IDs
  if (id === '01') {
    return (
      <PageWrapper>
        <ProjectCard title="Real Estate Archive" image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" link="https://www.brixleyapartments.com/" footerLabel="Visit Website">
          <p>Luxury residential development in Florida. The design emphasizes modern aesthetics and community ease of navigation.</p>
        </ProjectCard>
      </PageWrapper>
    );
  }

  if (id === '02') {
    return (
      <PageWrapper>
        <ProjectCard title="GERD Medical Report" image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80" isMedical={true}>
          <p>Gastroesophageal reflux disease (GERD) is a common condition characterized by the reflux of gastric contents back into the esophagus.</p>
        </ProjectCard>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="text-center py-20">
        <h1 className="font-display text-4xl font-bold italic uppercase">Project Insight</h1>
        <p className="mt-8 text-serif-text/40">Content coming soon...</p>
      </div>
    </PageWrapper>
  );
};

export default ProjectDetail;