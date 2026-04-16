/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Search, 
  Cpu, 
  Trophy, 
  Star, 
  Download, 
  ArrowLeft, 
  Share2, 
  Bell, 
  X, 
  Flame, 
  Zap,
  TrendingUp,
  Award,
  Sun,
  Moon,
  Target,
  Users
} from 'lucide-react';
import { Game, GAMES, UserStats, BADGES, DAILY_CHALLENGES, LEADERBOARD } from './types';

// --- Components ---

const MonetagAd: React.FC<{ zoneId: string; type?: 'banner' | 'native' | 'sidebar' | 'interstitial' | 'popunder' | 'vignette' | 'page-push' | 'vignette-banner'; className?: string }> = ({ zoneId, type = 'banner', className = '' }) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const adRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isUserActive, setIsUserActive] = useState(true);
  const lastActivity = useRef(Date.now());

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (adRef.current) observer.observe(adRef.current);
    
    const handleActivity = () => {
      lastActivity.current = Date.now();
      setIsUserActive(true);
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    const activityCheck = setInterval(() => {
      if (Date.now() - lastActivity.current > 60000) { // 1 minute idle
        setIsUserActive(false);
      }
    }, 10000);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      clearInterval(activityCheck);
    };
  }, []);

  useEffect(() => {
    if (!isVisible || !isUserActive) return;
    
    // Dynamic refresh rate: 
    // - High engagement types: 18s
    // - Standard types: 18s
    const isHighCPM = ['interstitial', 'vignette', 'vignette-banner', 'page-push'].includes(type);
    const rate = isHighCPM ? 18000 : 18000;
    
    const interval = setInterval(() => {
      setRefreshKey(prev => prev + 1);
    }, rate);
    
    return () => clearInterval(interval);
  }, [isVisible, isUserActive, type]);

  const getAdContent = () => {
    const ads = [
      { title: 'Play GTA V Mobile', desc: 'The official port is finally here. High graphics, 60FPS.', image: 'https://picsum.photos/seed/gta/400/200', cta: 'Play Now' },
      { title: 'Win $100 Gift Card', desc: 'Complete simple tasks and win big today!', image: 'https://picsum.photos/seed/win/400/200', cta: 'Claim' },
      { title: 'Boost Your FPS', desc: 'Official gaming optimizer for all Android devices.', image: 'https://picsum.photos/seed/boost/400/200', cta: 'Install' },
      { title: 'Unreleased Beta', desc: 'Be the first to play the new open-world RPG.', image: 'https://picsum.photos/seed/rpg/400/200', cta: 'Join Beta' }
    ];
    
    // Use zoneId to pick a stable ad for that slot
    const adIndex = parseInt(zoneId.replace(/\D/g, '') || '0') % ads.length;
    const baseAd = ads[adIndex];

    switch(type) {
      case 'interstitial':
        return { ...baseAd, typeLabel: 'INTERSTITIAL' };
      case 'popunder':
        return { ...baseAd, typeLabel: 'POPUNDER' };
      case 'vignette':
        return { ...baseAd, typeLabel: 'VIGNETTE' };
      case 'vignette-banner':
        return { ...baseAd, typeLabel: 'VIGNETTE BANNER' };
      case 'page-push':
        return { ...baseAd, typeLabel: 'PAGE PUSH' };
      case 'native':
        return { ...baseAd, typeLabel: 'NATIVE' };
      case 'sidebar':
        return { ...baseAd, typeLabel: 'SIDEBAR' };
      default:
        return { ...baseAd, typeLabel: 'BANNER' };
    }
  };

  const ad = getAdContent();

  return (
    <div 
      ref={adRef}
      key={`${zoneId}-${refreshKey}`} 
      onClick={() => {
        setRefreshKey(prev => prev + 1);
        window.open('https://omg10.com/4/10446433', '_blank');
      }}
      className={`relative overflow-hidden group cursor-pointer bg-[#1a1a1a] border border-white/10 rounded-2xl flex flex-col transition-all hover:border-accent/50 hover:shadow-[0_0_30px_rgba(255,0,128,0.2)] ${className}`}
    >
      <div className="relative h-full w-full flex flex-col">
        {/* Ad Image Background */}
        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
          <img 
            src={ad.image} 
            alt={`${ad.title} - ${ad.desc}`}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 p-4 flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center justify-between mb-1">
              <div className="text-[7px] font-black text-secondary uppercase tracking-[0.2em] opacity-80">
                Monetag {ad.typeLabel} #{zoneId}
              </div>
              <div className="bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-tighter">
                AD
              </div>
            </div>
            <h4 className="text-xs font-black text-white mb-1 group-hover:text-secondary transition-colors line-clamp-1">
              {ad.title}
            </h4>
            <p className="text-[10px] text-[var(--text-muted)] leading-tight line-clamp-2 italic">
              "{ad.desc}"
            </p>
          </div>
          
          <div className="mt-2 flex items-center justify-between">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={`ad-star-${i}`} size={8} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <div className="bg-accent text-white text-[8px] font-black px-3 py-1 rounded-full uppercase tracking-widest group-hover:scale-110 transition-transform">
              {ad.cta}
            </div>
          </div>
        </div>
      </div>
      
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
    </div>
  );
};

const VignetteAd: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        key="vignette-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6"
      >
        <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[var(--card-bg)] border-2 border-accent rounded-[2rem] md:rounded-[3rem] shadow-[0_0_100px_rgba(255,0,128,0.4)]">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors z-10"
          >
            <X size={20} className="text-white md:w-6 md:h-6" />
          </button>
          
          <div className="p-6 md:p-12 text-center">
            <div className="text-[8px] md:text-[10px] font-black text-accent uppercase tracking-[0.5em] mb-4">Monetag Vignette Ad</div>
            <h2 className="text-2xl md:text-4xl font-black text-white mb-4 md:mb-6 leading-tight">YOU ARE ONE STEP AWAY FROM YOUR DOWNLOAD!</h2>
            <p className="text-sm md:text-lg text-[var(--text-muted)] mb-6 md:mb-10">Click the button below to verify your device and unlock the high-speed download server.</p>
            
            <div className="bg-accent/10 border-2 border-accent/30 p-4 md:p-8 rounded-2xl md:rounded-3xl mb-6 md:mb-10">
              <MonetagAd zoneId="vignette-inner" type="native" className="h-24 md:h-32" />
            </div>

            <button 
              onClick={onClose}
              className="w-full py-4 md:py-6 bg-gradient-to-r from-accent to-[#7928ca] text-white font-black text-sm md:text-xl rounded-xl md:rounded-2xl uppercase tracking-widest shadow-xl hover:scale-105 transition-transform"
            >
              Verify & Continue
            </button>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent via-secondary to-accent animate-pulse" />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

// OfferWall Component - Complete offers to unlock games
interface CPAOffer {
  id: string;
  title: string;
  description: string;
  icon: string;
  reward: string;
  zone: string;
  link: string;
}

const OFFERS: CPAOffer[] = [
  { id: 'vpn1', title: 'Unlock VIP VPN Access', description: 'Instant free setup, no payment required', icon: '🔐', reward: '$3-5', zone: '10512785', link: 'https://omg10.com/4/10446433' },
  { id: 'app1', title: 'Install a Top App', description: 'Fast install, instant reward', icon: '🎮', reward: '$1-2', zone: '10481725', link: 'https://omg10.com/4/10446433' },
  { id: 'survey1', title: 'Complete a Mini Survey', description: 'Just 2 minutes to finish', icon: '📋', reward: '$0.50-1', zone: '10512786', link: 'https://omg10.com/4/10446433' },
  { id: 'vpn2', title: 'Start a VPN Trial', description: '30-day access, no charge today', icon: '🛡️', reward: '$2-4', zone: '10512787', link: 'https://omg10.com/4/10446433' },
];

