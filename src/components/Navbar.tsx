import React, { useState } from 'react';
import { Menu, X, Star } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [delPieroImgError, setDelPieroImgError] = useState(false);

  const navigation = [
    { id: 'home', label: 'Home & Blog' },
    { id: 'storia', label: 'Storia' },
    { id: 'rosa', label: 'Rosa & Statistiche' },
    { id: 'palmares', label: 'Palmarès' },
    { id: 'forum', label: 'Forum dei Tifosi' },
    { id: 'contatti', label: 'Contatti' },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-200 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleTabClick('home')} 
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            {/* Del Piero Image in Top Left - Circular Legend Badge */}
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-black bg-black flex-shrink-0 shadow-md flex items-center justify-center transition-transform group-hover:scale-105 duration-250" title="Alessandro Del Piero">
              {!delPieroImgError ? (
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/2/23/Alessandro_Del_Piero_2008_Cannes.jpg" 
                  alt="Alessandro Del Piero"
                  className="w-full h-full object-cover object-[center_15%] scale-105"
                  referrerPolicy="no-referrer"
                  onError={() => setDelPieroImgError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-white h-full w-full bg-black">
                  <span className="font-display font-black text-[9px] tracking-tight leading-none text-yellow-500">ADP</span>
                  <span className="font-display font-black text-sm leading-none tracking-tight">10</span>
                </div>
              )}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors"></div>
            </div>

            <div className="relative flex items-center justify-center w-12 h-14 bg-black text-white font-display font-extrabold tracking-tighter text-2xl border border-zinc-950">
              <span className="relative z-10">J</span>
              {/* Bianconero stripes in the background */}
              <div className="absolute top-0 bottom-0 left-1/3 w-[1px] bg-zinc-800"></div>
              <div className="absolute top-0 bottom-0 right-1/3 w-[1px] bg-zinc-800"></div>
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-display font-black text-2xl tracking-tighter text-black uppercase">JUVENTUS</span>
                <span className="text-black flex space-x-0.5">
                  <Star className="w-3 h-3 fill-black stroke-black" />
                  <Star className="w-3 h-3 fill-black stroke-black" />
                  <Star className="w-3 h-3 fill-black stroke-black" />
                </span>
              </div>
              <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase font-bold">FC Fan Club & Blog</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200 relative ${
                  activeTab === item.id 
                    ? 'text-black border-b-2 border-black' 
                    : 'text-zinc-500 hover:text-black hover:opacity-75'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Area Tifosi Button on Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="bg-black text-white px-5 py-2 text-xs font-bold uppercase cursor-pointer hover:bg-zinc-850 transition-colors">
              Area Tifosi
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              id="mobile-menu-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-700 hover:text-black focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Apri menu principale</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
          
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-zinc-200 animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`block w-full text-left px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-zinc-100 text-black border-l-4 border-black pl-3'
                    : 'text-zinc-500 hover:bg-zinc-50 hover:text-black'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="px-4 pt-4 border-t border-zinc-100">
              <div className="bg-black text-white text-center py-2.5 text-xs font-bold uppercase cursor-pointer">
                Area Tifosi
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
