import React, { useMemo, useState } from 'react';
import { Download, Flame, Search, ShieldCheck, Sparkles, Star, Trophy, Zap } from 'lucide-react';

type Game = {
  id: string;
  title: string;
  category: string;
  size: string;
  rating: number;
  badge: string;
  image: string;
};

const games: Game[] = [
  {
    id: 'black-myth',
    title: 'Black Myth: Wukong',
    category: 'Action',
    size: '3.2 GB',
    rating: 4.9,
    badge: '🔥 60 FPS',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'gta-v',
    title: 'GTA V Mobile Beta',
    category: 'Action',
    size: '1.8 GB',
    rating: 4.8,
    badge: '🎮 Controller',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'asphalt-pulse',
    title: 'Asphalt Pulse',
    category: 'Racing',
    size: '960 MB',
    rating: 4.7,
    badge: '⚡ Low MB',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'shadow-ops',
    title: 'Shadow Ops X',
    category: 'Action',
    size: '2.7 GB',
    rating: 4.9,
    badge: '🧨 Ultra HD',
    image: 'https://images.unsplash.com/photo-1528819622761-6bcf9e6b8a4f?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'cyber-drift',
    title: 'Cyber Drift',
    category: 'Racing',
    size: '1.2 GB',
    rating: 4.6,
    badge: '🏁 Turbo',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'storm-arena',
    title: 'Storm Arena',
    category: 'Action',
    size: '2.5 GB',
    rating: 4.8,
    badge: '🔥 Arena',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'pixel-reign',
    title: 'Pixel Reign',
    category: 'Adventure',
    size: '1.4 GB',
    rating: 4.5,
    badge: '🎯 Smooth',
    image: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'iron-siege',
    title: 'Iron Siege',
    category: 'Action',
    size: '4.2 GB',
    rating: 4.8,
    badge: '⚔️ 4K Port',
    image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=900&q=80',
  },
];

const categories = ['All', 'Racing', 'Action', 'Low MB', '60FPS Verified'];

const quests = [
  { title: 'Install 2 ports', detail: 'Complete in 2 hrs', cta: 'Claim', accent: 'from-cyan-500 to-blue-500' },
  { title: 'Share a game', detail: 'Gain 75 XP per referral', cta: 'Share', accent: 'from-orange-500 to-amber-400' },
  { title: 'Use AI Scan', detail: 'Check device support', cta: 'Go', accent: 'from-purple-500 to-violet-500' },
];

const leaderboard = [
  { rank: 1, name: 'RogueX', xp: '9,840 XP', level: 'Lv 29', tone: 'from-yellow-300 to-orange-400', text: 'text-yellow-300' },
  { rank: 2, name: 'Nebula', xp: '8,960 XP', level: 'Lv 27', tone: 'from-slate-200 to-slate-400', text: 'text-slate-300' },
  { rank: 3, name: 'ByteRush', xp: '8,620 XP', level: 'Lv 26', tone: 'from-orange-300 to-amber-500', text: 'text-orange-300' },
];

