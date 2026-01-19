
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
    <div className={`group flex flex-col border rounded-3xl overflow-hidden transition-all duration-500 h-full ${
      isDark 
      ? 'bg-slate-900/40 border-slate-800/60 hover:border-blue-500/40 hover:shadow-[0_0_40px_-15px_rgba(59,130,246,0.15)]' 
      : 'bg-white border-slate-200 hover:border-blue-300 hover:shadow-[0_15px_30px_-10px_rgba(0,0,0,0.05)]'
    }`}>
      {/* Media Container - Tight Aspect Ratio */}
      <div className={`aspect-video w-full relative overflow-hidden shrink-0 ${isDark ? 'bg-slate-800' : 'bg-slate-100'}`}>
        {thumb ? (
          <img 
            src={thumb} 
            alt={game.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${isDark ? 'text-slate-700' : 'text-slate-300'}`}>
            <Gamepad2 className="w-8 h-8 opacity-20" />
          </div>
        )}
        <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-40 ${isDark ? 'from-slate-950' : 'from-slate-900/20'}`} />
        <div className="absolute top-3 left-3 z-10">
           <span className={`text-[7px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md backdrop-blur-xl ${getCategoryStyles(game.category, isDark)}`}>
            {game.category}
          </span>
        </div>
      </div>
      
      {/* Content Container - Even more compact padding */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <header className="space-y-0.5">
          <span className={`text-[8px] font-black uppercase tracking-[0.2em] block ${isDark ? 'text-blue-400/80' : 'text-blue-600'}`}>
            {displayDate}
          </span>
          <h3 className={`text-sm font-black transition-colors leading-tight tracking-tight min-h-[2rem] line-clamp-2 ${isDark ? 'text-white group-hover:text-blue-400' : 'text-slate-900 group-hover:text-blue-600'}`}>
            {game.title}
          </h3>
        </header>

        {/* Summary & Genres Section */}
        <div className="flex flex-col gap-2.5 flex-1">
          <div className="space-y-2">
            <p className={`text-[10px] leading-relaxed line-clamp-3 min-h-[2.5rem] font-medium transition-colors ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
              {game.summary || `A ${game.category.toLowerCase()} experience for January 2026.`}
            </p>

            {/* Scannable Genre Pills - Top 3 */}
            <div className="flex flex-wrap gap-1">
              {game.genres.slice(0, 3).map((g, i) => (
                <div key={i} className={`flex items-center gap-1 px-1.5 py-0.5 rounded-md border transition-all ${
                  isDark 
                  ? 'bg-slate-950/40 border-slate-800/80 text-slate-500' 
                  : 'bg-slate-50 border-slate-100 text-slate-500'
                }`}>
                  <div className={`w-0.5 h-0.5 rounded-full ${isDark ? 'bg-blue-500/40' : 'bg-blue-400'}`} />
                  <span className="text-[7px] font-bold uppercase tracking-tight">{g}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="pt-3 border-t border-dashed space-y-3 mt-auto border-slate-200 dark:border-slate-800/60">
          <div className="flex flex-wrap items-center gap-1">
            {game.platforms.slice(0, 4).map((p, idx) => (
              <span key={idx} className={`text-[7px] font-black px-1.5 py-0.5 rounded-sm border uppercase tracking-tighter transition-all whitespace-nowrap ${
                isDark 
                ? 'bg-slate-950 text-slate-600 border-slate-800/50' 
                : 'bg-white text-slate-400 border-slate-200'
              }`}>
                {p}
              </span>
            ))}
            {game.platforms.length > 4 && (
              <span className="text-[7px] font-black text-slate-500 uppercase">+{game.platforms.length - 4}</span>
            )}
          </div>

          {/* Compact Action Button */}
          {game.trailerUrl ? (
            <a 
              href={game.trailerUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-1.5 text-[8px] font-black px-3 py-2 rounded-xl transition-all active:scale-[0.98] uppercase tracking-[0.1em] group/btn shadow-md ${
                isDark 
                ? 'bg-white hover:bg-blue-600 text-black hover:text-white' 
                : 'bg-slate-900 hover:bg-blue-600 text-white'
              }`}
            >
              <Play className={`w-2.5 h-2.5 fill-current`} /> 
              <span>Watch Trailer</span>
            </a>
          ) : (
            <div className={`flex items-center justify-center gap-2 text-[8px] font-black py-2 border border-dashed rounded-xl cursor-default tracking-[0.1em] uppercase opacity-40 ${
              isDark ? 'text-slate-600 border-slate-800/50 bg-slate-950/10' : 'text-slate-400 border-slate-200 bg-slate-50/50'
            }`}>
              <span>N/A</span>
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7 gap-3">
      {days.map(day => {
        const dayGames = getGamesForDay(day);
        const isToday = day === 19;

        return (
          <div key={day} className={`min-h-[160px] border transition-all relative overflow-hidden group/card rounded-2xl p-4 flex flex-col ${
            dayGames.length > 0 
            ? (isToday ? 'border-blue-500/60 bg-blue-500/5 shadow-xl scale-[1.01] z-10' : (isDark ? 'border-slate-800/60 bg-slate-900/20 hover:border-slate-600' : 'border-slate-200 bg-white hover:border-blue-200 shadow-sm')) 
            : `opacity-60 ${isDark ? 'border-slate-800/20 bg-slate-900/5' : 'border-slate-100 bg-slate-50/20'}`
          }`}>
            <div className="flex justify-between items-start mb-3 relative z-10">
              <span className={`text-2xl font-black leading-none tracking-tighter ${dayGames.length > 0 ? (isToday ? 'text-blue-500' : (isDark ? 'text-white' : 'text-slate-900')) : (isDark ? 'text-slate-800' : 'text-slate-200')}`}>{day}</span>
              {dayGames.length > 0 && <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-black shadow-lg ${isDark ? 'bg-blue-600 text-white' : 'bg-blue-600 text-white'}`}>{dayGames.length}</span>}
            </div>
            
            <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[100px] pr-1 custom-scrollbar relative z-10">
              {dayGames.map(g => {
                const categoryStyle = getCategoryStyles(g.category, isDark);
                const thumb = getYoutubeThumbnail(g.trailerUrl);
                
                return (
                  <button 
                    key={g.id} 
                    onClick={() => onGameClick(g)}
                    className={`group/item flex items-center gap-2 rounded-lg border text-left overflow-hidden transition-all cursor-pointer p-1.5 ${
                      isDark ? 'bg-slate-950/80 border-slate-800/60 hover:border-blue-500/50 hover:bg-slate-900' : 'bg-slate-50 border-slate-200 hover:border-blue-300 hover:bg-white shadow-sm'
                    }`}
                  >
                    <div className={`shrink-0 w-5 h-5 flex items-center justify-center rounded border overflow-hidden transition-all ${isDark ? 'bg-slate-900 border-slate-800 text-slate-500' : 'bg-white border-slate-200 text-slate-400'}`}>
                      {thumb ? (
                        <img src={thumb} alt="" className="w-full h-full object-cover" />
                      ) : (
                        getCategoryIcon(g.category)
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <span className={`text-[7px] font-black group-hover/item:text-blue-400 transition-colors line-clamp-1 uppercase tracking-tight leading-tight block ${isDark ? 'text-slate-400' : 'text-slate-700'}`}>
                        {g.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
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
    <div className={`min-h-screen pb-16 selection:bg-blue-500/30 font-inter transition-colors duration-300 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className={`absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full blur-[180px] transition-all duration-1000 ${isDark ? 'bg-blue-600/10' : 'bg-blue-500/10'}`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full blur-[180px] transition-all duration-1000 ${isDark ? 'bg-indigo-600/10' : 'bg-indigo-500/10'}`} />
      </div>

      <header className={`sticky top-0 z-50 border-b backdrop-blur-2xl transition-all h-14 flex items-center ${isDark ? 'border-slate-800/60 bg-slate-950/80' : 'border-slate-200/60 bg-white/80'}`}>
        <div className="max-w-[1700px] mx-auto px-4 w-full flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 shrink-0">
            <div className="group relative">
               <div className={`absolute inset-0 rounded-lg blur-lg opacity-30 transition-all group-hover:opacity-50 ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`} />
               <button onClick={() => {setSearch(''); setViewMode('list'); setActiveCategory('All'); setActivePlatform('All');}} className={`relative w-8 h-8 border rounded-lg flex items-center justify-center shadow-xl transition-all hover:rotate-6 hover:scale-110 cursor-pointer ${
                 isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
               }`}>
                 <Globe className={`w-4 h-4 transition-colors ${isDark ? 'text-blue-500' : 'text-blue-600'}`} />
               </button>
            </div>
            <div className="hidden lg:block">
              <h1 className="text-sm font-black tracking-tighter leading-none uppercase italic">
                Radar
              </h1>
            </div>
          </div>

          <div className="flex-1 max-w-lg relative group">
            <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-3 h-3 transition-colors ${isDark ? 'text-slate-500 group-focus-within:text-blue-400' : 'text-slate-400 group-focus-within:text-blue-600'}`} />
            <input 
              type="text" 
              placeholder="Search releases..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full border rounded-lg py-1.5 pl-9 pr-4 focus:outline-none focus:ring-2 transition-all text-[10px] font-medium ${
                isDark 
                ? 'bg-slate-950 border-slate-800 focus:ring-blue-500/20 focus:border-blue-500 placeholder:text-slate-800' 
                : 'bg-slate-50 border-slate-200 focus:ring-blue-600/10 focus:border-blue-600/50 placeholder:text-slate-400'
              }`}
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button 
              onClick={toggleTheme}
              className={`p-1.5 rounded-lg border transition-all hover:scale-105 active:scale-95 shadow-sm ${
                isDark ? 'bg-slate-900 border-slate-800 text-amber-400 hover:text-amber-300' : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 shadow-sm'
              }`}
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
            </button>

            <div className={`flex items-center p-0.5 rounded-lg border shrink-0 shadow-lg transition-all ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
              <button 
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[8px] font-black transition-all uppercase tracking-widest ${
                  viewMode === 'list' 
                  ? (isDark ? 'bg-white text-black' : 'bg-white text-slate-900 shadow-sm') 
                  : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <LayoutGrid className="w-3 h-3" /> Grid
              </button>
              <button 
                onClick={() => setViewMode('calendar')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[8px] font-black transition-all uppercase tracking-widest ${
                  viewMode === 'calendar' 
                  ? (isDark ? 'bg-white text-black' : 'bg-white text-slate-900 shadow-sm') 
                  : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <Calendar className="w-3 h-3" /> Calendar
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1700px] mx-auto px-4 mt-6">
        <div className="flex flex-col gap-6">
          
          <div className={`p-6 border rounded-2xl relative overflow-hidden flex flex-col md:flex-row md:items-center gap-4 ${isDark ? 'bg-slate-900/30 border-slate-800/40' : 'bg-blue-50/40 border-blue-100'}`}>
            <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center border shadow-xl ${isDark ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-white border-blue-200 text-blue-600'}`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h2 className={`text-lg font-black uppercase tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>January 2026</h2>
              <p className={`text-[10px] font-medium leading-relaxed max-w-2xl ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>
                High-density tracking of interactive entertainment milestones.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className={`border rounded-2xl p-4 flex flex-col shadow-sm transition-all ${isDark ? 'bg-slate-900/40 border-slate-800/60' : 'bg-white border-slate-200'}`}>
              <div className="flex flex-wrap gap-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-2.5 py-1 rounded-md text-[8px] font-black border transition-all uppercase tracking-tight ${
                      activeCategory === cat 
                      ? (isDark ? 'bg-blue-600 border-blue-500 text-white' : 'bg-slate-900 border-slate-900 text-white') 
                      : (isDark ? 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-900')
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className={`border rounded-2xl p-4 flex flex-col shadow-sm transition-all ${isDark ? 'bg-slate-900/40 border-slate-800/60' : 'bg-white border-slate-200'}`}>
              <div className="flex flex-wrap gap-1">
                {majorPlatforms.map(plat => (
                  <button
                    key={plat}
                    onClick={() => setActivePlatform(plat)}
                    className={`px-2.5 py-1 rounded-md text-[8px] font-black border transition-all uppercase flex items-center gap-1 tracking-tight ${
                      activePlatform === plat 
                      ? (isDark ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-indigo-600 border-indigo-500 text-white')
                      : (isDark ? 'bg-slate-950 border-slate-800 text-slate-500 hover:text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-900')
                    }`}
                  >
                    {plat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="relative min-h-[400px]">
            {filteredGames.length === 0 ? (
              <div className={`flex flex-col items-center justify-center py-20 border-2 border-dashed rounded-2xl transition-all ${isDark ? 'bg-slate-950/40 border-slate-800/50 text-slate-700' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                <Gamepad2 className={`w-12 h-12 opacity-5 mb-4`} />
                <h3 className={`text-base font-black uppercase tracking-tighter ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>No results</h3>
              </div>
            ) : (
              viewMode === 'list' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4">
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

      <footer className={`mt-20 border-t transition-all py-8 ${isDark ? 'border-slate-900 bg-slate-950/40' : 'border-slate-200 bg-white'}`}>
        <div className="max-w-[1700px] mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${isDark ? 'text-slate-700' : 'text-slate-300'}`}>itslowkeyxp</span>
          </div>
          <span className={`text-[8px] font-black uppercase tracking-[0.3em] ${isDark ? 'text-slate-800' : 'text-slate-300'}`}>
            © 2026 Protocol
          </span>
        </div>
      </footer>
    </div>
  );
}
