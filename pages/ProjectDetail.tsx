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

// Standardized Card Component
const ProjectCard: React.FC<{
  title: string;
  image: string;
  link?: string;
  children: React.ReactNode;
  footerLabel?: string;
  isMedical?: boolean;
  hideScroll?: boolean;
}> = ({ title, image, link, children, footerLabel, isMedical = false, hideScroll = false }) => {
  const Content = (
    <div className="bg-[#fdf8f1] p-0 polaroid-shadow overflow-hidden flex flex-col md:flex-row h-full md:h-[350px] w-full max-w-5xl">
      <div className="md:w-1/3 h-48 md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-black/5 shrink-0">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="md:w-2/3 p-10 text-[#1d1d1b] flex flex-col h-full relative">
        <div className={`${hideScroll ? 'overflow-hidden' : 'overflow-y-auto'} pr-4 flex-grow ${isMedical ? 'delicate-scrollbar show-scroll-indicator' : (hideScroll ? '' : 'scrollbar-thin scrollbar-thumb-primary/20')}`}>
          <h2 className="font-display text-3xl font-bold mb-4 text-primary leading-tight">{title}</h2>
          <div className="font-display text-base leading-relaxed text-slate-800 space-y-4">
            {children}
          </div>
        </div>
        
        {footerLabel && (
          <div className="mt-4 pt-4 border-t border-slate-200 shrink-0">
            <span className="font-display text-primary text-[11px] uppercase tracking-[0.25em] font-bold">
              {footerLabel}
            </span>
          </div>
        )}
        
        {isMedical && (
          <div className="absolute bottom-2 right-4 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
            <span className="material-icons-outlined text-sm">unfold_more</span>
          </div>
        )}
      </div>
    </div>
  );

  if (link) {
    return (
      <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="group block w-full max-w-5xl transform transition-transform hover:-translate-y-2 duration-500 mb-12"
      >
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

  const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <main className="relative min-h-screen pt-32 pb-24 bg-site-bg flex flex-col items-center animate-fade-in overflow-hidden">
      <StarField />
      <div className="max-w-6xl w-full px-12 z-10">
        <Link to="/diary" className="group inline-flex items-center text-primary font-display mt-12 mb-20 hover:opacity-70 transition-opacity">
          <span className="uppercase tracking-[0.4em] text-[15px] font-bold border-b-2 border-primary pb-2">Back to Collection</span>
        </Link>
        <div className="flex flex-col items-start gap-8 py-12">
          {children}
        </div>
      </div>
    </main>
  );

  // Real Estate
  if (id === '01') {
    return (
      <PageWrapper>
        <ProjectCard 
          title="Brixley Apartments" 
          image="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
          link="https://www.brixleyapartments.com/"
          footerLabel="Visit Website"
        >
          <p>Welcome to Brixley Apartments in Bradenton, Florida—a place where luxury meets convenience in a stunning new residential development. Wrapped in the warmth of the Florida sun and surrounded by meticulously landscaped gardens, our apartments offer a first-class living experience.</p>
        </ProjectCard>
      </PageWrapper>
    );
  }

  // Medical
  if (id === '02') {
    return (
      <PageWrapper>
        <ProjectCard 
          title="Gastroesophageal reflux disease (GERD)" 
          image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
          isMedical={true}
        >
          <p>Gastroesophageal reflux disease (GERD) is a common condition in the general population, characterized by the reflux of gastric food contents back into the esophagus. Esophageal reflux occurs physiologically over short periods of time and is considered pathological when it causes symptoms or damage to the esophageal mucosa. Reflux can damage not only the esophagus but also the pharynx or upper respiratory tract (vocal cords, trachea, bronchi).</p>
          <p>Most people can manage the discomfort caused by GERD through lifestyle changes and over-the-counter medication. But some people with GERD may need stronger medications or surgery to alleviate symptoms.</p>
          
          <div className="pt-2">
            <h3 className="font-bold text-xl mb-2">Causes</h3>
            <h4 className="font-bold text-lg mb-2">Disordered eating patterns</h4>
            <p>To understand what's going on, it's necessary to explain some anatomy and physiology. When feeding, after food is chewed and swallowed, it passes through a tube called the esophagus, which connects the mouth to the stomach. Between the esophagus and the stomach is the lower esophageal sphincter, which is a muscular ring that allows solid or liquid food to pass into the stomach, without allowing it to return along the route it has taken. Food then leaves the stomach through another sphincter called the pylorus, which is the structure between the stomach and the duodenum. Thus, disruption of this food pathway for various reasons can result in reflux.</p>
          </div>

          <div className="pt-2">
            <h4 className="font-bold text-lg mb-2">Hiatal hernia</h4>
            <p>A hiatal hernia is a type of hernia in which the abdominal organs (usually the stomach) slide through the diaphragm into the middle compartment of the chest. This can result in gastroesophageal reflux disease (GERD) or laryngopharyngeal reflux, with symptoms such as a retrosternal burning sensation and an acidic taste.</p>
          </div>

          <div className="pt-2">
            <h3 className="font-bold text-xl mb-2">Risk factors</h3>
            <p>Risk factors for gastroesophageal reflux disease include:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Alcohol consumption;</li>
              <li>Obesity;</li>
              <li>Pregnancy;</li>
              <li>Smoking;</li>
              <li>Eating certain foods such as citrus fruits, chocolate, caffeine, fats, spices, and chili peppers. Taking medicines such as aspirin, diazepam, estrogen, and progesterone.</li>
            </ul>
          </div>

          <div className="pt-2">
            <h3 className="font-bold text-xl mb-2">Symptoms</h3>
            <p>The main symptom of GERD is heartburn, often described as a burning sensation in the chest and regurgitation of sour or bitter fluid into the throat or mouth. The combination of heartburn and regurgitation is such a common feature of GERD that formal tests may be unnecessary.</p>
            <p>Other GERD symptoms include:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Chest pain without burning, which is usually located in the middle of the chest and radiates to the back;</li>
              <li>Difficulty swallowing (dysphagia);</li>
              <li>Atypical reflux symptoms related to the ENT sphere (pharynx, larynx, airways): sore throat, coughing, increased salivation, and shortness of breath.</li>
            </ul>
          </div>

          <div className="pt-2">
            <h3 className="font-bold text-xl mb-2">Treatment</h3>
            <p>If you experience heartburn or other GERD-specific symptoms lately, it is advisable to schedule a consultation with a doctor specializing in internal medicine or gastroenterology. If you are diagnosed with GERD, your doctor will initially recommend lifestyle changes and medication. If after at least 8 weeks of treatment, there is no improvement in symptoms, the doctor will reassess the situation and reconsider treatment.</p>
          </div>

          <div className="pt-2">
            <h4 className="font-bold text-lg mb-2">Lifestyle changes</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Smoking cessation;</li>
              <li>Avoiding alcohol consumption;</li>
              <li>Weight loss (if necessary);</li>
              <li>Avoiding lying flat for at least 3 hours after eating;</li>
              <li>Eating small, frequent meals.</li>
            </ul>
          </div>

          <div className="pt-2">
            <h4 className="font-bold text-lg mb-2">Medical treatment</h4>
            <p>Prescribed medications include:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Antiacids (neutralizes gastric acid) - Rennie, Maalox;</li>
              <li>Drugs that reduce acid production (H2 receptor antagonists) - Ranitidine, Famotidine;</li>
              <li>Drugs that block acid production (proton pump inhibitors) - Omez, Nexium, Controloc;</li>
              <li>Agents that strengthen the lower esophageal sphincter and promote faster emptying of the stomach (prokinetics) - Metoclopramide, Domperidone.</li>
            </ul>
          </div>

          <div className="pt-2">
            <h4 className="font-bold text-lg mb-2">Surgical treatment</h4>
            <p className="mb-4"><strong>Laparoscopic fundoplication:</strong> Surgery is recommended in patients who show no improvement after optimal drug therapy and lifestyle changes or who develop complications. In this procedure, the lower esophageal sphincter is strengthened by making a valve from the stomach walls wrapped around the terminal esophagus. This has the effect of preventing gastric reflux into the esophagus by increasing the efficiency of the lower esophageal sphincter.</p>
            <p><strong>Gastric bypass surgery:</strong> In the case of advanced esophageal lesions or if the reflux is maintained by high body weight, then the operation aimed at controlling the reflux and eliminating the predisposing factor - obesity, is laparoscopic bariatric surgery of the Roux-en-Y gastric bypass type performed laparoscopically.</p>
          </div>

          <p className="pt-4 italic">Although gastroesophageal reflux is a physiological phenomenon encountered throughout the day, it may become problematic when it occurs frequently or is accompanied by chest pain or other specific symptoms, leading to GERD. Implementing a balanced lifestyle may be enough to prevent this condition.</p>
        </ProjectCard>

        <ProjectCard 
          title="The Ultimate 6 Food Industry Trends in 2022" 
          image="https://images.unsplash.com/photo-1490818387583-1baba5e6382b?auto=format&fit=crop&w=800&q=80"
          isMedical={true}
        >
          <p>Although the impact of COVID-19 tested the resilience of the food supply chain and heightened food insecurity, it also precipitated shifts in consumer behavior that will likely remain for quite some time.</p>
          <p>A 2020 <a href="https://foodinsight.org/wp-content/uploads/2020/06/IFIC-Food-and-Health-Survey-2020.pdf" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">survey</a> from the International Food Information Council (IFIC) found that 85% of Americans made changes in their eating habits during the pandemic, indicating an increased awareness concerning nutrition and its impact on health.</p>
          <p>After a stressful 2020, many people have used food as a means of comfort. The food trends of 2021 point toward better health for our bodies, planet, and wallets. But what has changed this year? Though some 2021 trends are still around, 2022 brings us new ideas and new lifestyles to try!</p>
          
          <div className="pt-2">
            <h3 className="font-bold text-xl mb-2">Reducetarianism Trend</h3>
            <p>If you're thinking of going plant-based but aren't really ready to give up meat, dairy, and eggs, then this is the food trend for you. If you decide to give this a try, a surprisingly easy way to cut back on your meat and dairy intake without noticing it too much is by introducing alternatives. Adding lentils, beans, and other vegetarian forms of protein into your diet is already a great way to eat less. It can even be as simple as switching from cow’s milk to soy, almond, or coconut milk in the mornings.</p>
          </div>

          <div className="pt-2">
            <h3 className="font-bold text-xl mb-2">CBD Trend</h3>
            <p>The CBD industry is already a multibillion-dollar sector that will only get bigger as millions of consumers have made their choice. The efficacy of CBD products concerning various health conditions has, for a long time, remained up for debate, with scientific <a href="https://jcannabisresearch.biomedcentral.com/articles/10.1186/s42238-021-00061-5#Sec2" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">research</a> ongoing. But that number continues to grow, which makes cannabinoids now one of the most studied natural remedies in the world. If you’re interested in trying it for yourself, there are numerous options you can choose from. Whether it’s oils, gummies, capsules, or even lotions and massage oils, there is one for everybody!</p>
          </div>

          <div className="pt-2">
            <h3 className="font-bold text-xl mb-2">Plant-based diet</h3>
            <p>Some people may say that one of the most important steps you can take to improve your health and prevent chronic <a href="https://www.mdanderson.org/publications/focused-on-health/5-benefits-of-a-plant-based-diet.h20-1592991.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">diseases</a> is to switch to a plant-based diet. A plant-based or plant-forward eating diet focuses on foods primarily from plants. This includes not only fruits and vegetables, but also nuts, whole grains, and beans. It doesn’t mean that you completely give up on meat or dairy, but that you are choosing more of your foods from plant sources.</p>
          </div>

          <div className="pt-2">
            <h3 className="font-bold text-xl mb-2">Fusion Cuisine</h3>
            <p>In a hope of being more inclusive of people’s palates and cooking styles across borders, fusion cuisine has surged forward. While food authentic to a particular cuisine is still enjoyed, there are fusion foods that are being embraced that do justice to both cuisines. This could be anything from a restaurant that serves sushi along with south Indian fare to a food outlet that specializes in Indian food but also has pizza and pasta on the menu. Fusion cuisines also have two cuisines married to produce fusion dishes that appeal to people from both segments.</p>
          </div>

          <div className="pt-2">
            <h3 className="font-bold text-xl mb-2">Organic products</h3>
            <p>It’s no secret that since the pandemic people have started paying more attention to the foods they are consuming, trying to create a more sustainable lifestyle, which is why organic products have become so popular. Whether people are buying them, ordering them online, or even personally planting them in their gardens, <a href="https://www.helpguide.org/articles/healthy-eating/organic-foods.htm" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">organic</a> products are a must in everyone’s kitchen nowadays, as they are fresher, contain fewer pesticides, and can be richer in certain nutrients.</p>
          </div>

          <div className="pt-2">
            <h3 className="font-bold text-xl mb-2">Zero-Waste Cooking</h3>
            <p>Zero-waste cooking is mainly about preventing food from going into the bin, but it is also about using sustainable cooking utensils and using sustainable ways to store food. One of the easiest ways to create a zero-waste kitchen is to now throw away your food scraps. These can easily add on during the cooking process. So what can you do with them? One of the most overlooked options is to simply eat them. If you have any leftovers, try using them in another recipe!</p>
          </div>

          <p className="pt-4">Although 2020 has been a stressful and eventful year, we’ve learned how to take better care of ourselves and our bodies, and we’re carrying this lifestyle into 2022 as well. The popularity of these 2022 food trends means that your culinary adventures for this year should be new and thrilling. Don’t settle into your comfort zone! Take a leap and try new ideas and lifestyles and see how that can change your health and eating habits.</p>
        </ProjectCard>
      </PageWrapper>
    );
  }

  // Lifestyle
  if (id === '03') {
    return (
      <PageWrapper>
        <ProjectCard 
          title="5 Ideas to Start Your Personal Development Journey"
          image="https://images.unsplash.com/photo-1494173853114-8a544b47dfdb?auto=format&fit=crop&w=800&q=80"
          link="https://inspirenow.ro/2021/08/20/5-idei-pentru-a-incepe-procesul-de-dezvoltare-personala/"
          footerLabel="Visit Article"
        >
          <p>While Netflix & Chill sounds appealing, especially as a student with free time, will it truly benefit you to spend all your time watching shows? Instead, you could try activities that will benefit your future while still keeping up with the latest films.</p>
        </ProjectCard>

        <ProjectCard 
          title="Discovering Inner Peace"
          image="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80"
          link="https://inspirenow.ro/2020/12/21/descopera-linistea-interioara/"
          footerLabel="Visit Article"
        >
          <p>Meditation is a mental exercise that trains attention and the ability to anchor oneself in the present. Its purpose is to find a balance between the emotions and thoughts that arise in daily life and how we react to them.</p>
        </ProjectCard>

        <ProjectCard 
          title="5 Ways to Build Self-Confidence"
          image="https://images.unsplash.com/photo-1499209974431-9dac3adaf471?auto=format&fit=crop&w=800&q=80"
          link="https://inspirenow.ro/2021/11/03/5-metode-care-te-vor-ajuta-sa-iti-construiesti-increderea-in-tine/"
          footerLabel="Visit Article"
        >
          <p>It's easy to think everyone around you knows exactly what they're doing and feels very confident, but rest assured, that's far from the truth. Whether you've just started college or just graduated, everyone around you is probably trying to figure out what's happening.</p>
        </ProjectCard>

        <ProjectCard 
          title="How to Overcome Procrastination?"
          image="https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80"
          link="https://inspirenow.ro/2021/03/04/cum-sa-invingi-procrastinarea/"
          footerLabel="Visit Article"
        >
          <p>After careful consideration, I’ve resolved that my goal for this year is to develop both personally and professionally, sharing ideas, information, and my experiences in hopes they might help you even slightly. Like everyone else, I planned major changes this year.</p>
        </ProjectCard>
      </PageWrapper>
    );
  }

  // Creative Non-Fiction
  if (id === '04') {
    return (
      <PageWrapper>
        <ProjectCard 
          title="i tried to talk to myself this morning"
          image="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80"
          link="https://substack.com/@mirunaaaa/p-174419877"
          footerLabel="Visit Article"
        >
          <p>the season shift brought with it an amalgam of feelings. some days i am in awe of the natural beauty that surrounds me — the colors, the textures, the reminder that time keeps moving. other days, like today, i’m battling my own mind — trying to gather scattered thoughts and coming up short. i feel too much and do too little.</p>
        </ProjectCard>

        <ProjectCard 
          title="6 brutal ways the wrong partner poisons your body and mind"
          image="https://images.unsplash.com/photo-1516589174184-c6854b1d62df?auto=format&fit=crop&w=800&q=80"
          link="https://substack.com/@mirunaaaa/p-173924357"
          footerLabel="Visit Article"
        >
          <p>six years in a relationship that looked ordinary from the outside left me with a body i didn’t recognize, a mind that betrayed me, and a spirit that felt hollow. my digestion shut down. my sleep evaporated. my motivation collapsed. i woke up exhausted, lived exhausted, went to bed exhausted.</p>
        </ProjectCard>

        <ProjectCard 
          title="you're too narcissistic to change yourself"
          image="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80"
          link="https://substack.com/@mirunaaaa/p-172883900"
          footerLabel="Visit Article"
        >
          <p>growing up, love was never soft. it was sharp, manipulative, something dangled in front of me like a prize i had to earn. i learned it in the way silence could stretch across a dinner table and cut deeper than any scream. i felt it in the way approval was rationed — as if pride or affection were luxuries i hadn’t yet deserved.</p>
        </ProjectCard>

        <ProjectCard 
          title="your content is ruining my fall aesthetic!"
          image="https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=800&q=80"
          link="https://substack.com/@mirunaaaa/p-172777997"
          footerLabel="Visit Article"
        >
          <p>there’s something incredibly nostalgic about the start of the fall season. not even a week in and my thoughts — and feed — are crowded with burnt colors, cozy sweaters, aesthetic writing corners, and the ever so popular pumpkin spice latte.</p>
        </ProjectCard>

        <ProjectCard 
          title="I hate myself for still missing you"
          image="https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80"
          link="https://substack.com/@mirunaaaa/p-171872857"
          footerLabel="Visit Article"
        >
          <p>5 nights of silence and it feels like I’ve been left for dead. the truth is, the ache set it mere hours after the last words. I’d grown addicted to the way you filled my mornings, to the tiny pulse of your messages keeping me alive. I’d grown fond of your presence, despite it not being physical, and once it went away, my mind – especially my heart – was swallowed by the quiet.</p>
        </ProjectCard>

        <ProjectCard 
          title="la vie en totally broke"
          image="https://images.unsplash.com/photo-1548929977-d45d30495393?auto=format&fit=crop&w=800&q=80"
          link="https://substack.com/@mirunaaaa/p-171551237"
          footerLabel="Visit Article"
        >
          <p>This particular tale began, as many great tragedies do, with ambition, a modest salary, and the unmistakable scent of chocolate buttercream. The calendar had barely turned its page to July when I resolved, quite nobly, I might add, to adopt a life of order, of structure, of respectable employment. One does not simply drift through one’s mid-twenties on charm, eyeliner, and bra-less outfits alone.</p>
        </ProjectCard>

        <ProjectCard 
          title="the struggle of comparison"
          image="https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&w=800&q=80"
          link="https://substack.com/@mirunaaaa/p-171351771"
          footerLabel="Visit Article"
        >
          <p>my entire life i’ve felt like i’m floating. no direction, no purpose, no map, just drifting in my own little bubble of chaos. just me, starring in a very low-budget indie film called existence. my friends, meanwhile, seem to have been given the deluxe package: careers, love lives, houses with more than one bathroom. and here i am, still wondering if it’s socially acceptable to eat cereal for dinner…again.</p>
        </ProjectCard>

        <ProjectCard 
          title="courted, confused, and perpetually amused"
          image="https://images.unsplash.com/photo-1533227268408-a7647dddea75?auto=format&fit=crop&w=800&q=80"
          link="https://substack.com/@mirunaaaa/p-171255183"
          footerLabel="Visit Article"
        >
          <p>The time is July 2025. It began, as most stories do, with good intentions, a desire for a fun time, and very short shorts. A gentleman caller I had the pleasure of meeting at a ball two days prior appeared into my inbox. After clearly stating his intentions of courting me, he invites me for a two-wheel carriage ride around the city. At 24, suddenly single, I felt duty-bound to collect courtesans like calling cards. I kindly accepted the invitation.</p>
        </ProjectCard>
      </PageWrapper>
    );
  }

  // Interviews
  if (id === '05') {
    return (
      <PageWrapper>
        <ProjectCard 
          title="Figeac is not just as a vineyard, but a legacy in every bottle"
          image="https://images.unsplash.com/photo-1510850431481-748952f492bb?auto=format&fit=crop&w=800&q=80"
          link="https://business-review.eu/profiles1/interviews-interviews/blandine-de-brier-manoncourt-co-owner-of-chateau-figeac-figeac-is-not-just-as-a-vineyard-but-a-legacy-in-every-bottle-254895"
          footerLabel="Visit Interview"
          hideScroll={true}
        >
          <p>Blandine de Brier Manoncourt, co-owner of Château-Figeac, delved into the nuances and challenges of the wine industry, while exploring the unique qualities of Château-Figeac. Mrs. de Brier Manoncourt shares her perspectives on various topics, from the impact of climate change on winemaking to the blend of tradition and innovation that characterizes their approach.</p>
        </ProjectCard>

        <ProjectCard 
          title="Behind Stefanini EMEA Success: Marco Stefanini and Farlei Kothe Provide In-Depth Perspectives"
          image="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=800&q=80"
          link="https://business-review.eu/profiles1/interviews-interviews/stefaninis-growth-and-innovation-an-insiders-view-with-marco-stefanini-and-farlei-kothe-252896"
          footerLabel="Visit Interview"
          hideScroll={true}
        >
          <p>Marco Stefanini and Farlei Kothe shared their insights on digital transformation, starting a business at a young age, and their plans for Stefanini’s evolution. As the Global CEO and Founder of Stefanini Group, Marco Stefanini has been instrumental in driving the company’s growth and expansion into new markets.</p>
        </ProjectCard>

        <ProjectCard 
          title="Shaping the Future of Work: Bruno Szarf and Andreea Miron on Stefanini’s Talent Strategy in Romania"
          image="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80"
          link="https://business-review.eu/profiles1/interviews-interviews/shaping-the-future-of-work-bruno-szarf-and-andreea-miron-on-stefaninis-talent-strategy-in-romania-258067"
          footerLabel="Visit Interview"
          hideScroll={true}
        >
          <p>Bruno Szarf, the newly appointed Global CHRO at Stefanini, alongside Andreea Miron, HR EMEA Director, unveil their strategies for navigating the Romanian recruitment landscape. Together, they shed light on Stefanini’s unique approach to talent investment and development, the challenges and opportunities on the horizon,</p>
        </ProjectCard>
      </PageWrapper>
    );
  }

  // Default content for other projects
  return (
    <main className="min-h-screen pt-32 pb-24 bg-site-bg animate-fade-in relative overflow-hidden">
      <StarField />
      <div className="max-w-6xl mx-auto px-12 z-10 relative">
        <Link to="/diary" className="group inline-flex items-center text-primary font-display mt-12 mb-20 hover:opacity-70 transition-opacity">
          <span className="uppercase tracking-[0.4em] text-[15px] font-bold border-b-2 border-primary pb-2">Back to Collection</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            <div>
              <span className="font-script text-primary text-3xl block mb-2">Project Insight</span>
              <h1 className="font-display text-6xl md:text-7xl leading-tight text-serif-text">Creative Expression</h1>
            </div>
            
            <div className="prose prose-invert prose-lg">
              <p className="font-display italic text-serif-text/80 text-2xl leading-relaxed">
                "Finding the narrative thread within the chaos of the everyday."
              </p>
              <p className="text-serif-text/60 font-sans leading-relaxed mt-8">
                Every project is a chapter in a larger story of digital craftsmanship. Here, we explore the nuances of voice, vision, and the delicate balance between form and function.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="aspect-[3/4] bg-slate-800 overflow-hidden rounded-sm">
                <img src={`https://picsum.photos/seed/p${id}a/600/800`} className="w-full h-full object-cover" alt="Detail 1" />
              </div>
              <div className="aspect-square bg-slate-800 overflow-hidden rounded-sm">
                <img src={`https://picsum.photos/seed/p${id}b/600/600`} className="w-full h-full object-cover" alt="Detail 2" />
              </div>
            </div>
            <div className="pt-12 space-y-4">
              <div className="aspect-square bg-slate-800 overflow-hidden rounded-sm">
                <img src={`https://picsum.photos/seed/p${id}c/600/600`} className="w-full h-full object-cover" alt="Detail 3" />
              </div>
              <div className="aspect-[3/4] bg-slate-800 overflow-hidden rounded-sm">
                <img src={`https://picsum.photos/seed/p${id}d/600/800`} className="w-full h-full object-cover" alt="Detail 4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProjectDetail;