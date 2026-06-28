import React, { useState } from 'react';
import Navbar from './components/Navbar';
import BlogComponent from './components/Blog';
import HistoryComponent from './components/History';
import SquadComponent from './components/Squad';
import PalmaresComponent from './components/Palmares';
import ForumComponent from './components/Forum';
import ContactsComponent from './components/Contacts';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Shield, Trophy, Heart } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');

  const renderActiveSection = () => {
    switch (activeTab) {
      case 'home':
        return <BlogComponent />;
      case 'storia':
        return <HistoryComponent />;
      case 'rosa':
        return <SquadComponent />;
      case 'palmares':
        return <PalmaresComponent />;
      case 'forum':
        return <ForumComponent />;
      case 'contatti':
        return <ContactsComponent />;
      default:
        return <BlogComponent />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 flex flex-col justify-between selection:bg-white selection:text-black">
      
      {/* Brand Top Announcement Bar */}
      <div className="bg-[#ffffff] text-[#000000] py-2 text-center text-[11px] font-mono font-bold uppercase tracking-widest flex items-center justify-center space-x-2 select-none border-b border-zinc-200">
        <span>Fino Alla Fine</span>
        <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></span>
        <span>Sito Ufficiale dei Tifosi Juventus FC</span>
      </div>

      {/* Main Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Hero Banner Section (Only on Home/Blog tab to focus and beautify the user landing) */}
      {activeTab === 'home' && (
        <div className="relative bg-black h-[350px] md:h-[420px] flex items-center justify-center overflow-hidden border-b border-zinc-900">
          {/* Background decorative stripes representing Juventus classic kit */}
          <div className="absolute inset-0 flex">
            <div className="w-1/12 bg-[#000000] border-r border-zinc-900/40"></div>
            <div className="w-1/12 bg-[#0c0c0c] border-r border-zinc-900/40"></div>
            <div className="w-1/12 bg-[#000000] border-r border-zinc-900/40"></div>
            <div className="w-1/12 bg-[#0c0c0c] border-r border-zinc-900/40"></div>
            <div className="w-1/12 bg-[#000000] border-r border-zinc-900/40"></div>
            <div className="w-1/12 bg-[#0c0c0c] border-r border-zinc-900/40"></div>
            <div className="w-1/12 bg-[#000000] border-r border-zinc-900/40"></div>
            <div className="w-1/12 bg-[#0c0c0c] border-r border-zinc-900/40"></div>
            <div className="w-1/12 bg-[#000000] border-r border-zinc-900/40"></div>
            <div className="w-1/12 bg-[#0c0c0c] border-r border-zinc-900/40"></div>
            <div className="w-1/12 bg-[#000000] border-r border-zinc-900/40"></div>
            <div className="w-1/12 bg-[#0c0c0c]"></div>
          </div>

          {/* Diagonal light effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black opacity-90"></div>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent"></div>

          {/* Content Box */}
          <div className="relative z-10 text-center px-4 max-w-4xl flex flex-col items-center">
            {/* The Three Gold Stars representing Juve's 30+ official titles (and we celebrate 38!) */}
            <div className="flex justify-center space-x-1.5 mb-4">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 filter drop-shadow-[0_0_6px_rgba(234,179,8,0.6)] animate-pulse" />
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 filter drop-shadow-[0_0_6px_rgba(234,179,8,0.6)] animate-pulse" />
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 filter drop-shadow-[0_0_6px_rgba(234,179,8,0.6)] animate-pulse" />
            </div>

            {/* ITALIAN SCUDETTO 38 SHIELD BADGE */}
            <div className="w-20 h-24 md:w-24 md:h-28 relative mb-6 rounded-b-[48px] rounded-t-[8px] overflow-hidden border-2 border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.25)] flex select-none group hover:scale-105 transition-transform duration-300">
              {/* Green Left stripe */}
              <div className="w-1/3 h-full bg-[#008C45]"></div>
              {/* White Middle stripe */}
              <div className="w-1/3 h-full bg-[#FFFFFF]"></div>
              {/* Red Right stripe */}
              <div className="w-1/3 h-full bg-[#CD212A]"></div>
              
              {/* Absolute golden number 38 centered beautifully inside the shield */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/5">
                <span className="font-display font-black text-4xl md:text-5xl tracking-tighter text-black drop-shadow-[0_2px_1px_rgba(255,255,255,0.95)] leading-none select-none">
                  38
                </span>
                <span className="text-[7px] md:text-[8px] font-mono tracking-widest font-extrabold uppercase text-black mt-1 leading-none">
                  SUL CAMPO
                </span>
              </div>
            </div>

            {/* Boniperti's Motto */}
            <h2 className="text-xl md:text-3xl font-display font-black tracking-tight text-white uppercase max-w-2xl leading-snug drop-shadow-md">
              "Vincere non è importante,<br />è l'unica cosa che conta"
            </h2>
            
            {/* Legend author info */}
            <p className="mt-3 text-[10px] md:text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
              — Giampiero Boniperti
            </p>
          </div>
        </div>
      )}

      {/* Main Interactive Stage with Page Transitions */}
      <main className="flex-grow bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {renderActiveSection()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Premium Elegant Footer */}
      <footer className="bg-black border-t border-zinc-900 py-12 mt-16 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-zinc-900">
            
            {/* Column 1: Info & Motto */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-11 bg-white text-black font-display font-extrabold flex items-center justify-center text-xl">
                  J
                </div>
                <span className="font-display font-bold text-lg text-white tracking-wider">JUVENTUS FC FAN PORTAL</span>
              </div>
              <p className="text-zinc-500 font-light max-w-sm text-xs leading-relaxed">
                Questo portale è una piattaforma interattiva creata dai tifosi e dedicata a tutti gli appassionati bianconeri nel mondo. Non affiliato ufficialmente con Juventus Football Club S.p.A.
              </p>
            </div>

            {/* Column 2: Quick navigation */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest">Pagine</h4>
              <ul className="space-y-2 text-xs text-zinc-400 font-light">
                <li><button onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-all">Blog & News</button></li>
                <li><button onClick={() => { setActiveTab('storia'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-all">Storia Club</button></li>
                <li><button onClick={() => { setActiveTab('rosa'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-all">Rosa & Statistiche</button></li>
                <li><button onClick={() => { setActiveTab('palmares'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-all">Palmarès</button></li>
              </ul>
            </div>

            {/* Column 3: Interact */}
            <div className="space-y-3">
              <h4 className="font-display font-bold text-white text-xs uppercase tracking-widest">Community</h4>
              <ul className="space-y-2 text-xs text-zinc-400 font-light">
                <li><button onClick={() => { setActiveTab('forum'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-all">Forum Discussione</button></li>
                <li><button onClick={() => { setActiveTab('contatti'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-all">Contatti & Supporto</button></li>
              </ul>
            </div>

          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-600 font-mono">
            <div>
              &copy; {new Date().getFullYear()} JUVENTUS FAN PORTAL. Realizzato in Italia. All Rights Reserved.
            </div>
            <div className="flex items-center space-x-1">
              <span>Sviluppato con passione per i colori bianconeri</span>
              <Heart className="w-3 h-3 text-red-600 fill-red-600 inline" />
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
