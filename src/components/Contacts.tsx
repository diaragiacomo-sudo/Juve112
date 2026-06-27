import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactsComponent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Generale');
  const [message, setMessage] = useState('');
  const [isMember, setIsMember] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Si prega di completare tutti i campi obbligatori.');
      return;
    }

    // Email format validation
    if (!email.includes('@')) {
      setError('Fornisci un indirizzo email valido.');
      return;
    }

    // Success flow
    setError('');
    setFormSubmitted(true);
    
    // Reset forms
    setName('');
    setEmail('');
    setSubject('Generale');
    setMessage('');
    setIsMember(false);

    // Auto close success panel after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase bg-white text-black w-fit px-2.5 py-1 mb-4 tracking-widest inline-block">
          Hub Comunicazioni
        </span>
        <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter text-white uppercase leading-none">
          Contatta il <span className="text-stroke-white text-zinc-500">Club</span>
        </h1>
        <p className="mt-4 text-xs md:text-sm text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
          Hai domande sull'iscrizione al Fan Club, vuoi collaborare al blog o richiedere informazioni? Compila il modulo sottostante per metterti in contatto con noi.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Info cards */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-xl font-display font-black text-white uppercase tracking-widest border-b border-zinc-900 pb-3 mb-4">
            Contatti Diretti
          </h3>

          <div className="space-y-4">
            {/* Address */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-none p-5 flex items-start space-x-4 shadow-2xl">
              <div className="p-3 bg-black border border-zinc-800 rounded-none text-white">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">Sede & Stadio</h4>
                <p className="text-white font-bold mt-1 text-sm uppercase tracking-wider">Allianz Stadium</p>
                <p className="text-xs text-zinc-500 mt-1">Corso Gaetano Scirea, 50 - 10151 Torino, Italia</p>
              </div>
            </div>

            {/* Support Line */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-none p-5 flex items-start space-x-4 shadow-2xl">
              <div className="p-3 bg-black border border-zinc-800 rounded-none text-white">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">Servizio Tifosi</h4>
                <p className="text-white font-bold mt-1 text-sm uppercase tracking-wider">+39 011 45 30 487</p>
                <p className="text-xs text-zinc-500 mt-1">Disponibile lun-ven dalle 9:00 alle 18:00</p>
              </div>
            </div>

            {/* Email Support */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-none p-5 flex items-start space-x-4 shadow-2xl">
              <div className="p-3 bg-black border border-zinc-800 rounded-none text-white">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">Scrivici un'Email</h4>
                <p className="text-white font-bold mt-1 text-sm">supporto@juvefanclub-roma.it</p>
                <p className="text-xs text-zinc-500 mt-1 font-light">Risposta garantita entro 24 ore lavorative.</p>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-none p-5 flex items-start space-x-4 shadow-2xl">
              <div className="p-3 bg-black border border-zinc-800 rounded-none text-white">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider font-bold">Orari di Apertura Club</h4>
                <p className="text-white font-bold mt-1 text-sm uppercase tracking-wider font-bold">Lunedì - Sabato</p>
                <p className="text-xs text-zinc-500 mt-1 font-light">9:30 - 13:00 / 15:00 - 19:30 (Chiuso nei festivi)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Form */}
        <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 rounded-none p-6 md:p-8 shadow-2xl">
          <h3 className="text-xl font-display font-black text-white uppercase tracking-widest border-b border-zinc-950 pb-3 mb-6">
            Invia un Messaggio
          </h3>

          <AnimatePresence>
            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-black border border-zinc-800 rounded-none p-6 text-center space-y-4 shadow-2xl"
              >
                <div className="w-12 h-12 bg-white/10 rounded-none border border-white flex items-center justify-center text-white mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-display font-black text-white uppercase tracking-tighter">Grazie per averci contattato!</h4>
                  <p className="text-xs text-zinc-400 mt-2 max-w-md mx-auto">
                    Il tuo messaggio è stato ricevuto correttamente. Un responsabile del nostro Juventus Fan Club si metterà in contatto con te al più presto.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3.5 rounded-none flex items-center space-x-2 font-mono uppercase tracking-wider font-bold">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] text-zinc-400 font-mono uppercase mb-2 font-bold tracking-wider">Nome Completo *</label>
                    <input
                      id="contact-name-input"
                      type="text"
                      placeholder="Es: Giacomo Diara..."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-none px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-white text-xs uppercase tracking-wider"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-zinc-400 font-mono uppercase mb-2 font-bold tracking-wider">Indirizzo Email *</label>
                    <input
                      id="contact-email-input"
                      type="email"
                      placeholder="Es: giacomo@esempio.it..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-none px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-white text-xs uppercase tracking-wider"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-400 font-mono uppercase mb-2 font-bold tracking-wider">Oggetto della Richiesta</label>
                  <select
                    id="contact-subject-select"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-none px-4 py-3 text-white focus:outline-none focus:border-white text-xs uppercase tracking-wider font-bold"
                  >
                    <option value="Generale">Informazioni Generali</option>
                    <option value="Tesseramento">Tesseramento Fan Club</option>
                    <option value="Blog">Collaborazione Blog / Articoli</option>
                    <option value="Biglietti">Richiesta Biglietti & Trasferte</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] text-zinc-400 font-mono uppercase mb-2 font-bold tracking-wider">Il tuo Messaggio *</label>
                  <textarea
                    id="contact-message-input"
                    rows={5}
                    placeholder="Scrivi qui dettagliatamente la tua richiesta..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-none px-4 py-3 text-white placeholder-zinc-700 focus:outline-none focus:border-white text-xs"
                  />
                </div>

                {/* Switch checkbox toggle */}
                <div className="flex items-center space-x-3 bg-black border border-zinc-800 rounded-none p-4 cursor-pointer select-none" onClick={() => setIsMember(!isMember)}>
                  <div className="flex items-center h-5">
                    <input
                      id="is-member-checkbox"
                      type="checkbox"
                      checked={isMember}
                      onChange={() => {}} // Controlled by wrapper div
                      className="h-4 w-4 rounded-none border-zinc-800 text-white focus:ring-white bg-black cursor-pointer"
                    />
                  </div>
                  <div className="text-[10px] md:text-xs uppercase tracking-wider">
                    <label className="font-bold text-white cursor-pointer">Sono già un socio iscritto</label>
                    <p className="text-zinc-500 mt-0.5 font-light normal-case">Spunta la casella per ricevere supporto prioritario dal nostro staff.</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    id="submit-contact-btn"
                    type="submit"
                    className="w-full md:w-auto inline-flex items-center justify-center space-x-2 bg-white text-black font-bold uppercase tracking-widest px-6 py-3.5 rounded-none hover:bg-zinc-250 transition-all cursor-pointer text-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>Invia Messaggio</span>
                  </button>
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
