
import React, { useState, useEffect, useRef } from 'react';
import { translations } from './translations';
import { Language } from './types';
import Modal from './components/Modal';
import ExitIntent from './components/ExitIntent';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language | null>(null);
  const [modalUrl, setModalUrl] = useState<string | null>(null);
  const [liveActivity, setLiveActivity] = useState<{ text: string; show: boolean }>({ text: '', show: false });
  
  // Randomizing Stats
  const [stats, setStats] = useState({
    creators: 180,
    brands: 250,
    revenue: 70,
    reels: 500
  });

  const content = lang ? translations[lang] : null;

  const openForm = (url: string) => setModalUrl(url);
  const closeForm = () => setModalUrl(null);

  // Live Activity Simulator - Maharashtra Cities Only
  useEffect(() => {
    if (!lang) return;

    const cities = [
      'कोल्हापूर (Kolhapur)', 'पुणे (Pune)', 'मुंबई (Mumbai)', 'नागपूर (Nagpur)', 
      'नाशिक (Nashik)', 'ठाणे (Thane)', 'सांगली (Sangli)', 'सातारा (Satara)', 
      'सोलापूर (Solapur)', 'रत्नागिरी (Ratnagiri)', 'कणकवली (Kankavli)', 'सिंधुदुर्ग (Sindhudurg)'
    ];
    
    const messages = lang === 'mr'
      ? ['मधील एका व्यवसायाने आताच नोंदणी केली!', 'येथील एका क्रिएटरने आपली ग्रोथ सुरू केली!', 'मधील ब्रँडने पेड स्पॉन्सरशिप मिळवली!']
      : ['business just joined!', 'creator started their growth journey!', 'brand just secured a sponsorship!'];

    const interval = setInterval(() => {
      const city = cities[Math.floor(Math.random() * cities.length)];
      const msg = messages[Math.floor(Math.random() * messages.length)];
      const text = `${city} ${msg}`;
      
      setLiveActivity({ text, show: true });
      
      // Fluctuating stats slightly to look "live"
      setStats(prev => ({
        creators: prev.creators + (Math.random() > 0.7 ? 1 : 0),
        brands: prev.brands + (Math.random() > 0.8 ? 1 : 0),
        revenue: prev.revenue + (Math.random() > 0.9 ? 0.1 : 0),
        reels: prev.reels + (Math.random() > 0.5 ? 1 : 0)
      }));

      setTimeout(() => {
        setLiveActivity(prev => ({ ...prev, show: false }));
      }, 5000);
    }, 15000);

    return () => clearInterval(interval);
  }, [lang]);

  if (!lang) {
    return (
      <div className="fixed inset-0 bg-[#050505] z-[200] flex flex-col items-center justify-center p-6 text-center">
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-[120px]"></div>
        </div>
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter">RedRoze Studio</h1>
          <p className="text-xl md:text-2xl font-bold text-white/80">English pahije ka Marathi? 👀</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <button 
            onClick={() => setLang('en')}
            className="flex-1 bg-white text-black py-4 rounded-2xl font-black text-xl hover:scale-105 transition-transform"
          >
            ENGLISH
          </button>
          <button 
            onClick={() => setLang('mr')}
            className="flex-1 bg-gradient-glow py-4 rounded-2xl font-black text-xl hover:scale-105 transition-transform"
          >
            मराठी
          </button>
        </div>
      </div>
    );
  }

  const waMessage = encodeURIComponent("Hello RedRoze Studio! I saw your website and I want to grow my brand/Instagram. Can we discuss?");

  return (
    <div className={`min-h-screen ${lang === 'mr' ? 'font-marathi' : ''}`}>
      <ExitIntent 
        content={content!.exitPopup} 
        onCtaClick={() => openForm('https://forms.gle/qzNgLt4WV9ckHNfH7')} 
      />
      <Modal 
        isOpen={!!modalUrl} 
        onClose={closeForm} 
        url={modalUrl || ''} 
      />

      {/* Live Activity Notification */}
      <div className={`fixed bottom-24 left-6 z-50 glass px-6 py-3 rounded-2xl border-white/20 transition-all duration-500 shadow-2xl ${liveActivity.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm font-bold">{liveActivity.text}</span>
        </div>
      </div>

      {/* Floating WhatsApp with Pre-filled Message */}
      <a 
        href={`https://wa.me/919403431049?text=${waMessage}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center"
      >
        <svg className="w-8 h-8 fill-white" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.216 3.075.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.938 3.659 1.434 5.633 1.434h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="https://instagram.com/redroze_studio" target="_blank" rel="noopener noreferrer" className="text-2xl font-black text-gradient hover:scale-105 transition-transform">
            RedRoze Studio
          </a>
          <div className="hidden md:flex gap-8 font-bold text-white/80">
            <a href="#whatwedo" className="hover:text-white transition-colors">Services</a>
            <a href="#creators" className="hover:text-white transition-colors">Creators</a>
            <a href="#brands" className="hover:text-white transition-colors">Brands</a>
            <a href="#whyus" className="hover:text-white transition-colors">Why Us</a>
          </div>
          <button 
            onClick={() => setLang(lang === 'en' ? 'mr' : 'en')}
            className="text-sm font-bold bg-white/10 px-4 py-2 rounded-lg hover:bg-white/20"
          >
            {lang === 'en' ? 'मराठी?' : 'English?'}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
              {content!.hero.headline}
            </h1>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto lg:mx-0">
              {content!.hero.subtext}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => openForm('https://forms.gle/3SfKMBvMcaNDUaG38')}
                className="bg-gradient-glow px-8 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform"
              >
                {content!.hero.bookCall}
              </button>
              <div className="flex gap-2">
                <button 
                  onClick={() => openForm('https://forms.gle/DVSqzuz84eXFLtR59')}
                  className="glass px-6 py-5 rounded-2xl font-bold flex-1 hover:bg-white/10 transition-colors"
                >
                  {content!.hero.imCreator}
                </button>
                <button 
                  onClick={() => openForm('https://forms.gle/2sn2TNoPCSqd1nsA6')}
                  className="glass px-6 py-5 rounded-2xl font-bold flex-1 hover:bg-white/10 transition-colors"
                >
                  {content!.hero.imBusiness}
                </button>
              </div>
            </div>
          </div>
          <div className="flex-1 w-full max-w-2xl relative">
            <div className="absolute inset-0 bg-gradient-glow opacity-20 blur-[100px]"></div>
            <div className="relative glass p-6 rounded-3xl border border-white/20 float-anim">
              <div className="flex justify-between items-center mb-8">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-xs font-mono opacity-50">LIVE_GROWTH_METRICS</div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white/5 p-4 rounded-xl">
                  <div className="text-xs text-white/50 mb-1">Total Reach</div>
                  <div className="text-2xl font-bold">{(Math.floor(stats.reels * 4.8)).toLocaleString()}K+</div>
                  <div className="text-[10px] text-green-400">↑ 142% this month</div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl">
                  <div className="text-xs text-white/50 mb-1">Follower Growth</div>
                  <div className="text-2xl font-bold">{(Math.floor(stats.creators * 473)).toLocaleString()}</div>
                  <div className="text-[10px] text-green-400">↑ 89% this month</div>
                </div>
              </div>
              <div className="h-32 w-full bg-white/5 rounded-xl relative overflow-hidden">
                <div className="absolute inset-x-0 bottom-0 h-full flex items-end px-2 gap-1">
                  {[40, 60, 45, 80, 50, 95, 70, 85, 60, 100, 75, 90].map((h, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-gradient-glow rounded-t-sm" 
                      style={{ height: `${h}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Stats Grid */}
        <div className="max-w-7xl mx-auto mt-24 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-black mb-1">{stats.creators}+</div>
            <div className="text-xs md:text-sm text-white/50 uppercase tracking-widest">{content!.hero.stats.creators}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-black mb-1">{stats.brands}+</div>
            <div className="text-xs md:text-sm text-white/50 uppercase tracking-widest">{content!.hero.stats.brands}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-black mb-1">₹{stats.revenue.toFixed(1)}L+</div>
            <div className="text-xs md:text-sm text-white/50 uppercase tracking-widest">{content!.hero.stats.revenue}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-4xl font-black mb-1">{stats.reels}+</div>
            <div className="text-xs md:text-sm text-white/50 uppercase tracking-widest">{content!.hero.stats.reels}</div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section id="whatwedo" className="py-24 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16">{content!.whatWeDo.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(content!.whatWeDo).filter(([k]) => k !== 'title').map(([key, service]: any, i) => (
              <div key={i} className="glass p-8 rounded-3xl border border-white/5 hover:border-pink-500/50 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-gradient-glow flex items-center justify-center mb-6 group-hover:scale-110 transition-transform text-white">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-2xl font-black mb-4">{service.title}</h3>
                <p className="text-white/60 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creators */}
      <section id="creators" className="py-24 px-6 relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-purple-600/5 blur-[150px] -z-10"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="flex-1 order-2 md:order-1">
            <div className="aspect-[9/16] w-full max-w-[400px] mx-auto relative glass rounded-3xl overflow-hidden border-2 border-pink-500/30">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1598550476439-6847785fce66?auto=format&fit=crop&q=80&w=800&h=1422" 
                className="w-full h-full object-cover" 
                alt="Indian Creator Growth" 
              />
              <div className="absolute bottom-8 left-8 right-8 z-20">
                <div className="bg-red-500 px-3 py-1 rounded text-xs font-bold inline-block mb-3 animate-pulse">MONEY MACHINE</div>
                <div className="text-2xl font-black mb-1">Creator Strategy</div>
                <div className="text-white/60 text-sm">Paid Sponsorships Guaranteed</div>
              </div>
            </div>
          </div>
          <div className="flex-1 order-1 md:order-2">
            <h2 className="text-4xl md:text-6xl font-black mb-6">{content!.creators.title}</h2>
            <p className="text-xl text-white/70 mb-8">{content!.creators.subtitle}</p>
            <ul className="space-y-4 mb-10">
              {content!.creators.points.map((point, i) => (
                <li key={i} className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center text-xs">✓</div>
                  {point}
                </li>
              ))}
            </ul>
            <button 
              onClick={() => openForm('https://forms.gle/DVSqzuz84eXFLtR59')}
              className="w-full sm:w-auto bg-white text-black px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-transform"
            >
              {content!.creators.button}
            </button>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section id="brands" className="py-24 px-6 bg-gradient-to-b from-transparent to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-4xl md:text-6xl font-black mb-6">{content!.brands.title}</h2>
              <p className="text-xl text-white/70 mb-10">{content!.brands.subtitle}</p>
              <div className="grid grid-cols-1 gap-6 mb-10">
                <div className="glass p-6 rounded-2xl border-red-500/20">
                  <ul className="space-y-2">
                    {content!.brands.fixes.map((item, i) => (
                      <li key={i} className="text-white/40 line-through flex items-center gap-2">
                        <span className="text-red-500">✕</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="glass p-6 rounded-2xl border-green-500/20">
                  <ul className="space-y-2">
                    {content!.brands.provides.map((item, i) => (
                      <li key={i} className="text-white font-bold flex items-center gap-2">
                        <span className="text-green-500">✓</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button 
                onClick={() => openForm('https://forms.gle/2sn2TNoPCSqd1nsA6')}
                className="bg-gradient-glow px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-transform"
              >
                {content!.brands.button}
              </button>
            </div>
            <div className="flex-1 w-full flex justify-center">
              <div className="aspect-[9/16] w-full max-w-[400px] relative glass rounded-3xl overflow-hidden border-2 border-blue-500/30">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800&h=1422" 
                  className="w-full h-full object-cover" 
                  alt="Indian Business Growth" 
                />
                <div className="absolute bottom-8 left-8 right-8 z-20">
                  <div className="bg-blue-500 px-3 py-1 rounded text-xs font-bold inline-block mb-3">ROI CENTER</div>
                  <div className="text-2xl font-black mb-1">Business Scaling</div>
                  <div className="text-white/60 text-sm">Targeting Mumbai & World</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials with Indian Faces */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black text-center mb-16 tracking-tight">{content!.testimonials.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content!.testimonials.list.map((t, i) => (
              <div key={i} className="glass p-10 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/5 blur-[40px] group-hover:bg-pink-500/10 transition-colors"></div>
                <div className="text-4xl text-pink-500 mb-4 opacity-50">"</div>
                <p className="text-xl md:text-2xl font-bold italic mb-6 leading-relaxed relative z-10">
                  {t.text}
                </p>
                <div className="flex items-center gap-4 relative z-10">
                  <img 
                    src={`https://images.unsplash.com/photo-${i === 0 ? '1506794778202-cad84cf45f1d' : i === 1 ? '1531123897727-8f129e1688ce' : i === 2 ? '1507003211169-0a1dd7228f2d' : '1494790108377-be9c29b29330'}?auto=format&fit=crop&q=80&w=150&h=150&faceindex=${i}`} 
                    className="w-14 h-14 rounded-full border-2 border-pink-500/50 object-cover"
                    alt="Success Client"
                  />
                  <div>
                    <div className="font-black text-lg">{t.name}</div>
                    <div className="text-white/40 text-sm">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Proof */}
      <section className="py-24 px-6 bg-[#050505]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">{content!.videoProof.title}</h2>
            <p className="text-white/50">{content!.videoProof.sub}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="aspect-[9/16] bg-white/5 rounded-3xl overflow-hidden border border-white/10 hover:border-pink-500/50 transition-all relative group">
                <img 
                  src={`https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800&h=1422&seed=${i+10}`} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" 
                  alt="Work Example"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto glass p-12 md:p-20 rounded-[3rem] border-white/10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-glow opacity-10 blur-[100px]"></div>
          <h2 className="text-4xl md:text-6xl font-black mb-10 relative z-10">{content!.ctaStrip.text}</h2>
          <button 
            onClick={() => openForm('https://forms.gle/3SfKMBvMcaNDUaG38')}
            className="bg-white text-black px-12 py-6 rounded-2xl font-black text-xl hover:scale-105 transition-transform relative z-10"
          >
            {content!.ctaStrip.button}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/10 bg-[#050505]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="text-3xl font-black text-gradient mb-6">RedRoze Studio</div>
            <p className="text-white/50 max-w-sm">
              Making local brands go viral. We are your growth partners in this algorithm chaos. 
              Don't just post. Dominate.
            </p>
            {/* Social Links in Footer */}
            <div className="flex gap-4 mt-8">
              <a href="https://instagram.com/redroze_studio" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-pink-500/20 transition-colors">
                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.247 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.247-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.247-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.247 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.337 2.617 6.76 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.397-.2 6.78-2.618 6.98-6.98.058-1.281.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.338-2.617-6.78-6.98-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href={`https://wa.me/919403431049?text=${waMessage}`} target="_blank" className="p-3 bg-white/5 rounded-full hover:bg-green-500/20 transition-colors">
                <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.038 3.069l-.445 1.616 1.67-.438c.753.547 1.561.837 2.486.838 3.182 0 5.768-2.586 5.768-5.766 0-3.18-2.586-5.765-5.749-5.765zm3.61 8.243c-.158.443-.79.805-1.096.852-.27.043-.615.068-1.002-.058-.235-.078-1.03-.339-1.962-1.168-.724-.645-1.213-1.44-1.355-1.684-.141-.244-.015-.376.108-.499.11-.11.244-.285.366-.427.122-.142.163-.238.244-.396.081-.159.041-.298-.02-.421-.061-.122-.549-1.32-.753-1.808-.198-.475-.4-.41-.549-.417-.142-.007-.305-.008-.468-.008s-.427.061-.65.305c-.224.244-.854.834-.854 2.031s.874 2.356 1.016 2.539c.142.183 1.72 2.624 4.167 3.678.583.251 1.038.401 1.391.513.585.187 1.118.161 1.54.098.468-.069 1.443-.59 1.647-1.159.203-.569.203-1.057.142-1.159-.061-.102-.224-.163-.488-.285zM12.012 0C5.378 0 0 5.378 0 12.012c0 2.125.55 4.125 1.513 5.875L0 24l6.325-1.662c1.675.912 3.588 1.425 5.612 1.425 6.634 0 12.012-5.378 12.012-12.012C23.95 5.378 18.572 0 12.012 0z"/></svg>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-black mb-6 uppercase tracking-widest text-sm">Services</h4>
            <ul className="space-y-4 text-white/50 font-bold">
              <li>Reels Marketing</li>
              <li>Lead Gen Funnels</li>
              <li>Branding</li>
              <li>Web Design</li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-6 uppercase tracking-widest text-sm">Contact</h4>
            <ul className="space-y-4 text-white/50 font-bold">
              <li>hello@redroze.studio</li>
              <li>WhatsApp: +91 9403431049</li>
              <li>Kasaba Bawada, Kolhapur</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 text-center flex flex-col gap-6">
          <div className="space-y-2">
            <div className="text-lg md:text-xl font-black text-gradient">
              🙏 आई अंबाबाईच्या कृपेने सुरू केलंय… World Wide Growth देणार! 🌍📈✨
            </div>
            <div className="text-xs text-white/40 italic uppercase tracking-widest">
              Started with the blessings of Goddess Ambabai... Providing Worldwide Growth!
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between text-white/30 text-[10px] uppercase tracking-tighter">
            <div>© 2024 RedRoze Studio. All rights reserved.</div>
            <div className="flex gap-6 mt-4 md:mt-0 justify-center">
              <a href="https://instagram.com/redroze_studio" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
