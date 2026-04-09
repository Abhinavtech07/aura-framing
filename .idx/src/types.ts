/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Game {
  id: string;
  name: string;
  category: 'Racing' | 'Action' | 'Low MB' | 'Adventure' | 'Simulation';
  image: string;
  version: string;
  size: string;
  description: string;
  features: string[];
  playStoreUrl: string;
  rating: number;
  reviewsCount: string;
  isAd?: boolean;
}

export interface UserStats {
  points: number;
  level: number;
  badges: string[];
}

export const GAMES: Game[] = [
  {
    id: 'forza-horizon-5',
    name: 'Forza Horizon 5 (Mobile Beta)',
    category: 'Racing',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1551360/header.jpg',
    version: 'Beta 1.0',
    size: '4.5 GB',
    description: 'Experience the ultimate open-world racing simulator. High-fidelity graphics, real-time weather reflections, and massive car customization, now optimized for high-end mobile processors.',
    features: ['Ultra-realistic ray-tracing', '60FPS uncapped performance', 'Massive open-world map', 'Advanced drift physics'],
    playStoreUrl: 'https://otieu.com/4/10446433',
    rating: 4.9,
    reviewsCount: '1.2M'
  },
  {
    id: 'carx-street',
    name: 'CarX Street',
    category: 'Racing',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1114150/capsule_616x353.jpg',
    version: '1.9.1',
    size: '1.8 GB',
    description: 'Experience the most realistic street racing with stunning graphics and authentic car physics. Build your dream garage and dominate the streets in intense competitive races!',
    features: ['Realistic Physics Engine', 'Extensive Car Customization', 'Beautiful HD Graphics', 'Multiplayer Racing'],
    playStoreUrl: 'https://otieu.com/4/10446433',
    rating: 4.7,
    reviewsCount: '850K'
  },
  {
    id: 'wukong-mobile',
    name: 'Black Myth: Wukong (Mobile)',
    category: 'Action',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2358720/capsule_616x353.jpg',
    version: '1.0.2',
    size: '6.8 GB',
    description: 'Experience the breathtaking Unreal Engine 5 action of the Monkey King directly on your phone. Master fluid combat, epic boss fights, and explore a hyper-realistic mythic world.',
    features: ['Unreal Engine 5 Graphics', '60 FPS Boss Fights', 'Full Skill Tree', 'Controller Support'],
    playStoreUrl: 'https://otieu.com/4/10446433',
    rating: 4.9,
    reviewsCount: '2.1M'
  },
  {
    id: 'gta-v-mobile',
    name: 'Grand Theft Auto V: Mobile Beta',
    category: 'Action',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/271590/capsule_616x353.jpg',
    version: '0.9.5',
    size: '8.1 GB',
    description: 'Return to Los Santos in this incredibly optimized mobile port of the legendary open-world game. Switch between Michael, Franklin, and Trevor on the go.',
    features: ['Full Los Santos Map', '3 Playable Characters', 'Adjustable Graphics Settings', 'Cloud Save Integration'],
    playStoreUrl: 'https://otieu.com/4/10446433',
    rating: 4.8,
    reviewsCount: '5.5M'
  },
  {
    id: 'spiderman-mobile',
    name: "Marvel's Spider-Man: Mobile Port",
    category: 'Action',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1817070/capsule_616x353.jpg',
    version: '3.0.1',
    size: '4.2 GB',
    description: 'Swing through New York City with console-level graphics on your phone! Experience flawless web-swinging physics, intense combat, and unlock all the iconic suits.',
    features: ['Open World NYC', 'Flawless Web-Swinging', 'Suit Unlocks', '60 FPS Support'],
    playStoreUrl: 'https://otieu.com/4/10446433',
    rating: 4.9,
    reviewsCount: '1.8M'
  },
  {
    id: 'cyberpunk-mobile',
    name: 'Cyberpunk 2077: Pocket City',
    category: 'Action',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1091500/capsule_616x353.jpg',
    version: '1.1.0',
    size: '7.5 GB',
    description: 'Welcome to Night City! Explore the massive, neon-drenched open world right from your mobile device. Customize your cyberware and take on dangerous corporate mercenaries.',
    features: ['Ray-Traced Neon Lights', 'Deep Cyberware System', 'First Person Combat', 'Dynamic Crowds'],
    playStoreUrl: 'https://otieu.com/4/10446433',
    rating: 4.6,
    reviewsCount: '920K'
  },
  {
    id: 'ben10-protector',
    name: 'Ben 10: Protector of Earth (Mobile)',
    category: 'Adventure',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1063590/header.jpg',
    version: '1.2.0',
    size: '1.2 GB',
    description: 'Transform into your favorite aliens and save the Earth from Vilgax! Experience classic action-adventure gameplay with remastered HD textures and fluid touch controls.',
    features: ['10 Playable Aliens', 'Epic Boss Battles', 'HD Remastered Graphics', 'Unlockable Combos'],
    playStoreUrl: 'https://otieu.com/4/10446433',
    rating: 4.5,
    reviewsCount: '450K'
  },
  {
    id: 'demon-slayer-mobile',
    name: 'Demon Slayer: Kimetsu no Yaiba - Mobile',
    category: 'Action',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1490890/header.jpg',
    version: '2.1.5',
    size: '3.5 GB',
    description: 'Master the Breathing Styles and hunt down demons in this high-fidelity anime action game. Relive the story of Tanjiro with stunning cel-shaded graphics and cinematic combat.',
    features: ['Stunning Cel-Shaded Art', 'Cinematic Breathing Skills', 'Full Story Mode', 'PvP Arena'],
    playStoreUrl: 'https://otieu.com/4/10446433',
    rating: 4.9,
    reviewsCount: '1.1M'
  },
  {
    id: 'naruto-storm-4',
    name: 'Naruto Shippuden: Ultimate Ninja Storm 4',
    category: 'Action',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/349040/header.jpg',
    version: '1.0.8',
    size: '4.2 GB',
    description: 'The latest opus in the acclaimed STORM series is taking you on a colorful and breathtaking ride. Take advantage of the totally revamped battle system and prepare to dive into the most epic fights you’ve ever seen!',
    features: ['Incredible Anime Graphics', 'Massive Character Roster', 'Epic Story Mode', 'Smooth 60FPS Combat'],
    playStoreUrl: 'https://otieu.com/4/10446433',
    rating: 4.8,
    reviewsCount: '2.5M'
  },
  {
    id: 'god-of-war-mobile',
    name: 'God of War: Ghost of Sparta (HD)',
    category: 'Action',
    image: 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1593500/header.jpg',
    version: '1.5.0',
    size: '2.1 GB',
    description: 'Experience the journey of Kratos on your mobile device with enhanced HD resolution and smooth controls. Unleash the Blades of Athena and conquer the gods.',
    features: ['Brutal Combat System', 'Epic Greek Mythology', 'HD Texture Pack', 'Full Controller Support'],
    playStoreUrl: 'https://otieu.com/4/10446433',
    rating: 4.9,
    reviewsCount: '3.2M'
  },
  {
    id: 'ad-1',
    name: 'Win Real Cash Prizes!',
    category: 'Action',
    image: 'https://picsum.photos/seed/ads/600/400',
    version: 'Sponsored',
    size: '0 MB',
    description: 'Play games and win real rewards. Join millions of players today!',
    features: ['Instant Payouts', 'No Deposit Required', '24/7 Support'],
    playStoreUrl: 'https://otieu.com/4/10446433',
    rating: 4.2,
    reviewsCount: '100K',
    isAd: true
  }
];

export const BADGES = [
  { id: 'early-adopter', name: 'Early Adopter', icon: '🚀', description: 'Joined during the beta phase.' },
  { id: 'speed-racer', name: 'Speed Racer', icon: '🏎️', description: 'Viewed 3 racing games.' },
  { id: 'action-hero', name: 'Action Hero', icon: '⚔️', description: 'Viewed 3 action games.' },
  { id: 'ad-clicker', name: 'Ad Enthusiast', icon: '💰', description: 'Clicked on a sponsored link.' },
  { id: 'device-master', name: 'Device Master', icon: '📱', description: 'Successfully scanned your device.' },
  { id: 'social-butterfly', name: 'Social Butterfly', icon: '🦋', description: 'Shared a game on social media.' }
];
