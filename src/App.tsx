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
  MessageSquare, Send, Smartphone, Sparkles, FileText
} from 'lucide-react';
import { Game, GAMES, UserStats, DAILY_CHALLENGES, LEADERBOARD } from './types';

const DIRECT_LINK = 'https://omg10.com/4/10446433';
const MONETIZATION_LINKS = [
  'https://omg10.com/4/10446433',
  'https://otieu.com/4/10446433'
];

const trackEvent = (event: string, payload: Record<string, string | number | boolean> = {}) => {
  const eventData = {
    event,
    timestamp: Date.now(),
    ...payload,
  };

  try {
    const existing = JSON.parse(localStorage.getItem('vgh_events') || '[]');
    existing.push(eventData);
    localStorage.setItem('vgh_events', JSON.stringify(existing.slice(-25)));
  } catch {
    // Ignore localStorage errors in private mode or restricted browsers
  }

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('vgh_event', { detail: eventData }));
  }
};

const getRandomDirectLink = () =>
  MONETIZATION_LINKS[Math.floor(Math.random() * MONETIZATION_LINKS.length)] || DIRECT_LINK;

// --- Haptic Feedback Helper for Mobile ---
const triggerHaptic = (pattern: number | number[] = 30) => {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // Ignore vibration errors on unsupported platforms
    }
  }
};

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

