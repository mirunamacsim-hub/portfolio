import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

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

interface Article {
  title: string;
  image: string;
  preview: string | React.ReactNode;
  link?: string;
  isFullText?: boolean;
}

const ArticleCard: React.FC<Article> = ({ title, image, preview, link, isFullText = false }) => {
  const CardContent = (
    <div className="bg-[#fdf8f1] p-0 polaroid-shadow overflow-hidden flex flex-col md:flex-row h-[320px] w-full border border-black/5 group-hover:border-primary/20 transition-colors">
      <div className="md:w-[40%] h-full shrink-0 bg-white relative border-r border-black/5 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
        />
      </div>
      <div className="md:w-[60%] p-6 text-[#1d1d1b] flex flex-col h-full bg-[#fdf8f1]">
        <h2 className="font-display text-xl font-bold mb-3 text-primary leading-tight line-clamp-2">{title}</h2>
        <div className={`flex-grow pr-2 ${isFullText ? 'overflow-y-auto delicate-scrollbar show-scroll-indicator pr-4' : 'overflow-hidden'}`}>
          <div className={`font-display text-sm leading-relaxed text-slate-800 ${isFullText ? 'space-y-3' : 'line-clamp-[5]'}`}>
            {preview}
          </div>
        </div>
        {!isFullText && link && (
          <div className="mt-3 pt-3 border-t border-slate-200">
             <span className="font-display text-[9px] uppercase tracking-[0.2em] font-bold text-primary/60 group-hover:text-primary transition-colors">
               Read article →
             </span>
          </div>
        )}
      </div>
    </div>
  );

  if (link && !isFullText) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="group block w-full transform transition-transform hover:-translate-y-1 duration-500 mb-8 last:mb-0">
        {CardContent}
      </a>
    );
  }

  return (
    <div className="group block w-full transform transition-transform hover:-translate-y-1 duration-500 mb-8 last:mb-0">
      {CardContent}
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
  isWeb?: boolean;
  isVertical?: boolean;
}> = ({ title, image, iframeSrc, link, children, footerLabel, isWeb = false, isVertical = false }) => {
  const Content = (
    <div className={`bg-[#fdf8f1] p-0 polaroid-shadow overflow-hidden flex flex-col ${isVertical ? '' : 'md:flex-row md:min-h-[500px]'} h-full w-full max-w-4xl ${isWeb ? 'border-2 border-primary/20' : ''}`}>
      <div className={`${isVertical ? 'w-full h-[500px]' : 'md:w-[40%] h-[350px] md:h-auto md:border-r'} overflow-hidden border-b border-black/5 shrink-0 bg-white relative`}>
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
      <div className={`${isVertical ? 'w-full' : 'md:w-[60%]'} p-8 text-[#1d1d1b] flex flex-col h-full relative bg-[#fdf8f1]`}>
        <div className="overflow-y-auto pr-4 flex-grow scrollbar-thin scrollbar-thumb-primary/20">
          <h2 className={`font-display text-2xl font-bold mb-4 leading-tight ${isWeb ? 'text-primary italic' : 'text-primary'}`}>{title}</h2>
          <div className="font-display text-sm leading-relaxed text-slate-800 space-y-4">
            {children}
          </div>
        </div>
        
        {footerLabel && (
          <div className="mt-6 pt-3 border-t border-slate-200 shrink-0">
            <span className={`font-display text-[10px] uppercase tracking-[0.25em] font-bold text-primary`}>
              {footerLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="group block w-full max-w-4xl transform transition-transform hover:-translate-y-2 duration-500 mb-10">
        {Content}
      </a>
    );
  }

  return (
    <div className="group block w-full max-w-4xl transform transition-transform hover:-translate-y-2 duration-500 mb-10">
      {Content}
    </div>
  );
};

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isWebDesignProject = id && id.startsWith('web-');

  const backPath = isWebDesignProject ? '/web-design' : '/diary';

  const PageWrapper: React.FC<{ children: React.ReactNode; categoryTitle?: string }> = ({ children, categoryTitle }) => (
    <main className="relative min-h-screen pt-32 pb-24 flex flex-col items-center animate-fade-in overflow-hidden bg-site-bg">
      <StarField />
      
      {/* BACK BUTTON */}
      <div className="max-w-3xl w-full px-8 mb-8 z-20">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 group text-serif-text/40 hover:text-primary transition-colors">
          <span className="font-display text-[10px] uppercase tracking-widest">Back</span>
        </button>
      </div>

      <div className="max-w-3xl w-full px-8 z-10 flex flex-col items-center">
        {categoryTitle && (
          <div className="text-center mb-12">
            <h1 className="font-display text-3xl text-serif-text uppercase tracking-[0.2em] mb-2">{categoryTitle}</h1>
            <div className="h-px w-16 bg-primary mx-auto"></div>
          </div>
        )}
        {children}
      </div>
    </main>
  );

  // --- Real Estate (01) ---
  if (id === '01') {
    return (
      <PageWrapper categoryTitle="Real Estate">
        <ArticleCard 
          title="Brixley Apartments"
          image="https://capi.myleasestar.com/v2/dimg/145070051/1536x695/145070051.jpg"
          link="https://www.brixleyapartments.com/"
          preview="Welcome to Brixley Apartments in Bradenton, Florida—a place where luxury meets convenience in a stunning new residential development. Wrapped in the warmth of the Florida sun and surrounded by meticulously landscaped gardens, our apartments offer a first-class living experience. At Brixley Apartments, every day is infused with a touch of luxury, from the modern architectural designs to the high-end amenities tailored for comfort and style."
        />
      </PageWrapper>
    );
  }

  // --- Medical (02) ---
  if (id === '02') {
    return (
      <PageWrapper categoryTitle="Medical">
        <ArticleCard 
          isFullText={true}
          title="Gastroesophageal reflux disease (GERD)"
          image="https://i.pinimg.com/1200x/b0/42/58/b04258d61b50af98e14e5242dde3ca0f.jpg"
          preview={
            <>
              <p>Gastroesophageal reflux disease (GERD) is a common condition characterized by the reflux of gastric food contents back into the esophagus. Reflux can cause damage not only to the esophagus but also to the pharynx or upper respiratory tract.</p>
              <h3 className="font-bold text-base mt-4">Causes</h3>
              <p>Disruption of the lower esophageal sphincter path can result in reflux. Hiatal hernias also contribute by allowing abdominal organs to slide through the diaphragm.</p>
              <h3 className="font-bold text-base mt-4">Symptoms</h3>
              <p>Main symptom is heartburn, a burning sensation in the chest and regurgitation of sour fluid.</p>
              <h3 className="font-bold text-base mt-4">Treatment</h3>
              <p>Lifestyle changes (smoking cessation, weight loss) and medical treatment (antiacids) are primary. Surgical options like fundoplication exist for persistent cases.</p>
            </>
          }
        />
        <ArticleCard 
          isFullText={true}
          title="The Ultimate 6 Food Industry Trends in 2022"
          image="https://i.pinimg.com/1200x/b7/53/c6/b753c6a3f341b26be2ea5c7364104fb5.jpg"
          preview={
            <>
              <p>COVID-19 precipitated shifts in consumer behavior that remain today, with 85% of Americans making changes in their eating habits during the pandemic.</p>
              <h3 className="font-bold text-base">1. Reducetarianism</h3>
              <p>Alternatives like lentils and soy milk offer an easy way to cut back on meat and dairy without noticing it too much.</p>
              <h3 className="font-bold text-base">2. CBD Trend</h3>
              <p>A multibillion-dollar sector that continues to grow as one of the most studied natural remedies in the world.</p>
              <h3 className="font-bold text-base">3. Plant-based diet</h3>
              <p>Focuses on foods primarily from plants: fruits, vegetables, nuts, whole grains, and beans.</p>
            </>
          }
        />
      </PageWrapper>
    );
  }

  // --- Lifestyle (03) ---
  if (id === '03') {
    return (
      <PageWrapper categoryTitle="Lifestyle">
        <ArticleCard 
          title="5 Ideas to Start Your Personal Development Journey"
          image="https://i.pinimg.com/736x/35/5a/91/355a91965bc951fca77a4ce0154b9a3b.jpg"
          link="https://inspirenow.ro/2021/08/20/5-idei-pentru-a-incepe-procesul-de-dezvoltare-personala/"
          preview="While Netflix & Chill sounds appealing, especially as a student with free time, will it truly benefit you to spend all your time watching shows? Instead, try activities that will benefit your future while still keeping up with the latest films."
        />
        <ArticleCard 
          title="Discovering Inner Peace"
          image="https://i.pinimg.com/736x/a4/51/90/a4519025b891314b3ac33eb263b461ee.jpg"
          link="https://inspirenow.ro/2020/12/21/descopera-linistea-interioara/"
          preview="Meditation is a mental exercise that trains attention and the ability to anchor oneself in the present. Its purpose is to find a balance between the emotions and thoughts that arise in daily life."
        />
        <ArticleCard 
          title="5 Ways to Build Self-Confidence"
          image="https://i.pinimg.com/736x/1d/12/2b/1d122b670fddba98689e5e17c900e7c3.jpg"
          link="https://inspirenow.ro/2021/11/03/5-metode-care-te-vor-ajuta-sa-iti-construiesti-increderea-in-tine/"
          preview="It's easy to think everyone around you knows exactly what they're doing and feels very confident, but rest assured, that's far from the truth."
        />
        <ArticleCard 
          title="How to Overcome Procrastination?"
          image="https://i.pinimg.com/736x/46/0e/31/460e3173bb13f5c25736ecabd178d0f6.jpg"
          link="https://inspirenow.ro/2021/03/04/cum-sa-invingi-procrastinarea/"
          preview="After careful consideration, I’ve resolved that my goal for this year is to develop both personally and professionally, sharing ideas, information, and my experiences."
        />
      </PageWrapper>
    );
  }

  // --- Creative Non-Fiction (04) ---
  if (id === '04') {
    return (
      <PageWrapper categoryTitle="Creative Non-Fiction">
        {[
          { title: "i tried to talk to myself this morning", link: "https://substack.com/@mirunaaaa/p-174419877", preview: "the season shift brought with it an amalgam of feelings. some days i am in awe of the natural beauty that surrounds me — the colors, the textures.", img: "https://substackcdn.com/image/fetch/$s_!d9ar!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F27430fee-7417-435a-8d6d-0874082204f9_970x508.jpeg" },
          { title: "6 brutal ways the wrong partner poisons your body and mind", link: "https://substack.com/@mirunaaaa/p-173924357", preview: "six years in a relationship that looked ordinary from the outside left me with a body i didn’t recognize, a mind that betrayed me.", img: "https://substackcdn.com/image/fetch/$s_!5hoV!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F4f217406-c949-4af0-b3c3-543db3c0c666_736x385.jpeg" },
          { title: "you're too narcissistic to change yourself", link: "https://substack.com/@mirunaaaa/p-172883900", preview: "growing up, love was never soft. it was sharp, manipulative, something dangled in front of me like a prize i had to earn.", img: "https://substackcdn.com/image/fetch/$s_!FNnM!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fa148e774-77a3-4b53-8cfa-d3807e190148_654x342.jpeg" },
          { title: "your content is ruining my fall aesthetic!", link: "https://substack.com/@mirunaaaa/p-172777997", preview: "there’s something incredibly nostalgic about the start of the fall season. not even a week in and my thoughts — and feed — are crowded.", img: "https://substackcdn.com/image/fetch/$s_!4ekR!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Ff66cbca5-6bac-49e2-912f-d2b640e938c2_1200x675.jpeg" },
          { title: "I hate myself for still missing you", link: "https://substack.com/@mirunaaaa/p-171872857", preview: "5 nights of silence and it feels like I’ve been left for dead. the truth is, the ache set it mere hours after the last words. I’d grown addicted to the way you filled my mornings, to the tiny pulse of your messages keeping me alive.", img: "https://substackcdn.com/image/fetch/$s_!6ZrR!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F541c0abd-ebdf-4813-b3f8-f80ed1fb5237_511x383.jpeg" },
          { title: "la vie en totally broke", link: "https://substack.com/@mirunaaaa/p-171551237", preview: "This particular tale began, as many great tragedies do, with ambition, a modest salary, and the unmistakable scent of chocolate buttercream.", img: "https://substackcdn.com/image/fetch/$s_!Eaui!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F1e6c0e44-471f-4fce-a420-6fd2cdc7a65e_736x493.jpeg" },
          { title: "the struggle of comparison", link: "https://substack.com/@mirunaaaa/p-171351771", preview: "my entire life i’ve felt like i’m floating. no direction, no purpose, no map, just drifting in my own little bubble of chaos.", img: "https://substackcdn.com/image/fetch/$s_!W8uw!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fcf778a25-c967-4b3d-90b5-3d7a1b432407_736x487.jpeg" },
          { title: "courted, confused, and perpetually amused", link: "https://substack.com/@mirunaaaa/p-171255183", preview: "It began, as most stories do, with good intentions, a desire for a fun time, and very short shorts. A gentleman caller I had the pleasure of meeting at a ball two days prior appeared into my inbox.", img: "https://substackcdn.com/image/fetch/$s_!K2Bv!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb0401be4-bc04-4551-8c47-b769ac856d6b_736x608.jpeg" },

        ].map((item, idx) => (
          <ArticleCard key={idx} title={item.title} image={item.img} link={item.link} preview={item.preview} />
        ))}
      </PageWrapper>
    );
  }

  // --- Interviews (05) ---
  if (id === '05') {
    return (
      <PageWrapper categoryTitle="Interviews">
        <ArticleCard 
          title="Figeac is not just as a vineyard, but a legacy in every bottle"
          image="https://i.pinimg.com/736x/b0/c4/e1/b0c4e1b8f501dc878523460422dcc6ab.jpg"
          link="https://business-review.eu/profiles1/interviews-interviews/blandine-de-brier-manoncourt-co-owner-of-chateau-figeac-figeac-is-not-just-as-a-vineyard-but-a-legacy-in-every-bottle-254895"
          preview="Blandine de Brier Manoncourt, co-owner of Château-Figeac, delved into the nuances and challenges of the wine industry while exploring unique qualities."
        />
        <ArticleCard 
          title="Behind Stefanini EMEA Success: Marco Stefanini and Farlei Kothe"
          image="https://media.business-review.eu/unsafe/420x250/smart/filters:contrast(5):quality(80)/business-review.eu/wp-content/uploads/2023/10/Screenshot-2023-10-20-at-11.00.13-AM.png"
          link="https://business-review.eu/profiles1/interviews-interviews/stefaninis-growth-and-innovation-an-insiders-view-with-marco-stefanini-and-farlei-kothe-252896"
          preview="Marco Stefanini and Farlei Kothe shared their insights on digital transformation, starting a business at a young age, and Stefanini’s evolution."
        />
         <ArticleCard 
          title="Shaping the Future of Work: Bruno Szarf and Andreea Miron on Stefanini’s Talent Strategy in Romania"
          image="https://i.pinimg.com/736x/e4/92/e2/e492e220e29851b54d39b03aad133605.jpg"
          link="https://business-review.eu/profiles1/interviews-interviews/shaping-the-future-of-work-bruno-szarf-and-andreea-miron-on-stefaninis-talent-strategy-in-romania-258067"
          preview="Bruno Szarf, the newly appointed Global CHRO at Stefanini, alongside Andreea Miron, HR EMEA Director, unveil their strategies for navigating the Romanian recruitment landscape. Together, they shed light on Stefanini’s unique approach to talent investment and development, the challenges and opportunities on the horizon, and the innovative programs in place to nurture the company’s workforce."
        />
      </PageWrapper>
    );
  }

  // Web Design Projects
  if (id?.startsWith('web-')) {
    if (id === 'web-01') {
      const figmaProtoUrl = "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FEIfYUAE7nlZ829vCnl90ou%2FThe-Orange-Bus%3Fnode-id%3D2008-31%26p%3Df%26t%3DDG0dKOKq1T43aHDe-1%26scaling%3Dscale-down%26content-scaling%3Dfixed%26page-id%3D0%253A1%26starting-point-node-id%3D2008%253A31";
      return (
        <PageWrapper>
          <ProjectCard title="The Orange Bus: branding & web design" iframeSrc={figmaProtoUrl} isWeb={true}>
            <p>The Orange Bus brand identity blends vintage VW nostalgia with contemporary design. The result is a cohesive digital presence that extends the brand experience beyond the physical bus.</p>
          </ProjectCard>
        </PageWrapper>
      );
    }
    if (id === 'web-02') {
        const weddingProtoUrl = "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2Fih3rrMTYpGnqafRzKe3iKc%2FWedding-Planning-App---in-progress%3Fnode-id%3D3-2939%26t%3DwdngUEpYaCjXqU77-0%26scaling%3Dscale-down%26content-scaling%3Dfixed%26page-id%3D0%253A1%26starting-point-node-id%3D3%253A2939";
        return (
          <PageWrapper>
            <ProjectCard title="Wedding Planning App" iframeSrc={weddingProtoUrl} isWeb={true}>
              <p>The app's visual system balances wedding industry elegance with clean usability. It combines vendor marketplace, planning tools, and progress tracking.</p>
            </ProjectCard>
          </PageWrapper>
        );
      }
    
      if (id === 'web-03') {
        const platformProtoUrl = "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FeZ8mYj8ZG62Hfl9EOxfrgJ%2FUntitled%3Fnode-id%3D1-111%26t%3DwdngUEpYaCjXqU77-0%26scaling%3Dscale-down%26content-scaling%3Dfixed%26page-id%3D0%253A1%26starting-point-node-id%3D1%3A111";
        return (
          <PageWrapper>
            <ProjectCard title="Digest - a The Publics product" iframeSrc={platformProtoUrl} isWeb={true}>
              <p>Bridging text-based data systems with GenAI's multimodal capabilities through a synthesis-focused interface.</p>
            </ProjectCard>
          </PageWrapper>
        );
      }
    
      if (id === 'web-04') {
        const invictusProtoUrl = "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2Fnv9egUKEFUQabduVgBjc0U%2FInvictus-Labs-Landing-Page%3Fnode-id%3D212-6%26t%3DkVOTl4l1RjE2x8Ze-0%26scaling%3Dscale-down%26content-scaling%3Dfixed%26page-id%3D0%253A1";
        return (
          <PageWrapper>
            <ProjectCard title="Invictus Labs" iframeSrc={invictusProtoUrl} isWeb={true}>
              <p>Legitimacy and rigorous quantitative modeling for DeFi lending protocols, framed through scientific molecular metaphors.</p>
            </ProjectCard>
          </PageWrapper>
        );
      }
    
      if (id === 'web-05') {
        return (
          <PageWrapper>
            <ProjectCard title="witchy brew" image="https://i.imgur.com/nlF8Sqi.png" isWeb={true} isVertical={true}>
              <p>Playfully merges occult aesthetics with coffee culture through whimsical illustration and apothecary-inspired typography.</p>
            </ProjectCard>
          </PageWrapper>
        );
      }
    
      if (id === 'web-06') {
        const floofProtoUrl = "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FIFBUa5WoXgK4BM4MEQrW7s%2FFloof-App%3Fnode-id%3D34-2904%26starting-point-node-id%3D34%253A2904";
        return (
          <PageWrapper>
            <ProjectCard title="Floof App" iframeSrc={floofProtoUrl} isWeb={true}>
              <p>Joyful pet adoption and comprehensive pet services with a community-driven, illustrated ecosystem.</p>
            </ProjectCard>
          </PageWrapper>
        );
      }
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