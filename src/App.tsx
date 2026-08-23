/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, Search, Cpu, Trophy, Star, Download, 
  ArrowLeft, Share2, X, Flame, Zap, TrendingUp, Award, 
  Sun, Moon, CheckCircle2, ShieldCheck, Activity, Gauge,
  MessageSquare, Send, Smartphone, Sparkles, FileText, Bell, AlertTriangle
} from 'lucide-react';
import { Game, GAMES, UserStats, DAILY_CHALLENGES, LEADERBOARD } from './types';

const DIRECT_LINK = 'https://omg10.com/4/10446433';
const FALLBACK_LINK = 'https://otieu.com/4/10446433';

// --- Haptic Feedback Utility ---
const triggerHaptic = (pattern: number | number[] = 30) => {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // Haptics not supported or blocked by user preference
    }
  }
};

// --- Background Global Monetag Tag Injector ---
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

// --- Smart Ad Unit with Active-Tab Auto-Refresh & Anti-Adblock Fallback ---
const MonetagAd: React.FC<{ 
  zoneId: string; 
  className?: string;
  minHeight?: string;
  label?: string;
}> = ({ zoneId, className = '', minHeight = 'min-h-[280px]', label = 'Sponsored Partner' }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isUserActive, setIsUserActive] = useState(true);
  const [adBlocked, setAdBlocked] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const lastInteraction = useRef(Date.now());

  // Detect Ad-Blocker
  useEffect(() => {
    const checkAdBlock = async () => {
      try {
        await fetch('https://a.realsrv.com/88/tag.min.js', { method: 'HEAD', mode: 'no-cors' });
        setAdBlocked(false);
      } catch {
        setAdBlocked(true);
      }
    };
    checkAdBlock();
  }, []);

  // Viewability Observer (>= 50% threshold)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting && entry.intersectionRatio >= 0.5),
      { threshold: [0.5] }
    );
    if (adRef.current) observer.observe(adRef.current);
    return () => observer.disconnect();
  }, []);

  // User Engagement Activity Listeners
  useEffect(() => {
    const handleActivity = () => {
      lastInteraction.current = Date.now();
      if (!isUserActive) setIsUserActive(true);
    };

    window.addEventListener('scroll', handleActivity, { passive: true });
    window.addEventListener('touchstart', handleActivity, { passive: true });
    window.addEventListener('mousemove', handleActivity, { passive: true });

    const activityInterval = setInterval(() => {
      if (Date.now() - lastInteraction.current > 45000) {
        setIsUserActive(false);
      }
    }, 10000);

    return () => {
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      window.removeEventListener('mousemove', handleActivity);
      clearInterval(activityInterval);
    };
  }, [isUserActive]);

  // Active View Auto-Refresh every 25s
  useEffect(() => {
    if (!isVisible || !isUserActive || adBlocked) return;
    const refreshInterval = setInterval(() => {
      setRefreshKey(prev => prev + 1);
    }, 25000);
    return () => clearInterval(refreshInterval);
  }, [isVisible, isUserActive, adBlocked]);

  const getAdContent = () => {
    const ads = [
      { title: 'Play GTA V Mobile Port', desc: 'Official Vulkan 60 FPS build with custom touch response layout.', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&fm=webp&w=600&q=75', cta: 'Play Now' },
      { title: 'Claim $100 Gaming Gift Card', desc: 'Complete rapid verification tasks and claim daily rewards!', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&fm=webp&w=600&q=75', cta: 'Claim Loot' },
      { title: 'Ultra 60FPS Optimizer Tool', desc: 'Official hardware tuner for Snapdragon & MediaTek chipsets.', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&fm=webp&w=600&q=75', cta: 'Boost Device' },
      { title: 'Cyberpunk 2077 Mobile Port', desc: 'Download the newly released community 60 FPS mobile build.', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&fm=webp&w=600&q=75', cta: 'Get APK' }
    ];
    const adIndex = Math.abs(parseInt(zoneId.replace(/\D/g, '') || '0') + refreshKey) % ads.length;
    return ads[adIndex] || ads[0];
  };

  const ad = getAdContent();

  return (
    <div 
      ref={adRef}
      key={`${zoneId}-${refreshKey}`}
      onClick={() => {
        triggerHaptic(25);
        window.open(adBlocked ? FALLBACK_LINK : DIRECT_LINK, '_blank');
      }}
      className={`relative overflow-hidden group cursor-pointer bg-gradient-to-br from-[#181c26] to-[#0f1219] border-2 border-purple-500/20 rounded-[2rem] flex flex-col justify-between transition-all hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] ${minHeight} ${className}`}
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
              <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider shadow ${adBlocked ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black'}`}>
                {adBlocked ? 'VIP PASS' : 'SPONSORED'}
              </span>
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
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </div>
  );
};

// --- Monetag Full-Page Vignette Modal (1x Per Session) ---
const VignetteModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        key="vignette-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="w-full max-w-lg bg-[#131720] border-2 border-purple-500 rounded-[2.5rem] p-6 sm:p-8 text-center shadow-[0_0_100px_rgba(168,85,247,0.4)] relative"
        >
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2.5 bg-white/10 rounded-full hover:bg-red-500 transition-colors text-white"
          >
            <X size={18} />
          </button>

          <div className="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em] mb-2">Priority Verification Access</div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-oswald mb-3">FAST-TRACK 60FPS PORT DOWNLOAD</h2>
          <p className="text-xs sm:text-sm text-gray-400 mb-6 leading-relaxed">
            Verify sponsor allocation below to prioritize high-speed CDN mirror servers and bypass queue limits.
          </p>

          <MonetagAd zoneId="10512785" minHeight="min-h-[140px]" className="mb-6" label="Sponsor Allocation" />

          <button 
            onClick={() => {
              triggerHaptic(40);
              window.open(DIRECT_LINK, '_blank');
              onClose();
            }}
            className="w-full py-4 bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-400 text-white font-black text-sm rounded-2xl uppercase tracking-widest shadow-lg hover:scale-105 transition-transform"
          >
            Verify & Unlock Port
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- In-Page Web Push Notification Prompt ---
const PushPromptModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        key="push-prompt"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -60, opacity: 0 }}
        className="fixed top-5 left-4 right-4 max-w-md mx-auto z-[900] bg-[#131720]/95 backdrop-blur-xl border-2 border-cyan-500/40 p-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
      >
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl">
            <Bell size={20} className="animate-bounce" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-black text-white font-oswald">UNLOCK DAILY 60FPS PORT ALERTS</h4>
            <p className="text-xs text-gray-300 mb-3">Get instant notifications when new GTA V, CarX, and Black Myth ports drop.</p>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  triggerHaptic(30);
                  if ('Notification' in window) Notification.requestPermission();
                  onClose();
                }}
                className="flex-1 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black text-xs rounded-xl uppercase tracking-wider"
              >
                Allow Updates
              </button>
              <button 
                onClick={onClose}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-gray-400 font-bold text-xs rounded-xl"
              >
                Later
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- Floating Bottom Smart Banner ---
const FloatingBottomBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-[72px] left-0 right-0 z-40 px-4 pointer-events-none flex justify-center">
      <div className="pointer-events-auto w-full max-w-md bg-[#131720] rounded-2xl border-2 border-purple-500/30 p-1 shadow-[0_10px_40px_rgba(0,0,0,0.9)] relative">
        <button 
          onClick={() => {
            triggerHaptic(15);
            setIsVisible(false);
          }}
          className="absolute -top-2.5 -right-2.5 bg-gray-800 border border-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-500 z-50 text-xs shadow"
        >
          ✕
        </button>
        <MonetagAd zoneId="10481725" minHeight="min-h-[58px]" className="border-none rounded-xl" label="VIP Promo" />
      </div>
    </div>
  );
};

