
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, Calendar, List, Gamepad2, Play, Filter, Image as ImageIcon, Sparkles, 
  ChevronRight, Globe, Layers, Cpu, Monitor, Smartphone, LayoutGrid, X, Twitter, 
  Sun, Moon, RefreshCw, PlusSquare, ExternalLink, Clock, CheckCircle, Package, Info
} from 'lucide-react';
import { GAMES_DATA } from './data.ts';
import { Game, ViewMode, ReleaseCategory } from './types.ts';

const APP_TODAY = '2026-01-19';

const getYoutubeId = (url?: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const getCategoryIcon = (category: ReleaseCategory) => {
  switch (category) {
    case 'New Game': return <Sparkles className="w-3 h-3" />;
    case 'Early Access': return <Clock className="w-3 h-3" />;
    case 'Full Release': return <CheckCircle className="w-3 h-3" />;
    case 'Update': return <RefreshCw className="w-3 h-3" />;
    case 'Port': return <ExternalLink className="w-3 h-3" />;
    case 'Edition': return <Package className="w-3 h-3" />;
    case 'DLC': return <PlusSquare className="w-3 h-3" />;
    case 'Remake/Remaster': return <RefreshCw className="w-3 h-3" />;
    case 'Physical Release': return <Package className="w-3 h-3" />;
    default: return <Gamepad2 className="w-3 h-3" />;
  }
};

const getCategoryStyles = (category: ReleaseCategory, isDark: boolean) => {
  const base = "border transition-all shadow-sm";
  switch (category) {
    case 'New Game': 
      return `${base} ${isDark ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`;
    case 'Early Access': 
      return `${base} ${isDark ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-amber-50 text-amber-700 border-amber-200'}`;
    case 'Full Release': 
      return `${base} ${isDark ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-700 border-blue-200'}`;
    case 'Update': 
      return `${base} ${isDark ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-purple-50 text-purple-700 border-purple-200'}`;
    case 'Port': 
      return `${base} ${isDark ? 'bg-sky-500/10 text-sky-400 border-sky-500/20' : 'bg-sky-50 text-sky-700 border-sky-200'}`;
    case 'Edition': 
      return `${base} ${isDark ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-rose-50 text-rose-700 border-rose-200'}`;
    case 'DLC': 
      return `${base} ${isDark ? 'bg-pink-500/10 text-pink-400 border-pink-500/20' : 'bg-pink-50 text-pink-700 border-pink-200'}`;
    case 'Remake/Remaster': 
      return `${base} ${isDark ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-cyan-50 text-cyan-700 border-cyan-200'}`;
    case 'Physical Release': 
      return `${base} ${isDark ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-orange-50 text-orange-700 border-orange-200'}`;
    default: 
      return `${base} ${isDark ? 'bg-slate-500/10 text-slate-400 border-slate-500/20' : 'bg-slate-50 text-slate-700 border-slate-200'}`;
  }
};

const getYoutubeThumbnail = (url?: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://img.youtube.com/vi/${match[2]}/mqdefault.jpg`;
  }
  return null;
};