const OfferWall: React.FC<{ game: Game; isOpen: boolean; onClose: () => void; onUnlock: () => void }> = ({ game, isOpen, onClose, onUnlock }) => {
  const [completedOffers, setCompletedOffers] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [selectedOffer, setSelectedOffer] = useState<CPAOffer | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const handleOfferClick = (offer: CPAOffer) => {
    setSelectedOffer(offer);
    window.open(offer.link, '_blank');
    setCompletedOffers(prev => [...prev, offer.id]);

    // Auto-unlock after any offer click (in real scenario, track via callback)
    setTimeout(() => {
      onUnlock();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="offerwall-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10000] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-2 md:p-4"
          style={{ pointerEvents: 'auto' }}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-md md:max-w-2xl max-h-[95vh] overflow-hidden bg-gradient-to-br from-slate-900/95 to-purple-900/95 border-2 border-accent/50 rounded-3xl shadow-[0_0_100px_rgba(255,0,128,0.4)] flex flex-col"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-accent/30 via-secondary/20 to-purple-500/30 border-b border-white/20 p-6">
              <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-secondary/10 rounded-t-3xl" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/30">
                    <img
                      src={game.image}
                      alt={game.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-secondary font-black uppercase tracking-[0.3em] mb-1">🎯 Free Unlock</p>
                    <h2 className="text-2xl font-black text-white">{game.name}</h2>
                    <p className="text-sm text-accent font-bold">Complete 1 offer below</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                  <X size={20} className="text-white" />
                </button>
              </div>

              {/* Progress Bar */}
              <div className="relative mt-6">
                <div className="flex items-center justify-between text-xs font-black text-secondary mb-2">
                  <span>Progress</span>
                  <span>{completedOffers.length}/1 Complete</span>
                </div>
                <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${completedOffers.length ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gradient-to-r from-accent to-secondary'}`} style={{ width: completedOffers.length ? '100%' : '0%' }} />
                </div>
                <div className="flex justify-center mt-3">
                  <span className="text-xs px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 font-black uppercase tracking-[0.2em]">{timeLeft}s remaining</span>
                </div>
              </div>
            </div>

            {/* Offers Grid */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 gap-4">
                {OFFERS.map((offer, index) => (
                  <motion.div
                    key={offer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative group ${
                      completedOffers.includes(offer.id)
                        ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-400/50'
                        : 'bg-gradient-to-r from-white/5 to-white/10 border-2 border-accent/30 hover:border-accent hover:shadow-[0_0_30px_rgba(255,0,128,0.3)]'
                    } rounded-2xl p-5 transition-all duration-300 cursor-pointer overflow-hidden`}
                    onClick={() => handleOfferClick(offer)}
                  >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full -translate-y-16 translate-x-16" />
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/20 rounded-full translate-y-12 -translate-x-12" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="text-4xl">{offer.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-lg font-black text-white">{offer.title}</h3>
                              {offer.id === 'vpn1' && (
                                <span className="px-2 py-1 rounded-full bg-secondary/20 text-secondary text-xs font-black uppercase tracking-[0.2em]">
                                  Best Choice
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed">{offer.description}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          {completedOffers.includes(offer.id) ? (
                            <div className="flex flex-col items-center">
                              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-1">
                                <span className="text-2xl">✓</span>
                              </div>
                              <span className="text-xs font-black text-green-400 uppercase tracking-wider">Done</span>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center">
                              <div className="text-2xl font-black text-secondary mb-1">{offer.reward}</div>
                              <span className="text-xs font-black text-secondary uppercase tracking-wider">Reward</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex justify-center">
                        <div className={`px-6 py-3 rounded-xl font-black text-sm uppercase tracking-wider transition-all ${
                          completedOffers.includes(offer.id)
                            ? 'bg-green-500/20 text-green-300 border border-green-400/50'
                            : 'bg-gradient-to-r from-accent to-secondary text-white hover:shadow-[0_0_20px_rgba(255,0,128,0.5)]'
                        }`}>
                          {completedOffers.includes(offer.id) ? '✅ Completed' : '🚀 Start Offer'}
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    {!completedOffers.includes(offer.id) && (
                      <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-gradient-to-t from-slate-900/95 to-purple-900/50 border-t border-white/20 p-6">
              <div className="text-center mb-4">
                <p className="text-sm font-black text-orange-300 uppercase tracking-[0.2em] mb-2">
                  {completedOffers.length > 0 ? '🎉 Unlock Ready!' : '⚡ Quick & Easy'}
                </p>
                <p className="text-xs text-gray-400">
                  {completedOffers.length > 0
                    ? 'Your game is ready to download!'
                    : 'Most users complete offers in under 60 seconds'
                  }
                </p>
              </div>

              <button
                onClick={() => {
                  if (completedOffers.length > 0) {
                    onUnlock();
                  }
                }}
                className={`w-full py-4 font-black text-lg rounded-2xl uppercase tracking-widest transition-all transform hover:scale-105 ${
                  completedOffers.length > 0
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-[0_0_40px_rgba(34,197,94,0.6)]'
                    : 'bg-gradient-to-r from-accent via-secondary to-purple-500 text-white hover:shadow-[0_0_30px_rgba(255,0,128,0.5)]'
                }`}
              >
                {completedOffers.length > 0 ? '🎮 Unlock & Play Now' : '👆 Choose Any Offer Above'}
              </button>

              <p className="text-xs text-center text-gray-500 mt-4">
                All offers are free to try • No credit card required • Instant rewards
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Daily Challenge Card Component
const DailyChallengeCard: React.FC<{ challenge: any; isCompleted: boolean; onComplete: () => void }> = ({ challenge, isCompleted, onComplete }) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="bg-[var(--card-bg)] border border-accent/30 rounded-xl p-4 cursor-pointer hover:border-accent transition-all hover:shadow-[0_10px_30px_rgba(255,0,128,0.2)]"
    onClick={onComplete}
  >
    <div className="flex items-start justify-between mb-2">
      <span className="text-2xl">{challenge.icon}</span>
      <span className={`text-xs font-black px-2 py-1 rounded-full ${isCompleted ? 'bg-green-500/20 text-green-400' : 'bg-accent/20 text-accent'}`}>
        {isCompleted ? '✓ DONE' : `+${challenge.reward} PTS`}
      </span>
    </div>
    <h4 className="text-sm font-black text-white mb-1">{challenge.title}</h4>
    <p className="text-xs text-[var(--text-muted)] mb-2">{challenge.description}</p>
    <div className="w-full bg-white/10 rounded-full h-2">
      <div className="bg-gradient-to-r from-accent to-secondary h-2 rounded-full transition-all" style={{ width: `${isCompleted ? 100 : 30}%` }} />
    </div>
  </motion.div>
);

// Leaderboard Position Component
const LeaderboardRow: React.FC<{ entry: any; isCurrentUser?: boolean }> = ({ entry, isCurrentUser }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className={`flex items-center justify-between p-3 rounded-lg ${isCurrentUser ? 'bg-accent/10 border border-accent/30' : 'bg-white/5 border border-white/10'} hover:bg-white/10 transition-colors`}
  >
    <div className="flex items-center gap-3 flex-1">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${
        entry.rank === 1 ? 'bg-yellow-500/20 text-yellow-300' :
        entry.rank === 2 ? 'bg-gray-400/20 text-gray-300' :
        entry.rank === 3 ? 'bg-orange-500/20 text-orange-300' :
        'bg-accent/20 text-accent'
      }`}>
        {entry.rank}
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold text-white">{entry.username}</p>
        <p className="text-xs text-[var(--text-muted)]">Level {entry.level}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-lg">{entry.badge}</span>
      <span className="text-sm font-black text-accent">{entry.points.toLocaleString()}</span>
    </div>
  </motion.div>
);

// Trending Games Section
const TrendingGamesSection: React.FC<{ games: Game[]; onSelectGame: (game: Game) => void }> = ({ games, onSelectGame }) => (
  <div className="mb-12">
    <div className="flex items-center gap-2 mb-4">
      <Flame size={24} className="text-secondary animate-bounce" />
      <h2 className="text-2xl font-black text-white">Trending Now 🔥</h2>
      <div className="h-1 flex-1 bg-gradient-to-r from-secondary via-accent to-transparent rounded-full" />
    </div>
    <div className="grid grid-cols-1 gap-3">
      {games.slice(0, 3).map((game, i) => (
        <motion.div
          key={`trending-${game.id}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          onClick={() => onSelectGame(game)}
          className="flex items-center gap-4 bg-gradient-to-r from-secondary/10 to-accent/5 border border-secondary/20 rounded-lg p-3 cursor-pointer hover:border-secondary/50 hover:scale-105 transition-all group"
        >
          <img src={game.image} alt={game.name} className="w-12 h-12 rounded object-cover" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-black text-white truncate group-hover:text-secondary transition-colors">{game.name}</p>
            <p className="text-xs text-[var(--text-muted)]">⭐ {game.rating} • {game.category}</p>
          </div>
          <TrendingUp size={16} className="text-secondary shrink-0" />
        </motion.div>
      ))}
    </div>
  </div>
);

// Top Performers Component
const TopPerformersSection: React.FC = () => (
  <div className="mb-12">
    <div className="flex items-center gap-2 mb-4">
      <Trophy size={24} className="text-yellow-400" />
      <h2 className="text-2xl font-black text-white">Top Players</h2>
      <div className="h-1 flex-1 bg-gradient-to-r from-yellow-400 via-accent to-transparent rounded-full" />
    </div>
    <div className="space-y-2">
      {LEADERBOARD.slice(0, 5).map((entry) => (
        <LeaderboardRow key={`lb-${entry.rank}`} entry={entry} />
      ))}
    </div>
    <button className="w-full mt-4 py-2 text-sm font-black text-accent hover:text-secondary border border-accent/30 hover:border-secondary/50 rounded-lg transition-all">
      View Full Leaderboard
    </button>
  </div>
);

// Daily Challenges Section
const DailyChallengesSection: React.FC<{ completedChallenges: string[]; onCompleteChallenge: (id: string) => void }> = ({ completedChallenges, onCompleteChallenge }) => (
  <div className="mb-12">
    <div className="flex items-center gap-2 mb-4">
      <Zap size={24} className="text-secondary" />
      <h2 className="text-2xl font-black text-white">Daily Quests</h2>
      <div className="h-1 flex-1 bg-gradient-to-r from-secondary via-accent to-transparent rounded-full" />
    </div>
    <div className="grid grid-cols-2 gap-3">
      {DAILY_CHALLENGES.map((challenge) => (
        <DailyChallengeCard
          key={`dc-${challenge.id}`}
          challenge={challenge}
          isCompleted={completedChallenges.includes(challenge.id)}
          onComplete={() => onCompleteChallenge(challenge.id)}
        />
      ))}
    </div>
  </div>
);

const Badge: React.FC<{ name: string; icon: string; description: string }> = ({ name, icon, description }) => (
  <motion.div 
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="flex items-center gap-2 bg-accent/10 border border-accent/30 px-3 py-1.5 rounded-full"
    title={description}
  >
    <span className="text-lg">{icon}</span>
    <span className="text-xs font-bold text-accent uppercase tracking-wider">{name}</span>
  </motion.div>
);

const GameCard: React.FC<{ 
  game: Game; 
  onClick: () => void; 
  onDownload: (e: React.MouseEvent) => void; 
  onShare: (e: React.MouseEvent) => void;
  layoutId?: string; 
  onKeyDown: (e: React.KeyboardEvent) => void;
}> = ({ game, onClick, onDownload, onShare, layoutId, onKeyDown }) => (
  <motion.article 
    layoutId={layoutId}
    whileHover={{ y: -12, scale: 1.02 }}
    className={`group relative bg-[var(--card-bg)] border-2 border-[var(--card-border)] rounded-[2rem] overflow-hidden cursor-pointer transition-all hover:shadow-[0_20px_60px_rgba(255,0,128,0.5)] hover:border-accent ${game.isAd ? 'ring-4 ring-secondary/30' : ''}`}
    onClick={onClick}
    onKeyDown={onKeyDown}
    tabIndex={0}
    role="button"
    aria-label={`View details for ${game.name}`}
  >
    <div className="relative h-48 overflow-hidden">
      <img 
        src={game.image} 
        alt={game.name} 
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        loading="lazy" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-color)] via-transparent to-transparent opacity-60" />
      
      <div className="absolute top-4 right-4 flex gap-2">
        {game.isAd && (
          <div className="bg-secondary text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
            Sponsored
          </div>
        )}
        <button 
          onClick={onShare}
          className="p-2 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-accent hover:border-accent transition-all shadow-lg"
          title="Share & Earn 50 PTS"
        >
          <Share2 size={14} />
        </button>
      </div>
      
      <div className="absolute bottom-4 left-4 flex gap-2">
        <span className="bg-accent/80 backdrop-blur-md text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest">
          {game.category}
        </span>
      </div>

      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1">
        <Star size={10} className="text-yellow-400 fill-yellow-400" />
        <span className="text-[10px] font-bold text-white">{game.rating}</span>
      </div>
    </div>

    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-[var(--text-main)] font-black text-xl group-hover:text-secondary transition-colors line-clamp-1">{game.name}</h3>
      </div>
      
      <div className="flex items-center gap-4 text-[10px] text-[var(--text-muted)] mb-4 font-bold uppercase tracking-widest">
        <span className="flex items-center gap-1"><Zap size={12} className="text-secondary" /> {game.size}</span>
        <span className="flex items-center gap-1"><Star size={12} className="text-accent" /> {game.version}</span>
        <span className="flex items-center gap-1 opacity-60">({game.reviewsCount} Reviews)</span>
      </div>

      {/* Review Snippet */}
      <div className="mb-4 p-2 bg-white/5 rounded-xl border border-white/10">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[9px] font-black text-accent uppercase tracking-tighter">Top Review</span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={`card-star-${game.id}-${i}`} size={8} className="text-yellow-400 fill-yellow-400" />
            ))}
          </div>
        </div>
        <p className="text-[9px] text-[var(--text-muted)] italic line-clamp-1">"Best mobile port ever! Graphics are insane."</p>
        <div className="text-[8px] text-secondary font-bold mt-1">— @GamerPro99</div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-6">
        {game.features.slice(0, 2).map((f, i) => (
          <div key={`feat-${game.id}-${i}`} className="bg-white/5 border border-white/10 p-2 rounded-lg flex items-center gap-2 overflow-hidden">
            <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
            <span className="text-[9px] text-[var(--text-main)] font-medium truncate">{f}</span>
          </div>
        ))}
      </div>

      <button 
        onClick={onDownload}
        className="group/btn relative w-full py-4 bg-gradient-to-r from-secondary to-[#7928ca] text-white font-black text-xs rounded-2xl uppercase tracking-[0.2em] overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] active:scale-95"
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          <Download size={16} className="group-hover/btn:animate-bounce" /> {game.isAd ? 'Claim Reward' : 'Get Port'}
        </span>
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
      </button>
    </div>
  </motion.article>
);

const GameCardSkeleton = () => (
  <div className="bg-white/5 border-2 border-white/10 rounded-[2rem] overflow-hidden animate-pulse">
    <div className="h-48 bg-white/10"></div>
    <div className="p-6 space-y-4">
      <div className="h-6 bg-white/10 rounded"></div>
      <div className="flex gap-4">
        <div className="h-4 bg-white/10 rounded w-16"></div>
        <div className="h-4 bg-white/10 rounded w-12"></div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-white/10 rounded"></div>
        <div className="h-3 bg-white/10 rounded w-3/4"></div>
      </div>
      <div className="h-12 bg-white/10 rounded-2xl"></div>
    </div>
  </div>
);

const SocialToast: React.FC<{ game: Game; location: string }> = ({ game, location }) => (
  <motion.div 
    key={`toast-${game.id}-${location}`}
    initial={{ y: 100, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 100, opacity: 0 }}
    className="fixed bottom-24 left-4 glass p-3 rounded-xl flex items-center gap-3 shadow-2xl z-50 max-w-[280px]"
  >
    <img src={game.image} alt={`${game.name} game thumbnail`} className="w-10 h-10 rounded-lg object-cover" />
    <div className="text-[11px] leading-tight">
      Someone from <span className="text-secondary font-bold">{location}</span> just downloaded <br />
      <strong className="text-accent">{game.name}</strong>!
    </div>
  </motion.div>
);

// Full-Page Interstitial on First Load
const FullPageInterstitial: React.FC<{ isOpen: boolean; onClose: () => void; onUnlock: () => void }> = ({ isOpen, onClose, onUnlock }) => {
  const [skipTimer, setSkipTimer] = useState(5);

  useEffect(() => {
    if (!isOpen) return;
    if (skipTimer <= 0) return;
    const timer = setInterval(() => setSkipTimer(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [isOpen, skipTimer]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          key="full-interstitial"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[500] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.85, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            className="w-full max-w-sm bg-gradient-to-b from-[var(--card-bg)] via-[#0a0a0a]/90 to-black border-2 border-accent rounded-3xl shadow-[0_0_150px_rgba(255,0,128,0.6)] p-6 text-center my-auto"
          >
            <div className="mb-4">
              <p className="text-[9px] text-secondary font-black uppercase tracking-[0.4em]">Welcome! 🎉</p>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight break-words">Unlock Rare Games</h1>
            <p className="text-xs md:text-sm text-[var(--text-muted)] mb-6 leading-relaxed break-words">Exclusive mobile ports. Free for 1 minute!</p>

            <div className="mb-6 p-4 bg-accent/10 border border-accent/30 rounded-2xl">
              <p className="text-xs text-orange-300 font-black uppercase tracking-[0.2em] mb-2">⏱️ Limited Time</p>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">Complete 1 offer & unlock ALL games. New users only.</p>
            </div>

            <div className="grid gap-3 mb-8">
              {OFFERS.slice(0, 2).map(offer => (
                <button
                  key={offer.id}
                  onClick={() => {
                    window.open(offer.link, '_blank');
                    setTimeout(onUnlock, 1000);
                  }}
                  className="w-full p-3 bg-gradient-to-r from-accent via-secondary to-[#7928ca] text-white font-black text-sm rounded-xl uppercase tracking-[0.1em] hover:shadow-[0_0_20px_rgba(255,0,128,0.5)] transition-all transform hover:scale-105 whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  {offer.icon} {offer.title}
                </button>
              ))}
            </div>

            <button 
              onClick={onClose}
              disabled={skipTimer > 0}
              className={`w-full py-3 font-black text-xs rounded-lg uppercase tracking-[0.1em] transition-all ${
                skipTimer > 0 
                  ? 'bg-white/10 text-white/50 cursor-not-allowed' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {skipTimer > 0 ? `Skip in ${skipTimer}s` : 'Enter Site'}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Exit-Intent Modal - Shows when mouse leaves
const ExitIntentModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div 
        key="exit-intent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[450] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          className="w-full max-w-sm bg-[var(--card-bg)] border-2 border-secondary rounded-2xl p-4 text-center shadow-[0_0_100px_rgba(0,212,255,0.4)]"
        >
          <p className="text-2xl mb-2">⏹️</p>
          <h2 className="text-lg font-black text-white mb-1 leading-tight break-words">Wait! Last Chance</h2>
          <p className="text-xs text-[var(--text-muted)] mb-4 leading-tight break-words">Unlock a game now. 60 seconds left!</p>

          <div className="space-y-1.5 mb-4">
            {OFFERS.slice(0, 2).map(offer => (
              <button
                key={offer.id}
                onClick={() => {
                  window.open(offer.link, '_blank');
                  onClose();
                }}
                className="w-full p-1.5 bg-gradient-to-r from-secondary to-accent text-white font-black text-xs rounded-lg uppercase hover:shadow-[0_0_15px_rgba(0,212,255,0.5)] transition-all truncate"
              >
                {offer.icon} {offer.title}
              </button>
            ))}
          </div>

          <button 
            onClick={onClose}
            className="w-full py-1.5 bg-white/10 text-white font-bold text-xs rounded-lg hover:bg-white/20 transition-all"
          >
            Leave
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// Sticky Floating Offer Button
const StickyOfferButton: React.FC<{ onClick: () => void; isVisible: boolean }> = ({ onClick, isVisible }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.button
        key="sticky-offer-btn"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="fixed bottom-20 right-6 z-[9997] px-4 py-3 bg-gradient-to-r from-accent to-secondary text-white font-black text-sm rounded-full shadow-[0_0_30px_rgba(255,0,128,0.6)] hover:shadow-[0_0_40px_rgba(0,212,255,0.6)] transition-all animate-bounce"
      >
        🎁 Unlock Now
      </motion.button>
    )}
  </AnimatePresence>
);

// Push Notification Prompt
const PushNotificationPrompt: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        key="push-prompt"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed top-6 right-6 z-[9996] bg-[var(--card-bg)] border-2 border-secondary rounded-2xl p-4 max-w-xs shadow-[0_0_30px_rgba(0,212,255,0.3)]"
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl shrink-0">🔔</span>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-black text-white mb-1 break-words">Stay Updated!</h3>
            <p className="text-xs text-[var(--text-muted)] mb-3 leading-relaxed">Get notified about new rare games.</p>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  window.Notification?.requestPermission?.();
                  onClose();
                }}
                className="flex-1 py-1.5 bg-secondary text-black font-black text-xs rounded-lg hover:bg-secondary/80 transition-all whitespace-nowrap"
              >
                Enable
              </button>
              <button 
                onClick={onClose}
                className="flex-1 py-1.5 bg-white/10 text-white font-black text-xs rounded-lg hover:bg-white/20 whitespace-nowrap"
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

// Native Ad Card
const NativeAdCard: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-[var(--card-bg)] border-2 border-secondary/30 rounded-[2rem] p-4 text-center hover:border-secondary transition-all"
  >
    <p className="text-[8px] text-secondary font-black uppercase tracking-[0.3em] mb-2">💎 Sponsored Offer</p>
    <MonetagAd zoneId={`native-${Math.random()}`} type="native" className="h-32" />
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [page, setPage] = useState<'home' | 'detail'>('home');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [stats, setStats] = useState<UserStats>({ points: 0, level: 1, badges: [] });
  const [showToast, setShowToast] = useState(false);
  const [toastData, setToastData] = useState({ game: GAMES[0], location: 'India' });
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [device, setDevice] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showPushModal, setShowPushModal] = useState(false);
  const [showDetailInterstitial, setShowDetailInterstitial] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedLayoutId, setSelectedLayoutId] = useState<string | null>(null);
  const [showDownloadSupport, setShowDownloadSupport] = useState(false);
  const [showVignette, setShowVignette] = useState(false);
  const [supportTimer, setSupportTimer] = useState(5);
  const [pendingDownloadGame, setPendingDownloadGame] = useState<Game | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  const [showOfferwall, setShowOfferwall] = useState(false);
  const [showFullInterstitial, setShowFullInterstitial] = useState(true);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [showStickyButton, setShowStickyButton] = useState(false);
  const [showPushPrompt, setShowPushPrompt] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  // Detail Interstitial Delay
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (page === 'detail' && selectedGame) {
      setShowDetailInterstitial(false);
      timer = setTimeout(() => {
        setShowDetailInterstitial(true);
      }, 5000);
    } else {
      setShowDetailInterstitial(false);
    }
    return () => clearTimeout(timer);
  }, [page, selectedGame]);

  // Load stats from local storage
  useEffect(() => {
    const saved = localStorage.getItem('viral_games_stats');
    if (saved) setStats(JSON.parse(saved));
    
    // Show push modal after 10s
    const timer = setTimeout(() => setShowPushModal(true), 10000);
    return () => clearTimeout(timer);
  }, []);

  // Save stats
  useEffect(() => {
    localStorage.setItem('viral_games_stats', JSON.stringify(stats));
  }, [stats]);

  // Social Proof Loop
  useEffect(() => {
    const interval = setInterval(() => {
      const randomGame = GAMES[Math.floor(Math.random() * GAMES.length)];
      const locations = ['India', 'USA', 'Brazil', 'Indonesia', 'UK', 'Germany'];
      const randomLoc = locations[Math.floor(Math.random() * locations.length)];
      setToastData({ game: randomGame, location: randomLoc });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Exit Intent Detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !showExitIntent) {
        setShowExitIntent(true);
      }
    };

    window.addEventListener('mousemove', handleMouseLeave);
    return () => window.removeEventListener('mousemove', handleMouseLeave);
  }, [showExitIntent]);

  // Show sticky button after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setShowStickyButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Show push notification prompt after 10s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPushPrompt(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Hide full interstitial after 5s delay
  useEffect(() => {
    const timer = setTimeout(() => {
      const shown = sessionStorage.getItem('interstitial_shown');
      if (!shown) {
        setShowFullInterstitial(true);
        sessionStorage.setItem('interstitial_shown', 'true');
      } else {
        setShowFullInterstitial(false);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const filteredGames = useMemo(() => {
    return GAMES.filter(g => {
      const matchesSearch = g.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === 'All' || g.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const recommendations = useMemo(() => {
    // Simple recommendation: games in the same category as the last viewed, or just trending
    return GAMES.filter(g => !g.isAd).sort(() => Math.random() - 0.5).slice(0, 3);
  }, [selectedGame]);

  const addPoints = (amount: number) => {
    setStats(prev => {
      const newPoints = prev.points + amount;
      const newLevel = Math.floor(newPoints / 500) + 1;
      return { ...prev, points: newPoints, level: newLevel };
    });
  };

  const unlockBadge = (badgeId: string) => {
    setStats(prev => {
      if (prev.badges.includes(badgeId)) return prev;
      return { ...prev, badges: [...prev.badges, badgeId] };
    });
  };

  const handleShare = (e: React.MouseEvent, game: Game, platform: 'whatsapp' | 'twitter' | 'facebook' | 'instagram' = 'twitter') => {
    e.stopPropagation();
    const url = window.location.href;
    const text = `🔥 Check out this unreleased mobile port for *${game.name}*! It's insane. Get it here:`;
    let shareUrl = '';

    if (platform === 'whatsapp') {
      shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
    } else if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    } else if (platform === 'instagram') {
      // Instagram doesn't have a direct share URL for web, use Web Share API or copy to clipboard
      if (navigator.share) {
        navigator.share({
          title: game.name,
          text: text,
          url: url,
        }).catch(() => {
          navigator.clipboard.writeText(`${text} ${url}`);
          alert('Link copied to clipboard! Share it on your Instagram Story.');
        });
      } else {
        navigator.clipboard.writeText(`${text} ${url}`);
        alert('Link copied to clipboard! Share it on your Instagram Story.');
      }
      addPoints(50);
      setShareCount(prev => prev + 1);
      completeChallenge('share-daily');
      if (shareCount + 1 >= 5) unlockBadge('sharer-pro');
      unlockBadge('social-butterfly');
      return;
    }

    if (shareUrl) window.open(shareUrl, '_blank');
    addPoints(50);
    setShareCount(prev => prev + 1);
    completeChallenge('share-daily');
    if (shareCount + 1 >= 5) unlockBadge('sharer-pro');
    unlockBadge('social-butterfly');
  };

  const completeChallenge = (challengeId: string) => {
    if (completedChallenges.includes(challengeId)) return;
    
    const challenge = DAILY_CHALLENGES.find(c => c.id === challengeId);
    if (challenge) {
      addPoints(challenge.reward);
      setCompletedChallenges(prev => [...prev, challengeId]);
    }
  };

  const handleDownload = (game: Game) => {
    setPendingDownloadGame(game);
    setShowOfferwall(true);
  };

  const handleVignetteClose = () => {
    setShowVignette(false);
    setShowDownloadSupport(true);
    setSupportTimer(15);
    // Simulate Popunder on vignette close
    if (Math.random() > 0.5) {
      window.open('https://omg10.com/4/10446433', '_blank');
    }
  };

  const confirmDownload = () => {
    if (!pendingDownloadGame) return;
    addPoints(100);
    completeChallenge('download-daily');
    if (stats.points >= 1000 && !stats.badges.includes('trending-hunter')) unlockBadge('trending-hunter');
    if (stats.badges.filter(b => b.includes('collected')).length >= 10) unlockBadge('collector');
    if (pendingDownloadGame.isAd) unlockBadge('ad-clicker');
    if (pendingDownloadGame.category === 'Racing') {
      const racingCount = GAMES.filter(g => g.category === 'Racing' && stats.badges.includes(g.id)).length;
      if (racingCount >= 2) unlockBadge('speed-racer');
    }
    window.open(pendingDownloadGame.playStoreUrl, '_blank');
    setShowDownloadSupport(false);
    setPendingDownloadGame(null);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showDownloadSupport && supportTimer > 0) {
      timer = setInterval(() => {
        setSupportTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showDownloadSupport, supportTimer]);

  const startScan = () => {
    if (!device) return;
    setIsScanning(true);
    setScanResult(null);
    setShowSuggestions(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(`✅ DEVICE COMPATIBLE: ${device.toUpperCase()} 4K ENGINE UNLOCKED`);
      addPoints(200);
      unlockBadge('device-master');
    }, 3000);
  };

  const commonDevices = [
    'iPhone 15 Pro Max', 'iPhone 14 Pro', 'Samsung Galaxy S24 Ultra', 
    'Samsung Galaxy S23', 'Google Pixel 8 Pro', 'OnePlus 12', 
    'ROG Phone 8', 'Xiaomi 14 Ultra', 'Realme GT 5', 'Nothing Phone (2)'
  ];

  const suggestions = useMemo(() => {
    if (!device || device.length < 2) return [];
    return commonDevices.filter(d => d.toLowerCase().includes(device.toLowerCase()));
  }, [device]);

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

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [page]); // Re-run when page changes to ensure ref is attached

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(6);
  }, [search, category]);

  return (
    <div className={`min-h-screen pb-24 ${!isDarkMode ? 'light-mode' : ''}`}>
      {/* --- Header --- */}
      <header className="p-6 text-center relative">
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="absolute top-6 right-6 p-3 bg-accent/10 dark:bg-accent/20 border-2 border-accent/40 dark:border-accent/50 text-accent dark:text-secondary rounded-full hover:scale-110 transition-transform shadow-sm"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-6xl font-black text-gradient tracking-tighter mb-2 cursor-pointer select-none"
        onClick={() => {
          if (Math.random() > 0.8) document.body.classList.add('glitch-effect');
          setTimeout(() => document.body.classList.remove('glitch-effect'), 500);
        }}
        tabIndex={0}
        role="banner"
        aria-label="Viral Games Hub main title"
      >
          VIRAL GAMES HUB
        </motion.h1>
        <p className="text-sm text-[var(--text-main)] font-bold max-w-md mx-auto opacity-90">
          Discover the Best High-Graphics Mobile Ports & Official Recommendations
        </p>
        
        {/* --- Vignette Banner Ad --- */}
        <div className="mt-8 max-w-4xl mx-auto px-6">
          <MonetagAd zoneId="vignette-banner-10512785" type="vignette-banner" className="h-24 md:h-32 border-accent/30 bg-accent/5" />
        </div>

        {/* --- Gamification Bar --- */}
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a 
            href="https://otieu.com/4/10446433" 
            target="_blank"
            className="bg-secondary text-black px-6 py-2 rounded-2xl flex items-center gap-2 font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(0,212,255,0.4)]"
          >
            <TrendingUp size={16} /> Get Free Points 💰
          </a>
          <div className="bg-accent/10 border border-accent/30 px-4 py-2 rounded-2xl flex items-center gap-3">
            <Trophy className="text-accent" size={20} />
            <div className="text-left">
              <div className="text-[10px] uppercase font-black text-accent opacity-60">Level {stats.level}</div>
              <div className="text-sm font-black text-accent">{stats.points} PTS</div>
            </div>
          </div>
            <div className="flex gap-2">
              {stats.badges.map((bId, idx) => {
                const b = BADGES.find(x => x.id === bId);
                return b ? <Badge key={`badge-${b.id}-${idx}`} name={b.name} icon={b.icon} description={b.description} /> : null;
              })}
            </div>
        </div>
      </header>

      <main className="container mx-auto px-6 relative" role="main">
        {/* --- Home Content (Always Mounted) --- */}
        <div className={`transition-all duration-500 ${page === 'detail' ? 'blur-xl scale-95 opacity-30 pointer-events-none' : ''}`}>
          {/* --- Monetag Banner Placeholder --- */}
          <MonetagAd zoneId="top-banner" type="banner" className="max-w-4xl mx-auto mb-8 h-24" />
          
          {/* --- Search & Filters --- */}
          <div className="max-w-2xl mx-auto mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-accent" size={20} />
              <input 
                type="text" 
                placeholder="Search viral games..." 
                className="w-full pl-12 pr-4 py-4 bg-accent/10 border-2 border-accent/30 rounded-2xl text-[var(--text-main)] focus:border-accent outline-none transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {['All', 'Racing', 'Action', 'Low MB', 'Adventure', 'Simulation', 'Sponsored'].map((cat, idx) => (
                <button 
                  key={`cat-btn-${cat}-${idx}`}
                  onClick={() => setCategory(cat)}
                  className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${category === cat ? 'bg-gradient-to-r from-accent to-[#7928ca] text-white' : 'bg-accent/10 text-[var(--text-main)] border border-accent/20'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* --- AI Scanner --- */}
          <div className="max-w-xl mx-auto mb-12 p-8 bg-[var(--card-bg)] border-2 border-secondary rounded-[2.5rem] text-center shadow-[0_0_50px_rgba(0,212,255,0.15)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent animate-pulse" />
            <h2 className="text-2xl font-black text-secondary mb-2 flex items-center justify-center gap-3">
              <Cpu size={28} className={isScanning ? "animate-spin" : "animate-spin-slow"} /> AI DEVICE SCANNER
            </h2>
            <p className="text-xs text-[var(--text-muted)] mb-8 font-bold uppercase tracking-widest opacity-70">Check if your phone can run our 4K Ultra-Realistic Engine</p>
            
            <div className="relative space-y-4">
              {isScanning ? (
                <div className="space-y-4 animate-pulse">
                  <div className="h-16 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center">
                    <span className="text-xs font-black text-secondary/40 tracking-widest">ANALYZING GPU CORES...</span>
                  </div>
                  <div className="h-16 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-2xl border border-white/10" />
                </div>
              ) : (
                <>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder="Enter device model (e.g. iPhone 15 Pro)"
                      className="w-full p-5 bg-black/40 border-2 border-accent/30 rounded-2xl text-center font-black text-secondary outline-none focus:border-secondary transition-all placeholder:text-[var(--text-muted)]/40"
                      value={device}
                      onChange={(e) => { setDevice(e.target.value); setShowSuggestions(true); }}
                      onFocus={() => setShowSuggestions(true)}
                    />
                    
                    <AnimatePresence>
                      {showSuggestions && suggestions.length > 0 && (
                        <motion.div 
                          key="suggestions-dropdown"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute left-0 right-0 top-full mt-2 bg-[var(--bg-color)] border-2 border-accent/30 rounded-2xl overflow-hidden z-[60] shadow-2xl"
                        >
                          {suggestions.map((s, i) => (
                            <button
                              key={`suggest-${s}-${i}`}
                              onClick={() => { setDevice(s); setShowSuggestions(false); }}
                              className="w-full p-4 text-left text-sm font-bold text-[var(--text-main)] hover:bg-accent/20 transition-colors border-b border-white/5 last:border-0"
                            >
                              {s}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button 
                    onClick={startScan}
                    disabled={isScanning || !device}
                    className="w-full py-5 bg-gradient-to-r from-accent to-[#7928ca] text-white font-black rounded-2xl uppercase tracking-[0.3em] shadow-lg hover:shadow-accent/40 disabled:opacity-50 transition-all active:scale-95"
                  >
                    RUN AI SCAN
                  </button>
                </>
              )}

              {scanResult && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  className="p-6 bg-green-500/10 border-2 border-green-500/40 rounded-2xl text-green-600 dark:text-green-400 text-sm font-black tracking-widest uppercase flex flex-col items-center gap-3 shadow-[0_0_30px_rgba(34,197,94,0.2)]"
                >
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                    <Zap size={24} fill="currentColor" />
                  </div>
                  {scanResult}
                </motion.div>
              )}
            </div>
          </div>

          {/* --- Daily Challenges Section --- */}
          <DailyChallengesSection 
            completedChallenges={completedChallenges}
            onCompleteChallenge={completeChallenge}
          />

          {/* --- Trending Games Section --- */}
          <TrendingGamesSection 
            games={filteredGames}
            onSelectGame={(game) => { setSelectedGame(game); setSelectedLayoutId(`trending-${game.id}`); setPage('detail'); addPoints(25); }}
          />

          {/* --- Top Performers Section --- */}
          <TopPerformersSection />

          {/* --- Recommendations --- */}
          <section className="mb-12" aria-labelledby="recommendations-heading">
            <h2 id="recommendations-heading" className="text-2xl font-black text-gradient mb-6 flex items-center gap-2">
              <TrendingUp size={24} className="text-accent" /> RECOMMENDED FOR YOU
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendations.map((game, idx) => (
                <GameCard 
                  key={`rec-${game.id}-${idx}`} 
                  layoutId={`rec-${game.id}`}
                  game={game} 
                  onClick={() => { setSelectedGame(game); setSelectedLayoutId(`rec-${game.id}`); setPage('detail'); addPoints(20); }}
                  onDownload={(e: React.MouseEvent) => { e.stopPropagation(); handleDownload(game); }}
                  onShare={(e: React.MouseEvent) => handleShare(e, game)}
                  onKeyDown={(e) => handleKeyDown(e, () => { setSelectedGame(game); setSelectedLayoutId(`rec-${game.id}`); setPage('detail'); addPoints(20); })}
                />
              ))}
            </div>
          </section>

          {/* --- All Games Grid --- */}
          <section className="mb-12" aria-labelledby="all-games-heading">
            <h2 id="all-games-heading" className="text-2xl font-black text-gradient mb-6 flex items-center gap-2">
              <Flame size={24} className="text-accent" /> ALL VIRAL GAMES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGames.slice(0, visibleCount).map((game, idx) => (
                <React.Fragment key={`all-frag-${game.id}-${idx}`}>
                  <GameCard 
                    key={`all-card-${game.id}`}
                    layoutId={`all-${game.id}`}
                    game={game} 
                    onClick={() => { setSelectedGame(game); setSelectedLayoutId(`all-${game.id}`); setPage('detail'); addPoints(20); }}
                    onDownload={(e: React.MouseEvent) => { e.stopPropagation(); handleDownload(game); }}
                    onShare={(e: React.MouseEvent) => handleShare(e, game)}
                    onKeyDown={(e) => handleKeyDown(e, () => { setSelectedGame(game); setSelectedLayoutId(`all-${game.id}`); setPage('detail'); addPoints(20); })}
                  />
                  {/* Inject In-Feed Ad every 4 items */}
                  {(idx + 1) % 4 === 0 && (
                    <NativeAdCard key={`native-ad-${idx}`} />
                  )}
                </React.Fragment>
              ))}
              {/* Show loading skeletons for remaining items */}
              {visibleCount < filteredGames.length && Array.from({ length: Math.min(3, filteredGames.length - visibleCount) }).map((_, idx) => (
                <GameCardSkeleton key={`skeleton-${idx}`} />
              ))}
            </div>

            {/* --- Infinite Scroll Sentinel --- */}
            {visibleCount < filteredGames.length && (
              <div ref={observerTarget} className="h-20 flex items-center justify-center mt-8">
                <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </section>
        </div>

        {/* --- Detail Overlay (Modal) --- */}
        <AnimatePresence>
          {page === 'detail' && selectedGame && (
            <div key="detail-modal-root" className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
              <motion.div 
                key="detail-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setPage('home')}
                className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              />
              
              <motion.div 
                key="detail-content"
                layoutId={selectedLayoutId || selectedGame.id}
                className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-[var(--bg-color)] border-2 border-accent/30 rounded-[2.5rem] shadow-[0_0_100px_rgba(255,0,128,0.3)] no-scrollbar"
              >
                <div className="p-6 md:p-12">
                  <button 
                    onClick={() => setPage('home')}
                    className="mb-8 flex items-center gap-2 text-accent font-black uppercase tracking-widest hover:gap-4 transition-all"
                  >
                    <ArrowLeft size={20} /> Back to Games
                  </button>

                  <div className="space-y-8">
                    <div className="relative rounded-3xl overflow-hidden border-4 border-accent/30 shadow-2xl">
                      <img src={selectedGame.image} alt={selectedGame.name} className="w-full h-[300px] md:h-[450px] object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                      <div className="absolute bottom-8 left-8 right-8">
                        <h2 className="text-3xl md:text-5xl font-black text-white mb-2 drop-shadow-lg">{selectedGame.name}</h2>
                        <div className="flex gap-4">
                          <span className="bg-accent px-4 py-1 rounded-full text-[10px] md:text-xs font-black text-white uppercase">{selectedGame.category}</span>
                          <span className="bg-secondary px-4 py-1 rounded-full text-[10px] md:text-xs font-black text-black uppercase">{selectedGame.size}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[var(--card-bg)] p-6 md:p-8 rounded-3xl border-2 border-[var(--card-border)]">
                          <h3 className="text-xl font-black text-secondary mb-4 flex items-center gap-2">
                            <Award size={24} /> ABOUT THIS GAME
                          </h3>
                          <p className="text-[var(--text-main)] leading-relaxed opacity-80 text-sm md:text-base">{selectedGame.description}</p>
                        </div>
                        <div className="bg-[var(--card-bg)] p-6 md:p-8 rounded-3xl border-2 border-[var(--card-border)]">
                          <h3 className="text-xl font-black text-secondary mb-4 flex items-center gap-2">
                            <Zap size={24} /> KEY FEATURES
                          </h3>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {selectedGame.features.map((f, i) => (
                              <li key={`detail-feat-${selectedGame.id}-${i}`} className="flex items-center gap-3 text-xs md:text-sm text-[var(--text-main)]">
                                <div className="w-2 h-2 bg-accent rounded-full" /> {f}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-[var(--card-bg)] p-6 md:p-8 rounded-3xl border-2 border-[var(--card-border)]">
                          <h3 className="text-xl font-black text-secondary mb-4 flex items-center gap-2">
                            <TrendingUp size={24} /> RECENT REVIEWS
                          </h3>
                          <div className="space-y-4">
                            {[
                              { user: "GamerPro99", text: "Insane graphics! Feels like I'm playing on a console.", rating: 5 },
                              { user: "MobileNinja", text: "Smooth 60FPS on my S24 Ultra. Highly recommended.", rating: 5 },
                              { user: "RetroFan", text: "The best mobile port I've seen in years.", rating: 4 }
                            ].map((rev, idx) => (
                              <div key={`rev-${idx}`} className="border-b border-white/5 pb-4 last:border-0">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="text-xs font-black text-accent">{rev.user}</span>
                                  <div className="flex gap-0.5">
                                    {[...Array(rev.rating)].map((_, i) => <Star key={`star-${idx}-${i}`} size={10} className="text-yellow-400 fill-yellow-400" />)}
                                  </div>
                                </div>
                                <p className="text-[10px] text-[var(--text-muted)] italic">"{rev.text}"</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <MonetagAd key="detail-sidebar-ad-top" zoneId="detail-sidebar-top" type="sidebar" className="h-32" />
                        
                        <button 
                          onClick={() => handleDownload(selectedGame)}
                          className="w-full py-6 bg-gradient-to-r from-accent to-[#7928ca] text-white font-black text-xl rounded-3xl uppercase tracking-widest shadow-xl hover:scale-[1.05] transition-transform flex flex-col items-center gap-2"
                        >
                          <Download size={32} />
                          <span>DOWNLOAD NOW</span>
                          <span className="text-[10px] opacity-60">SECURE OFFICIAL LINK</span>
                        </button>
                        <div className="flex gap-2">
                          <button 
                            onClick={(e) => handleShare(e, selectedGame, 'twitter')}
                            className="flex-1 py-4 bg-[#1DA1F2] text-white font-black rounded-2xl uppercase tracking-widest flex items-center justify-center gap-2 text-[10px]"
                          >
                            Twitter
                          </button>
                          <button 
                            onClick={(e) => handleShare(e, selectedGame, 'facebook')}
                            className="flex-1 py-4 bg-[#4267B2] text-white font-black rounded-2xl uppercase tracking-widest flex items-center justify-center gap-2 text-[10px]"
                          >
                            Facebook
                          </button>
                          <button 
                            onClick={(e) => handleShare(e, selectedGame, 'instagram')}
                            className="flex-1 py-4 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white font-black rounded-2xl uppercase tracking-widest flex items-center justify-center gap-2 text-[10px]"
                          >
                            Instagram
                          </button>
                        </div>
                        <button 
                          onClick={(e) => handleShare(e, selectedGame, 'whatsapp')}
                          className="w-full py-4 bg-[#25D366] text-white font-black rounded-2xl uppercase tracking-widest flex items-center justify-center gap-3"
                        >
                          <Share2 size={20} /> Share on WhatsApp
                        </button>

                        {/* --- Sidebar Ad --- */}
                        <MonetagAd key="detail-sidebar-ad-bottom" zoneId="detail-sidebar-bottom" type="sidebar" className="h-48" />

                        {showDetailInterstitial && (
                          <div className="mt-4 p-4 bg-secondary/10 border-2 border-secondary/30 rounded-2xl animate-pulse">
                            <div className="text-[10px] font-black text-secondary uppercase mb-2">Premium Ad Loading...</div>
                            <MonetagAd zoneId="detail-interstitial" type="interstitial" className="h-32" />
                          </div>
                        )}

                        <div className="p-4 bg-accent/5 border border-accent/20 rounded-2xl text-center">
                          <div className="text-[8px] font-black text-accent uppercase mb-1">Direct Link</div>
                          <a href="https://otieu.com/4/10446433" target="_blank" className="text-[10px] text-white underline opacity-60 hover:opacity-100 transition-opacity">Check out more rewards</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      {/* --- Page Push Ad --- */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed bottom-24 right-6 z-[60] pointer-events-none"
      >
        <MonetagAd 
          zoneId="page-push-10481725" 
          type="page-push" 
          className="w-64 h-24 pointer-events-auto shadow-2xl border-accent/30 bg-black/80 backdrop-blur-md" 
        />
      </motion.div>

      {/* --- Sticky Footer Ad --- */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 z-[100] bg-black/90 border-t border-white/10 p-2 md:hidden"
      >
        <MonetagAd zoneId="sticky-footer-mobile" type="banner" className="h-12 w-full border-none bg-transparent" />
      </motion.div>

      {/* --- Floating Ad --- */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="fixed bottom-24 right-6 z-40"
      >
        <div className="relative group">
          <button className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <X size={12} />
          </button>
          <a 
            href="https://otieu.com/4/10446433" 
            target="_blank" 
            className="block bg-gradient-to-br from-secondary to-[#7928ca] p-4 rounded-2xl shadow-2xl border-2 border-white/20 hover:scale-105 transition-transform"
          >
            <div className="text-[8px] font-black text-black uppercase mb-1">Limited Offer</div>
            <div className="text-xs font-black text-white leading-tight">Get $50 Free <br />Play Credits! 💰</div>
          </a>
        </div>
      </motion.div>

      {/* --- Bottom Nav --- */}
      <nav className="fixed bottom-0 left-0 right-0 glass h-20 flex justify-around items-center px-6 z-50 md:flex hidden" role="navigation" aria-label="Main navigation">
        <button 
          onClick={() => setPage('home')}
          className={`flex flex-col items-center gap-1 transition-all ${page === 'home' ? 'text-secondary scale-110' : 'text-[var(--text-muted)] opacity-60'}`}
          aria-label="Go to games home"
        >
          <Gamepad2 size={24} />
          <span className="text-[10px] font-black uppercase tracking-tighter">Games</span>
        </button>
        <div className="w-64 h-12">
          <MonetagAd zoneId="bottom-nav-ad" type="banner" className="h-full" />
        </div>
        <button 
          onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); document.querySelector('input')?.focus(); }}
          className="flex flex-col items-center gap-1 text-[var(--text-muted)] opacity-60"
          aria-label="Search games"
        >
          <Search size={24} />
          <span className="text-[10px] font-black uppercase tracking-tighter">Search</span>
        </button>
        <button 
          onClick={() => { document.querySelector('.bg-secondary')?.scrollIntoView({ behavior: 'smooth' }); }}
          className="flex flex-col items-center gap-1 text-[var(--text-muted)] opacity-60"
          aria-label="Go to AI device scanner"
        >
          <Cpu size={24} />
          <span className="text-[10px] font-black uppercase tracking-tighter">AI Scan</span>
        </button>
      </nav>

      {/* --- Mobile Bottom Nav (Simplified for Sticky Ad) --- */}
      <nav className="fixed bottom-16 left-0 right-0 glass h-16 flex justify-around items-center px-6 z-50 md:hidden" role="navigation" aria-label="Mobile navigation">
        <button onClick={() => setPage('home')} className={`flex flex-col items-center gap-1 ${page === 'home' ? 'text-secondary' : 'text-[var(--text-muted)] opacity-60'}`} aria-label="Games">
          <Gamepad2 size={20} />
          <span className="text-[8px] font-black uppercase">Games</span>
        </button>
        <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); document.querySelector('input')?.focus(); }} className="flex flex-col items-center gap-1 text-[var(--text-muted)] opacity-60" aria-label="Search">
          <Search size={20} />
          <span className="text-[8px] font-black uppercase">Search</span>
        </button>
        <button onClick={() => { document.querySelector('.bg-secondary')?.scrollIntoView({ behavior: 'smooth' }); }} className="flex flex-col items-center gap-1 text-[var(--text-muted)] opacity-60" aria-label="AI Scan">
          <Cpu size={20} />
          <span className="text-[8px] font-black uppercase">AI Scan</span>
        </button>
      </nav>

      {/* --- Modals & Toasts --- */}
      <AnimatePresence>
        {showToast && <SocialToast key={`social-toast-${toastData.game.id}-${toastData.location}`} {...toastData} />}
        
        {/* Critical Revenue Features */}
        {showFullInterstitial && (
          <FullPageInterstitial 
            key="full-interstitial-component"
            isOpen={showFullInterstitial}
            onClose={() => setShowFullInterstitial(false)}
            onUnlock={() => {
              setShowFullInterstitial(false);
              // Delay offerwall to let interstitial close
              setTimeout(() => setShowOfferwall(true), 500);
            }}
          />
        )}
        
        {!showFullInterstitial && (
          <>
            <ExitIntentModal 
              key="exit-intent-component"
              isOpen={showExitIntent}
              onClose={() => setShowExitIntent(false)}
            />
        
            <StickyOfferButton 
              key="sticky-btn-component"
              onClick={() => {
                if (GAMES.length > 0) {
                  setSelectedGame(GAMES[0]);
                  setShowOfferwall(true);
                }
              }}
              isVisible={showStickyButton}
            />
            
            <PushNotificationPrompt 
              key="push-prompt-component"
              isOpen={showPushPrompt}
              onClose={() => setShowPushPrompt(false)}
            />
          </>
        )}
        
        <VignetteAd key="vignette-ad-component" isOpen={showVignette} onClose={handleVignetteClose} />
        
        {selectedGame && (
          <OfferWall 
            key="offerwall-component"
            game={selectedGame} 
            isOpen={showOfferwall} 
            onClose={() => setShowOfferwall(false)}
            onUnlock={() => {
              setShowOfferwall(false);
              confirmDownload();
            }}
          />
        )}
        
        {showDownloadSupport && (
          <div key="download-support-overlay" className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 z-[200]">
            <motion.div 
              key="download-support-modal"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-[var(--card-bg)] border-2 border-secondary p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] text-center max-w-md max-h-[90vh] overflow-y-auto shadow-[0_0_100px_rgba(0,212,255,0.3)] relative"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-secondary animate-pulse" />
              <div className="w-16 h-16 md:w-20 md:h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                <Download className="text-secondary" size={32} />
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-[var(--text-main)] mb-3 md:mb-4 tracking-tighter uppercase">Watch Ad to Download</h3>
              <p className="text-xs md:text-sm text-[var(--text-muted)] mb-6 md:mb-8 leading-relaxed">
                Please watch this ad to support our team. 
                Our team works hard to bring you these <span className="text-secondary font-bold">Paid Games for Free</span>. 
                Your support keeps our servers running!
              </p>

              <div className="mb-6 md:mb-8 space-y-4">
                <MonetagAd key="support-modal-ad-native" zoneId="support-modal-ad-native" type="native" className="h-24 md:h-32" />
                <MonetagAd key="support-modal-ad-popunder" zoneId="support-modal-ad-popunder" type="popunder" className="h-16" />
              </div>

              <div className="space-y-4">
                <button 
                  disabled={supportTimer > 0}
                  onClick={confirmDownload}
                  className="w-full py-4 md:py-5 bg-gradient-to-r from-secondary to-[#7928ca] text-white font-black rounded-xl md:rounded-2xl uppercase tracking-[0.2em] shadow-lg disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center gap-3 text-xs md:text-sm"
                >
                  {supportTimer > 0 ? (
                    <>
                      <div className="w-3 h-3 md:w-4 md:h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      WAIT {supportTimer}S...
                    </>
                  ) : (
                    <>CONTINUE TO DOWNLOAD</>
                  )}
                </button>
                <button 
                  onClick={() => setShowDownloadSupport(false)}
                  className="text-[9px] md:text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest hover:text-white transition-colors"
                >
                  Cancel Download
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {showPushModal && (
          <div key="push-modal-overlay" className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-[100]">
            <motion.div 
              key="push-modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-[var(--card-bg)] border-2 border-accent p-6 md:p-8 rounded-[2rem] md:rounded-3xl text-center max-w-sm max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(255,0,128,0.3)] relative"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-accent animate-pulse" />
              <Bell className="mx-auto text-accent mb-4" size={40} />
              <h3 className="text-xl md:text-2xl font-black text-[var(--text-main)] mb-2">GET EARLY ACCESS!</h3>
              <p className="text-xs md:text-sm text-[var(--text-muted)] mb-6">Want an instant alert when the <strong>GTA VI Mobile Port</strong> officially drops?</p>
              
              <div className="mb-6">
                <MonetagAd zoneId="push-modal-ad" type="interstitial" className="h-20" />
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setShowPushModal(false)}
                  className="flex-1 py-3 bg-white/10 text-[var(--text-muted)] font-black rounded-xl uppercase text-[10px] md:text-xs"
                >
                  Later
                </button>
                <button 
                  onClick={() => { setShowPushModal(false); addPoints(100); unlockBadge('early-adopter'); }}
                  className="flex-1 py-3 bg-gradient-to-r from-accent to-[#7928ca] text-white font-black rounded-xl uppercase text-[10px] md:text-xs"
                >
                  Notify Me!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
