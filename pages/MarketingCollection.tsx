import React, { useEffect, useState, useRef } from 'react';

const AnimatedCounter: React.FC<{ end: number; duration?: number; suffix?: string; prefix?: string }> = ({ end, duration = 2000, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
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
  image?: string;
}> = ({ tag, title, subtitle, section1Header, section1Copy, section2Header, section2Bullets, resultsHeader, resultsStats, quote, image }) => {
  return (
    <div className="group bg-[#fdfbf7] p-8 md:p-12 polaroid-shadow mb-16 last:mb-0 border border-slate-200">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3">
          <span className="font-display text-[10px] uppercase tracking-[0.3em] font-bold text-primary/60 mb-2 block">{tag}</span>
          <h3 className="font-display text-3xl md:text-4xl text-[#1d1d1b] font-bold leading-tight mb-4">{title}</h3>
          <p className="font-display italic text-xl text-slate-700 mb-8 border-l-4 border-primary/20 pl-6">{subtitle}</p>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h4 className="font-display text-sm uppercase tracking-wider font-bold text-primary mb-3">{section1Header}</h4>
              <p className="text-slate-600 leading-relaxed text-sm">{section1Copy}</p>
            </div>
            <div>
              <h4 className="font-display text-sm uppercase tracking-wider font-bold text-primary mb-3">{section2Header}</h4>
              <ul className="space-y-2">
                {section2Bullets.map((bullet, idx) => (
                  <li key={idx} className="text-slate-600 text-sm flex gap-3">
                    <span className="text-primary">•</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-slate-200">
            <h4 className="font-display text-sm uppercase tracking-wider font-bold text-primary mb-4">{resultsHeader}</h4>
            <div className="flex flex-wrap gap-4 items-center">
               <div className="px-6 py-3 bg-primary/5 rounded-full border border-primary/10">
                 <span className="font-display font-bold text-primary text-lg">{resultsStats}</span>
               </div>
            </div>
          </div>
        </div>

        <div className="lg:w-1/3 flex flex-col justify-center">
          <div className="relative p-6 bg-slate-50 border border-slate-200 rounded-sm italic">
            <span className="font-script text-primary text-6xl absolute -top-8 -left-2 opacity-20">"</span>
            <p className="font-script text-2xl text-slate-800 leading-snug pt-4">{quote}</p>
            <span className="font-script text-primary text-6xl absolute -bottom-12 -right-2 opacity-20 rotate-180">"</span>
          </div>
          {image && (
            <div className="mt-12 aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 rounded-sm">
              <img src={image} alt={title} className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const MarketingCollection: React.FC = () => {
  return (
    <div className="bg-site-bg min-h-screen pt-32 animate-fade-in overflow-x-hidden">
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
        <p className="font-script text-primary text-3xl">Real campaigns. Real numbers. Real messy lessons learned along the way.</p>
        <div className="h-px w-24 bg-primary mx-auto mt-12 opacity-30"></div>
      </section>

      {/* CASE STUDIES LIST */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <CaseStudy 
          tag="LANGUAGE EDUCATION • 2021-2022"
          title=" Greek & Green: Teaching Greek Through Nature... Until Nature Shut Down"
          subtitle="Building digital community for a brand that existed to get people offline"
          section1Header="The Mess"
          section1Copy="Greek & Green taught the Greek language through outdoor activities and nature-based learning. Think hiking while learning vocabulary, cooking outdoors, hands-on experiences. Then COVID hit. No more in-person. No more nature activities. The founder (who has a PhD in Outdoor Education) knew how to teach brilliantly in person, but had zero clue how to translate that magic to Instagram and keep students engaged through screens."
          section2Header="What I Actually Did"
          section2Bullets={[
            "Jumped in during the pandemic chaos to manage their Instagram and help transition online",
            "Figured out how to make language learning feel experiential when everyone was stuck at home",
            "Created content that brought the 'green' ethos into people's living rooms (Greek vocab through cooking, nature photos, cultural context)",
            "Tested different content approaches until we found what kept the community engaged despite lockdowns"
          ]}
          resultsHeader="What Happened"
          resultsStats="230% CTR Increase | 2x Lead-to-Conversion Rate | Community stayed engaged + growing through COVID"
          quote="Turns out you CAN teach an outdoor-based language program through a screen. You just have to get creative. We couldn't take students hiking, but we could show them nature, teach them to cook Greek recipes in their own kitchens, and build a community that felt connected even when isolated. The founder could focus on teaching; I made sure people found her and actually showed up."
          image="https://i.pinimg.com/736x/8e/3c/6f/8e3c6f0976378e916a0f6721597a73ba.jpg"
        />

        <CaseStudy 
          tag="B2B TECH • 2021-2022"
          title="Yardi: Writing for 100+ Properties Without Sounding Like a Robot"
          subtitle="What I learned writing 1,500+ pages of property marketing copy that had to rank and convert"
          section1Header="The Job"
          section1Copy="One property, every day. Five pages each time: home, amenities, photos, map, floor plans. 300-400 words per page, all custom. The process meant researching each neighborhood thoroughly—nearby parks, shopping centers, major roads, local events—then figuring out what made this specific property worth renting over the competition. Every piece had to incorporate SEO keywords naturally while reading like actual human writing, not template copy. I also managed monthly social calendars for select properties, scheduling Facebook and Instagram content around national holidays and area-specific events."
          section2Header="The Challenge"
          section2Bullets={[
            "You can only describe 'luxury finishes' so many ways before every property sounds identical",
            "SEO keywords had to rank high and sound like a human actually wrote them",
            "Every neighborhood needed deep research: parks, stores, transit, events, competitor buildings",
            "Monthly social calendars tying in national holidays and hyperlocal events"
          ]}
          resultsHeader="What Happened"
          resultsStats="10+ Pages on Page 1 | 100+ Properties | 1,500+ Pages Written | 30% Organic Traffic Increase | 57% Better Retention"
          quote="I got really good at finding the one interesting thing about a property—the dog park, the rooftop view, the fact that there's a Trader Joe's 5 minutes away and building the entire narrative around that. Because nobody wakes up excited to read about 'modern finishes and stainless steel appliances.' They want to know: can I walk to get coffee? Is there parking? Will I hate living here? Answer those questions well, and Google will reward you for it."
          image="https://i.pinimg.com/736x/f6/0c/da/f60cda5dfd800186df464653691b5d75a9.jpg"
        />

        <CaseStudy 
          tag="WELLNESS TECH • 2020-2021"
          title="Mauna: Introducing Mindfulness to a Market That Had Never Heard of It"
          subtitle="My first social media job: teaching Romanians about meditation while learning social media myself"
          section1Header="The Situation"
          section1Copy="Romania's first meditation app. Everything was in Romanian: the interface, the guided meditations, the therapists. The founders were trying to introduce an entire concept (mindfulness meditation) to a market where it basically didn't exist yet. Oh, and this was my first-ever social media role. So I had no idea what I was doing, the market had no idea what mindfulness was, and we had to figure it out together."
          section2Header="What I Did"
          section2Bullets={[
            "Managed Facebook and Instagram with zero prior social media experience (fake it till you make it)",
            "Designed all posts in Canva, wrote captions, researched hashtags, learned as I went",
            "Put myself in the audience's shoes: what would make ME curious about meditation if I'd never tried it?",
            "Researched mindfulness topics deeply so I could educate, not just promote"
          ]}
          resultsHeader="The Numbers"
          resultsStats="175% Engagement Increase | 1,200+ Community Members | 4 Micro-Influencers Joined"
          quote="The engagement spike was real. People were curious, the community was growing. But introducing an entirely new wellness concept to a market takes time and money. The founders ran out of both after 6 months and shut it down. I learned more about social media strategy in those 6 months than most people learn in 2 years, because I had to figure out everything from scratch with no playbook to follow."
          image="https://i.pinimg.com/736x/91/92/37/91923761352936787836363636363636.jpg"
        />

        <CaseStudy 
          tag="BUSINESS MEDIA • 2023-2025"
          title="Business Review: Making Corporate Announcements Actually Readable"
          subtitle="What I learned editing 2,000+ press releases and interviewing CEOs for Romania's top business publication"
          section1Header="The Job"
          section1Copy="Business Review is Romania's leading business publication with 30K+ daily newsletter subscribers. My role: edit every press release that came through (2,000+ over 2 years), compile the most important business news each day for the newsletter, write speaker announcement articles for monthly business conferences, manage Facebook and LinkedIn distribution, and conduct interviews with CEOs, business owners, HR managers, artists, and policymakers. Essentially: take corporate speak and turn it into something humans would actually want to read."
          section2Header="The Challenge"
          section2Bullets={[
            "Press releases are written to sound important, not to be readable. Had to fix that daily",
            "Curating a daily newsletter meant deciding what 30K+ busy professionals actually needed to know",
            "LinkedIn and Facebook need completely different approaches for the same story",
            "Conducting executive interviews and repurposing them across multiple social formats",
            "Managing multi-platform distribution while keeping brand voice consistent"
          ]}
          resultsHeader="The Impact"
          resultsStats="2,000+ Press Releases Edited | Multiple Executive Interviews Conducted | Daily Newsletter for 30K+ Subscribers"
          quote="I got really good at finding the actual story buried in corporate jargon. Every press release thinks it's announcing something revolutionary. Most aren't. My job was figuring out what actually mattered, who should care, why it matters now, what changes for readers, and making that the lead. The interviews were the fun part: getting CEOs and policymakers to talk like humans instead of LinkedIn bios."
          image="https://i.pinimg.com/736x/2b/e4/fb/2be4fb34ddd18b94fbd37471ac089bdc.jpg"
        />
      </section>

      <footer className="py-24 text-center opacity-30">
        <p className="font-display tracking-[0.3em] uppercase text-xs text-serif-text">Miruna Macsim ✦ Marketing Case Studies ✦ 2024</p>
      </footer>
    </div>
  );
};

export default MarketingCollection;