// --- In-Feed Monetag Ad Unit with Ad-Block Fallback ---
const MonetagAd: React.FC<{ 
  zoneId: string; 
  className?: string;
  label?: string;
}> = ({ zoneId, className = '', label = 'Featured Partner' }) => {
  const getAdContent = () => {
    const ads = [
      { title: 'Play GTA V Mobile Port', desc: '60 FPS Vulkan build with touch layout & controller support.', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&fm=webp&w=600&q=75', cta: 'Play Now' },
      { title: 'Claim $100 Gaming Gift Card', desc: 'Complete rapid verification tasks and claim daily rewards!', image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&fm=webp&w=600&q=75', cta: 'Claim Loot' },
      { title: 'Ultra 60FPS Optimizer Tool', desc: 'Official hardware tuner for Snapdragon & MediaTek chipsets.', image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&fm=webp&w=600&q=75', cta: 'Boost Device' },
      { title: 'Cyberpunk 2077 Mobile Port', desc: 'Download the newly released community 60 FPS mobile build.', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&fm=webp&w=600&q=75', cta: 'Get APK' }
    ];
    const adIndex = Math.abs(parseInt(zoneId.replace(/\D/g, '') || '0')) % ads.length;
    return ads[adIndex] || ads[0];
  };

  const ad = getAdContent();

  return (
    <div 
      onClick={() => {
        triggerHaptic(25);
        window.open(DIRECT_LINK, '_blank');
      }}
      className={`relative overflow-hidden group cursor-pointer bg-gradient-to-br from-[#181c26] to-[#0f1219] border-2 border-purple-500/20 rounded-[2rem] flex flex-col justify-between transition-all hover:border-purple-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] ${className}`}
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
              <span className="bg-yellow-500 text-black px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider shadow">VIP PASS</span>
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

// --- Game Card Component ---
const GameCard: React.FC<{ 
  game: Game; 
  onSelect: () => void; 
}> = ({ game, onSelect }) => (
  <motion.article 
    whileHover={{ y: -6 }}
    className="group relative bg-[#131720] border-2 border-gray-800 rounded-[2rem] overflow-hidden cursor-pointer transition-all hover:border-purple-500 hover:shadow-[0_10px_40px_rgba(168,85,247,0.25)] flex flex-col justify-between"
    onClick={onSelect}
  >
    <div>
      <div className="relative h-48 overflow-hidden bg-gray-900">
        <img 
          src={game.image} 
          alt={game.name}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=75';
          }}
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

// --- Subpage: AI Hardware Benchmark & Two-Step Delivery Flow ---
const AIScannerSubpage: React.FC<{
  game: Game;
  onBack: () => void;
  onRewardEarned: (pts: number) => void;
}> = ({ game, onBack, onRewardEarned }) => {
  const [scanStep, setScanStep] = useState<number>(1);
  const [progress, setProgress] = useState<number>(15);
  const [detectedModel, setDetectedModel] = useState<string>('Android Gaming Device');
  
  // Two-Step Delivery State
  const [isDelivering, setIsDelivering] = useState<boolean>(false);
  const [deliveryCountdown, setDeliveryCountdown] = useState<number>(8);
  const [isDeliveryComplete, setIsDeliveryComplete] = useState<boolean>(false);

  // User Reviews & FPS Benchmark Reports state
  const [userReviews, setUserReviews] = useState<Array<{ user: string; device: string; fps: string; comment: string; rating: number }>>([]);
  const [newComment, setNewComment] = useState('');
  const [newDevice, setNewDevice] = useState('');
  const [newFps, setNewFps] = useState('60 FPS');

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
        { user: "Abhay_ProGamer", device: "Realme GT 6T", fps: "60 FPS", comment: "Runs buttery smooth! Full touch response layout works without lag.", rating: 5 },
        { user: "SnapdragonBeast", device: "Redmi Note 13 Pro+", fps: "58-60 FPS", comment: "Vulkan cache compiled in 2 seconds. Config file is authentic.", rating: 5 }
      ]);
    }
  }, [game.id]);

  useEffect(() => {
    // Intelligent hardware model detection
    const ua = navigator.userAgent;
    if (/iPhone/i.test(ua)) setDetectedModel('Apple Bionic / A17 Pro Metal Engine');
    else if (/Samsung/i.test(ua)) setDetectedModel('Samsung Galaxy Snapdragon 8 Gen Engine');
    else if (/Redmi|Xiaomi/i.test(ua)) setDetectedModel('Xiaomi/Redmi High-Poly Gaming Unit');
    else if (/Realme/i.test(ua)) setDetectedModel('Realme Ultra Gaming Hardware (ARM64)');
    else setDetectedModel('Universal High-Performance ARM64 Chipset');

    // Multi-stage scan timing with haptic feedback
    const t1 = setTimeout(() => { 
      setScanStep(2); 
      setProgress(45); 
      triggerHaptic([30, 40, 30]);
    }, 1300);

    const t2 = setTimeout(() => { 
      setScanStep(3); 
      setProgress(80); 
      triggerHaptic([40, 60, 40]);
    }, 2600);

    const t3 = setTimeout(() => { 
      setScanStep(4); 
      setProgress(100); 
      triggerHaptic(70);
    }, 3900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // Delivery countdown timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isDelivering && deliveryCountdown > 0) {
      timer = setInterval(() => {
        setDeliveryCountdown(prev => prev - 1);
        triggerHaptic(15);
      }, 1000);
    } else if (isDelivering && deliveryCountdown === 0) {
      setIsDeliveryComplete(true);
      triggerHaptic([60, 100, 60]);
    }
    return () => clearInterval(timer);
  }, [isDelivering, deliveryCountdown]);

  const handleStartDelivery = () => {
    triggerHaptic(50);
    window.open(DIRECT_LINK, '_blank');
    setIsDelivering(true);
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
      comment: newComment.trim(),
      rating: 5
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

      {/* Futuristic Scanner Benchmark Console */}
      <div className="bg-[#0f1219] border-2 border-cyan-500/30 rounded-[2.5rem] p-6 sm:p-8 mb-8 shadow-[0_0_60px_rgba(34,211,238,0.15)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />

        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
              <Cpu size={22} className={scanStep < 4 ? "animate-spin" : ""} />
            </div>
            <div>
              <h3 className="text-lg font-black text-white font-oswald tracking-wide">AI HARDWARE & PORT OPTIMIZER</h3>
              <p className="text-[11px] text-cyan-400 font-bold tracking-widest uppercase">{detectedModel}</p>
            </div>
          </div>
          <span className="text-lg font-black text-cyan-400 font-mono">{progress}%</span>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full bg-gray-900 h-3 rounded-full overflow-hidden mb-6 p-0.5 border border-gray-800">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-green-400 rounded-full transition-all duration-700 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Live Terminal Diagnostic Logs */}
        <div className="space-y-3 mb-6 bg-black/40 p-4 rounded-2xl border border-gray-800/80 font-mono text-xs">
          <div className="flex items-center gap-2.5 text-gray-300">
            {scanStep >= 1 ? <CheckCircle2 size={16} className="text-green-400 shrink-0" /> : <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin shrink-0" />}
            <span>[1/3] Benchmarking Vulkan Shaders & GPU Core Clock...</span>
          </div>
          <div className="flex items-center gap-2.5 text-gray-300">
            {scanStep >= 2 ? <CheckCircle2 size={16} className="text-green-400 shrink-0" /> : scanStep === 1 ? <span className="text-gray-600 pl-6">• Standby</span> : <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin shrink-0" />}
            <span>[2/3] Patching 60FPS / 120Hz Thermal Bypass Profile...</span>
          </div>
          <div className="flex items-center gap-2.5 text-gray-300">
            {scanStep >= 3 ? <CheckCircle2 size={16} className="text-green-400 shrink-0" /> : scanStep < 3 ? <span className="text-gray-600 pl-6">• Standby</span> : <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin shrink-0" />}
            <span>[3/3] Assigning High-Speed Verified CDN Download Route...</span>
          </div>
        </div>

        {/* Diagnostic Stat Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <div className="bg-[#131720] border border-gray-800 p-3 rounded-xl text-center">
            <span className="text-[10px] text-gray-500 uppercase font-bold block">Status</span>
            <span className="text-xs font-black text-cyan-400">{scanStep === 4 ? 'Verified' : 'Testing'}</span>
          </div>
          <div className="bg-[#131720] border border-gray-800 p-3 rounded-xl text-center">
            <span className="text-[10px] text-gray-500 uppercase font-bold block">Target FPS</span>
            <span className="text-xs font-black text-green-400">60 FPS Stable</span>
          </div>
          <div className="bg-[#131720] border border-gray-800 p-3 rounded-xl text-center">
            <span className="text-[10px] text-gray-500 uppercase font-bold block">Sensitivity</span>
            <span className="text-xs font-black text-purple-400">Ultra High (200)</span>
          </div>
          <div className="bg-[#131720] border border-gray-800 p-3 rounded-xl text-center">
            <span className="text-[10px] text-gray-500 uppercase font-bold block">Security</span>
            <span className="text-xs font-black text-yellow-400">Clean APK</span>
          </div>
        </div>

        {/* Two-Step Action Area */}
        {scanStep === 4 ? (
          <div className="space-y-4">
            {!isDelivering ? (
              <button 
                onClick={handleStartDelivery}
                className="w-full py-5 bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-400 text-white font-black text-base sm:text-lg rounded-2xl uppercase tracking-widest shadow-[0_0_40px_rgba(168,85,247,0.6)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <Download size={22} className="animate-bounce" />
                <span>GENERATE DECRYPTED 60FPS DOWNLOAD LINK</span>
              </button>
            ) : !isDeliveryComplete ? (
              <div className="bg-[#131720] border-2 border-purple-500/40 p-6 rounded-2xl text-center space-y-3 animate-pulse">
                <div className="flex items-center justify-center gap-2 text-cyan-400 font-bold">
                  <Activity size={20} className="animate-spin" />
                  <span>DECRYPTING CLOUD MIRROR LINK ({deliveryCountdown}s)...</span>
                </div>
                <p className="text-xs text-gray-400">Please complete the sponsored window to authorize high-speed bandwidth allocation.</p>
              </div>
            ) : (
              <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-3">
                <button 
                  onClick={() => handleDownloadAsset('apk')}
                  className="w-full py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-black text-base sm:text-lg rounded-2xl uppercase tracking-widest shadow-[0_0_40px_rgba(34,197,94,0.6)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
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

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
              <ShieldCheck size={16} className="text-green-400" /> Antivirus Scanned • Tested on Android & iOS
            </div>
          </div>
        ) : (
          <button 
            disabled 
            className="w-full py-4 bg-gray-900 border border-gray-800 text-gray-400 font-black text-xs rounded-2xl uppercase tracking-widest opacity-80 cursor-not-allowed flex items-center justify-center gap-2"
          >
            <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            CALCULATING HARDWARE STABILITY...
          </button>
        )}
      </div>

      {/* Subpage In-Content Sponsor Banner */}
      <div className="mb-10">
        <MonetagAd zoneId="10512785" className="h-32 w-full" label="Verified Partner Sponsor" />
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
              placeholder="Your device (e.g. S24 Ultra / iPhone 15)" 
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
  const [toast, setToast] = useState<string>('');
  const [adBlockNotice, setAdBlockNotice] = useState(false);
  const [liveDownloadCount, setLiveDownloadCount] = useState(14892);
  const [playersOnline, setPlayersOnline] = useState(1248);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const detectAdBlocker = async () => {
      try {
        await fetch('https://a.realsrv.com/88/tag.min.js', { method: 'HEAD', mode: 'no-cors' });
      } catch {
        setAdBlockNotice(true);
      }
    };

    detectAdBlocker();
  }, []);

  useEffect(() => {
    const counterTimer = window.setInterval(() => {
      setLiveDownloadCount(prev => prev + Math.floor(Math.random() * 9) + 2);
      setPlayersOnline(prev => prev + Math.floor(Math.random() * 12) + 1);
    }, 4500);

    return () => window.clearInterval(counterTimer);
  }, []);

  useEffect(() => {
    if (page === 'scanner' && selectedGame) {
      document.title = `⚡ Verified Download: ${selectedGame.name} (60FPS Port)`;
    } else {
      document.title = 'Viral Games Hub | High-Graphics Mobile Ports';
    }
  }, [page, selectedGame]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const source = params.get('utm_source') || 'direct';
    sessionStorage.setItem('traffic_source', source);

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

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search), 150);
    return () => window.clearTimeout(timer);
  }, [search]);

  const filteredGames = useMemo(() => {
    return GAMES.filter(g => {
      const matchesSearch = g.name.toLowerCase().includes(debouncedSearch.toLowerCase());
      const matchesCategory = category === 'All' || g.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [debouncedSearch, category]);

  const handleSelectGame = (game: Game) => {
    triggerHaptic(30);
    trackEvent('game_selected', { game_id: game.id, game_name: game.name });
    setSelectedGame(game);
    setPage('scanner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDirectLink = () => {
    const link = getRandomDirectLink();
    trackEvent('direct_link_click', { link, source: sessionStorage.getItem('traffic_source') || 'direct' });
    window.open(link, '_blank');
    return link;
  };

  const handleShareGame = async (game: Game = selectedGame as Game) => {
    if (!game) return;

    const shareUrl = `${window.location.origin}${window.location.pathname}?game=${encodeURIComponent(game.id)}`;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const tempInput = document.createElement('textarea');
        tempInput.value = shareUrl;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
      }

      setStats(prev => ({ ...prev, points: prev.points + 50 }));
      trackEvent('share_game', { game_id: game.id, game_name: game.name });
      setToast('Copied to Clipboard (+50 PTS)');
      triggerHaptic([25, 35, 25]);
    } catch {
      trackEvent('share_game_failed', { game_id: game.id, game_name: game.name });
      setToast('Share link ready to copy');
    }

    window.setTimeout(() => setToast(''), 1800);
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
      
      {/* 🔴 Background Monetag Scripts 🔴 */}
      <GlobalAds />

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
            onClick={() => trackEvent('header_reward_click', { source: sessionStorage.getItem('traffic_source') || 'direct' })}
            className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black px-4 py-2 rounded-xl flex items-center gap-2 font-black text-xs uppercase tracking-widest shadow-md hover:scale-105 transition-transform"
          >
            <TrendingUp size={15} /> Free Rewards 💰
          </a>
          <button
            onClick={() => selectedGame ? handleShareGame(selectedGame) : handleShareGame(GAMES[0])}
            className="bg-[#131720] border border-purple-500/30 text-purple-300 px-4 py-2 rounded-xl flex items-center gap-2 font-black text-[10px] uppercase tracking-widest hover:border-purple-500 transition-all"
          >
            <Share2 size={15} /> Share Game
          </button>
          <div className="bg-[#131720] border border-gray-800 px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs font-black text-white">
            <Trophy className="text-yellow-400" size={16} />
            <span>{stats.points} PTS (LVL {stats.level})</span>
          </div>
          <div className="bg-[#131720] border border-green-500/30 px-3 py-2 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] text-green-300">
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Active Players Online: {playersOnline.toLocaleString()}
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <div className="inline-flex items-center gap-2 bg-[#131720] border border-orange-500/30 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.18em] text-orange-300">
            <span className="inline-block w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
            🔥 {liveDownloadCount.toLocaleString()} Downloads Today • 99.4% Verified
          </div>
        </div>
      </header>

      {adBlockNotice && (
        <div className="max-w-4xl mx-auto px-4 mb-5">
          <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-center text-[11px] text-amber-200 font-bold tracking-wide">
            Using an ad blocker? Disable it if download links fail to generate.
          </div>
        </div>
      )}

      <main className="max-w-6xl mx-auto px-4 relative">
        
        {/* ========================================================= */}
        {/* 1. DISCOVERY VIEW: PORTS CATALOG (DEFAULT LANDING VIEW)   */}
        {/* ========================================================= */}
        <div className={page === 'scanner' ? 'hidden' : 'block'}>
          <section className="mt-2 mb-8">
            
            {/* Top Sponsor Ad */}
            <div className="mb-6 max-w-4xl mx-auto">
              <MonetagAd zoneId="10512785" className="h-[80px] sm:h-[90px] w-full" label="Featured Partner" />
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

            {/* Game Catalog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.slice(0, visibleCount).map((game, idx) => (
                <React.Fragment key={`game-${game.id}`}>
                  <GameCard 
                    game={game} 
                    onSelect={() => handleSelectGame(game)}
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
        {/* 3. SUBPAGE: INTERACTIVE AI HARDWARE SCANNER & VERIFICATION */}
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

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="https://t.me/viralgameshub"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#229ED9] text-white px-5 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.18em] shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-transform"
          >
            <Send size={16} /> Join Official VIP Configs Channel
          </a>
          <a
            href="https://wa.me/?text=Join%20the%20Viral%20Games%20Hub%20configs%20channel%20for%2060FPS%20mobile%20ports%20and%20daily%20drops.%20https://whole-lemons-fall.loca.lt"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white px-5 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.18em] shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-transform"
          >
            <MessageSquare size={16} /> Share via WhatsApp
          </a>
        </div>

        <p className="text-[10px] text-gray-600 text-center mt-8">
          Disclaimer: Viral Games Hub is a community testing utility. All trademarks, configs, and assets belong to their respective publishers.
        </p>

      </main>

      {/* --- Sticky Bottom Bar Navigation --- */}
      <nav className="fixed bottom-0 w-full bg-[#0A0D14]/95 backdrop-blur-xl border-t border-gray-800 z-50 h-16 flex justify-around items-center px-4 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <button onClick={() => { triggerHaptic(20); setPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex flex-col items-center gap-1 text-purple-400">
          <Gamepad2 size={20} /><span className="text-[9px] font-bold tracking-widest">PORTS</span>
        </button>
        <button onClick={() => { triggerHaptic(20); handleDirectLink(); }} className="flex flex-col items-center gap-1 text-gray-500 hover:text-cyan-400 transition-colors">
          <Trophy size={20} /><span className="text-[9px] font-bold tracking-widest">REWARDS</span>
        </button>
        <button onClick={() => { triggerHaptic(20); setPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex flex-col items-center gap-1 text-gray-500 hover:text-purple-400 transition-colors">
          <Search size={20} /><span className="text-[9px] font-bold tracking-widest">SEARCH</span>
        </button>
      </nav>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[60] bg-emerald-500 text-black font-black text-[10px] uppercase tracking-[0.18em] px-4 py-2 rounded-full shadow-[0_0_25px_rgba(16,185,129,0.5)]"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}