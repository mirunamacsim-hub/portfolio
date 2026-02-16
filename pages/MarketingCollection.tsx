import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const AnimatedCounter: React.FC<{ end: number; duration?: number; suffix?: string; prefix?: string }> = ({ end, duration = 2000, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    let animationFrame: number;
    
    const animate = (currentTime: number) => {
      if (!startTime.current) startTime.current = currentTime;
      const progress = Math.min((currentTime - startTime.current) / duration, 1);
      
      const currentCount = Math.floor(progress * end);
      setCount(currentCount);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <span className="font-display font-bold text-4xl md:text-5xl text-primary">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const CornerOrnament: React.FC<{ position: 'tl' | 'tr' | 'bl' | 'br' }> = ({ position }) => {
  const rotation = {
    tl: 'rotate-0',
    tr: 'rotate-90',
    bl: '-rotate-90',
    br: 'rotate-180',
  }[position];

  const posClass = {
    tl: 'top-1 left-1',
    tr: 'top-1 right-1',
    bl: 'bottom-1 left-1',
    br: 'bottom-1 right-1',
  }[position];

  return (
    <div className={`absolute ${posClass} ${rotation} pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-700`}>
      <svg width="64" height="64" viewBox="0 0 100 100" fill="currentColor" className="text-primary">
        <path d="M12.5,42.4c-2.2-4.1-3.4-8.7-3.4-13.6c0-15.5,12.6-28.1,28.1-28.1c11.3,0,21.1,6.7,25.5,16.3c-2.5-3.6-6.6-6-11.3-6 c-7.7,0-13.9,6.2-13.9,13.9c0,5.7,3.5,10.7,8.4,12.8c-10.4-1.2-18.4-9.9-18.4-20.5c0-11.4,9.2-20.6,20.6-20.6c1.9,0,3.7,0.3,5.4,0.7 c-4.6-1.5-9.6-2.4-14.7-2.4c-22.1,0-40,17.9-40,40c0,11,4.4,21,11.6,28.3L12.5,42.4z" />
        <path d="M42.4,12.5c-4.1-2.2-8.7-3.4-13.6-3.4c-15.5,0-28.1,12.6-28.1,28.1c0,11.3,6.7,21.1,16.3,25.5c-3.6-2.5-6-6.6-6-11.3 c0-7.7,6.2-13.9,13.9-13.9c5.7,0,10.7,3.5,12.8,8.4c-1.2-10.4-9.9-18.4-20.5-18.4c-11.4,0-20.6,9.2-20.6,20.6c0,1.9,0.3,3.7,0.7,5.4 c-1.5-4.6-2.4-9.6-2.4-14.7c0-22.1,17.9-40,40-40c11,0,21,4.4,28.3,11.6L42.4,12.5z" />
        <path d="M15.4,15.4c-1.3,1.3-1.6,3.3-0.7,4.9l4.3,7.5l7.5,4.3c1.6,0.9,3.6,0.6,4.9-0.7c1.3-1.3,1.6-3.3,0.7-4.9l-4.3-7.5 l-7.5-4.3C18.7,13.8,16.7,14.1,15.4,15.4z" />
        <path d="M85,5c2.8,0,5,2.2,5,5s-2.2,5-5,5c-4.3,0-8.2,1.3-11.3,3.4C71.5,10.9,77.7,5,85,5z" />
        <path d="M5,85c0,2.8,2.2,5,5,5s5-2.2,5-5c0-4.3,1.3-8.2,3.4-11.3C10.9,71.5,5,77.7,5,85z" />
      </svg>
    </div>
  );
};

const CaseStudy: React.FC<{
  tag: string;
  title: string;
  subtitle: string;
  section1Header: string;
  section1Copy: string;
  section2Header: string;
  section2Bullets: string[];
  resultsHeader: string;
  resultsStats: string;
  quote: string;
}> = ({ tag, title, subtitle, section1Header, section1Copy, section2Header, section2Bullets, resultsHeader, resultsStats, quote }) => {
  return (
    <div className="group relative bg-[#fdfbf7] p-8 md:p-12 polaroid-shadow mb-16 last:mb-0 border border-slate-200">
      {/* Corner Ornaments */}
      <CornerOrnament position="tl" />
      <CornerOrnament position="tr" />
      <CornerOrnament position="bl" />
      <CornerOrnament position="br" />

      <div className="mb-10 relative z-10">
        <span className="font-display text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-2 block">{tag}</span>
        <h3 className="font-display text-3xl md:text-4xl text-[#1d1d1b] font-bold leading-tight mb-4">{title}</h3>
        <p className="font-display italic text-xl text-slate-700 border-l-4 border-primary/20 pl-6">{subtitle}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start relative z-10">
        {/* Column 1: The Job */}
        <div>
          <h4 className="font-display text-sm uppercase tracking-wider font-bold text-primary mb-3">{section1Header}</h4>
          <p className="text-slate-600 leading-relaxed text-sm">{section1Copy}</p>
        </div>

        {/* Column 2: What I Did */}
        <div>
          <h4 className="font-display text-sm uppercase tracking-wider font-bold text-primary mb-3">{section2Header}</h4>
          <ul className="space-y-2">
            {(section2Bullets || []).map((bullet, idx) => (
              <li key={idx} className="text-slate-600 text-sm flex gap-3">
                <span className="text-primary">•</span>
                {bullet}
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: The Quote */}
        <div className="relative p-6 bg-slate-50 border border-slate-200 rounded-sm italic">
          <span className="font-display text-primary text-4xl absolute -top-3 -left-1 opacity-20">"</span>
          <p className="font-display text-base text-slate-800 leading-relaxed relative z-10">{quote}</p>
          <span className="font-display text-primary text-4xl absolute -bottom-6 -right-1 opacity-20 rotate-180">"</span>
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
        <h4 className="font-display text-sm uppercase tracking-wider font-bold text-primary shrink-0">{resultsHeader}</h4>
        <div className="flex flex-wrap gap-4 items-center">
           <div className="px-6 py-2 bg-primary/5 rounded-full border border-primary/10 w-full md:w-auto text-center">
             <span className="font-display font-bold text-primary text-base whitespace-nowrap">{resultsStats}</span>
           </div>
        </div>
      </div>
    </div>
  );
};

const MarketingCollection: React.FC = () => {
  return (
    <div className="bg-site-bg min-h-screen pt-32 animate-fade-in overflow-x-hidden">
      {/* BACK BUTTON */}
      <div className="max-w-6xl mx-auto px-12 pb-8">
        <Link to="/" className="inline-flex items-center group text-serif-text/40 hover:text-primary transition-colors">
          <span className="font-display text-[10px] uppercase tracking-widest font-bold">BACK</span>
        </Link>
      </div>

      {/* 4-STAT GRID */}
      <section className="max-w-6xl mx-auto px-12 mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center p-8 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
            <AnimatedCounter end={2000} suffix="+" />
            <span className="text-xs uppercase tracking-widest text-serif-text/60 mt-4 block">press releases edited at Business Review</span>
          </div>
          <div className="flex flex-col items-center text-center p-8 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
            <AnimatedCounter end={175} suffix="%" />
            <span className="text-xs uppercase tracking-widest text-serif-text/60 mt-4 block">engagement boost at Mauna app</span>
          </div>
          <div className="flex flex-col items-center text-center p-8 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
            <AnimatedCounter end={230} suffix="%" />
            <span className="text-xs uppercase tracking-widest text-serif-text/60 mt-4 block">CTR increase for Greek & Green</span>
          </div>
          <div className="flex flex-col items-center text-center p-8 bg-white/5 border border-white/10 rounded-lg backdrop-blur-sm">
            <AnimatedCounter end={30} suffix="%" />
            <span className="text-xs uppercase tracking-widest text-serif-text/60 mt-4 block">organic traffic growth at Yardi</span>
          </div>
        </div>
      </section>

      {/* CASE STUDIES HEADER */}
      <section className="max-w-4xl mx-auto px-12 text-center mb-24">
        <h1 className="font-display text-5xl md:text-7xl mb-6 text-serif-text">The Work That <br/><span className="italic">Actually</span> Worked</h1>
        <p className="font-script text-primary text-3xl">real messy lessons learned along the way.</p>
        <div className="h-px w-24 bg-primary mx-auto mt-12 opacity-30"></div>
      </section>

      {/* CASE STUDIES LIST */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <CaseStudy 
          tag="LANGUAGE EDUCATION • 2021-2022"
          title=" Greek & Green: Teaching Greek Through Nature... Until Nature Shut Down"
          subtitle="Building digital community for a brand that existed to get people offline"
          section1Header="The Job"
          section1Copy="Greek & Green taught the Greek language through outdoor activities and nature-based learning. Think hiking while learning vocabulary, cooking outdoors, hands-on experiences. Then COVID hit. No more in-person. No more nature activities. The founder (who has a PhD in Outdoor Education) knew how to teach brilliantly in person, but had zero clue how to translate that magic to Instagram and keep students engaged through screens."
          section2Header="What I Did"
          section2Bullets={[
            "Jumped in during the pandemic chaos to manage their Instagram and help transition online",
            "Figured out how to make language learning feel experiential when everyone was stuck at home",
            "Created content that brought the 'green' ethos into people's living rooms (Greek vocab through cooking, nature photos, cultural context)",
            "Tested different content approaches until we found what kept the community engaged despite lockdowns"
          ]}
          resultsHeader="What Happened"
          resultsStats="230% CTR Increase | 2x Lead-to-Conversion Rate | Community growth through COVID"
          quote="Turns out you CAN teach an outdoor-based language program through a screen. You just have to get creative. We couldn't take students hiking, but we could show them nature, teach them to cook Greek recipes in their own kitchens, and build a community that felt connected even when isolated."
        />

        <CaseStudy 
          tag="B2B TECH • 2021-2022"
          title="Yardi: Writing for 100+ Properties Without Sounding Like a Robot"
          subtitle="What I learned writing 1,500+ pages of property marketing copy that had to rank and convert"
          section1Header="The Job"
          section1Copy="One property, every day. Five pages each time: home, amenities, photos, map, floor plans. 300-400 words per page, all custom. The process meant researching each neighborhood thoroughly—nearby parks, shopping centers, major roads, local events—then figuring out what made this specific property worth renting over the competition. Every piece had to incorporate SEO keywords naturally while reading like actual human writing, not template copy."
          section2Header="What I Did"
          section2Bullets={[
            "You can only describe 'luxury finishes' so many ways before every property sounds identical",
            "SEO keywords had to rank high and sound like a human actually wrote them",
            "Every neighborhood needed deep research: parks, stores, transit, events, competitor buildings",
            "Monthly social calendars tying in national holidays and hyperlocal events"
          ]}
          resultsHeader="What Happened"
          resultsStats="10+ Pages on Page 1 | 100+ Properties Managed | 1,500+ Pages Written"
          quote="I got really good at finding the one interesting thing about a property—the dog park, the rooftop view, the fact that there's a Trader Joe's 5 minutes away—and building the entire narrative around that."
        />

        <CaseStudy 
          tag="WELLNESS TECH • 2020-2021"
          title="Mauna: Introducing Mindfulness to a Market That Had Never Heard of It"
          subtitle="My first social media job: teaching Romanians about meditation while learning social media myself"
          section1Header="The Job"
          section1Copy="Romania's first meditation app. Everything was in Romanian: the interface, the guided meditations, the therapists. The founders were trying to introduce an entire concept (mindfulness meditation) to a market where it basically didn't exist yet."
          section2Header="What I Did"
          section2Bullets={[
            "Managed Facebook and Instagram with zero prior social media experience",
            "Designed all posts in Canva, wrote captions, researched hashtags, learned as I went",
            "Put myself in the audience's shoes: what would make ME curious about meditation?",
            "Researched mindfulness topics deeply so I could educate, not just promote"
          ]}
          resultsHeader="What Happened"
          resultsStats="175% Engagement Increase | 1,200+ Community Members | 4 Micro-Influencers Joined"
          quote="The engagement spike was real. People were curious, the community was growing. But introducing an entirely new wellness concept to a market takes time. I learned more about social media strategy in those 6 months than most people learn in 2 years."
        />

        <CaseStudy 
          tag="BUSINESS MEDIA • 2023-2025"
          title="Business Review: Making Corporate Announcements Actually Readable"
          subtitle="What I learned editing 2,000+ press releases and interviewing CEOs for Romania's top business publication"
          section1Header="The Job"
          section1Copy="Business Review is Romania's leading business publication with 30K+ daily newsletter subscribers. My role: edit every press release that came through (2,000+ over 2 years), compile the most important business news each day for the newsletter, and conduct interviews with key industry leaders."
          section2Header="What I Did"
          section2Bullets={[
            "Press releases are written to sound important, not to be readable. Had to fix that daily",
            "Curating a daily newsletter meant deciding what 30K+ busy professionals actually needed to know",
            "LinkedIn and Facebook need completely different approaches for the same story",
            "Conducting executive interviews and repurposing them across multiple formats"
          ]}
          resultsHeader="What Happened"
          resultsStats="2,000+ Press Releases Edited | Multiple Executive Interviews | 30K+ Newsletter Audience"
          quote="I got really good at finding the actual story buried in corporate jargon. Every press release thinks it's announcing something revolutionary. My job was figuring out who should care, why it matters now, and making that the lead."
        />
      </section>

      <footer className="py-24 text-center opacity-30">
        <p className="font-display tracking-[0.3em] uppercase text-xs text-serif-text">Miruna Macsim ✦ Marketing Case Studies ✦ 2024</p>
      </footer>
    </div>
  );
};

export default MarketingCollection;