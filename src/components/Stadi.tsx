import React, { useState } from 'react';
import { MapPin, Users, Calendar, Trophy, Star, ShieldCheck } from 'lucide-react';

interface Stadium {
  id: string;
  name: string;
  years: string;
  capacity: string;
  location: string;
  description: string;
  memorableMatch: {
    match: string;
    date: string;
    details: string;
  };
  facts: string[];
  ratings: {
    history: number;
    capacity: number;
    atmosphere: number;
  };
}

export default function StadiComponent() {
  const [selectedStadium, setSelectedStadium] = useState<string>('allianz');

  const stadiums: Stadium[] = [
    {
      id: 'allianz',
      name: 'Allianz Stadium (Juventus Stadium)',
      years: '2011 - Presente',
      capacity: '41.507 posti',
      location: 'Corso Gaetano Scirea, Torino',
      description: 'Il primo stadio di proprietà di un club calcistico in Italia, inaugurato l\'8 settembre 2011. Senza barriere e con gli spalti a pochissimi metri dal campo, è stato concepito per offrire un\'atmosfera caldissima e una visibilità perfetta. È stato il fortino inespugnabile dei 9 scudetti consecutivi, testimone di una delle ere più vincenti di sempre.',
      memorableMatch: {
        match: 'Juventus 2-0 Milan',
        date: '2 Ottobre 2011',
        details: 'La prima grande vittoria nel nuovo stadio. Una doppietta memorabile di Claudio Marchisio nel finale certifica lo "Stadium effect" e segna l\'inizio dell\'egemonia juventina.',
      },
      facts: [
        'Costruito sulle ceneri del vecchio Stadio delle Alpi, riciclando gran parte dei materiali di demolizione.',
        'La galleria dei campioni circostante celebra le 50 leggende bianconere scelte dai tifosi.',
        'Ha ospitato la finale di UEFA Europa League nel 2014 e le Finali di Nations League nel 2021.'
      ],
      ratings: {
        history: 4,
        capacity: 4,
        atmosphere: 5,
      }
    },
    {
      id: 'olimpico',
      name: 'Stadio Comunale / Olimpico',
      years: '1933 - 1990, 2006 - 2011',
      capacity: '28.140 posti',
      location: 'Santa Rita, Torino',
      description: 'Nato come Stadio Municipale Benito Mussolini, divenne il mitico "Comunale". Fu il tempio della leggendaria Juve del "Quinquennio d\'oro" negli anni \'30 e poi di quella di Platini, Scirea e Boniperti negli anni \'70 e \'80. Ristrutturato per le Olimpiadi Invernali del 2006, ha ospitato la Juventus durante gli anni post-Calciopoli e la fantastica cavalcata della rinascita.',
      memorableMatch: {
        match: 'Juventus 1-0 Argentinos Juniors',
        date: '1985 (Festeggiamenti Coppa Intercontinentale)',
        details: 'Il Comunale ospita il rientro trionfale della Juventus di Platini dopo la leggendaria vittoria di Tokyo, salutata da una marea di tifosi festanti.',
      },
      facts: [
        'Sotto la sua tribuna nacque la sede storica del club negli anni gloriosi.',
        'Ha assistito all\'intera epopea di Gaetano Scirea e alle giocate divine di Michel Platini.',
        'È stato condiviso storicamente con il Torino FC, dando vita a indimenticabili Derby della Mole.'
      ],
      ratings: {
        history: 5,
        capacity: 3,
        atmosphere: 4,
      }
    },
    {
      id: 'dellealpi',
      name: 'Stadio delle Alpi',
      years: '1990 - 2006',
      capacity: '69.041 posti',
      location: 'Vallette, Torino',
      description: 'Costruito per i Mondiali di Italia \'90, era un impianto mastodontico ma freddo, caratterizzato dalla presenza di una pista di atletica che allontanava gli spettatori dal terreno di gioco. Nonostante lo scarso feeling dei tifosi con la struttura, sul suo campo la Juve di Lippi, Del Piero, Zidane e Nedved ha scritto pagine epiche, vincendo svariati Scudetti e raggiungendo 4 finali di Champions League.',
      memorableMatch: {
        match: 'Juventus 3-1 Real Madrid',
        date: '14 Maggio 2003',
        details: 'Forse la partita perfetta della Juve moderna. Gol di Trezeguet, Del Piero e un Nedved monumentale (con annesso rigore parato da Buffon a Figo) per ribaltare il Real dei Galacticos e volare in finale di Champions.',
      },
      facts: [
        'Famoso per i suoi problemi di visibilità a causa della pista e della nebbia frequente in quella zona.',
        'È lo stadio in cui Alessandro Del Piero ha segnato la stragrande maggioranza dei suoi gol leggendari.',
        'Demolito nel 2009 per far spazio al modernissimo Allianz Stadium.'
      ],
      ratings: {
        history: 4,
        capacity: 5,
        atmosphere: 3,
      }
    },
    {
      id: 'marsiglia',
      name: 'Campo di Corso Marsiglia',
      years: '1922 - 1933',
      capacity: '15.000 posti',
      location: 'Corso Marsiglia, Torino',
      description: 'Il primo vero impianto moderno della Juventus, nonchè il primo stadio in Italia costruito interamente in cemento armato e dotato di illuminazione artificiale. Fu acquistato grazie all\'ingresso in società della famiglia Agnelli con Edoardo Agnelli presidente. Fu la casa del primo grande ciclo di vittorie nazionali che diede inizio alla leggenda.',
      memorableMatch: {
        match: 'Juventus 3-0 Genoa',
        date: '1926',
        details: 'Vittoria chiave per conquistare il secondo storico scudetto della storia juventina, mandando in estasi i primi pionieri del tifo bianconero.',
      },
      facts: [
        'Primo stadio italiano dotato di una tribuna coperta completa in cemento armato.',
        'Qui la Juve vinse i primi tre scudetti del leggendario Quinquennio d\'Oro (1931, 1932, 1933).',
        'Abbandonato nel 1933 con il trasferimento al più capiente Stadio Comunale.'
      ],
      ratings: {
        history: 5,
        capacity: 2,
        atmosphere: 4,
      }
    }
  ];

  const current = stadiums.find(s => s.id === selectedStadium) || stadiums[0];

  return (
    <div className="bg-black text-white min-h-screen py-10 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white mb-4">
          I Templi <span className="text-stroke-white text-zinc-500">Bianconeri</span>
        </h1>
        <div className="w-16 h-1 bg-white mx-auto mb-4"></div>
        <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest font-bold">
          Dalle origini di Corso Marsiglia all'Allianz Stadium di proprietà. Esplora i luoghi dove si è fatta la storia.
        </p>
      </div>

      {/* Grid Layout: Sidebar List and Stadium Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Sidebar Navigation */}
        <div className="space-y-3">
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-2 font-bold">Seleziona uno Stadio</span>
          {stadiums.map((stadium) => (
            <button
              key={stadium.id}
              onClick={() => setSelectedStadium(stadium.id)}
              className={`w-full text-left p-4 border transition-all flex justify-between items-center rounded-none group ${
                selectedStadium === stadium.id
                  ? 'bg-white text-black border-white shadow-2xl scale-[1.01]'
                  : 'bg-zinc-950 text-zinc-400 border-zinc-900 hover:border-zinc-700 hover:text-white'
              }`}
            >
              <div>
                <h3 className="font-display font-black text-sm uppercase tracking-tight">{stadium.name}</h3>
                <span className={`font-mono text-[10px] mt-1 block ${selectedStadium === stadium.id ? 'text-zinc-600' : 'text-zinc-500'}`}>
                  {stadium.years}
                </span>
              </div>
              <MapPin className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${selectedStadium === stadium.id ? 'text-black' : 'text-zinc-600'}`} />
            </button>
          ))}

          {/* Golden Fact Banner */}
          <div className="border border-zinc-800 bg-zinc-950 p-5 mt-6 font-mono text-[11px] text-zinc-400 space-y-2">
            <span className="text-yellow-500 font-extrabold uppercase tracking-wider block">💡 RECORD DI INCASSI</span>
            <p className="leading-relaxed">
              Lo Juventus Stadium detiene il record di imbattibilità casalinga in Serie A con ben <strong>57 partite consecutive</strong> senza sconfitte tra il 2015 e il 2017.
            </p>
          </div>
        </div>

        {/* Detail View */}
        <div className="lg:col-span-2 bg-zinc-950 border border-zinc-850 p-6 md:p-8 space-y-8 shadow-2xl animate-in fade-in duration-300">
          
          {/* Main Title Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-850 pb-5">
            <div>
              <span className="bg-white text-black font-mono font-bold text-[10px] uppercase tracking-widest px-2.5 py-0.5 mb-2 inline-block">
                {current.years}
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-black uppercase tracking-tight text-white">
                {current.name}
              </h2>
            </div>
            
            {/* Quick Specs */}
            <div className="flex flex-wrap gap-4 text-xs font-mono uppercase">
              <div className="flex items-center gap-1.5 bg-black px-3 py-2 border border-zinc-900">
                <Users className="w-4 h-4 text-zinc-500" />
                <div>
                  <span className="text-zinc-500 block text-[8px] leading-none">Capienza</span>
                  <span className="text-white font-bold">{current.capacity}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 bg-black px-3 py-2 border border-zinc-900">
                <MapPin className="w-4 h-4 text-zinc-500" />
                <div>
                  <span className="text-zinc-500 block text-[8px] leading-none">Posizione</span>
                  <span className="text-white font-bold">{current.location.split(',')[0]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h4 className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-black">La Storia dell'Impianto</h4>
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
              {current.description}
            </p>
          </div>

          {/* Ratings meters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-black border border-zinc-900 p-4">
            <div>
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block mb-1">Fattore Storico</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < current.ratings.history ? 'text-yellow-500 fill-yellow-500' : 'text-zinc-800'}`} />
                ))}
              </div>
            </div>
            <div>
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block mb-1">Capacità Impianto</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < current.ratings.capacity ? 'text-yellow-500 fill-yellow-500' : 'text-zinc-800'}`} />
                ))}
              </div>
            </div>
            <div>
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider block mb-1">Calore / Atmosfera</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-3.5 h-3.5 ${i < current.ratings.atmosphere ? 'text-yellow-500 fill-yellow-500' : 'text-zinc-800'}`} />
                ))}
              </div>
            </div>
          </div>

          {/* Memorable Match Box */}
          <div className="border border-zinc-850 bg-black p-5 relative overflow-hidden group">
            <div className="absolute right-3 bottom-3 text-zinc-900/40 pointer-events-none font-display font-black text-6xl">
              ⚽
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="font-mono text-[10px] text-yellow-500 uppercase tracking-widest font-black">Partita Memorabile</span>
            </div>
            <h4 className="text-base md:text-lg font-display font-bold text-white uppercase tracking-tight">
              {current.memorableMatch.match}
            </h4>
            <span className="text-zinc-500 text-[10px] font-mono block mt-1">{current.memorableMatch.date}</span>
            <p className="text-zinc-400 text-xs md:text-sm mt-2 leading-relaxed">
              {current.memorableMatch.details}
            </p>
          </div>

          {/* Quick Facts List */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest font-black">Aneddoti & Curiosità</h4>
            <ul className="space-y-2.5">
              {current.facts.map((fact, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-zinc-400">
                  <ShieldCheck className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{fact}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
