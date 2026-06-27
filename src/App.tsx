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

      {/* Hero Banner Section */}
      <div className="relative bg-black h-[280px] md:h-[400px] flex items-center justify-center overflow-hidden border-b border-zinc-900">
        {/* Background decorative stripes representing Juventus classic kit */}
        <div className="absolute inset-0 flex">
          <div className="w-1/12 bg-[#000000] border-r border-zinc-900"></div>
          <div className="w-1/12 bg-[#0c0c0c] border-r border-zinc-900"></div>
          <div className="w-1/12 bg-[#000000] border-r border-zinc-900"></div>
          <div className="w-1/12 bg-[#0c0c0c] border-r border-zinc-900"></div>
          <div className="w-1/12 bg-[#000000] border-r border-zinc-900"></div>
          <div className="w-1/12 bg-[#0c0c0c] border-r border-zinc-900"></div>
          <div className="w-1/12 bg-[#000000] border-r border-zinc-900"></div>
          <div className="w-1/12 bg-[#0c0c0c] border-r border-zinc-900"></div>
          <div className="w-1/12 bg-[#000000] border-r border-zinc-900"></div>
          <div className="w-1/12 bg-[#0c0c0c] border-r border-zinc-900"></div>
          <div className="w-1/12 bg-[#000000] border-r border-zinc-900"></div>
          <div className="w-1/12 bg-[#0c0c0c]"></div>
        </div>

        {/* Diagonal light effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black opacity-90"></div>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent"></div>

        {/* Content Box */}
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <div className="flex justify-center space-x-1 mb-3">
            <Star className="w-5 h-5 text-white fill-white filter drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]" />
            <Star className="w-5 h-5 text-white fill-white filter drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]" />
            <Star className="w-5 h-5 text-white fill-white filter drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]" />
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black tracking-tight text-white uppercase select-none leading-none">
            JUVE <span className="text-stroke-white text-zinc-500">FAN PORTAL</span>
          </h1>
          <p className="mt-3 text-xs md:text-sm font-mono uppercase tracking-widest text-zinc-300 max-w-lg mx-auto font-bold">
            La passione non ha fine. Esplora le statistiche dei campioni, partecipa al forum e scrivi i tuoi pensieri sul blog.
          </p>
        </div>
      </div>

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