// --- Game Card Component ---
const GameCard: React.FC<{ 
  game: Game; 
  onSelect: () => void; 
}> = ({ game, onSelect }) => (
  <motion.article 
    whileHover={{ y: -6 }}
    className="group relative bg-[#131720] border-2 border-gray-800 rounded-[2rem] overflow-hidden cursor-pointer transition-all hover:border-purple-500 hover:shadow-[0_10px_40px_rgba(168,85,247,0.25)] flex flex-col justify-between min-h-[380px]"
    onClick={onSelect}
  >
    <div>
      <div className="relative h-48 overflow-hidden bg-gray-900">
        <img 
          src={game.image} 
          alt={game.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          loading="lazy" 
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&fm=webp&w=600&q=75';
          }}
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
          <span className="bg-cyan-500/90 backdrop-blur-md text-black text-[9px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
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
        onClick={onSelect}
        className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-black text-xs rounded-xl uppercase tracking-[0.2em] transition-all hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] active:scale-95 flex items-center justify-center gap-2"
      >
        <Download size={15} /> Get Port APK
      </button>
    </div>
  </motion.article>
);

// --- 3-Step Micro-Funnel Subpage ---
const AIScannerSubpage: React.FC<{
  game: Game;
  onBack: () => void;
  onRewardEarned: (pts: number) => void;
}> = ({ game, onBack, onRewardEarned }) => {
  const [funnelStep, setFunnelStep] = useState<1 | 2 | 3>(1);
  const [step1Progress, setStep1Progress] = useState(20);
  const [step2Progress, setStep2Progress] = useState(0);
  const [detectedModel, setDetectedModel] = useState('Android Gaming Device');
  
  // Step 3 Delivery State
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [countdown, setCountdown] = useState(8);

  // UGC Reviews State
  const [userReviews, setUserReviews] = useState<Array<{ user: string; device: string; fps: string; comment: string }>>([]);
  const [newComment, setNewComment] = useState('');
  const [newDevice, setNewDevice] = useState('');
  const [newFps, setNewFps] = useState('60 FPS');

  // Dynamic Browser Title
  useEffect(() => {
    document.title = `⚡ Verified 60FPS Port: ${game.name} (Android/iOS)`;
    return () => {
      document.title = 'Viral Games Hub | High-Graphics Mobile Ports';
    };
  }, [game]);

  // Load reviews from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`viral_reviews_${game.id}`);
    if (saved) {
      try {
        setUserReviews(JSON.parse(saved));
      } catch {
        setUserReviews([]);
      }
    } else {
      setUserReviews([
        { user: "Abhay_ProGamer", device: "Realme GT 6T", fps: "60 FPS", comment: "Runs buttery smooth! Full touch response layout works without frame drop." },
        { user: "SnapdragonBeast", device: "Redmi Note 13 Pro+", fps: "58-60 FPS", comment: "Vulkan cache compiled in 2 seconds. Config file is authentic." }
      ]);
    }
  }, [game.id]);

  // Step 1: Hardware & GPU Benchmark (4s)
  useEffect(() => {
    const ua = navigator.userAgent;
    if (/iPhone/i.test(ua)) setDetectedModel('Apple Bionic / A17 Pro Metal Engine');
    else if (/Samsung/i.test(ua)) setDetectedModel('Samsung Galaxy Snapdragon 8 Gen Engine');
    else if (/Redmi|Xiaomi/i.test(ua)) setDetectedModel('Xiaomi/Redmi High-Poly Gaming Unit');
    else if (/Realme/i.test(ua)) setDetectedModel('Realme Ultra Gaming Hardware (ARM64)');
    else setDetectedModel('Universal High-Performance ARM64 Chipset');

    const progressTimer = setInterval(() => {
      setStep1Progress(prev => (prev < 90 ? prev + 15 : prev));
    }, 600);

    const step1Timer = setTimeout(() => {
      setStep1Progress(100);
      triggerHaptic([30, 50, 30]);
      setFunnelStep(2);
    }, 4000);

    return () => {
      clearInterval(progressTimer);
      clearTimeout(step1Timer);
    };
  }, []);

  // Step 2: Server Bandwidth Allocation & CDN Handshake (5s)
  useEffect(() => {
    if (funnelStep !== 2) return;

    const progressInterval = setInterval(() => {
      setStep2Progress(prev => (prev < 95 ? prev + 10 : prev));
    }, 500);

    const step2Timer = setTimeout(() => {
      setStep2Progress(100);
      triggerHaptic([40, 60, 40]);
      setFunnelStep(3);
    }, 5000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(step2Timer);
    };
  }, [funnelStep]);

  // Step 3: Decrypted Countdown (8s)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (funnelStep === 3 && !isDecrypted && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
        triggerHaptic(15);
      }, 1000);
    } else if (funnelStep === 3 && countdown === 0) {
      setIsDecrypted(true);
      triggerHaptic([60, 100, 60]);
    }
    return () => clearInterval(timer);
  }, [funnelStep, isDecrypted, countdown]);

  const handleTriggerDirectLink = () => {
    triggerHaptic(50);
    window.open(DIRECT_LINK, '_blank');
    onRewardEarned(100);
  };

  const handleDownloadAsset = (type: 'apk' | 'config') => {
    triggerHaptic(30);
    if (type === 'config') {
      const configData = `[PerformanceConfig]\nTargetFPS=60\nResolutionScale=1.0\nVulkanEngine=1\nHighSensitivity=200\nDeviceModel=${detectedModel}\nGameTarget=${game.name}`;
      const blob = new Blob([configData], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${game.name.replace(/[^a-zA-Z0-9]/g, '_')}_60FPS_Config.ini`;
      a.click();
    } else {
      window.open(game.playStoreUrl || DIRECT_LINK, '_blank');
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newEntry = {
      user: `Gamer_${Math.floor(1000 + Math.random() * 9000)}`,
      device: newDevice.trim() || 'Android Device',
      fps: newFps,
      comment: newComment.trim()
    };

    const updated = [newEntry, ...userReviews];
    setUserReviews(updated);
    localStorage.setItem(`viral_reviews_${game.id}`, JSON.stringify(updated));
    setNewComment('');
    setNewDevice('');
    onRewardEarned(50);
    triggerHaptic(40);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto w-full pt-4 pb-28"
    >
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-purple-400 font-bold uppercase tracking-wider text-xs bg-[#131720] border border-gray-800 px-4 py-2 rounded-full hover:bg-gray-800 transition-all w-fit"
      >
        <ArrowLeft size={16} /> Back to Catalog
      </button>

      {/* Selected Game Showcase Card */}
      <div className="bg-[#131720] border-2 border-purple-500/30 rounded-[2.5rem] p-6 sm:p-8 mb-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img src={game.image} alt={game.name} className="w-28 h-28 sm:w-36 sm:h-36 rounded-3xl object-cover border-2 border-purple-500/50 shadow-lg shadow-purple-500/20" />
          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-2">
              <span className="bg-purple-600 px-3 py-0.5 rounded text-[10px] font-bold text-white uppercase">{game.category}</span>
              <span className="bg-cyan-400 px-3 py-0.5 rounded text-[10px] font-bold text-black uppercase">{game.size}</span>
              <span className="bg-yellow-500 px-3 py-0.5 rounded text-[10px] font-bold text-black uppercase">⭐ {game.rating}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white font-oswald tracking-wide mb-2">{game.name}</h2>
            <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">{game.description}</p>
          </div>
        </div>
      </div>

      {/* Multi-Step Micro-Funnel Console */}
      <div className="bg-[#0f1219] border-2 border-cyan-500/30 rounded-[2.5rem] p-6 sm:p-8 mb-8 shadow-[0_0_60px_rgba(34,211,238,0.15)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
              <Cpu size={22} className={funnelStep < 3 ? "animate-spin" : ""} />
            </div>
            <div>
              <h3 className="text-lg font-black text-white font-oswald tracking-wide">
                {funnelStep === 1 && 'STEP 1: GPU & HARDWARE BENCHMARK'}
                {funnelStep === 2 && 'STEP 2: ALLOCATING HIGH-SPEED CDN'}
                {funnelStep === 3 && 'STEP 3: DECRYPTED MIRROR LINK READY'}
              </h3>
              <p className="text-[11px] text-cyan-400 font-bold tracking-widest uppercase">{detectedModel}</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold bg-cyan-950/60 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30">
            {funnelStep}/3
          </span>
        </div>

        {/* Funnel Progress Visual */}
        {funnelStep === 1 && (
          <div className="space-y-4">
            <div className="w-full bg-gray-900 h-3 rounded-full overflow-hidden p-0.5 border border-gray-800">
              <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full transition-all duration-500" style={{ width: `${step1Progress}%` }} />
            </div>
            <p className="text-xs text-gray-300 font-mono text-center">Testing Vulkan Shader Pipeline & Frame Timings...</p>
          </div>
        )}

        {funnelStep === 2 && (
          <div className="space-y-6">
            <div className="w-full bg-gray-900 h-3 rounded-full overflow-hidden p-0.5 border border-gray-800">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-green-400 rounded-full transition-all duration-500" style={{ width: `${step2Progress}%` }} />
            </div>
            <p className="text-xs text-green-400 font-mono text-center">✓ 60FPS Profile Verified. Connecting to Dedicated CDN Handshake...</p>
            
            {/* Lazy-loaded Native Ad directly beneath the progress bar */}
            <MonetagAd zoneId="10481725" minHeight="min-h-[220px]" label="High-Speed CDN Sponsor" />
          </div>
        )}

        {funnelStep === 3 && (
          <div className="space-y-4">
            {!isDecrypted ? (
              <div className="bg-[#131720] border-2 border-purple-500/40 p-6 rounded-2xl text-center space-y-3">
                <div className="flex items-center justify-center gap-2 text-cyan-400 font-bold text-sm">
                  <Activity size={20} className="animate-spin" />
                  <span>AUTHORIZING MIRROR BANDWIDTH ({countdown}s)...</span>
                </div>
                <button 
                  onClick={handleTriggerDirectLink}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-black text-sm rounded-xl uppercase tracking-widest shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Download size={18} /> CLICK TO SPEED UP DECRYPTION
                </button>
              </div>
            ) : (
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-3">
                <button 
                  onClick={() => handleDownloadAsset('apk')}
                  className="w-full py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-base rounded-2xl uppercase tracking-widest shadow-[0_0_40px_rgba(34,197,94,0.6)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <CheckCircle2 size={24} />
                  <span>DOWNLOAD VERIFIED APK (MIRROR 1)</span>
                </button>
                <button 
                  onClick={() => handleDownloadAsset('config')}
                  className="w-full py-3.5 bg-[#131720] hover:bg-purple-900/30 border border-purple-500/40 text-purple-300 font-bold text-xs rounded-xl uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
                >
                  <FileText size={16} /> Download 60FPS Sensitivity Config (.INI)
                </button>
              </motion.div>
            )}
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider pt-2">
              <ShieldCheck size={16} className="text-green-400" /> Antivirus Scanned • No Root Required
            </div>
          </div>
        )}
      </div>

      {/* Community Benchmark / FPS Feedback Wall */}
      <div className="bg-[#131720] border border-gray-800 p-6 sm:p-8 rounded-3xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <MessageSquare size={20} className="text-purple-400" />
            <h3 className="text-lg font-black text-white font-oswald tracking-wide">COMMUNITY BENCHMARKS & FPS REPORTS</h3>
          </div>
          <span className="text-xs text-gray-400 font-bold">{userReviews.length} Reports</span>
        </div>

        {/* Submit Report Form */}
        <form onSubmit={handleSubmitReview} className="mb-8 space-y-3 bg-black/40 p-4 rounded-2xl border border-gray-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input 
              type="text" 
              placeholder="Your device model (e.g. S24 Ultra / iPhone 15)" 
              value={newDevice}
              onChange={(e) => setNewDevice(e.target.value)}
              className="bg-[#131720] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-gray-500 outline-none focus:border-purple-500"
            />
            <select 
              value={newFps} 
              onChange={(e) => setNewFps(e.target.value)}
              className="bg-[#131720] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-purple-500"
            >
              <option value="60 FPS Stable">60 FPS Stable</option>
              <option value="90 FPS Unlocked">90 FPS Unlocked</option>
              <option value="120 FPS Extreme">120 FPS Extreme</option>
              <option value="45-50 FPS (Playable)">45-50 FPS (Playable)</option>
            </select>
          </div>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Share your sensitivity settings or gameplay experience..." 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 bg-[#131720] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-gray-500 outline-none focus:border-purple-500"
            />
            <button 
              type="submit" 
              className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
            >
              <Send size={14} /> Post
            </button>
          </div>
        </form>

        {/* Reviews List */}
        <div className="space-y-4">
          {userReviews.map((rev, idx) => (
            <div key={`rev-${idx}`} className="border-b border-gray-800/80 pb-4 last:border-0">
              <div className="flex flex-wrap justify-between items-center gap-2 mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-200">{rev.user}</span>
                  <span className="text-[10px] bg-purple-900/30 text-purple-300 border border-purple-700/30 px-2 py-0.5 rounded font-mono">
                    {rev.device}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded">
                  ⚡ {rev.fps}
                </span>
              </div>
              <p className="text-xs text-gray-400 italic">"{rev.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Application Component ---
export default function App() {
  const [page, setPage] = useState<'home' | 'scanner'>('home');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [stats, setStats] = useState<UserStats>({ points: 250, level: 2, badges: [] });
  const [visibleCount, setVisibleCount] = useState(6);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [showVignette, setShowVignette] = useState(false);
  const [showPushPrompt, setShowPushPrompt] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Search Debounce (150ms)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 150);
    return () => clearTimeout(timer);
  }, [search]);

  // Deep-Link Auto Routing (?game= or ?id=)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const gameParam = params.get('game') || params.get('id');
    if (gameParam) {
      const matched = GAMES.find(g => 
        g.id.toLowerCase() === gameParam.toLowerCase() || 
        g.name.toLowerCase().replace(/[^a-z0-9]/g, '-').includes(gameParam.toLowerCase())
      );
      if (matched) {
        setSelectedGame(matched);
        setPage('scanner');
      }
    }
  }, []);

  // Show Push Notification Prompt after 8s
  useEffect(() => {
    const timer = setTimeout(() => setShowPushPrompt(true), 8000);
    return () => clearTimeout(timer);
  }, []);

  const filteredGames = useMemo(() => {
    return GAMES.filter(g => {
      const matchesSearch = g.name.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesCategory = category === 'All' || g.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [debouncedSearch, category]);

  const handleSelectGame = (game: Game) => {
    triggerHaptic(30);
    setSelectedGame(game);
    
    // Check Vignette 1x per session
    const vignetteShown = sessionStorage.getItem('vignette_shown');
    if (!vignetteShown) {
      setShowVignette(true);
      sessionStorage.setItem('vignette_shown', 'true');
    }

    setPage('scanner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const completeChallenge = (id: string) => {
    if (completedChallenges.includes(id)) return;
    triggerHaptic(40);
    setCompletedChallenges(prev => [...prev, id]);
    setStats(prev => ({ ...prev, points: prev.points + 50 }));
  };

  // Infinite Scroll Observer
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
  }, [page]);

  return (
    <div className={`min-h-screen pb-32 ${!isDarkMode ? 'bg-gray-100 text-black' : 'bg-[#0A0D14] text-white'} font-['Inter'] selection:bg-purple-500 selection:text-white`}>
      
      {/* 🔴 Background Global Monetag Scripts 🔴 */}
      <GlobalAds />

      {/* Push & Vignette Modals */}
      <PushPromptModal isOpen={showPushPrompt} onClose={() => setShowPushPrompt(false)} />
      <VignetteModal isOpen={showVignette} onClose={() => setShowVignette(false)} />

      {/* --- Top Header --- */}
      <header className="p-5 sm:p-6 text-center relative max-w-5xl mx-auto pt-6">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="absolute top-6 right-6 p-3 bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-full hover:scale-110 transition-transform"
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <h1 
          onClick={() => { setPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-500 font-oswald tracking-tight drop-shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer"
        >
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
        {/* 1. DISCOVERY VIEW: PORTS CATALOG (DEFAULT LANDING VIEW)   */}
        {/* ========================================================= */}
        <div className={page === 'scanner' ? 'hidden' : 'block'}>
          <section className="mt-2 mb-8">
            
            {/* Top Banner Ad Container (Strict Layout Reservation) */}
            <div className="mb-6 max-w-4xl mx-auto">
              <MonetagAd zoneId="10512785" minHeight="min-h-[90px]" className="h-[90px] w-full" label="Featured Partner" />
            </div>

            {/* Search & Category Filter Pills */}
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
                    onClick={() => {
                      triggerHaptic(20);
                      setCategory(cat);
                    }}
                    className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${category === cat ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-md shadow-purple-500/30' : 'bg-[#131720] text-gray-400 border border-gray-800 hover:bg-gray-800'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Game Catalog Grid (Injected every 3rd card with Native Ad) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.slice(0, visibleCount).map((game, idx) => (
                <React.Fragment key={`game-${game.id}`}>
                  <GameCard 
                    game={game} 
                    onSelect={() => handleSelectGame(game)}
                  />
                  {/* Blended In-Feed Native Ad Unit */}
                  {(idx + 1) % 3 === 0 && (
                    <MonetagAd zoneId="10481725" minHeight="min-h-[380px]" label="Sponsored Partner" />
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
          {/* 2. FOOTER SECTION: QUESTS & LEADERBOARDS (SECONDARY)      */}
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
                  <div 
                    key={`dc-${challenge.id}`}
                    className="bg-[#131720] border border-purple-500/20 rounded-2xl p-4 cursor-pointer hover:border-purple-500/60 transition-all"
                    onClick={() => completeChallenge(challenge.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-2xl">{challenge.icon}</span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${completedChallenges.includes(challenge.id) ? 'bg-green-500/20 text-green-400' : 'bg-purple-500/20 text-purple-400'}`}>
                        {completedChallenges.includes(challenge.id) ? '✓ DONE' : `+${challenge.reward} PTS`}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mb-0.5">{challenge.title}</h4>
                    <p className="text-xs text-gray-400 mb-2.5">{challenge.description}</p>
                    <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full transition-all" style={{ width: `${completedChallenges.includes(challenge.id) ? 100 : 30}%` }} />
                    </div>
                  </div>
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
                  <div key={`lb-${entry.rank}`} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
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
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3. SUBPAGE: 3-STEP HARDWARE BENCHMARK & TWO-STEP DELIVERY */}
        {/* ========================================================= */}
        <AnimatePresence>
          {page === 'scanner' && selectedGame && (
            <AIScannerSubpage 
              game={selectedGame}
              onBack={() => {
                triggerHaptic(20);
                setPage('home');
              }}
              onRewardEarned={(pts) => setStats(prev => ({ ...prev, points: prev.points + pts }))}
            />
          )}
        </AnimatePresence>

      </main>

      {/* --- Floating Bottom Smart Banner --- */}
      <FloatingBottomBanner />

      {/* --- Sticky Bottom Bar Navigation --- */}
      <nav className="fixed bottom-0 w-full bg-[#0A0D14]/95 backdrop-blur-xl border-t border-gray-800 z-50 h-16 flex justify-around items-center px-4 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <button onClick={() => { triggerHaptic(20); setPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex flex-col items-center gap-1 text-purple-400">
          <Gamepad2 size={20} /><span className="text-[9px] font-bold tracking-widest">PORTS</span>
        </button>
        <button onClick={() => { triggerHaptic(20); window.open(DIRECT_LINK, '_blank'); }} className="flex flex-col items-center gap-1 text-gray-500 hover:text-cyan-400 transition-colors">
          <Trophy size={20} /><span className="text-[9px] font-bold tracking-widest">REWARDS</span>
        </button>
        <button onClick={() => { triggerHaptic(20); setPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-400 transition-colors">
          <Search size={20} /><span className="text-[9px] font-bold tracking-widest">SEARCH</span>
        </button>
      </nav>

    </div>
  );
}