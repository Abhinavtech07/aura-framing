/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, Search, Cpu, Trophy, Star, Download, 
  ArrowLeft, Share2, X, Flame, Zap, TrendingUp, Award, Sun, Moon, CheckCircle2, ShieldCheck
} from 'lucide-react';
import { Game, GAMES, UserStats, DAILY_CHALLENGES, LEADERBOARD } from './types';

const DIRECT_LINK = 'https://omg10.com/4/10446433';

// --- Background Global Monetag Script Injector ---
const GlobalAds: React.FC = () => {
  useEffect(() => {
    const injectGlobalScript = (zoneId: string) => {
      if (document.getElementById(`monetag-tag-${zoneId}`)) return;
      const script = document.createElement('script');
      script.id = `monetag-tag-${zoneId}`;
      script.async = true;
      script.dataset.cfasync = 'false';
      script.src = 'https://a.realsrv.com/88/tag.min.js';
      script.setAttribute('data-zone', zoneId);
      document.head.appendChild(script);
    };

    injectGlobalScript('10512785');
    injectGlobalScript('10481725');
  }, []);

  return null;
};

// --- Monetag Ad Card Component ---
const MonetagAd: React.FC<{ 
  zoneId: string; 
  className?: string;
  label?: string;
}> = ({ zoneId, className = '', label = 'Featured Partner' }) => {
  const adRef = useRef<HTMLDivElement>(null);

  const getAdContent = () => {
    const ads = [
      { title: 'Play GTA V Mobile', desc: 'The official port is finally here. High graphics, 60 FPS verified.', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80', cta: 'Play Now' },
      { title: 'Win $100 Gaming Gift Card', desc: 'Complete simple verification tasks and claim today!', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80', cta: 'Claim Loot' },
      { title: 'Ultra 60FPS Optimizer Tool', desc: 'Official performance booster for high-end mobile ports.', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=600&q=80', cta: 'Boost Device' },
      { title: 'Cyberpunk 2077 Mobile Port', desc: 'Download the newly released community 60 FPS port build.', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80', cta: 'Get APK' }
    ];
    const adIndex = Math.abs(parseInt(zoneId.replace(/\D/g, '') || '0')) % ads.length;
    return ads[adIndex] || ads[0];
  };

  const ad = getAdContent();

  return (
    <div 
      ref={adRef}
      onClick={() => window.open(DIRECT_LINK, '_blank')}
      className={`relative overflow-hidden group cursor-pointer bg-gradient-to-br from-[#181c26] to-[#0f1219] border-2 border-purple-500/20 rounded-[2rem] flex flex-col transition-all hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] ${className}`}
    >
      <div className="relative h-full w-full flex flex-col justify-between">
        <div className="absolute inset-0 opacity-25 group-hover:opacity-40 transition-opacity">
          <img src={ad.image} alt={ad.title} className="w-full h-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/70 to-transparent" />
        </div>
        
        <div className="relative z-10 p-5 flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.2em]">{label}</span>
              <span className="bg-yellow-500 text-black px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider shadow">AD</span>
            </div>
            <h4 className="text-base font-black text-white mb-1 group-hover:text-cyan-400 transition-colors line-clamp-1 font-oswald">{ad.title}</h4>
            <p className="text-xs text-gray-300 leading-snug line-clamp-2 italic">"{ad.desc}"</p>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={`ad-star-${i}`} size={12} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-[10px] font-black px-4 py-1.5 rounded-xl uppercase tracking-wider group-hover:scale-105 transition-transform shadow-md">
              {ad.cta}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Trust-Builder Device Scanner & Download Modal ---
const DeviceTrustModal: React.FC<{ 
  game: Game; 
  isOpen: boolean; 
  onClose: () => void; 
  onConfirmDownload: () => void;
}> = ({ game, isOpen, onClose, onConfirmDownload }) => {
  const [scanStep, setScanStep] = useState<'analyzing' | 'optimizing' | 'verified'>('analyzing');
  const [detectedPhone, setDetectedPhone] = useState('Android Gaming Device');

  useEffect(() => {
    if (!isOpen) {
      setScanStep('analyzing');
      return;
    }

    // Attempt intelligent device identification from userAgent
    const ua = navigator.userAgent;
    if (/iPhone/i.test(ua)) setDetectedPhone('Apple iPhone (iOS 17+)');
    else if (/Samsung/i.test(ua)) setDetectedPhone('Samsung Galaxy Exynos/Snapdragon');
    else if (/Redmi|Xiaomi/i.test(ua)) setDetectedPhone('Xiaomi/Redmi High-Performance Engine');
    else if (/Realme/i.test(ua)) setDetectedPhone('Realme Ultra Gaming Hardware');
    else setDetectedPhone('Universal ARM64 Mobile Hardware');

    const timer1 = setTimeout(() => setScanStep('optimizing'), 1200);
    const timer2 = setTimeout(() => setScanStep('verified'), 2600);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="trust-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            className="w-full max-w-lg bg-[#131720] border-2 border-purple-500/50 rounded-[2.5rem] p-6 sm:p-8 shadow-[0_0_80px_rgba(168,85,247,0.35)] relative overflow-hidden"
          >
            <button 
              onClick={onClose}
              className="absolute top-5 right-5 p-2.5 bg-white/10 rounded-full hover:bg-red-500 transition-colors text-white"
            >
              <X size={18} />
            </button>

            {/* Header info */}
            <div className="flex items-center gap-4 mb-6 pb-5 border-b border-gray-800">
              <img src={game.image} alt={game.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-500/40" />
              <div>
                <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest bg-purple-500/10 px-2 py-0.5 rounded">
                  PORT VERIFICATION
                </span>
                <h3 className="text-xl font-black text-white font-oswald tracking-wide mt-0.5">{game.name}</h3>
                <p className="text-xs text-gray-400">{game.size} • 60 FPS Certified</p>
              </div>
            </div>

            {/* Hardware Scanner Status Box */}
            <div className="bg-[#0A0D14] border-2 border-cyan-500/30 rounded-2xl p-5 mb-6 text-center relative overflow-hidden">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Cpu size={20} className={scanStep !== 'verified' ? 'text-cyan-400 animate-spin' : 'text-green-400'} />
                <span className="text-xs font-black tracking-widest uppercase text-cyan-300">
                  {scanStep === 'analyzing' && 'Analyzing Hardware GPU...'}
                  {scanStep === 'optimizing' && 'Unlocking 60 FPS Configuration...'}
                  {scanStep === 'verified' && 'Hardware Approved & Optimized'}
                </span>
              </div>

              <p className="text-sm font-bold text-white mb-2">{detectedPhone}</p>

              {/* Progress visual */}
              <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden mb-2">
                <div 
                  className={`h-full transition-all duration-700 ${scanStep === 'verified' ? 'bg-green-500 w-full' : scanStep === 'optimizing' ? 'bg-cyan-400 w-3/4' : 'bg-purple-500 w-1/3'}`} 
                />
              </div>

              {scanStep === 'verified' ? (
                <div className="flex items-center justify-center gap-1.5 text-xs text-green-400 font-bold mt-2">
                  <CheckCircle2 size={16} /> 100% Compatible (Direct CDN Slot Assigned)
                </div>
              ) : (
                <span className="text-[10px] text-gray-400">Benchmarking Vulkan & OpenGL Engine...</span>
              )}
            </div>

            {/* Download Action */}
            {scanStep === 'verified' ? (
              <div className="space-y-3">
                <button
                  onClick={onConfirmDownload}
                  className="w-full py-5 bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-400 text-white font-black text-base rounded-2xl uppercase tracking-[0.2em] shadow-[0_0_30px_rgba(168,85,247,0.6)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <Download size={22} className="animate-bounce" />
                  <span>DOWNLOAD VERIFIED PORT</span>
                </button>
                <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  <ShieldCheck size={14} className="text-green-400" /> Antivirus Scanned • No Root Required
                </div>
              </div>
            ) : (
              <button 
                disabled 
                className="w-full py-4 bg-gray-800 text-gray-400 font-black text-xs rounded-2xl uppercase tracking-widest cursor-not-allowed opacity-70 flex items-center justify-center gap-2"
              >
                <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                VERIFYING SYSTEM DRIVERS...
              </button>
            )}

            {/* Sponsor banner embedded cleanly inside modal */}
            <div className="mt-6 pt-4 border-t border-gray-800">
              <MonetagAd zoneId="10512786" className="h-20 w-full" label="Verified Sponsor" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Game Card Component ---
const GameCard: React.FC<{ 
  game: Game; 
  onDownload: () => void; 
}> = ({ game, onDownload }) => (
  <motion.article 
    whileHover={{ y: -6 }}
    className="group relative bg-[#131720] border-2 border-gray-800 rounded-[2rem] overflow-hidden transition-all hover:border-purple-500 hover:shadow-[0_10px_40px_rgba(168,85,247,0.25)] flex flex-col justify-between"
  >
    <div>
      <div className="relative h-48 overflow-hidden bg-gray-900">
        <img 
          src={game.image} 
          alt={game.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          loading="lazy" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131720] via-transparent to-transparent opacity-80" />
        
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1">
          <Star size={11} className="text-yellow-400 fill-yellow-400" />
          <span className="text-[11px] font-bold text-white">{game.rating}</span>
        </div>
        
        <div className="absolute bottom-3 left-3 flex gap-2">
          <span className="bg-purple-600/90 backdrop-blur-md text-white text-[9px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
            {game.category}
          </span>
          <span className="bg-cyan-500/90 backdrop-blur-md text-black text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
            60 FPS
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-white font-black text-lg group-hover:text-purple-400 transition-colors line-clamp-1 mb-1.5 font-oswald tracking-wide">
          {game.name}
        </h3>
        
        <div className="flex items-center gap-3 text-[10px] text-gray-400 mb-3 font-bold uppercase tracking-widest">
          <span className="flex items-center gap-1 text-cyan-400"><Zap size={12} /> {game.size}</span>
          <span>•</span>
          <span>{game.version}</span>
        </div>

        <div className="grid grid-cols-2 gap-1.5 mb-2">
          {game.features.slice(0, 2).map((f, i) => (
            <div key={`feat-${game.id}-${i}`} className="bg-white/5 border border-white/5 px-2.5 py-1 rounded-md flex items-center gap-1.5 overflow-hidden">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
              <span className="text-[10px] text-gray-300 truncate font-medium">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="p-5 pt-0">
      <button 
        onClick={onDownload}
        className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-black text-xs rounded-xl uppercase tracking-[0.2em] transition-all hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] active:scale-95 flex items-center justify-center gap-2"
      >
        <Download size={15} /> Download Port
      </button>
    </div>
  </motion.article>
);

// --- Main Application Component ---
export default function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [stats, setStats] = useState<UserStats>({ points: 250, level: 2, badges: [] });
  const [selectedGameForModal, setSelectedGameForModal] = useState<Game | null>(null);
  const [isTrustModalOpen, setIsTrustModalOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const observerTarget = useRef<HTMLDivElement>(null);

  const filteredGames = useMemo(() => {
    return GAMES.filter(g => {
      const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || g.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const handleOpenDownloadFlow = (game: Game) => {
    setSelectedGameForModal(game);
    setIsTrustModalOpen(true);
  };

  const handleConfirmDirectDownload = () => {
    setStats(prev => ({ ...prev, points: prev.points + 100 }));
    window.open(DIRECT_LINK, '_blank');
    setIsTrustModalOpen(false);
  };

  const completeChallenge = (id: string) => {
    if (completedChallenges.includes(id)) return;
    setCompletedChallenges(prev => [...prev, id]);
    setStats(prev => ({ ...prev, points: prev.points + 50 }));
  };

  // Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount(prev => prev + 6);
        }
      },
      { threshold: 1.0 }
    );
    if (observerTarget.current) observer.observe(observerTarget.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`min-h-screen pb-32 ${!isDarkMode ? 'bg-gray-100 text-black' : 'bg-[#0A0D14] text-white'} font-['Inter'] selection:bg-purple-500 selection:text-white`}>
      
      {/* 🔴 Background Monetag Scripts 🔴 */}
      <GlobalAds />

      {/* --- Header --- */}
      <header className="p-5 sm:p-6 text-center relative max-w-5xl mx-auto pt-6">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="absolute top-6 right-6 p-3 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-full hover:scale-110 transition-transform"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-500 font-oswald tracking-tight drop-shadow-[0_0_20px_rgba(168,85,247,0.4)]">
          VIRAL GAMES HUB
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 font-medium max-w-md mx-auto mb-5 mt-1">
          Rare Mobile Ports, APK Redeem Drops & 60FPS Verified Configs
        </p>

        {/* Gamification Bar */}
        <div className="flex flex-wrap justify-center items-center gap-3">
          <a 
            href={DIRECT_LINK} 
            target="_blank"
            rel="noreferrer"
            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-4 py-2 rounded-xl flex items-center gap-2 font-black text-xs uppercase tracking-widest shadow-md hover:scale-105 transition-transform"
          >
            <TrendingUp size={15} /> Free Rewards 💰
          </a>
          <div className="bg-[#131720] border border-gray-800 px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs font-black text-white">
            <Trophy className="text-yellow-400" size={16} />
            <span>{stats.points} PTS (LVL {stats.level})</span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 relative">
        
        {/* ========================================================= */}
        {/* 1. TOP SECTION: IMMEDIATE SEARCH & PORTS CATALOG (PRIMARY) */}
        {/* ========================================================= */}
        <section className="mt-2 mb-8">
          
          {/* Top Banner Ad */}
          <div className="mb-6 max-w-4xl mx-auto">
            <MonetagAd zoneId="10512785" className="h-[80px] sm:h-[90px] w-full" label="Featured Partner" />
          </div>

          {/* Search & Category Pills */}
          <div className="mb-8 space-y-4">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search rare ports, GTA V, Black Myth, 60FPS mods..." 
                className="w-full pl-12 pr-4 py-3.5 bg-[#131720] border-2 border-gray-800 rounded-2xl focus:border-purple-500 outline-none text-white transition-all shadow-sm text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {['All', 'Racing', 'Action', 'Low MB', 'Adventure', 'Simulation'].map((cat, idx) => (
                <button 
                  key={`cat-btn-${cat}-${idx}`}
                  onClick={() => setCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${category === cat ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-md shadow-purple-500/30' : 'bg-[#131720] text-gray-400 border border-gray-800 hover:bg-gray-800'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Game Catalog Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.slice(0, visibleCount).map((game, idx) => (
              <React.Fragment key={`game-${game.id}`}>
                <GameCard 
                  game={game} 
                  onDownload={() => handleOpenDownloadFlow(game)}
                />
                {/* Blended In-Feed Native Ad Unit */}
                {(idx + 1) % 4 === 0 && (
                  <MonetagAd zoneId="10481725" className="min-h-[360px]" label="Sponsored Partner" />
                )}
              </React.Fragment>
            ))}
          </div>

          {visibleCount < filteredGames.length && (
            <div ref={observerTarget} className="h-14 flex items-center justify-center mt-6">
              <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </section>

        {/* ========================================================= */}
        {/* 2. BOTTOM SECTION: QUESTS & LEADERBOARDS (SECONDARY)       */}
        {/* ========================================================= */}
        <div className="border-t border-gray-800/80 pt-10 space-y-12">
          
          {/* Daily Quests */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Zap size={20} className="text-cyan-400" />
              <h2 className="text-xl font-black text-white font-oswald tracking-wide">DAILY REWARD QUESTS</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {DAILY_CHALLENGES.map((challenge) => (
                <DailyChallengeCard
                  key={`dc-${challenge.id}`}
                  challenge={challenge}
                  isCompleted={completedChallenges.includes(challenge.id)}
                  onComplete={() => completeChallenge(challenge.id)}
                />
              ))}
            </div>
          </section>

          {/* Leaderboard */}
          <section className="bg-[#131720] border border-gray-800 p-6 rounded-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Trophy size={20} className="text-yellow-400" />
              <h2 className="text-xl font-black text-white font-oswald tracking-wide">TOP GAMERS LEADERBOARD</h2>
            </div>
            <div className="space-y-2">
              {LEADERBOARD.slice(0, 4).map((entry) => (
                <LeaderboardRow key={`lb-${entry.rank}`} entry={entry} />
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* --- Sticky Bottom App Bar --- */}
      <nav className="fixed bottom-0 w-full bg-[#0A0D14]/95 backdrop-blur-xl border-t border-gray-800 z-50 h-16 flex justify-around items-center px-4 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-center gap-1 text-purple-400">
          <Gamepad2 size={20} /><span className="text-[9px] font-bold tracking-widest">PORTS</span>
        </button>
        <button onClick={() => window.open(DIRECT_LINK, '_blank')} className="flex flex-col items-center gap-1 text-gray-500 hover:text-cyan-400 transition-colors">
          <Trophy size={20} /><span className="text-[9px] font-bold tracking-widest">REWARDS</span>
        </button>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-400 transition-colors">
          <Search size={20} /><span className="text-[9px] font-bold tracking-widest">SEARCH</span>
        </button>
      </nav>

      {/* --- Trust-Builder Scanner Modal (Opens on Get Port click) --- */}
      {selectedGameForModal && (
        <DeviceTrustModal 
          game={selectedGameForModal}
          isOpen={isTrustModalOpen}
          onClose={() => setIsTrustModalOpen(false)}
          onConfirmDownload={handleConfirmDirectDownload}
        />
      )}

    </div>
  );
}

// Sub-components for Daily Challenge Card and Leaderboard Row
const DailyChallengeCard: React.FC<{ challenge: any; isCompleted: boolean; onComplete: () => void }> = ({ challenge, isCompleted, onComplete }) => (
  <div 
    className="bg-[#131720] border border-purple-500/20 rounded-2xl p-4 cursor-pointer hover:border-purple-500/60 transition-all"
    onClick={onComplete}
  >
    <div className="flex items-start justify-between mb-2">
      <span className="text-2xl">{challenge.icon}</span>
      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${isCompleted ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'}`}>
        {isCompleted ? '✓ DONE' : `+${challenge.reward} PTS`}
      </span>
    </div>
    <h4 className="text-sm font-bold text-white mb-0.5">{challenge.title}</h4>
    <p className="text-xs text-gray-400 mb-2.5">{challenge.description}</p>
    <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full transition-all" style={{ width: `${isCompleted ? 100 : 30}%` }} />
    </div>
  </div>
);

const LeaderboardRow: React.FC<{ entry: any }> = ({ entry }) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
    <div className="flex items-center gap-3">
      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs ${
        entry.rank === 1 ? 'bg-yellow-500/20 text-yellow-300' :
        entry.rank === 2 ? 'bg-gray-400/20 text-gray-300' :
        entry.rank === 3 ? 'bg-orange-500/20 text-orange-300' :
        'bg-purple-500/20 text-purple-300'
      }`}>
        {entry.rank}
      </div>
      <div>
        <p className="text-sm font-bold text-white">{entry.username}</p>
        <p className="text-[10px] text-gray-400">Level {entry.level}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-base">{entry.badge}</span>
      <span className="text-xs font-black text-purple-400">{entry.points.toLocaleString()} PTS</span>
    </div>
  </div>
);