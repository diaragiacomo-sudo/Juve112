import React, { useState } from 'react';
import { motion } from 'motion/react';
import { historyMilestones } from '../data';
import { Calendar, ChevronRight, History } from 'lucide-react';

export default function HistoryComponent() {
  const [selectedMilestone, setSelectedMilestone] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase bg-white text-black w-fit px-2.5 py-1 mb-4 tracking-widest inline-block">
          La Nostra Eredità
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter text-white uppercase leading-none">
          La Storia <span className="text-stroke-white text-zinc-500">Bianconera</span>
        </h1>
        <p className="mt-4 text-xs md:text-sm text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
          Da una panchina di Torino al tetto del mondo. Oltre un secolo di emozioni, campioni, trionfi e uno stile inimitabile.
        </p>
      </div>

      {/* Featured Interactive Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 bg-zinc-900 border border-zinc-800 rounded-none p-6 md:p-8 relative overflow-hidden">
        {/* Subtle decorative grid in background */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* Year Selectors List */}
        <div className="lg:col-span-4 flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 space-x-2 lg:space-x-0 lg:space-y-2 border-b lg:border-b-0 lg:border-r border-zinc-800 pr-0 lg:pr-6 scrollbar-none">
          {historyMilestones.map((milestone, idx) => (
            <button
              key={milestone.year}
              id={`milestone-btn-${milestone.year}`}
              onClick={() => setSelectedMilestone(idx)}
              className={`flex-shrink-0 lg:flex-shrink flex items-center justify-between px-4 py-3 rounded-none text-left transition-all ${
                selectedMilestone === idx
                  ? 'bg-white text-black font-bold uppercase'
                  : 'text-zinc-400 hover:text-white hover:bg-black border border-zinc-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Calendar className={`w-4 h-4 ${selectedMilestone === idx ? 'text-black' : 'text-zinc-500'}`} />
                <span className="font-display text-lg font-black">{milestone.year}</span>
              </div>
              <ChevronRight className={`w-4 h-4 hidden lg:block ${selectedMilestone === idx ? 'text-black opacity-100' : 'opacity-0'}`} />
            </button>
          ))}
        </div>

        {/* Milestone Detail Card */}
        <div className="lg:col-span-8 flex flex-col justify-center py-4 lg:pl-6">
          <motion.div
            key={selectedMilestone}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <span className="font-display text-7xl md:text-8xl font-black text-stroke-white opacity-20 select-none block leading-none">
              {historyMilestones[selectedMilestone].year}
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tighter leading-none">
              {historyMilestones[selectedMilestone].title}
            </h3>
            <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-light">
              {historyMilestones[selectedMilestone].description}
            </p>
            <div className="pt-4 flex items-center space-x-4 border-t border-zinc-800">
              <span className="text-[10px] text-white font-mono uppercase tracking-widest font-bold">Fino Alla Fine</span>
              <div className="h-[2px] w-12 bg-white"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative vertical timeline grid for all milestones */}
      <h3 className="text-center font-display font-black text-lg text-white mb-12 uppercase tracking-widest border-b border-zinc-900 pb-4">
        Cronologia Completa dei Trionfi
      </h3>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="relative border-l-2 border-zinc-855 ml-4 md:ml-32 space-y-12 pb-12"
      >
        {historyMilestones.map((milestone, idx) => (
          <motion.div 
            key={idx}
            variants={itemVariants}
            className="relative pl-6 md:pl-12"
          >
            {/* Timeline node */}
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-none bg-black border-2 border-white z-10"></div>
            
            {/* Year tag left aligned on desktop */}
            <div className="md:absolute md:-left-32 md:top-0 w-24 text-left md:text-right font-display text-2xl font-black text-white">
              {milestone.year}
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-none p-6 hover:border-white transition-all duration-300 shadow-2xl">
              <h4 className="text-lg font-display font-black text-white uppercase mb-2 leading-none">
                {milestone.title}
              </h4>
              <p className="text-zinc-400 text-xs leading-relaxed font-light">
                {milestone.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
