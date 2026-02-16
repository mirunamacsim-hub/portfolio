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
  isVertical?: boolean;
}> = ({ title, image, iframeSrc, link, children, footerLabel, isMedical = false, hideScroll = false, isWeb = false, isVertical = false }) => {
  const Content = (
    <div className={`bg-[#fdf8f1] p-0 polaroid-shadow overflow-hidden flex flex-col ${isVertical ? '' : 'md:flex-row md:min-h-[650px]'} h-full w-full max-w-5xl ${isWeb ? 'border-2 border-primary/20' : ''}`}>
      <div className={`${isVertical ? 'w-full h-[600px]' : 'md:w-[35%] h-[450px] md:h-auto md:border-r'} overflow-hidden border-b border-black/5 shrink-0 bg-white relative`}>
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
            className={`w-full h-full ${isVertical ? 'object-contain p-8' : 'object-cover'} transition-transform duration-700 group-hover:scale-105`}
          />
        )}
      </div>
      <div className={`${isVertical ? 'w-full' : 'md:w-[65%]'} p-10 text-[#1d1d1b] flex flex-col h-full relative bg-[#fdf8f1]`}>
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
      
      {/* Fixed Back Button - Smaller and accessible from any scroll position */}
      <Link 
        to={isWebDesignProject ? "/web-design" : "/diary"} 
        className="fixed top-24 left-8 z-[60] group flex items-center font-display hover:opacity-70 transition-opacity text-primary bg-site-bg/40 backdrop-blur-sm p-2 rounded-sm"
      >
        <span className="material-symbols-outlined text-base mr-2">arrow_back</span>
        <span className="uppercase tracking-[0.2em] text-[10px] font-bold border-b border-primary/30 pb-0.5 group-hover:border-primary transition-all">
          Back to {isWebDesignProject ? "Projects" : "Collection"}
        </span>
      </Link>

      <div className="max-w-6xl w-full px-12 z-10">
        <div className="flex flex-col items-start gap-8 py-12">
          {children}
        </div>
      </div>
    </main>
  );

  // Web Design Projects
  if (id === 'web-01') {
    const figmaProtoUrl = "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FEIfYUAE7nlZ829vCnl90ou%2FThe-Orange-Bus%3Fnode-id%3D2008-31%26p%3Df%26t%3DDG0dKOKq1T43aHDe-1%26scaling%3Dscale-down%26content-scaling%3Dfixed%26page-id%3D0%253A1%26starting-point-node-id%3D2008%253A31";

    return (
      <PageWrapper>
        <ProjectCard 
          title="The Orange Bus: branding & web design case study" 
          iframeSrc={figmaProtoUrl}
          isWeb={true}
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
              View the "Before" Concept
            </a>
          </div>
        </ProjectCard>
      </PageWrapper>
    );
  }

  // Web Card 2 - Wedding Planning App
  if (id === 'web-02' || id === '02') {
    const weddingProtoUrl = "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2Fih3rrMTYpGnqafRzKe3iKc%2FWedding-Planning-App---in-progress%3Fnode-id%3D3-2939%26t%3DwdngUEpYaCjXqU77-0%26scaling%3Dscale-down%26content-scaling%3Dfixed%26page-id%3D0%253A1%26starting-point-node-id%3D3%253A2939";

    return (
      <PageWrapper>
        <ProjectCard 
          title="Wedding Planning App: branding & design case study" 
          iframeSrc={weddingProtoUrl}
          isWeb={true}
        >
          <p>
            The app's visual system balances wedding industry elegance with clean usability. A soft blush background provides warmth without overwhelming, while rounded cards and gentle shadows create hierarchy. The design smartly integrates planning tools (colorful, illustrated cards for checklists and budget tracking) directly alongside vendor browsing, acknowledging that couples need both inspiration and organization in one place. Star ratings and high-quality vendor photography establish immediate credibility.
          </p>
          <p>
            The interface prioritizes scannable vendor discovery with image-led cards that communicate style and quality at a glance. Each category (flower shops, photographers, venues) uses consistent layouts with prominent imagery, vendor names, and ratings, allowing quick comparison. The photographer profiles intelligently include portfolio snippets and direct contact actions, reducing friction between discovery and outreach. A persistent bottom navigation keeps core functions (Home, Explore, Checklist, Sharing, Profile) always accessible.
          </p>
          <p>
            The integrated checklist feature demonstrates thoughtful UX that respects the wedding planning timeline. Tasks are organized by timeframe (12+ months, 9 months, 6-8 months, etc.) with clear checkboxes, turning an overwhelming to-do list into manageable phases. By combining vendor marketplace, planning tools, and progress tracking in one cohesive experience, the app becomes a daily companion rather than just a directory, reducing app-switching and keeping couples focused on their vision.
          </p>
        </ProjectCard>
      </PageWrapper>
    );
  }

  // Web Card 3 - Digest - a The Publics product
  if (id === 'web-03') {
    const platformProtoUrl = "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FeZ8mYj8ZG62Hfl9EOxfrgJ%2FUntitled%3Fnode-id%3D1-111%26t%3DwdngUEpYaCjXqU77-0%26scaling%3Dscale-down%26content-scaling%3Dfixed%26page-id%3D0%253A1%26starting-point-node-id%3D1%3A111";

    return (
      <PageWrapper>
        <ProjectCard 
          title="Digest - a The Publics product: branding & design case study" 
          iframeSrc={platformProtoUrl}
          isWeb={true}
        >
          <p>
            The platform's dark teal interface and vibrant gradient cards visually communicate its core mission: bridging text-based data systems with GenAI's multimodal capabilities. Each gradient represents transformation across formats, positioning the tool as built for the AI era rather than retrofitted from legacy systems.
          </p>
          <p>
            The interface prioritizes discovery over search, using familiar metaphors like bookshelves and libraries to make AI-powered curation feel intuitive. Curated collections ("Trending community bookshelves," "Top picks for you") surface content through algorithmic recommendations rather than manual filtering, allowing users to scan across text, visual, and conceptual dimensions simultaneously.
          </p>
          <p>
            Strategic UX decisions hide technical complexity behind approachable patterns. By designing for synthesis rather than retrieval, the platform aligns with how creative collaborators actually work: gathering inspiration across formats and remixing ideas, exactly what GenAI excels at, now with a human-centered interface.
          </p>
        </ProjectCard>
      </PageWrapper>
    );
  }

  // Web Card 4 - Invictus Labs
  if (id === 'web-04') {
    const invictusProtoUrl = "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2Fnv9egUKEFUQabduVgBjc0U%2FInvictus-Labs-Landing-Page%3Fnode-id%3D212-6%26t%3DkVOTl4l1RjE2x8Ze-0%26scaling%3Dscale-down%26content-scaling%3Dfixed%26page-id%3D0%253A1";

    return (
      <PageWrapper>
        <ProjectCard 
          title="Invictus Labs: branding & design case study" 
          iframeSrc={invictusProtoUrl}
          isWeb={true}
        >
          <p>
            The visual identity positions Invictus Labs as a credible technical solution in the Web3 space. A deep navy backdrop with molecular and network imagery establishes scientific rigor, while bright cyan accents provide energy without crypto hype. The design borrows from biotech and data visualization—DNA helixes, network graphs—to ground abstract DeFi concepts in tangible, trustworthy frameworks.
          </p>
          <p>
            The landing page follows a problem-solution-methodology flow with Web3-native sophistication. Iconographic cards quickly communicate pain points, while data visualizations demonstrate analytical depth. Strategic whitespace and modular sections create digestibility for complex topics, serving both technical and general audiences.
          </p>
          <p>
            Design decisions prioritize legitimacy in an industry plagued by opacity. Network logos and investor badges leverage social proof, while "Learn More" CTAs suggest confidence over urgency. The molecular metaphor for "Modeling the DNA of Web3 Lending" frames their quantitative approach as fundamental science rather than financial speculation—appealing to serious DeFi participants while remaining accessible to newcomers.
          </p>
        </ProjectCard>
      </PageWrapper>
    );
  }

  // Web Card 5 - witchy brew
  if (id === 'web-05') {
    return (
      <PageWrapper>
        <ProjectCard 
          title="witchy brew: logo design case study" 
          image="https://i.imgur.com/nlF8Sqi.png"
          isWeb={true}
          isVertical={true}
          footerLabel="logo design | mock project"
        >
          <p>The Witchy Brew identity playfully merges occult aesthetics with coffee culture through a whimsical illustration of a witch's boot stirring a steaming cup. The logo exists in two colorways, a moody dark version with cream illustration and a soft pink variant with purple accents, allowing flexibility across applications while maintaining brand recognition. The hand-drawn quality of the steam and boot creates approachability, preventing the witchy theme from feeling too dark or exclusive.</p>
          <p>Typography balances the playful concept with sophistication. The serif wordmark "witchy brew" uses elegant, slightly condensed letterforms that nod to apothecary-style branding without becoming overly mystical or illegible. The tagline "coffee, roastery & more" in clean sans-serif grounds the brand in its actual offering, ensuring customers understand this is a legitimate coffee business first, themed experience second.</p>
          <p>The dual colorway strategy demonstrates smart brand positioning. The dark version works for moody café interiors, packaging, and nighttime events, while the pink version appeals to a broader, Instagram-friendly audience and daytime retail contexts. This versatility allows Witchy Brew to attract both alternative culture enthusiasts and mainstream coffee lovers seeking something more memorable than generic café branding.</p>
        </ProjectCard>
      </PageWrapper>
    );
  }

  // Web Card 6 - Floof app
  if (id === 'web-06') {
    const floofProtoUrl = "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FIFBUa5WoXgK4BM4MEQrW7s%2FFloof-App%3Fnode-id%3D34-2904%26starting-point-node-id%3D34%253A2904";
    return (
      <PageWrapper>
        <ProjectCard 
          title="Floof: App Design Case Study" 
          iframeSrc={floofProtoUrl}
          isWeb={true}
          footerLabel="app design | mock project"
        >
          <p>The Floof brand identity leans fully into joy and approachability with playful bubble lettering, soft pastel backgrounds, and charming illustrated mascots. Each screen features adorable cartoon dogs and cats that convey warmth and personality, immediately signaling this isn't a sterile municipal adoption database, it's a community-driven platform that celebrates the emotional bond between pets and owners. The illustrated aesthetic makes pet adoption feel less intimidating and more like joining a loving ecosystem.</p>
          <p>The app architecture combines adoption discovery with comprehensive pet services, acknowledging that pet ownership is ongoing care, not just a single transaction. The "Find Your Furever Friend" interface uses visual-first pet cards with photos and key details (breed, age, gender, temperament), making browsing feel natural and delightful. The services section intelligently organizes offerings by category, bathing, grooming, dental, veterinary, with transparent pricing that builds trust. The friends list feature with real pet profiles creates social proof and community connection.</p>
          <p>Design decisions prioritize emotional engagement over clinical efficiency. Rounded corners, generous padding, and whimsical illustrations throughout maintain a consistent tone that reduces anxiety around pet adoption decisions. The bottom navigation keeps core functions (Home, Apps, Favorites, Messages, Profile) accessible, while the onboarding flow with illustrated mascots sets expectations for a friendly, supportive experience. Floof successfully positions pet adoption as the beginning of a joyful journey rather than a transactional necessity.</p>
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