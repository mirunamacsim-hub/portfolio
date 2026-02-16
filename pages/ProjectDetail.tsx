import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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
    <div className="bg-[#fdf8f1] p-0 polaroid-shadow overflow-hidden flex flex-col md:flex-row h-[420px] w-full border border-black/5 group-hover:border-primary/20 transition-colors">
      <div className="md:w-[40%] h-full shrink-0 bg-white relative border-r border-black/5 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
        />
      </div>
      <div className="md:w-[60%] p-6 text-[#1d1d1b] flex flex-col h-full bg-[#fdf8f1] overflow-hidden">
        <h2 className="font-display text-xl font-bold mb-3 text-primary leading-tight shrink-0">
          {title}
        </h2>
        <div className={`flex-grow min-h-0 pr-2 ${isFullText ? 'overflow-y-auto delicate-scrollbar show-scroll-indicator pr-4' : 'overflow-hidden'}`}>
          <div className={`font-display text-sm leading-relaxed text-slate-800 ${isFullText ? 'space-y-4 pb-6' : 'line-clamp-[8]'}`}>
            {preview}
          </div>
        </div>
        {!isFullText && link && (
          <div className="mt-3 pt-3 border-t border-slate-200 shrink-0">
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

  const PageWrapper: React.FC<{ children: React.ReactNode; categoryTitle?: string }> = ({ children, categoryTitle }) => (
    <main className="relative min-h-screen pt-32 pb-24 flex flex-col items-center animate-fade-in overflow-hidden bg-site-bg">
      <StarField />
      
      {/* BACK BUTTON */}
      <div className="max-w-3xl w-full px-8 mb-8 z-20">
        <button onClick={() => navigate(-1)} className="inline-flex items-center group text-serif-text/40 hover:text-primary transition-colors">
          <span className="font-display text-[10px] uppercase tracking-widest font-bold">BACK</span>
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
              <p>Gastroesophageal reflux disease (GERD) is a common condition in the general population, characterized by the reflux of gastric food contents back into the esophagus. Esophageal reflux occurs physiologically over short periods of time and is considered pathological when it causes symptoms or damage to the esophageal mucosa. Reflux can cause damage not only to the esophagus but also to the pharynx or upper respiratory tract (vocal cords, trachea, bronchi).</p>
              <p>Most people can manage the discomfort caused by GERD through lifestyle changes and over-the-counter medication. But some people with GERD may need stronger medications or surgery to alleviate symptoms.</p>
              
              <h3 className="font-bold text-base mt-6 border-b border-primary/20 pb-1">Causes</h3>
              
              <h4 className="font-bold text-sm mt-4 text-primary italic">Disordered eating patterns</h4>
              <p>To understand what's going on, it's necessary to explain some anatomy and physiology. When feeding, after food is chewed and swallowed, it passes through a tube called the esophagus, which connects the mouth to the stomach. Between the esophagus and the stomach is the lower esophageal sphincter, which is a muscular ring that allows solid or liquid food to pass into the stomach, without allowing it to return along the route it has taken. Food then leaves the stomach through another sphincter called the pylorus, which is the structure between the stomach and the duodenum. Thus, disruption of this food pathway for various reasons can result in reflux.</p>
              
              <h4 className="font-bold text-sm mt-4 text-primary italic">Hiatal hernia</h4>
              <p>A hiatal hernia is a type of hernia in which the abdominal organs (usually the stomach) slide through the diaphragm into the middle compartment of the chest. This can result in gastroesophageal reflux disease (GERD) or laryngopharyngeal reflux, with symptoms such as a retrosternal burning sensation and an acidic taste.</p>
              
              <h3 className="font-bold text-base mt-6 border-b border-primary/20 pb-1">Risk factors</h3>
              <p>Risk factors for gastroesophageal reflux disease include:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Alcohol consumption;</li>
                <li>Obesity;</li>
                <li>Pregnancy;</li>
                <li>Smoking;</li>
                <li>Eating certain foods such as citrus fruits, chocolate, caffeine, fats, spices, and chili peppers.</li>
                <li>Taking medicines such as aspirin, diazepam, estrogen, and progesterone.</li>
              </ul>
              
              <h3 className="font-bold text-base mt-6 border-b border-primary/20 pb-1">Symptoms</h3>
              <p>The main symptom of GERD is heartburn, often described as a burning sensation in the chest and regurgitation of sour or bitter fluid into the throat or mouth. The combination of heartburn and regurgitation is such a common feature of GERD that formal tests may be unnecessary.</p>
              <p>Other GERD symptoms include:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Chest pain without burning, which is usually located in the middle of the chest and radiates to the back;</li>
                <li>Difficulty swallowing (dysphagia);</li>
                <li>Atypical reflux symptoms related to the ENT sphere (pharynx, larynx, airways): sore throat, coughing, increased salivation, and shortness of breath.</li>
              </ul>
              
              <h3 className="font-bold text-base mt-6 border-b border-primary/20 pb-1">Treatment</h3>
              <p>If you experience heartburn or other GERD-specific symptoms lately, it is advisable to schedule a consultation with a doctor specializing in internal medicine or gastroenterology. If you are diagnosed with GERD, your doctor will initially recommend lifestyle changes and medication. If after at least 8 weeks of treatment, there is no improvement in symptoms, the doctor will reassess the situation and reconsider treatment.</p>
              
              <h4 className="font-bold text-sm mt-4 text-primary italic">Lifestyle changes</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>Smoking cessation;</li>
                <li>Avoiding alcohol consumption;</li>
                <li>Weight loss (if necessary);</li>
                <li>Avoiding lying flat for at least 3 hours after eating;</li>
                <li>Eating small, frequent meals.</li>
              </ul>
              
              <h4 className="font-bold text-sm mt-4 text-primary italic">Medical treatment</h4>
              <p>Prescribed medications include:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Antiacids:</strong> neutralizes gastric acid - Rennie, Maalox;</li>
                <li><strong>Drugs that reduce acid production:</strong> (H2 receptor antagonists) - Ranitidine, Famotidine;</li>
                <li><strong>Drugs that block acid production:</strong> (proton pump inhibitors) - Omez, Nexium, Controloc;</li>
                <li><strong>Agents that strengthen the lower esophageal sphincter:</strong> (prokinetics) - Metoclopramide, Domperidone.</li>
              </ul>
              
              <h4 className="font-bold text-sm mt-4 text-primary italic">Surgical treatment</h4>
              <p><strong>Laparoscopic fundoplication:</strong> Surgery is recommended in patients who show no improvement after optimal drug therapy and lifestyle changes or who develop complications. In this procedure, the lower esophageal sphincter is strengthened by making a valve from the stomach walls wrapped around the terminal esophagus.</p>
              <p><strong>Gastric bypass surgery:</strong> In the case of advanced esophageal lesions or if the reflux is maintained by high body weight, then laparoscopic bariatric surgery of the Roux-en-Y gastric bypass type is considered.</p>
              
              <p className="mt-6 italic border-t pt-4 border-slate-200">Although gastroesophageal reflux is a physiological phenomenon encountered throughout the day, it may become problematic when it occurs frequently or is accompanied by chest pain or other specific symptoms, leading to GERD. Implementing a balanced lifestyle may be enough to prevent this condition.</p>
            </>
          }
        />
        <ArticleCard 
          isFullText={true}
          title="The Ultimate 6 Food Industry Trends in 2022"
          image="https://i.pinimg.com/1200x/b7/53/c6/b753c6a3f341b26be2ea5c7364104fb5.jpg"
          preview={
            <>
              <p>Although the impact of COVID-19 tested the resilience of the food supply chain and heightened food insecurity, it also precipitated shifts in consumer behavior that will likely remain for quite some time.</p>
              <p>A 2020 survey from the International Food Information Council (IFIC) found that 85% of Americans made changes in their eating habits during the pandemic, indicating an increased awareness concerning nutrition and its impact on health.</p>
              <p>After a stressful 2020, many people have used food as a means of comfort. The food trends of 2021 point toward better health for our bodies, planet, and wallets. But what has changed this year? Though some 2021 trends are still around, 2022 brings us new ideas and new lifestyles to try!</p>
              
              <h3 className="font-bold text-base mt-6 text-primary">Reducetarianism Trend</h3>
              <p>If you're thinking of going plant-based but aren't really ready to give up meat, dairy, and eggs, then this is the food trend for you. If you decide to give this a try, a surprisingly easy way to cut back on your meat and dairy intake without noticing it too much is by introducing alternatives. Adding lentils, beans, and other vegetarian forms of protein into your diet is already a great way to eat less. It can even be as simple as switching from cow’s milk to soy, almond, or coconut milk in the mornings.</p>
              
              <h3 className="font-bold text-base mt-6 text-primary">CBD Trend</h3>
              <p>The CBD industry is already a multibillion-dollar sector that will only get bigger as millions of consumers have made their choice. The efficacy of CBD products concerning various health conditions has, for a long time, remained up for debate, with scientific research ongoing. But that number continues to grow, which makes cannabinoids now one of the most studied natural remedies in the world. If you’re interested in trying it for yourself, there are numerous options you can choose from. Whether it’s oils, gummies, capsules, or even lotions and massage oils, there is one for everybody!</p>
              
              <h3 className="font-bold text-base mt-6 text-primary">Plant-based diet</h3>
              <p>Some people may say that one of the most important steps you can take to improve your health and prevent chronic diseases is to switch to a plant-based diet. A plant-based or plant-forward eating diet focuses on foods primarily from plants. This includes not only fruits and vegetables, but also nuts, whole grains, and beans. It doesn’t mean that you completely give up on meat or dairy, but that you are choosing more of your foods from plant sources.</p>
              
              <h3 className="font-bold text-base mt-6 text-primary">Fusion Cuisine</h3>
              <p>In a hope of being more inclusive of people’s palates and cooking styles across borders, fusion cuisine has surged forward. While food authentic to a particular cuisine is still enjoyed, there are fusion foods that are being embraced that do justice to both cuisines. This could be anything from a restaurant that serves sushi along with south Indian fare to a food outlet that specializes in Indian food but also has pizza and pasta on the menu. Fusion cuisines also have two cuisines married to produce fusion dishes that appeal to people from both segments.</p>
              
              <h3 className="font-bold text-base mt-6 text-primary">Organic products</h3>
              <p>It’s no secret that since the pandemic people have started paying more attention to the foods they are consuming, trying to create a more sustainable lifestyle, which is why organic products have become so popular. Whether people are buying them, ordering them online, or even personally planting them in their gardens, organic products are a must in everyone’s kitchen nowadays, as they are fresher, contain fewer pesticides, and can be richer in certain nutrients.</p>
              
              <h3 className="font-bold text-base mt-6 text-primary">Zero-Waste Cooking</h3>
              <p>Zero-waste cooking is mainly about preventing food from going into the bin, but it is also about using sustainable cooking utensils and using sustainable ways to store food. One of the easiest ways to create a zero-waste kitchen is to now throw away your food scraps. These can easily add on during the cooking process. So what can you do with them? One of the most overlooked options is to simply eat them. If you have any leftovers, try using them in another recipe!</p>
              
              <p className="mt-6 font-medium text-slate-700">Although 2020 has been a stressful and eventful year, we’ve learned how to take better care of ourselves and our bodies, and we’re carrying this lifestyle into 2022 as well. Take a leap and try new ideas and lifestyles and see how that can change your health and eating habits.</p>
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
            <p>The Orange Bus brand identity blends vintage VW nostalgia with contemporary design through a warm color palette of oranges, creams, and browns pulled from classic 1970s buses. Clean typography and sun-drenched lifestyle photography position the service as a premium experience rather than a commodity, while playful retro touches keep the brand approachable and fun.
The website prioritizes visual storytelling with large, immersive imagery and a streamlined booking flow—view packages, check availability, book. Subtle design elements like rounded corners and warm gradients maintain the vintage aesthetic while modern UX patterns ensure the experience feels professional and intuitive across all devices.
The result is a cohesive digital presence that extends the brand experience beyond the physical bus, making the booking process as memorable as the photo booth itself.</p>
          </ProjectCard>
        </PageWrapper>
      );
    }
    if (id === 'web-02') {
        const weddingProtoUrl = "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2Fih3rrMTYpGnqafRzKe3iKc%2FWedding-Planning-App---in-progress%3Fnode-id%3D3-2939%26t%3DwdngUEpYaCjXqU77-0%26scaling%3Dscale-down%26content-scaling%3Dfixed%26page-id%3D0%253A1%26starting-point-node-id%3D3%253A2939";
        return (
          <PageWrapper>
            <ProjectCard title="Wedding Planning App" iframeSrc={weddingProtoUrl} isWeb={true}>
              <p>TThe app's visual system balances wedding industry elegance with clean usability. A soft blush background provides warmth without overwhelming, while rounded cards and gentle shadows create hierarchy. The design smartly integrates planning tools—colorful, illustrated cards for checklists and budget tracking—directly alongside vendor browsing, acknowledging that couples need both inspiration and organization in one place. Star ratings and high-quality vendor photography establish immediate credibility.
The interface prioritizes scannable vendor discovery with image-led cards that communicate style and quality at a glance. Each category (flower shops, photographers, venues) uses consistent layouts with prominent imagery, vendor names, and ratings, allowing quick comparison. The photographer profiles intelligently include portfolio snippets and direct contact actions, reducing friction between discovery and outreach. A persistent bottom navigation keeps core functions—Home, Explore, Checklist, Sharing, Profile—always accessible.
The integrated checklist feature demonstrates thoughtful UX that respects the wedding planning timeline. Tasks are organized by timeframe (12+ months, 9 months, 6-8 months, etc.) with clear checkboxes, turning an overwhelming to-do list into manageable phases. By combining vendor marketplace, planning tools, and progress tracking in one cohesive experience, the app becomes a daily companion rather than just a directory—reducing app-switching and keeping couples focused on their vision.</p>
            </ProjectCard>
          </PageWrapper>
        );
      }
    
      if (id === 'web-03') {
        const platformProtoUrl = "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FeZ8mYj8ZG62Hfl9EOxfrgJ%2FUntitled%3Fnode-id%3D1-111%26t%3DwdngUEpYaCjXqU77-0%26scaling%3Dscale-down%26content-scaling%3Dfixed%26page-id%3D0%253A1%26starting-point-node-id%3D1%3A111";
        return (
          <PageWrapper>
            <ProjectCard title="Digest - a The Publics product" iframeSrc={platformProtoUrl} isWeb={true}>
              <p>The platform's dark teal interface and vibrant gradient cards visually communicate its core mission: bridging text-based data systems with GenAI's multimodal capabilities. Each gradient—coral, purple, blue—represents transformation across formats, positioning the tool as built for the AI era rather than retrofitted from legacy systems.
The interface prioritizes discovery over search, using familiar metaphors like bookshelves and libraries to make AI-powered curation feel intuitive. Curated collections—"Trending community bookshelves," "Top picks for you"—surface content through algorithmic recommendations rather than manual filtering, allowing users to scan across text, visual, and conceptual dimensions simultaneously.
Strategic UX decisions hide technical complexity behind approachable patterns. By designing for synthesis rather than retrieval, the platform aligns with how creative collaborators actually work: gathering inspiration across formats and remixing ideas—exactly what GenAI excels at, now with a human-centered interface.</p>
            </ProjectCard>
          </PageWrapper>
        );
      }
    
      if (id === 'web-04') {
        const invictusProtoUrl = "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2Fnv9egUKEFUQabduVgBjc0U%2FInvictus-Labs-Landing-Page%3Fnode-id%3D212-6%26t%3DkVOTl4l1RjE2x8Ze-0%26scaling%3Dscale-down%26content-scaling%3Dfixed%26page-id%3D0%253A1";
        return (
          <PageWrapper>
            <ProjectCard title="Invictus Labs" iframeSrc={invictusProtoUrl} isWeb={true}>
              <p>The visual identity positions Invictus Labs as a credible technical solution in the Web3 space. A deep navy backdrop with molecular and network imagery establishes scientific rigor, while bright cyan accents provide energy without crypto hype. The design borrows from biotech and data visualization—DNA helixes, network graphs—to ground abstract DeFi concepts in tangible, trustworthy frameworks.
The landing page follows a problem-solution-methodology flow with Web3-native sophistication. Iconographic cards quickly communicate pain points, while data visualizations demonstrate analytical depth. Strategic whitespace and modular sections create digestibility for complex topics, serving both technical and general audiences.
Design decisions prioritize legitimacy in an industry plagued by opacity. Network logos and investor badges leverage social proof, while "Learn More" CTAs suggest confidence over urgency. The molecular metaphor for "Modeling the DNA of Web3 Lending" frames their quantitative approach as fundamental science rather than financial speculation—appealing to serious DeFi participants while remaining accessible to newcomers.</p>
            </ProjectCard>
          </PageWrapper>
        );
      }
    
      if (id === 'web-05') {
        return (
          <PageWrapper>
            <ProjectCard title="witchy brew" image="https://i.imgur.com/nlF8Sqi.png" isWeb={true} isVertical={true}>
              <p>The Witchy Brew identity playfully merges occult aesthetics with coffee culture through a whimsical illustration of a witch's boot stirring a steaming cup. The logo exists in two colorways—a moody dark version with cream illustration and a soft pink variant with purple accents—allowing flexibility across applications while maintaining brand recognition. The hand-drawn quality of the steam and boot creates approachability, preventing the witchy theme from feeling too dark or exclusive.
Typography balances the playful concept with sophistication. The serif wordmark "witchy brew" uses elegant, slightly condensed letterforms that nod to apothecary-style branding without becoming overly mystical or illegible. The tagline "coffee, roastery & more" in clean sans-serif grounds the brand in its actual offering, ensuring customers understand this is a legitimate coffee business first, themed experience second.
The dual colorway strategy demonstrates smart brand positioning. The dark version works for moody café interiors, packaging, and nighttime events, while the pink version appeals to a broader, Instagram-friendly audience and daytime retail contexts. This versatility allows Witchy Brew to attract both alternative culture enthusiasts and mainstream coffee lovers seeking something more memorable than generic café branding.</p>
            </ProjectCard>
          </PageWrapper>
        );
      }
    
      if (id === 'web-06') {
        const floofProtoUrl = "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FIFBUa5WoXgK4BM4MEQrW7s%2FFloof-App%3Fnode-id%3D34-2904%26starting-point-node-id%3D34%253A2904";
        return (
          <PageWrapper>
            <ProjectCard title="Floof App" iframeSrc={floofProtoUrl} isWeb={true}>
              <p>The Floof brand identity leans fully into joy and approachability with playful bubble lettering, soft pastel backgrounds, and charming illustrated mascots. Each screen features adorable cartoon dogs and cats that convey warmth and personality, immediately signaling this isn't a sterile municipal adoption database—it's a community-driven platform that celebrates the emotional bond between pets and owners. The illustrated aesthetic makes pet adoption feel less intimidating and more like joining a loving ecosystem.
The app architecture combines adoption discovery with comprehensive pet services, acknowledging that pet ownership is ongoing care, not just a single transaction. The "Find Your Furever Friend" interface uses visual-first pet cards with photos and key details (breed, age, gender, temperament), making browsing feel natural and delightful. The services section intelligently organizes offerings by category—bathing, grooming, dental, veterinary—with transparent pricing that builds trust. The friends list feature with real pet profiles creates social proof and community connection.
Design decisions prioritize emotional engagement over clinical efficiency. Rounded corners, generous padding, and whimsical illustrations throughout maintain a consistent tone that reduces anxiety around pet adoption decisions. The bottom navigation keeps core functions—Home, Apps, Favorites, Messages, Profile—accessible, while the onboarding flow with illustrated mascots sets expectations for a friendly, supportive experience. Floof successfully positions pet adoption as the beginning of a joyful journey rather than a transactional necessity.</p>
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