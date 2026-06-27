import React, { useState } from 'react';
import { trophies } from '../data';
import { Trophy as TrophyType } from '../types';
import { Trophy, Star, Shield, Award, Calendar, ChevronDown, ChevronUp, Zap, Globe, Map } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function PalmaresComponent() {
  const [expandedTrophy, setExpandedTrophy] = useState<string | null>(null);

  const getTrophyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="w-8 h-8 text-white" />;
      case 'Trophy':
        return <Trophy className="w-8 h-8 text-white" />;
      case 'Award':
        return <Award className="w-8 h-8 text-white" />;
      case 'Globe':
        return <Globe className="w-8 h-8 text-white" />;
      case 'Zap':
        return <Zap className="w-8 h-8 text-white" />;
      case 'Map':
        return <Map className="w-8 h-8 text-white" />;
      default:
        return <Trophy className="w-8 h-8 text-white" />;
    }
  };

  const toggleTrophy = (id: string) => {
    if (expandedTrophy === id) {
      setExpandedTrophy(null);
    } else {
      setExpandedTrophy(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase bg-white text-black w-fit px-2.5 py-1 mb-4 tracking-widest inline-block">
          Fino Alla Fine
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter text-white uppercase leading-none">
          Il Nostro <span className="text-stroke-white text-zinc-500">Palmarès</span>
        </h1>
        <p className="mt-4 text-xs md:text-sm text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
          La Juventus è il club più titolato d'Italia. Esplora la nostra bacheca ricca di storia, trionfi leggendari e record ineguagliabili.
        </p>
      </div>

      {/* Trophies Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trophies.map((trophy) => {
          const isExpanded = expandedTrophy === trophy.id;
          return (
            <div
              key={trophy.id}
              id={`trophy-card-${trophy.id}`}
              onClick={() => toggleTrophy(trophy.id)}
              className="bg-zinc-900 border border-zinc-800 rounded-none p-6 hover:border-white transition-all cursor-pointer flex flex-col justify-between h-full relative overflow-hidden group shadow-2xl"
            >
              {/* Giant background numbers */}
              <div className="absolute right-4 bottom-[-10px] text-8xl font-black text-white/[0.02] group-hover:text-white/[0.04] transition-all font-display select-none">
                {trophy.count}
              </div>

              <div className="space-y-4">
                {/* Header of Trophy */}
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-black border border-zinc-800 rounded-none">
                    {getTrophyIcon(trophy.iconName)}
                  </div>
                  <span className="text-4xl md:text-5xl font-display font-black text-white tracking-tighter leading-none">
                    {trophy.count}
                  </span>
                </div>

                {/* Trophy Name */}
                <div>
                  <h3 className="text-lg md:text-xl font-display font-black text-white uppercase tracking-tighter leading-tight group-hover:opacity-80 transition-all">
                    {trophy.name}
                  </h3>
                  <p className="text-[10px] text-zinc-500 mt-1 uppercase font-mono tracking-wider font-bold">
                    {trophy.count === 1 ? 'Titolo vinto' : 'Titoli vinti'}
                  </p>
                </div>
              </div>

              {/* Expansion Action and List */}
              <div className="mt-6 pt-4 border-t border-zinc-800 flex flex-col space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                  <span>Mostra stagioni di vittoria</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      onClick={(e) => e.stopPropagation()} // Prevent closing card
                      className="overflow-hidden pt-2"
                    >
                      <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
                        {trophy.years.map((year) => (
                          <span
                            key={year}
                            className="bg-black border border-zinc-800 hover:border-white hover:text-white transition-all text-[11px] text-zinc-400 px-2.5 py-1 rounded-none font-mono font-bold"
                          >
                            {year}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend summary banners */}
      <div className="mt-16 bg-zinc-900 border border-zinc-800 rounded-none p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-xl md:text-2xl font-display font-black text-white uppercase tracking-tighter leading-none">Le Tre Stelle d'Oro</h3>
          <p className="text-xs md:text-sm text-zinc-400 max-w-xl font-light leading-relaxed">
            In Italia, l'attribuzione di una stella d'oro sulla maglia è riservata ai club che hanno vinto dieci scudetti. La Juventus è l'unico club italiano che ha ottenuto la <strong>Terza Stella</strong> (30 scudetti), vinta nella stagione 2011/2012.
          </p>
        </div>
        <div className="flex space-x-2 flex-shrink-0">
          <Star className="w-8 h-8 text-white fill-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
          <Star className="w-8 h-8 text-white fill-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
          <Star className="w-8 h-8 text-white fill-white filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
        </div>
      </div>
    </div>
  );
}
