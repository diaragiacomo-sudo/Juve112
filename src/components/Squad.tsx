import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { initialPlayers } from '../data';
import { Player } from '../types';
import { Search, SlidersHorizontal, User, Sparkles, Award, BarChart3, ShieldAlert } from 'lucide-react';

export default function SquadComponent() {
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'Tutti' | 'Portiere' | 'Difensore' | 'Centrocampista' | 'Attaccante'>('Tutti');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [sortBy, setSortBy] = useState<'number' | 'goals' | 'assists' | 'rating'>('number');

  // Filter & Sort Logic
  const filteredPlayers = players
    .filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.nationality.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPosition = activeFilter === 'Tutti' || p.position === activeFilter;
      return matchesSearch && matchesPosition;
    })
    .sort((a, b) => {
      if (sortBy === 'number') return a.number - b.number;
      if (sortBy === 'goals') return b.stats.goals - a.stats.goals;
      if (sortBy === 'assists') return b.stats.assists - a.stats.assists;
      if (sortBy === 'rating') return b.stats.rating - a.stats.rating;
      return 0;
    });

  // Team Leader Stats
  const topScorer = [...players].sort((a, b) => b.stats.goals - a.stats.goals)[0];
  const topAssists = [...players].sort((a, b) => b.stats.assists - a.stats.assists)[0];
  const topRating = [...players].sort((a, b) => b.stats.rating - a.stats.rating)[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-12">
        <span className="text-xs font-bold uppercase bg-white text-black w-fit px-2.5 py-1 mb-4 tracking-widest inline-block">
          Statistiche e Rosa Ufficiale
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter text-white uppercase leading-none">
          Rosa Attuale <span className="text-stroke-white text-zinc-500">& Statistiche</span>
        </h1>
        <p className="mt-4 text-xs md:text-sm text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
          Scopri i protagonisti della stagione bianconera. Analizza le statistiche dettagliate, i gol, gli assist e il rendimento di ogni singolo giocatore.
        </p>
      </div>

      {/* Leaderboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Top Scorer */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-none p-5 flex items-center justify-between hover:border-white transition-all">
          <div>
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block font-bold">Goleador Principale</span>
            <h4 className="text-lg font-display font-black text-white uppercase mt-1 leading-none">{topScorer.name}</h4>
            <div className="flex items-center space-x-2 mt-3">
              <span className="text-3xl font-black text-white">{topScorer.stats.goals}</span>
              <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider font-bold">Reti stagionali</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-none bg-black border border-zinc-800 flex items-center justify-center text-white">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        {/* Top Assist */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-none p-5 flex items-center justify-between hover:border-white transition-all">
          <div>
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block font-bold">Re degli Assist</span>
            <h4 className="text-lg font-display font-black text-white uppercase mt-1 leading-none">{topAssists.name}</h4>
            <div className="flex items-center space-x-2 mt-3">
              <span className="text-3xl font-black text-white">{topAssists.stats.assists}</span>
              <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider font-bold">Assist totali</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-none bg-black border border-zinc-800 flex items-center justify-center text-white">
            <Award className="w-5 h-5" />
          </div>
        </div>

        {/* Top Rating */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-none p-5 flex items-center justify-between hover:border-white transition-all">
          <div>
            <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider block font-bold">Rendimento Medio Top</span>
            <h4 className="text-lg font-display font-black text-white uppercase mt-1 leading-none">{topRating.name}</h4>
            <div className="flex items-center space-x-2 mt-3">
              <span className="text-3xl font-black text-white">{topRating.stats.rating}</span>
              <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider font-bold">Rating di gioco</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-none bg-black border border-zinc-800 flex items-center justify-center text-white">
            <SlidersHorizontal className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Sorting Bar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-none p-4 mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-zinc-500" />
          <input
            id="player-search-input"
            type="text"
            placeholder="Cerca giocatore o nazione..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black border border-zinc-800 rounded-none text-white placeholder-zinc-750 focus:outline-none focus:border-white text-xs uppercase tracking-wider"
          />
        </div>

        {/* Position Switchers */}
        <div className="flex flex-wrap gap-1.5">
          {(['Tutti', 'Portiere', 'Difensore', 'Centrocampista', 'Attaccante'] as const).map((pos) => (
            <button
              key={pos}
              id={`filter-${pos}`}
              onClick={() => setActiveFilter(pos)}
              className={`px-3 py-1.5 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeFilter === pos
                  ? 'bg-white text-black'
                  : 'bg-black text-zinc-400 hover:text-white border border-zinc-800'
              }`}
            >
              {pos}
            </button>
          ))}
        </div>

        {/* Sort Switcher */}
        <div className="flex items-center space-x-2">
          <span className="text-[10px] text-zinc-500 uppercase font-mono font-bold tracking-wider">Ordina per:</span>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-black border border-zinc-800 text-white text-xs rounded-none px-2.5 py-1.5 focus:outline-none focus:border-white uppercase tracking-wider font-bold"
          >
            <option value="number">N° Maglia</option>
            <option value="goals">Gol Segnati</option>
            <option value="assists">Assist</option>
            <option value="rating">Voto Medio</option>
          </select>
        </div>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {filteredPlayers.map((player) => (
          <motion.div
            key={player.id}
            id={`player-card-${player.id}`}
            layout
            onClick={() => setSelectedPlayer(player)}
            className="bg-zinc-900 border border-zinc-800 rounded-none overflow-hidden cursor-pointer group hover:border-white transition-all flex flex-col shadow-2xl"
            whileHover={{ y: -4 }}
          >
            {/* Player Image Placeholder */}
            <div className="relative aspect-square bg-gradient-to-b from-zinc-800 to-zinc-900 flex items-center justify-center overflow-hidden border-b border-zinc-800">
              <span className="absolute right-4 top-2 font-display text-5xl font-black text-white/5 group-hover:text-white/10 transition-all select-none">
                {player.number}
              </span>
              <img 
                src={player.image} 
                alt={player.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-300 mix-blend-luminosity"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
              
              {/* Jersey Number Tag */}
              <div className="absolute bottom-3 left-3 bg-white text-black font-display font-black w-8 h-8 rounded-none flex items-center justify-center text-sm shadow-xl">
                {player.number}
              </div>
            </div>

            {/* Player Info */}
            <div className="p-3.5 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-display font-black text-white tracking-tighter text-sm md:text-base leading-none uppercase group-hover:opacity-80 transition-opacity">
                  {player.name}
                </h4>
                <p className="text-[10px] text-zinc-500 mt-2 flex items-center justify-between font-mono uppercase tracking-wider font-bold">
                  <span>{player.position}</span>
                  <span className="text-zinc-400">{player.nationality}</span>
                </p>
              </div>

              {/* Small Fast Stats */}
              <div className="mt-4 pt-2 border-t border-zinc-800 flex justify-between items-center text-[10px] font-mono uppercase tracking-wider font-bold">
                <span className="text-zinc-500">Rating:</span>
                <span className="text-white">{player.stats.rating}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Results Fallback */}
      {filteredPlayers.length === 0 && (
        <div className="text-center py-20 bg-zinc-900 border border-zinc-800 rounded-none mt-8">
          <User className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h4 className="text-sm font-mono uppercase tracking-widest font-bold text-white">Nessun giocatore trovato</h4>
          <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest font-mono">Prova a cambiare i filtri o la chiave di ricerca.</p>
        </div>
      )}

      {/* Statistiche Detagliate / Modal Drawer */}
      <AnimatePresence>
        {selectedPlayer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlayer(null)}
              className="absolute inset-0 bg-black"
            />

            {/* Modal Body */}
            <motion.div
              id="player-detail-modal"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-800 rounded-none overflow-hidden shadow-2xl z-10 flex flex-col"
            >
              {/* Header with image */}
              <div className="relative bg-zinc-850 h-48 flex items-end p-6 overflow-hidden border-b border-zinc-800">
                <img 
                  src={selectedPlayer.image} 
                  alt={selectedPlayer.name}
                  referrerPolicy="no-referrer"
                  className="absolute inset-0 w-full h-full object-cover opacity-30 object-top mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
                
                {/* Close Button */}
                <button
                  id="close-player-modal"
                  onClick={() => setSelectedPlayer(null)}
                  className="absolute right-4 top-4 w-8 h-8 rounded-none bg-black border border-zinc-800 text-white hover:bg-white hover:text-black flex items-center justify-center font-bold"
                >
                  &times;
                </button>

                <div className="relative flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-none bg-white text-black font-display font-black flex items-center justify-center text-2xl shadow-lg border border-zinc-950">
                    {selectedPlayer.number}
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest block font-bold">{selectedPlayer.position}</span>
                    <h2 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tighter leading-none">{selectedPlayer.name}</h2>
                  </div>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* General Details */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-black border border-zinc-800 rounded-none p-3">
                    <span className="text-[9px] text-zinc-500 font-mono uppercase block font-bold tracking-wider">Età</span>
                    <span className="text-base font-black text-white mt-1 block uppercase tracking-tighter">{selectedPlayer.age} Anni</span>
                  </div>
                  <div className="bg-black border border-zinc-800 rounded-none p-3">
                    <span className="text-[9px] text-zinc-500 font-mono uppercase block font-bold tracking-wider">Nazione</span>
                    <span className="text-base font-black text-white mt-1 block uppercase tracking-tighter">{selectedPlayer.nationality}</span>
                  </div>
                  <div className="bg-black border border-zinc-800 rounded-none p-3">
                    <span className="text-[9px] text-zinc-500 font-mono uppercase block font-bold tracking-wider">Rating</span>
                    <span className="text-base font-black text-white mt-1 block uppercase tracking-tighter">{selectedPlayer.stats.rating}</span>
                  </div>
                </div>

                {/* Statistics Progress Meters */}
                <div>
                  <h3 className="text-xs text-zinc-400 uppercase tracking-widest font-mono font-bold mb-4 border-b border-zinc-800 pb-2">Rendimento Stagionale</h3>
                  
                  <div className="space-y-4">
                    {/* Stat Row: Presenze */}
                    <div>
                      <div className="flex justify-between text-[10px] text-zinc-400 mb-1 font-mono uppercase tracking-wider font-bold">
                        <span>PRESENZE (PARTITE)</span>
                        <span className="text-white">{selectedPlayer.stats.matches} / 38</span>
                      </div>
                      <div className="h-2 bg-black border border-zinc-800 rounded-none overflow-hidden">
                        <div 
                          className="h-full bg-white transition-all duration-500" 
                          style={{ width: `${(selectedPlayer.stats.matches / 38) * 100}%` }}
                        />
                      </div>
                    </div>

                    {/* Stat Row: Minuti Giocati */}
                    <div>
                      <div className="flex justify-between text-[10px] text-zinc-400 mb-1 font-mono uppercase tracking-wider font-bold">
                        <span>MINUTI GIOCATI</span>
                        <span className="text-white">{selectedPlayer.stats.minutesPlayed} min</span>
                      </div>
                      <div className="h-2 bg-black border border-zinc-800 rounded-none overflow-hidden">
                        <div 
                          className="h-full bg-zinc-500 transition-all duration-500" 
                          style={{ width: `${Math.min((selectedPlayer.stats.minutesPlayed / 3420) * 100, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {/* Stat Card: Gol */}
                      <div className="bg-black border border-zinc-800 rounded-none p-3.5 flex justify-between items-center">
                        <div>
                          <span className="text-[10px] text-zinc-500 font-mono uppercase block font-bold tracking-wider">Gol Segnati</span>
                          <span className="text-2xl font-display font-black text-white leading-none">{selectedPlayer.stats.goals}</span>
                        </div>
                        <div className="text-zinc-700 font-display text-3xl font-black">G</div>
                      </div>

                      {/* Stat Card: Assist */}
                      <div className="bg-black border border-zinc-800 rounded-none p-3.5 flex justify-between items-center">
                        <div>
                          <span className="text-[10px] text-zinc-500 font-mono uppercase block font-bold tracking-wider">Assist Vincenti</span>
                          <span className="text-2xl font-display font-black text-white leading-none">{selectedPlayer.stats.assists}</span>
                        </div>
                        <div className="text-zinc-700 font-display text-3xl font-black">A</div>
                      </div>
                    </div>

                    {/* Cartellini */}
                    <div className="flex space-x-4 pt-2">
                      <div className="flex-1 bg-black border border-zinc-800 rounded-none p-3 flex justify-between items-center">
                        <div>
                          <span className="text-[10px] text-zinc-500 font-mono uppercase block font-bold tracking-wider">Gialli</span>
                          <span className="text-lg font-black text-white">{selectedPlayer.stats.yellowCards}</span>
                        </div>
                        <div className="w-3.5 h-5 bg-yellow-500 rounded-none"></div>
                      </div>

                      <div className="flex-1 bg-black border border-zinc-800 rounded-none p-3 flex justify-between items-center">
                        <div>
                          <span className="text-[10px] text-zinc-500 font-mono uppercase block font-bold tracking-wider">Rossi</span>
                          <span className="text-lg font-black text-white">{selectedPlayer.stats.redCards}</span>
                        </div>
                        <div className="w-3.5 h-5 bg-red-600 rounded-none"></div>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex justify-between items-center text-[9px] text-zinc-500 font-mono uppercase tracking-widest font-bold">
                  <span>SISTEMA DI RILEVAMENTO JUVE STATS</span>
                  <span>STAGIONE 2025/2026</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