export default function App() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [floatingAdVisible, setFloatingAdVisible] = useState(true);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch =
        game.title.toLowerCase().includes(search.toLowerCase()) ||
        game.category.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        category === 'All' ||
        (category === 'Low MB' && game.size.includes('MB')) ||
        (category === '60FPS Verified' && game.badge.includes('60 FPS')) ||
        game.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const gridItems = useMemo(() => {
    const items: Array<{ type: 'game'; game: Game } | { type: 'ad'; id: string }> = [];

    filteredGames.forEach((game, index) => {
      items.push({ type: 'game', game });
      if ((index + 1) % 2 === 0) {
        items.push({ type: 'ad', id: `monetag-native-${index + 1}` });
      }
    });

    return items;
  }, [filteredGames]);

  return (
    <div className="min-h-screen bg-[#090d17] pb-24 text-white antialiased">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0e14]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 via-violet-500 to-cyan-400 shadow-[0_0_22px_rgba(168,85,247,0.55)]">
              <span className="font-display text-xl font-bold leading-none">VG</span>
            </div>
            <div>
              <p className="font-display text-xl uppercase tracking-[0.12em] text-white">Viral</p>
              <p className="-mt-1 text-[10px] uppercase tracking-[0.28em] text-slate-400">Games Hub</p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-gray-700 bg-gray-900 px-3 py-1.5">
            <span className="text-sm text-yellow-400">🏆</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-white">25 PTS</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pt-5 sm:px-5">
        {/* Hero Section */}
        <section className="mb-6 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-purple-900/20 via-slate-900 to-cyan-900/20 p-6 shadow-[0_0_40px_rgba(168,85,247,0.12)]">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.3em] text-cyan-300">⚡ Daily drops</p>
              <h1 className="font-display text-5xl uppercase leading-tight text-white">
                Rare ports <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400">for your device</span>
              </h1>
            </div>
            <span className="flex-shrink-0 rounded-full border border-cyan-400/50 bg-cyan-400/15 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              🔴 LIVE
            </span>
          </div>

          <div className="rounded-2xl border border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 p-4 backdrop-blur-sm">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">📦 High-priority pack</p>
            <div className="mt-3 flex items-center justify-between gap-4">
              <div>
                <p className="text-base font-black text-white">GTA V Mobile Ultra HD</p>
                <p className="text-[11px] text-cyan-300/80">Exclusive beta access</p>
              </div>
              <button className="flex-shrink-0 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition">
                🔓 Unlock
              </button>
            </div>
          </div>
        </section>

        {/* Search & Categories */}
        <section className="mb-6">
          <div className="relative mb-4">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search rare ports..."
              className="w-full rounded-xl border border-purple-500/30 bg-slate-900 py-3 pl-4 pr-11 text-white placeholder-slate-400 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
            <span className="absolute right-3 top-3.5 text-lg text-slate-400">🔍</span>
          </div>

          <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] transition ${
                  category === item
                    ? 'border-purple-500/70 bg-purple-500/25 text-purple-200 shadow-[0_0_15px_rgba(168,85,247,0.4)]'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        {/* Quests & Leaderboard Grid */}
        <section className="mb-8 grid gap-4 lg:grid-cols-2">
          {/* Daily Quests */}
          <div className="rounded-[1.8rem] border border-cyan-500/25 bg-gradient-to-br from-cyan-500/10 to-slate-900 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan-300">⚡ Quest board</p>
                <h2 className="font-display text-2xl uppercase text-white">Daily Quests</h2>
              </div>
              <span className="rounded-full border border-cyan-400/40 bg-cyan-400/15 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-cyan-300">
                +225 XP
              </span>
            </div>

            <div className="space-y-3">
              {quests.map((quest) => (
                <div key={quest.title} className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-3 hover:bg-white/8 hover:border-cyan-400/30 transition">
                  <div>
                    <p className="text-sm font-bold text-white">{quest.title}</p>
                    <p className="text-[10px] text-slate-400">{quest.detail}</p>
                  </div>
                  <button className={`flex-shrink-0 rounded-lg bg-gradient-to-r ${quest.accent} px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white hover:scale-105 transition`}>
                    {quest.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Leaderboard */}
          <div className="rounded-[1.8rem] border border-orange-500/25 bg-gradient-to-br from-orange-500/10 to-slate-900 p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-orange-300">🏆 Top rank</p>
                <h2 className="font-display text-2xl uppercase text-white">Leaderboard</h2>
              </div>
              <span className="rounded-full border border-orange-400/40 bg-orange-500/15 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-orange-300">
                #12
              </span>
            </div>

            <div className="space-y-2">
              {leaderboard.map((entry) => (
                <div key={entry.rank} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 hover:bg-white/8 transition">
                  <div className="flex items-center gap-3 flex-1">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${entry.tone} font-black text-sm text-slate-900`}>
                      {entry.rank}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white">{entry.name}</p>
                      <p className="text-[10px] text-slate-400">{entry.xp}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-[0.16em] ${entry.text}`}>{entry.level}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Games Grid with Ad Slots */}
        <section className="mb-8">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Flame className="h-6 w-6 text-orange-400 animate-bounce" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-orange-300">Trending</p>
                <h2 className="font-display text-3xl uppercase text-white">Hot Ports</h2>
              </div>
            </div>
            <button className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-200 hover:bg-white/10 transition">
              View All
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {gridItems.map((item, index) => {
              if (item.type === 'ad') {
                return (
                  <div
                    key={`${item.id}-${index}`}
                    className="relative overflow-hidden rounded-[2rem] border-2 border-purple-500/40 bg-gradient-to-br from-purple-600/20 via-slate-900/40 to-cyan-600/20 p-4 shadow-[0_0_30px_rgba(168,85,247,0.25)] hover:shadow-[0_0_40px_rgba(168,85,247,0.35)] transition"
                  >
                    <span className="absolute right-4 top-4 z-10 inline-flex items-center gap-1 rounded-full bg-yellow-500 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-black shadow-[0_0_12px_rgba(234,179,8,0.5)]">
                      🎁 AD
                    </span>
                    <div id={item.id} className="min-h-[320px] w-full rounded-xl border border-white/5 bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center text-center">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em]">Ad Slot Here</p>
                    </div>
                  </div>
                );
              }

              const game = item.game;
              return (
                <article
                  key={game.id}
                  className="group relative overflow-hidden rounded-[2rem] border-2 border-white/10 bg-gradient-to-b from-slate-800/50 to-slate-900/80 transition duration-300 hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.25)]"
                >
                  {/* Image & Badge Layer */}
                  <div className="relative h-52 overflow-hidden bg-slate-800">
                    <img src={game.image} alt={game.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-70" />

                    {/* Badges Top-Left & Top-Right */}
                    <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-cyan-400/50 bg-slate-900/85 px-2.5 py-1.5 backdrop-blur-sm">
                      <span className="text-lg">{game.badge.split(' ')[0]}</span>
                      <span className="text-[9px] font-black uppercase tracking-[0.16em] text-cyan-200">{game.badge.split(' ').slice(1).join(' ')}</span>
                    </div>

                    <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-slate-900/80 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-slate-300 backdrop-blur-sm">
                      {game.size}
                    </span>

                    {/* Rating Badge */}
                    <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-yellow-400/40 bg-slate-900/90 px-2.5 py-1 backdrop-blur-sm">
                      <Star size={12} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-[10px] font-bold text-yellow-300">{game.rating}</span>
                    </div>
                  </div>

                  {/* Content Layer */}
                  <div className="p-5">
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <h3 className="font-display text-xl uppercase leading-tight text-white group-hover:text-purple-300 transition">{game.title}</h3>
                    </div>

                    {/* Meta Info */}
                    <div className="mb-4 flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-[0.14em]">
                      <span>{game.category}</span>
                      <span>Android 11+</span>
                    </div>

                    {/* Review Snippet */}
                    <div className="mb-4 rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                      <p className="text-[8px] font-black uppercase tracking-[0.18em] text-purple-300 mb-1.5">⭐ Top Review</p>
                      <p className="text-[10px] text-slate-300 italic leading-snug line-clamp-2">"Best mobile port ever! Graphics are incredible."</p>
                      <p className="text-[8px] text-cyan-300 font-bold mt-1.5">— @GamerPro99</p>
                    </div>

                    {/* CTA Button */}
                    <button
                      type="button"
                      className="w-full rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-cyan-600 py-3.5 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transition active:scale-95"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <Download size={14} /> Get Port
                      </span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>

      {floatingAdVisible && (
        <div className="fixed bottom-[84px] left-1/2 z-40 w-[92%] max-w-md -translate-x-1/2 rounded-[1.5rem] border border-gray-700 bg-[#0b0e14]/90 p-2 shadow-[0_0_30px_rgba(34,211,238,0.14)] backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setFloatingAdVisible(false)}
            className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-slate-900 text-sm font-bold text-white transition hover:border-red-400/60 hover:text-red-300"
          >
            ✕
          </button>
          <div id="monetag-bottom-banner" className="h-[60px] w-full rounded-2xl border border-white/10 bg-gradient-to-r from-purple-500/10 via-cyan-500/10 to-orange-500/10" />
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#090d17]/95 backdrop-blur-2xl">
        <div className="mx-auto grid max-w-5xl grid-cols-3 px-4 py-2.5 sm:px-6">
          <button type="button" className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-purple-500/10 py-2 text-violet-200">
            <Sparkles className="h-5 w-5" />
            <span className="text-[10px] font-bold uppercase tracking-[0.12em]">Games</span>
          </button>

          <button type="button" className="flex flex-col items-center justify-center gap-1 rounded-2xl py-2 text-slate-300 transition hover:bg-white/5 hover:text-white">
            <Search className="h-5 w-5" />
            <span className="text-[10px] font-bold uppercase tracking-[0.12em]">Search</span>
          </button>

          <button type="button" className="flex flex-col items-center justify-center gap-1 rounded-2xl py-2 text-slate-300 transition hover:bg-white/5 hover:text-white">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-[10px] font-bold uppercase tracking-[0.12em]">AI Scan</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