const GameCard: React.FC<{ game: Game; isDark: boolean }> = ({ game, isDark }) => {
  const thumb = getYoutubeThumbnail(game.trailerUrl);
  const displayDate = game.releaseDate === APP_TODAY ? 'Jan 19th 2026' : game.displayDate;

  return (
    <div className={`group flex flex-col border rounded-[2.5rem] overflow-hidden transition-all duration-500 h-full ${
      isDark 
      ? 'bg-slate-900/40 border-slate-800/60 hover:border-blue-500/40 hover:shadow-[0_0_50px_-15px_rgba(59,130,246,0.15)]' 
      : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]'
    }`}>
      {/* Media Container */}
      <div className={`aspect-[16/10] w-full relative overflow-hidden shrink-0 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
        {thumb ? (
          <img 
            src={thumb} 
            alt={game.title} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${isDark ? 'text-slate-700' : 'text-slate-300'}`}>
            <Gamepad2 className="w-12 h-12 opacity-20" />
          </div>
        )}
        <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-60 ${isDark ? 'from-slate-950' : 'from-slate-900/40'}`} />
        <div className="absolute top-5 left-5 z-10">
           <span className={`text-[9px] font-black uppercase tracking-[0.1em] px-3.5 py-1.5 rounded-xl backdrop-blur-xl ${getCategoryStyles(game.category, isDark)}`}>
            {game.category}
          </span>
        </div>
      </div>
      
      {/* Content Container */}
      <div className="flex flex-col flex-1 p-7 gap-5">
        <header className="space-y-1.5">
          <span className={`text-[10px] font-black uppercase tracking-[0.2em] block ${isDark ? 'text-blue-400/80' : 'text-blue-600'}`}>
            {displayDate}
          </span>
          <h3 className={`text-xl font-black transition-colors leading-tight tracking-tight min-h-[3rem] line-clamp-2 ${isDark ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'}`}>
            {game.title}
          </h3>
        </header>

        {/* Summary & Genres Section */}
        <div className="flex flex-col gap-4 flex-1">
          <div className="space-y-3">
            <p className={`text-xs leading-relaxed line-clamp-3 min-h-[3.75rem] font-medium transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {game.summary || `A highly anticipated ${game.category.toLowerCase()} release launching on ${game.displayDate}. Expanding the ${game.genres[0] || 'gaming'} landscape across multiple platforms.`}
            </p>

            {/* Visual Genre Pills */}
            <div className="flex flex-wrap gap-2">
              {game.genres.slice(0, 3).map((g, i) => (
                <div key={i} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-all ${
                  isDark 
                  ? 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-600 hover:text-slate-300' 
                  : 'bg-slate-50 border-slate-100 text-slate-500 hover:border-blue-100 hover:text-blue-600'
                }`}>
                  <div className={`w-1 h-1 rounded-full ${isDark ? 'bg-blue-500/40' : 'bg-blue-400'}`} />
                  <span className="text-[9px] font-bold uppercase tracking-wide">{g}</span>
                </div>
              ))}
              {game.genres.length > 3 && (
                <div className={`px-2 py-1 rounded-full text-[9px] font-black border border-dashed uppercase ${
                  isDark ? 'border-slate-800 text-slate-600' : 'border-slate-200 text-slate-400'
                }`}>
                  +{game.genres.length - 3} More
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="pt-5 border-t border-dashed space-y-5 mt-auto border-slate-200 dark:border-slate-800/60">
          {/* Platforms wrapping gracefully */}
          <div className="flex flex-wrap items-center gap-2">
            <div className={`p-1 rounded-md ${isDark ? 'bg-slate-800/30' : 'bg-slate-100/50'}`}>
              <Monitor className="w-3 h-3 text-slate-500" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {game.platforms.map((p, idx) => (
                <span key={idx} className={`text-[8px] font-black px-2 py-1 rounded-md border uppercase tracking-tighter transition-all whitespace-nowrap ${
                  isDark 
                  ? 'bg-slate-950 text-slate-500 border-slate-800/50' 
                  : 'bg-white text-slate-400 border-slate-200'
                }`}>
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Action Button */}
          {game.trailerUrl ? (
            <a 
              href={game.trailerUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2.5 text-[10px] font-black px-5 py-3.5 rounded-2xl transition-all active:scale-[0.98] uppercase tracking-[0.15em] group/btn shadow-lg ${
                isDark 
                ? 'bg-white hover:bg-blue-600 text-black hover:text-white' 
                : 'bg-slate-900 hover:bg-blue-600 text-white'
              }`}
            >
              <Play className={`w-3.5 h-3.5 fill-current transition-transform group-hover/btn:scale-110`} /> 
              <span>Watch Trailer</span>
            </a>
          ) : (
            <div className={`flex items-center justify-center gap-2 text-[10px] font-black py-3.5 border border-dashed rounded-2xl cursor-default tracking-[0.2em] uppercase opacity-40 ${
              isDark ? 'text-slate-600 border-slate-800/50 bg-slate-950/20' : 'text-slate-400 border-slate-200 bg-slate-50/50'
            }`}>
              <span className="text-[8px]"><Info className="w-3 h-3" /></span>
              <span>Preview N/A</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CalendarView: React.FC<{ games: Game[]; isDark: boolean; onGameClick: (game: Game) => void }> = ({ games, isDark, onGameClick }) => {
  const daysInJan = 31;
  const days = Array.from({ length: daysInJan }, (_, i) => i + 1);
  
  const getGamesForDay = (day: number) => {
    const dateStr = `2026-01-${day.toString().padStart(2, '0')}`;
    return games.filter(g => g.releaseDate === dateStr);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-4">
      {days.map(day => {
        const dayGames = getGamesForDay(day);
        const isToday = day === 19;

        return (
          <div key={day} className={`min-h-[240px] border transition-all relative overflow-hidden group/card rounded-[2rem] p-6 flex flex-col ${
            dayGames.length > 0 
            ? (isToday ? 'border-blue-500/60 bg-blue-500/5 shadow-2xl scale-[1.02] z-10' : (isDark ? 'border-slate-800/60 bg-slate-900/20 hover:border-slate-600 hover:bg-slate-900/40' : 'border-slate-200 bg-white hover:border-blue-200 shadow-sm')) 
            : `opacity-60 ${isDark ? 'border-slate-800/20 bg-slate-900/5' : 'border-slate-100 bg-slate-50/20'}`
          }`}>
            <div className="flex justify-between items-start mb-5 relative z-10">
              <span className={`text-4xl font-black leading-none tracking-tighter ${dayGames.length > 0 ? (isToday ? 'text-blue-500' : (isDark ? 'text-white' : 'text-slate-900')) : (isDark ? 'text-slate-800' : 'text-slate-200')}`}>{day}</span>
              {dayGames.length > 0 && <span className={`text-[10px] px-2.5 py-1 rounded-full font-black shadow-lg ${isDark ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`}>{dayGames.length}</span>}
            </div>
            
            <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[160px] pr-1 custom-scrollbar relative z-10">
              {dayGames.map(g => {
                const categoryStyle = getCategoryStyles(g.category, isDark);
                const colorClass = isDark ? categoryStyle.split(' ').find(c => c.startsWith('text-'))?.replace('text-', 'bg-') : 'bg-blue-500';
                const thumb = getYoutubeThumbnail(g.trailerUrl);
                
                return (
                  <button 
                    key={g.id} 
                    onClick={() => onGameClick(g)}
                    className={`group/item flex items-center gap-3 rounded-2xl border text-left overflow-hidden transition-all cursor-pointer p-2.5 ${
                      isDark ? 'bg-slate-950/80 border-slate-800/60 hover:border-blue-500/50 hover:bg-slate-900 shadow-lg' : 'bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-white shadow-sm'
                    }`}
                  >
                    <div className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-xl border overflow-hidden transition-all ${isDark ? 'bg-slate-900 border-slate-800 text-slate-400 group-hover/item:border-blue-500/50 group-hover/item:text-blue-400' : 'bg-white border-slate-200 text-slate-500 group-hover/item:text-blue-600'}`}>
                      {thumb ? (
                        <img src={thumb} alt="" className="w-full h-full object-cover transition-transform group-hover/item:scale-125" />
                      ) : (
                        getCategoryIcon(g.category)
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <span className={`text-[9px] font-black group-hover/item:text-blue-400 transition-colors line-clamp-1 uppercase tracking-tight leading-tight block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        {g.title}
                      </span>
                      <div className={`mt-1.5 w-full h-0.5 rounded-full ${colorClass} opacity-30 group-hover/item:opacity-60 transition-opacity`} />
                    </div>
                  </button>
                );
              })}
            </div>

            {isToday && (
              <div className="absolute -bottom-8 -right-8 opacity-10 pointer-events-none rotate-12">
                <Sparkles className="w-32 h-32 text-blue-500" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [activePlatform, setActivePlatform] = useState<string>('All');

  const categories = ['All', 'New Game', 'Early Access', 'DLC', 'Port', 'Update', 'Remake/Remaster', 'Edition', 'Full Release'];
  const majorPlatforms = ['All', 'Steam', 'PS5', 'Xbox', 'Switch', 'Mobile'];

  const isDark = theme === 'dark';

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#020617';
      document.body.style.color = '#f8fafc';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#f8fafc';
      document.body.style.color = '#0f172a';
    }
  }, [isDark]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  const handleGameFocus = (game: Game) => {
    setSearch(game.title);
    setViewMode('list');
    setActiveCategory('All');
    setActivePlatform('All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredGames = useMemo(() => {
    return GAMES_DATA.filter(game => {
      const matchesSearch = 
        game.title.toLowerCase().includes(search.toLowerCase()) ||
        game.genres.some(g => g.toLowerCase().includes(search.toLowerCase())) ||
        game.platforms.some(p => p.toLowerCase().includes(search.toLowerCase()));
      
      const matchesCategory = activeCategory === 'All' || game.category.includes(activeCategory);
      const matchesPlatform = activePlatform === 'All' || 
        game.platforms.some(p => p.toLowerCase().includes(activePlatform.toLowerCase())) ||
        (activePlatform === 'Mobile' && (game.platforms.some(p => p.includes('Android') || p.includes('IOS'))));
      
      return matchesSearch && matchesCategory && matchesPlatform;
    });
  }, [search, activeCategory, activePlatform]);

  return (
    <div className={`min-h-screen pb-20 selection:bg-blue-500/30 font-inter transition-colors duration-300 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className={`absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full blur-[180px] transition-all duration-1000 ${isDark ? 'bg-blue-600/10' : 'bg-blue-500/10'}`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full blur-[180px] transition-all duration-1000 ${isDark ? 'bg-indigo-600/10' : 'bg-indigo-500/10'}`} />
      </div>

      <header className={`sticky top-0 z-50 border-b backdrop-blur-2xl transition-all h-20 flex items-center ${isDark ? 'border-slate-800/60 bg-slate-950/80' : 'border-slate-200/60 bg-white/80'}`}>
        <div className="max-w-[1700px] mx-auto px-8 w-full flex items-center justify-between gap-8">
          <div className="flex items-center gap-5 shrink-0">
            <div className="group relative">
               <div className={`absolute inset-0 rounded-2xl blur-xl opacity-30 transition-all group-hover:opacity-50 ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`} />
               <button onClick={() => {setSearch(''); setViewMode('list'); setActiveCategory('All'); setActivePlatform('All');}} className={`relative w-12 h-12 border rounded-2xl flex items-center justify-center shadow-2xl transition-all hover:rotate-6 hover:scale-110 cursor-pointer ${
                 isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
               }`}>
                 <Globe className={`w-6 h-6 transition-colors ${isDark ? 'text-blue-500' : 'text-blue-600'}`} />
               </button>
            </div>
            <div className="hidden lg:block">
              <h1 className="text-2xl font-black tracking-tighter leading-none uppercase italic">
                Game Tracker
              </h1>
            </div>
          </div>

          <div className="flex-1 max-w-2xl relative group">
            <Search className={`absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isDark ? 'text-slate-500 group-focus-within:text-blue-400' : 'text-slate-400 group-focus-within:text-blue-600'}`} />
            <input 
              type="text" 
              placeholder="Track games, genres, or platforms..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full border rounded-2xl py-3.5 pl-14 pr-8 focus:outline-none focus:ring-2 transition-all text-sm font-medium shadow-inner ${
                isDark 
                ? 'bg-slate-950 border-slate-800 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-700' 
                : 'bg-slate-50 border-slate-200 focus:ring-blue-600/10 focus:border-blue-600/50 placeholder:text-slate-400'
              }`}
            />
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button 
              onClick={toggleTheme}
              className={`p-3 rounded-2xl border transition-all hover:scale-105 active:scale-95 shadow-lg ${
                isDark ? 'bg-slate-900 border-slate-800 text-amber-400 hover:text-amber-300' : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 shadow-sm'
              }`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className={`flex items-center p-1.5 rounded-2xl border shrink-0 shadow-2xl transition-all ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
              <button 
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${
                  viewMode === 'list' 
                  ? (isDark ? 'bg-white text-black shadow-xl' : 'bg-white text-slate-900 shadow-md') 
                  : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <LayoutGrid className="w-4 h-4" /> Grid
              </button>
              <button 
                onClick={() => setViewMode('calendar')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black transition-all uppercase tracking-widest ${
                  viewMode === 'calendar' 
                  ? (isDark ? 'bg-white text-black shadow-xl' : 'bg-white text-slate-900 shadow-md') 
                  : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Calendar className="w-4 h-4" /> Calendar
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1700px] mx-auto px-8 mt-12">
        <div className="flex flex-col gap-12">
          
          {/* Header Billboard */}
          <div className={`p-10 border rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row md:items-center gap-8 ${isDark ? 'bg-slate-900/30 border-slate-800/40' : 'bg-blue-50/40 border-blue-100'}`}>
            <div className={`w-16 h-16 shrink-0 rounded-3xl flex items-center justify-center border shadow-2xl ${isDark ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-white border-blue-200 text-blue-600'}`}>
              <Sparkles className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className={`text-2xl font-black uppercase tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>Release Radar: January 2026</h2>
              <p className={`text-sm font-medium leading-relaxed max-w-4xl ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Explore the latest benchmarks in interactive entertainment. From independent cozy adventures to massive franchise expansions, our tracker provides real-time visibility into the month's most significant launches.
              </p>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`border rounded-[2.5rem] p-8 flex flex-col shadow-lg transition-all ${isDark ? 'bg-slate-900/40 border-slate-800/60' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-emerald-500/10' : 'bg-emerald-50'}`}>
                    <Layers className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
                  </div>
                  <span className={`text-[11px] font-black uppercase tracking-widest ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Release Type</span>
                </div>
                {activeCategory !== 'All' && (
                  <button onClick={() => setActiveCategory('All')} className="text-slate-500 hover:text-slate-300 transition-colors p-1"><X className="w-4 h-4" /></button>
                )}
              </div>
              <div className="flex flex-wrap gap-2.5">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black border transition-all uppercase tracking-tight ${
                      activeCategory === cat 
                      ? (isDark ? 'bg-blue-600 border-blue-500 text-white shadow-xl' : 'bg-slate-900 border-slate-900 text-white shadow-lg') 
                      : (isDark ? 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-200 hover:border-slate-600' : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300')
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className={`border rounded-[2.5rem] p-8 flex flex-col shadow-lg transition-all ${isDark ? 'bg-slate-900/40 border-slate-800/60' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-indigo-500/10' : 'bg-indigo-50'}`}>
                    <Cpu className={`w-4 h-4 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                  </div>
                  <span className={`text-[11px] font-black uppercase tracking-widest ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Platform</span>
                </div>
                {activePlatform !== 'All' && (
                  <button onClick={() => setActivePlatform('All')} className="text-slate-500 hover:text-slate-300 transition-colors p-1"><X className="w-4 h-4" /></button>
                )}
              </div>
              <div className="flex flex-wrap gap-2.5">
                {majorPlatforms.map(plat => (
                  <button
                    key={plat}
                    onClick={() => setActivePlatform(plat)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black border transition-all uppercase flex items-center gap-2 tracking-tight ${
                      activePlatform === plat 
                      ? (isDark ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl' : 'bg-indigo-600 border-indigo-500 text-white shadow-lg')
                      : (isDark ? 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-200 hover:border-slate-600' : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300')
                    }`}
                  >
                    {plat === 'Steam' && <Monitor className="w-3.5 h-3.5" />}
                    {plat === 'Mobile' && <Smartphone className="w-3.5 h-3.5" />}
                    {plat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-6 px-4">
            <div className="flex items-center gap-8">
               <div className={`flex items-center gap-4 px-6 py-4 border rounded-2xl ${isDark ? 'bg-slate-900/40 border-slate-800/60' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className="relative">
                    <Clock className="w-5 h-5 text-blue-500" />
                    <div className="absolute inset-0 animate-ping opacity-20"><Clock className="w-5 h-5 text-blue-500" /></div>
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-[9px] font-black uppercase tracking-widest ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Temporal Filter</span>
                    <span className={`text-sm font-black uppercase tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>Jan 2026 Archive</span>
                  </div>
               </div>
               <div className={`text-xs font-bold uppercase tracking-widest flex items-center gap-3 ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
                 <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                 {filteredGames.length} Available Entries
               </div>
            </div>
            
            {(search || activeCategory !== 'All' || activePlatform !== 'All') && (
              <button 
                onClick={() => {setActiveCategory('All'); setActivePlatform('All'); setSearch('');}}
                className={`flex items-center gap-3 text-[10px] font-black transition-all uppercase tracking-widest px-6 py-4 rounded-2xl border ${isDark ? 'text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800' : 'text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-slate-50 shadow-sm'}`}
              >
                <RefreshCw className="w-4 h-4" /> Reset Filters
              </button>
            )}
          </div>

          {/* Results Grid / Calendar */}
          <div className="relative min-h-[600px]">
            {filteredGames.length === 0 ? (
              <div className={`flex flex-col items-center justify-center py-48 border-2 border-dashed rounded-[4rem] transition-all ${isDark ? 'bg-slate-950/40 border-slate-800/50 text-slate-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                <div className={`p-8 rounded-full mb-8 ${isDark ? 'bg-slate-900/50' : 'bg-white'}`}>
                  <Gamepad2 className={`w-20 h-20 opacity-10 ${isDark ? 'text-slate-400' : 'text-slate-400'}`} />
                </div>
                <h3 className={`text-3xl font-black mb-3 uppercase tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>End of the line</h3>
                <p className="text-sm font-medium tracking-wide">No releases match your current specifications.</p>
                <button 
                  onClick={() => {setSearch(''); setActiveCategory('All'); setActivePlatform('All');}}
                  className="mt-10 px-8 py-3 rounded-xl border text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
                >
                  Clear Selection
                </button>
              </div>
            ) : (
              viewMode === 'list' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-10">
                  {filteredGames.map(game => (
                    <GameCard key={game.id} game={game} isDark={isDark} />
                  ))}
                </div>
              ) : (
                <CalendarView games={filteredGames} isDark={isDark} onGameClick={handleGameFocus} />
              )
            )}
          </div>
        </div>
      </main>

      {/* Modern Footer */}
      <footer className={`mt-40 border-t relative overflow-hidden transition-all py-16 ${isDark ? 'border-slate-900 bg-slate-950/40' : 'border-slate-200 bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.02)]'}`}>
        <div className="max-w-[1700px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="flex items-center gap-3">
              <div className={`w-1.5 h-1.5 rounded-full ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`} />
              <span className={`text-[11px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Developed by</span>
              <a 
                href="https://x.com/itslowkeyxp" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.1em] transition-all hover:-translate-y-0.5 ${isDark ? 'text-blue-400 hover:text-white' : 'text-blue-600 hover:text-blue-800'}`}
              >
                x: itslowkeyxp
              </a>
            </div>
            <div className={`hidden md:block w-px h-5 ${isDark ? 'bg-slate-800' : 'bg-slate-200'}`} />
            <div className="flex items-center gap-3">
              <span className={`text-[11px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Data Provider</span>
              <span className={`text-[11px] font-black uppercase tracking-[0.1em] ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Moru__ (Discord)</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDark ? 'text-slate-700' : 'text-slate-300'}`}>
              © 2026 Game Tracker Protocol
            </span>
            <span className={`text-[8px] font-bold uppercase tracking-[0.1em] ${isDark ? 'text-slate-800' : 'text-slate-400'}`}>
              Real-time monitoring enabled • Version 2.0.1-Stable
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
