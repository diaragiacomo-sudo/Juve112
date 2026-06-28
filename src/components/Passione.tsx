import React, { useState, useEffect } from 'react';
import { Heart, Send, Sparkles, Filter, ShieldCheck, MessageSquarePlus, Award, User, Clock, Trash } from 'lucide-react';

interface PassionStory {
  id: string;
  author: string;
  yearStarted: string;
  category: 'Prima Volta allo Stadio' | 'Gol Indimenticabile' | 'Fede di Famiglia' | 'Tradizione' | 'Altro';
  title: string;
  content: string;
  cardStyle: 'bianconero' | 'gold' | 'pink' | 'blue';
  likes: number;
  date: string;
}

interface WallCheer {
  id: string;
  author: string;
  text: string;
  date: string;
}

export default function PassioneComponent() {
  const [stories, setStories] = useState<PassionStory[]>(() => {
    const saved = localStorage.getItem('juve_fan_stories');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    // Pre-seeded high quality stories
    return [
      {
        id: 'story-1',
        author: 'Gianluca da Torino',
        yearStarted: '1996',
        category: 'Prima Volta allo Stadio',
        title: 'Mio padre, il freddo delle Alpi e l\'Ajax',
        content: "Maggio 1996. Avevo solo 10 anni. Mio padre arrivò a casa sventolando due biglietti per la finale di Champions League. Non andammo a Roma, ma guardammo lo schermo gigante con altri diecimila tifosi sotto la pioggia fredda di Torino. Al rigore decisivo di Jugovic scoppiò un boato che sento ancora oggi nelle orecchie. Lì capii che non stavo solo guardando una partita: stavo abbracciando una fede per tutta la vita.",
        cardStyle: 'bianconero',
        likes: 124,
        date: '24 Giugno 2026'
      },
      {
        id: 'story-2',
        author: 'Sofia_Juve10',
        yearStarted: '2008',
        category: 'Gol Indimenticabile',
        title: 'La punizione magica contro il Real Madrid',
        content: "Novembre 2008. Champions League. Punizione dal limite per la Juve al Santiago Bernabéu. Casillas piazza la barriera, ma Alex Del Piero fa quel passo indietro inconfondibile. Tiro perfetto, palla che gira sopra la barriera e si insacca rasoterra nell'angolo. Ricordo il silenzio di Madrid squarciato dall'urlo di noi tifosi nel settore ospiti. E poi, l'applauso di tutto il Bernabéu alla sua uscita. Pelle d'oca pura.",
        cardStyle: 'gold',
        likes: 98,
        date: '18 Giugno 2026'
      },
      {
        id: 'story-3',
        author: 'Marco Bianconero',
        yearStarted: '1982',
        category: 'Fede di Famiglia',
        title: 'Tre generazioni sul divano di velluto',
        content: "Mio nonno mi raccontava di Boniperti e Sivori, mio padre urlava per i gol di Platini, io sono cresciuto con Del Piero e Buffon. Oggi mio figlio corre per casa indossando la maglia con le tre stelle dorate. Questa non è solo passione per uno sport, è un filo invisibile che unisce la nostra famiglia di generazione in generazione. Vincere è importante, ma trasmettere questo amore lo è ancora di più.",
        cardStyle: 'pink',
        likes: 112,
        date: '10 Giugno 2026'
      }
    ];
  });

  const [cheers, setCheers] = useState<WallCheer[]>(() => {
    const saved = localStorage.getItem('juve_wall_cheers');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      { id: 'cheer-1', author: 'Luca90', text: 'FINO ALLA FINE FORZA JUVENTUS! 🖤🤍', date: 'Proprio ora' },
      { id: 'cheer-2', author: 'Claudio_J', text: '38 scudetti vinti sul campo! Orgoglio immenso!', date: '10 min fa' },
      { id: 'cheer-3', author: 'JuventinaDoc', text: 'Bentornato Alex nel nostro cuore sempre!', date: '1 ora fa' }
    ];
  });

  // Filter & Sort State
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'likes'>('likes');

  // Story Form State
  const [formAuthor, setFormAuthor] = useState('');
  const [formYear, setFormYear] = useState('');
  const [formCategory, setFormCategory] = useState<PassionStory['category']>('Prima Volta allo Stadio');
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formStyle, setFormStyle] = useState<PassionStory['cardStyle']>('bianconero');
  const [showSuccess, setShowSuccess] = useState(false);

  // Quick Cheer State
  const [cheerAuthor, setCheerAuthor] = useState('');
  const [cheerText, setCheerText] = useState('');

  // Save stories and cheers to localStorage
  useEffect(() => {
    localStorage.setItem('juve_fan_stories', JSON.stringify(stories));
  }, [stories]);

  useEffect(() => {
    localStorage.setItem('juve_wall_cheers', JSON.stringify(cheers));
  }, [cheers]);

  const handleLikeStory = (id: string) => {
    setStories(stories.map(st => {
      if (st.id === id) {
        return { ...st, likes: st.likes + 1 };
      }
      return st;
    }));
  };

  const handleStorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formAuthor || !formTitle || !formContent) return;

    const newStory: PassionStory = {
      id: 'story-' + Date.now(),
      author: formAuthor.trim(),
      yearStarted: formYear.trim() || 'N.D.',
      category: formCategory,
      title: formTitle.trim(),
      content: formContent.trim(),
      cardStyle: formStyle,
      likes: 0,
      date: new Date().toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    setStories([newStory, ...stories]);
    
    // Clear form and show success
    setFormAuthor('');
    setFormYear('');
    setFormTitle('');
    setFormContent('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const handleCheerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cheerAuthor.trim() || !cheerText.trim()) return;

    const newCheer: WallCheer = {
      id: 'cheer-' + Date.now(),
      author: cheerAuthor.trim().toUpperCase(),
      text: cheerText.trim(),
      date: 'Proprio ora'
    };

    setCheers([newCheer, ...cheers]);
    setCheerText('');
  };

  const handleDeleteStory = (id: string) => {
    if (confirm("Sei sicuro di voler eliminare questo racconto?")) {
      setStories(stories.filter(s => s.id !== id));
    }
  };

  // Sort and filter logic
  const filteredStories = stories
    .filter(st => activeCategory === 'all' || st.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === 'likes') {
        return b.likes - a.likes;
      }
      return b.id.localeCompare(a.id); // newer id implies higher timestamp
    });

  // Map card style back to actual Tailwind CSS classes
  const getCardClasses = (style: PassionStory['cardStyle']) => {
    switch (style) {
      case 'gold':
        return 'bg-zinc-950 border-2 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.15)] text-white';
      case 'pink':
        return 'bg-zinc-950 border-2 border-pink-500/30 text-white';
      case 'blue':
        return 'bg-zinc-950 border-2 border-blue-500/30 text-white';
      case 'bianconero':
      default:
        return 'bg-zinc-950 border border-zinc-800 text-white';
    }
  };

  const getBadgeClasses = (style: PassionStory['cardStyle']) => {
    switch (style) {
      case 'gold':
        return 'bg-yellow-500 text-black';
      case 'pink':
        return 'bg-pink-600 text-white';
      case 'blue':
        return 'bg-blue-600 text-white';
      case 'bianconero':
      default:
        return 'bg-white text-black';
    }
  };

  return (
    <div className="bg-black text-white min-h-screen py-10 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white mb-4">
          La Nostra <span className="text-stroke-white text-zinc-500">Passione</span>
        </h1>
        <div className="w-16 h-1 bg-white mx-auto mb-4"></div>
        <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest font-bold">
          "La Juventus è un'emozione che si trasmette nel sangue." Raccontaci il tuo ricordo più bello, condividi la tua fede e lascia un urlo di gioia sulla bacheca dei tifosi!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Grid: Stories Submit Form & Live Preview */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-zinc-950 border border-zinc-850 p-6 shadow-2xl">
            <h3 className="text-base font-display font-black uppercase text-white tracking-widest mb-4 flex items-center gap-2">
              <MessageSquarePlus className="w-5 h-5 text-yellow-500" />
              Invia il tuo Racconto
            </h3>

            {showSuccess && (
              <div className="bg-green-950/40 border border-green-500 text-green-400 text-xs p-3 mb-4 rounded-none font-mono flex items-center gap-2 animate-in fade-in duration-300">
                <ShieldCheck className="w-4 h-4" />
                <span>Storia pubblicata con successo! Guarda l'elenco a destra.</span>
              </div>
            )}

            <form onSubmit={handleStorySubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-[9px] text-zinc-500 uppercase font-black block mb-1">Nome / Nickname</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Gianni96"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    className="w-full bg-black border border-zinc-850 px-3 py-2 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-white uppercase tracking-wider font-mono"
                  />
                </div>
                <div>
                  <label className="font-mono text-[9px] text-zinc-500 uppercase font-black block mb-1">Tifoso dal (Anno)</label>
                  <input
                    type="number"
                    min="1897"
                    max="2026"
                    placeholder="E.g. 1996"
                    value={formYear}
                    onChange={(e) => setFormYear(e.target.value)}
                    className="w-full bg-black border border-zinc-850 px-3 py-2 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[9px] text-zinc-500 uppercase font-black block mb-1">Categoria</label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as PassionStory['category'])}
                  className="w-full bg-black border border-zinc-850 px-3 py-2 text-xs text-white focus:outline-none focus:border-white font-mono"
                >
                  <option value="Prima Volta allo Stadio">Prima Volta allo Stadio</option>
                  <option value="Gol Indimenticabile">Gol Indimenticabile</option>
                  <option value="Fede di Famiglia">Fede di Famiglia</option>
                  <option value="Tradizione">Tradizione</option>
                  <option value="Altro">Altro</option>
                </select>
              </div>

              <div>
                <label className="font-mono text-[9px] text-zinc-500 uppercase font-black block mb-1">Titolo del Racconto</label>
                <input
                  type="text"
                  required
                  placeholder="E.g. Una serata magica..."
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-black border border-zinc-850 px-3 py-2 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="font-mono text-[9px] text-zinc-500 uppercase font-black block mb-1">Il tuo Racconto (Massimo 300 parole)</label>
                <textarea
                  required
                  placeholder="Condividi le tue emozioni bianconere, i brividi della partita, i cori..."
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  rows={4}
                  maxLength={1500}
                  className="w-full bg-black border border-zinc-850 px-3 py-2 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-white font-light leading-relaxed"
                />
              </div>

              {/* Style Card Selection */}
              <div>
                <label className="font-mono text-[9px] text-zinc-500 uppercase font-black block mb-2">Scegli uno Stile per la tua Carta</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { style: 'bianconero', label: 'Classic' },
                    { style: 'gold', label: 'Legend' },
                    { style: 'pink', label: 'Rosa 1897' },
                    { style: 'blue', label: 'Europe 96' }
                  ].map((opt) => (
                    <button
                      key={opt.style}
                      type="button"
                      onClick={() => setFormStyle(opt.style as PassionStory['cardStyle'])}
                      className={`py-1.5 text-[9px] font-mono font-bold uppercase border transition-all ${
                        formStyle === opt.style
                          ? 'bg-white text-black border-white'
                          : 'bg-black text-zinc-400 border-zinc-850 hover:border-zinc-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 rounded-none"
              >
                <Send className="w-3.5 h-3.5" />
                Pubblica Storia
              </button>
            </form>
          </div>

          {/* Interactive Form Live Preview */}
          <div className="space-y-2">
            <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block font-black">Anteprima in tempo reale</span>
            <div className={`p-5 shadow-xl border ${getCardClasses(formStyle)} transition-all duration-300`}>
              <div className="flex justify-between items-start gap-2 mb-3">
                <span className={`font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 font-bold ${getBadgeClasses(formStyle)}`}>
                  {formCategory}
                </span>
                <span className="font-mono text-[9px] text-zinc-500">
                  Tifoso dal {formYear || '...'}
                </span>
              </div>
              <h4 className="font-display font-bold text-base uppercase tracking-tight text-white mb-2 line-clamp-1">
                {formTitle || 'Il Titolo del tuo Racconto...'}
              </h4>
              <p className="text-zinc-400 text-xs leading-relaxed font-light line-clamp-3 mb-4 italic">
                {formContent || 'Inizia a digitare le tue emozioni per vederle formarsi qui in una bellissima carta ricordo...'}
              </p>
              <div className="flex justify-between items-center border-t border-zinc-900/40 pt-2 text-[10px] font-mono text-zinc-500 font-bold">
                <span className="uppercase text-yellow-500 font-black flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  {formAuthor || 'Il tuo nome'}
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 text-red-500" />
                  0 mi piace
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Grid: Feed of Passion Stories */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Filters & Sorting */}
          <div className="bg-zinc-950 border border-zinc-900 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Filters */}
            <div className="flex flex-wrap gap-1.5 items-center w-full sm:w-auto">
              <span className="font-mono text-[10px] text-zinc-500 uppercase mr-1 flex items-center gap-1 font-bold">
                <Filter className="w-3 h-3" />
                Filtra:
              </span>
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase border transition-all ${
                  activeCategory === 'all'
                    ? 'bg-white text-black border-white'
                    : 'bg-black text-zinc-400 border-zinc-900 hover:border-zinc-700'
                }`}
              >
                Tutti
              </button>
              {['Prima Volta allo Stadio', 'Gol Indimenticabile', 'Fede di Famiglia', 'Altro'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 text-[10px] font-mono font-bold uppercase border transition-all ${
                    activeCategory === cat
                      ? 'bg-white text-black border-white'
                      : 'bg-black text-zinc-400 border-zinc-900 hover:border-zinc-700'
                  }`}
                >
                  {cat.split(' ')[0]} {/* Short name */}
                </button>
              ))}
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="font-mono text-[10px] text-zinc-500 uppercase font-bold">Ordina:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'likes')}
                className="bg-black border border-zinc-800 text-xs px-2 py-1.5 font-mono focus:outline-none"
              >
                <option value="likes">I Più Votati</option>
                <option value="date">Più Recenti</option>
              </select>
            </div>
          </div>

          {/* Stories flow */}
          <div className="space-y-5">
            {filteredStories.length === 0 ? (
              <div className="bg-zinc-950 border border-zinc-900 p-12 text-center text-zinc-500 font-mono text-sm uppercase">
                Nessun racconto presente in questa categoria. Scrivi il tuo!
              </div>
            ) : (
              filteredStories.map((st) => (
                <div
                  key={st.id}
                  className={`p-6 shadow-2xl border flex flex-col justify-between transition-transform duration-250 hover:scale-[1.005] relative group ${getCardClasses(st.cardStyle)}`}
                >
                  {/* Delete Button for user created custom stories */}
                  {st.id.startsWith('story-1') === false && st.id.startsWith('story-2') === false && st.id.startsWith('story-3') === false && (
                    <button
                      onClick={() => handleDeleteStory(st.id)}
                      className="absolute right-4 top-4 text-zinc-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
                      title="Elimina questo racconto"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  )}

                  <div className="space-y-4">
                    <div className="flex justify-between items-start gap-2">
                      <span className={`font-mono text-[9px] uppercase tracking-widest px-2.5 py-0.5 font-black ${getBadgeClasses(st.cardStyle)}`}>
                        {st.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-zinc-500 font-mono text-[10px]">
                        <Clock className="w-3.5 h-3.5 text-zinc-600" />
                        <span>Tifoso dal {st.yearStarted}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-display font-black text-lg md:text-xl uppercase tracking-tight text-white leading-tight">
                        "{st.title}"
                      </h3>
                      <span className="text-zinc-500 text-[10px] font-mono block mt-1">Pubblicato il {st.date}</span>
                    </div>

                    <p className="text-zinc-300 text-xs md:text-sm leading-relaxed font-light whitespace-pre-line italic border-l-2 border-zinc-800 pl-4 py-1">
                      {st.content}
                    </p>
                  </div>

                  {/* Actions and author */}
                  <div className="flex items-center justify-between border-t border-zinc-900/40 pt-4 mt-4">
                    <span className="font-mono text-xs text-yellow-500 uppercase font-black flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-yellow-500" />
                      {st.author}
                    </span>

                    {/* Like button */}
                    <button
                      onClick={() => handleLikeStory(st.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 border border-zinc-900 hover:border-red-500 text-zinc-400 hover:text-red-500 transition-all font-mono text-xs uppercase font-bold"
                    >
                      <Heart className="w-4 h-4 fill-current text-red-600 animate-pulse" />
                      <span>{st.likes} Mi Piace</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* BACHECA DEI MESSAGGI (Wall of Cheers) */}
          <div className="border border-zinc-800 bg-zinc-950 p-6 space-y-6">
            <div className="border-b border-zinc-900 pb-3">
              <h3 className="text-base font-display font-black uppercase text-white tracking-widest flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} />
                Bacheca dei Cori & Saluti
              </h3>
              <p className="text-zinc-500 font-mono text-[10px] uppercase mt-1">Lascia un saluto istantaneo, un coro o un incitamento per la squadra!</p>
            </div>

            {/* Quick Cheer form */}
            <form onSubmit={handleCheerSubmit} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <input
                type="text"
                required
                maxLength={25}
                placeholder="NICKNAME"
                value={cheerAuthor}
                onChange={(e) => setCheerAuthor(e.target.value)}
                className="bg-black border border-zinc-850 px-3 py-2 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-white uppercase tracking-wider font-mono sm:col-span-1"
              />
              <input
                type="text"
                required
                maxLength={80}
                placeholder="IL TUO GRIDO (E.g. FINO ALLA FINE FORZA JUVE!)"
                value={cheerText}
                onChange={(e) => setCheerText(e.target.value)}
                className="bg-black border border-zinc-850 px-3 py-2 text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-white uppercase tracking-wider font-mono sm:col-span-2"
              />
              <button
                type="submit"
                className="bg-white text-black py-2 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors rounded-none sm:col-span-1"
              >
                Grida!
              </button>
            </form>

            {/* Wall list of cheers (scrollable row) */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-zinc-800">
              {cheers.map((ch) => (
                <div
                  key={ch.id}
                  className="bg-black border border-zinc-900 p-3 flex-shrink-0 w-64 flex flex-col justify-between hover:border-zinc-700 transition-colors"
                >
                  <p className="font-mono text-xs font-black text-white uppercase tracking-wide leading-tight break-words">
                    "{ch.text}"
                  </p>
                  <div className="flex justify-between items-center mt-3 border-t border-zinc-900 pt-2 text-[9px] font-mono text-zinc-500 font-bold">
                    <span className="text-yellow-500 uppercase font-extrabold">{ch.author}</span>
                    <span>{ch.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
