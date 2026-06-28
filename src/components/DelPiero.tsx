import React, { useState } from 'react';
import { Star, Trophy, Award, BookOpen, Quote, Sparkles, Check, X, ShieldAlert } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export default function DelPieroComponent() {
  const [activeTab, setActiveTab] = useState<'storia' | 'momenti' | 'quiz' | 'statistiche'>('storia');
  
  // Quiz State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const stats = [
    { label: 'Presenze Totali', value: '705', desc: 'Record assoluto nella storia della Juventus' },
    { label: 'Gol Segnati', value: '290', desc: 'Miglior marcatore di tutti i tempi del club' },
    { label: 'Anni di Capitanato', value: '11', desc: 'Il capitano più longevo della Juventus' },
    { label: 'Stagioni in Bianconero', value: '19', desc: 'Dal 1993 al 2012 con fedeltà assoluta' },
    { label: 'Gol in Champions League', value: '44', desc: 'Miglior bomber bianconero in Europa' },
    { label: 'Gol su Punizione', value: '42', desc: 'Specialista letale da fermo' },
  ];

  const trophies = [
    { name: 'Scudetti', count: 6, note: 'Più 2 revocati sul campo (2004-05, 2005-06)' },
    { name: 'UEFA Champions League', count: 1, note: 'Vinta a Roma nel 1996 contro l\'Ajax' },
    { name: 'Coppa Intercontinentale', count: 1, note: 'Decisivo con gol a Tokyo nel 1996' },
    { name: 'Supercoppa UEFA', count: 1, note: 'Vinta nel 1996' },
    { name: 'Coppa Italia', count: 1, note: 'Stagione 1994-1995' },
    { name: 'Supercoppa Italiana', count: 4, note: '1995, 1997, 2002, 2003' },
    { name: 'Campionato Mondiale (Italia)', count: 1, note: 'Trionfo a Berlino nel 2006' },
  ];

  const milestones = [
    {
      year: '1993',
      title: 'Il Debutto e la Tripletta',
      desc: 'Arrivato dal Padova, esordisce il 12 settembre contro il Foggia. Pochi giorni dopo, contro la Reggiana, segna il suo primo gol in bianconero, seguito da una tripletta storica contro il Parma alla sua prima da titolare.',
    },
    {
      year: '1995',
      title: 'La Consacrazione e il Gol alla "Del Piero"',
      desc: 'Con l\'addio di Roberto Baggio, Del Piero indossa la maglia numero 10. Diventa celebre il gol "alla Del Piero" con un tiro a parabola ad effetto dal vertice sinistro dell\'area di rigore, che si insacca nell\'incrocio dei pali opposto.',
    },
    {
      year: '1996',
      title: 'Campione d\'Europa e del Mondo',
      desc: 'Trascina la Juve alla conquista della Champions League segnando gol spettacolari in tutta la competizione. A novembre dello stesso anno segna il gol decisivo a Tokyo contro il River Plate laureando la Juve Campione del Mondo.',
    },
    {
      year: '1998',
      title: 'L\'Infortunio di Udine',
      desc: 'L\'8 novembre 1998 subisce un gravissimo infortunio al legamento crociato del ginocchio sinistro a Udine. Rimane fermo per 9 mesi. Al suo rientro, con forza d\'animo esemplare, reinventa il suo stile di gioco diventando un leader ancora più completo.',
    },
    {
      year: '2006',
      title: 'La Fedeltà in Serie B & Campione del Mondo',
      desc: 'Nell\'estate 2006 vince il Mondiale in Germania segnando lo storico gol del 2-0 nella semifinale contro la Germania. Nonostante la retrocessione d\'ufficio della Juve in Serie B, pronuncia la frase leggendaria: "Un cavaliere non lascia mai una signora", restando per guidare la rinascita.',
    },
    {
      year: '2008',
      title: 'Standing Ovation al Santiago Bernabéu',
      desc: 'Il 5 novembre 2008, dopo aver segnato una doppietta memorabile a Madrid contro il Real in Champions League, l\'intero stadio Santiago Bernabéu gli tributa una straordinaria standing ovation mentre esce dal campo.',
    },
    {
      year: '2012',
      title: 'L\'Ultimo Scudetto e l\'Addio Commovente',
      desc: 'Trascina la Juve all\'invincibile scudetto del 2012 segnando gol cruciali (punizione contro la Lazio). Il 13 maggio 2012 gioca la sua ultima partita allo Stadium contro l\'Atalanta. Il suo giro di campo dura oltre 20 minuti, con l\'intero stadio in lacrime ad applaudire il capitano di sempre.',
    },
  ];

  const quizQuestions: QuizQuestion[] = [
    {
      question: "In che anno Alessandro Del Piero ha debuttato con la maglia della Juventus?",
      options: ["1991", "1993", "1995", "1996"],
      correctAnswer: 1,
      explanation: "Del Piero ha debuttato in prima squadra il 12 settembre 1993, subentrando a Pietro Anastasi contro il Foggia.",
    },
    {
      question: "Quale celebre avversario ha battuto la Juventus a Tokyo nella finale della Coppa Intercontinentale 1996 grazie al gol di Del Piero?",
      options: ["Boca Juniors", "River Plate", "Santos", "São Paulo"],
      correctAnswer: 1,
      explanation: "La Juventus batté il River Plate di Enzo Francescoli per 1-0 a Tokyo il 26 novembre 1996 con un gol capolavoro di Del Piero al minuto 81.",
    },
    {
      question: "Qual è la famosa frase detta da Del Piero per spiegare la sua decisione di rimanere alla Juve anche in Serie B nel 2006?",
      options: [
        "\"La Juve è la mia vita e non la cambierei con nessun club\"",
        "\"Un cavaliere non lascia mai una signora\"",
        "\"Siamo andati all'inferno insieme, torneremo in paradiso\"",
        "\"La maglia bianconera è la mia seconda pelle\""
      ],
      correctAnswer: 1,
      explanation: "La frase storica fu 'Un cavaliere non lascia mai una signora', riferendosi alla Vecchia Signora scesa in Serie B.",
    },
    {
      question: "Contro quale squadra Del Piero ha giocato la sua ultima partita ufficiale allo Juventus Stadium il 13 maggio 2012?",
      options: ["Atalanta", "Lazio", "Milan", "Inter"],
      correctAnswer: 0,
      explanation: "Giocò la sua ultima partita di campionato contro l'Atalanta (vinta 3-1), dove segnò anche il suo ultimo gol con un destro preciso dal limite dell'area.",
    },
  ];

  const handleAnswerSelect = (index: number) => {
    if (showAnswer) return;
    setSelectedAnswer(index);
    setShowAnswer(true);
    if (index === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowAnswer(false);
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <div className="bg-black text-white min-h-screen py-10 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Pinturicchio Header Section */}
      <div className="border border-zinc-800 bg-zinc-950 p-6 md:p-12 mb-10 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
        {/* Decorative Golden Star badge */}
        <div className="absolute right-4 top-4 text-zinc-900 font-display font-black text-8xl pointer-events-none opacity-20">
          10
        </div>
        
        {/* Image Display */}
        <div className="w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-yellow-500 bg-zinc-900 shadow-2xl flex-shrink-0 relative group">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/25th_Laureus_World_Sports_Awards_-_Alessandro_Del_Piero_-_240421_155220_%28cropped%29.jpg/800px-25th_Laureus_World_Sports_Awards_-_Alessandro_Del_Piero_-_240421_155220_%28cropped%29.jpg" 
            alt="Alessandro Del Piero" 
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-3">
            <span className="bg-yellow-500 text-black font-mono font-bold text-[10px] uppercase tracking-widest px-2.5 py-0.5">Il Capitano</span>
          </div>
        </div>

        {/* Short Text */}
        <div className="flex-grow space-y-4 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2 justify-center md:justify-start">
            <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white leading-none">
              Alessandro <span className="text-yellow-500">Del Piero</span>
            </h1>
            <div className="flex items-center justify-center space-x-1">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            </div>
          </div>
          <p className="font-mono text-zinc-400 text-xs md:text-sm uppercase tracking-wider font-bold">
            "Pinturicchio" — Leggenda Assoluta, Recordman & Bandiera Eterna della Juventus FC
          </p>
          <div className="relative border-l-2 border-yellow-500 pl-4 py-1 max-w-2xl bg-black/40 pr-2">
            <Quote className="absolute right-2 top-2 w-8 h-8 text-zinc-800 -z-0 opacity-40" />
            <p className="italic text-zinc-300 text-sm md:text-base leading-relaxed relative z-10">
              "La Juventus non è soltanto la squadra del mio cuore. È molto di più. È la mia vita, la mia giovinezza, il mio cammino. Questa maglia mi ha dato sogni, gioie e una seconda famiglia."
            </p>
            <span className="block text-[10px] font-mono uppercase text-yellow-500 tracking-wider font-extrabold mt-2">— Alessandro Del Piero</span>
          </div>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-zinc-800 mb-8 overflow-x-auto pb-px">
        <button
          onClick={() => setActiveTab('storia')}
          className={`px-5 py-3 text-xs md:text-sm font-bold uppercase tracking-widest border-b-2 flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'storia' ? 'border-yellow-500 text-white bg-zinc-950/40' : 'border-transparent text-zinc-500 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          La Storia
        </button>
        <button
          onClick={() => setActiveTab('statistiche')}
          className={`px-5 py-3 text-xs md:text-sm font-bold uppercase tracking-widest border-b-2 flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'statistiche' ? 'border-yellow-500 text-white bg-zinc-950/40' : 'border-transparent text-zinc-500 hover:text-white'
          }`}
        >
          <Trophy className="w-4 h-4" />
          Statistiche & Palmarès
        </button>
        <button
          onClick={() => setActiveTab('momenti')}
          className={`px-5 py-3 text-xs md:text-sm font-bold uppercase tracking-widest border-b-2 flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'momenti' ? 'border-yellow-500 text-white bg-zinc-950/40' : 'border-transparent text-zinc-500 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          Momenti Iconici
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`px-5 py-3 text-xs md:text-sm font-bold uppercase tracking-widest border-b-2 flex items-center gap-2 whitespace-nowrap transition-all ${
            activeTab === 'quiz' ? 'border-yellow-500 text-yellow-500 bg-zinc-950/40' : 'border-transparent text-zinc-500 hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          Mettiti alla Prova
        </button>
      </div>

      {/* Tab Contents */}
      <div className="min-h-[400px]">
        
        {/* Tab 1: Storia / Biografia */}
        {activeTab === 'storia' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6 text-zinc-300 text-sm md:text-base leading-relaxed">
              <h3 className="text-xl font-display font-bold uppercase text-white tracking-tight border-b border-zinc-800 pb-3">
                Un ragazzo di Conegliano con il sogno bianconero
              </h3>
              <p>
                Nato a Conegliano nel 1974, Alessandro cresce giocando a calcio nel campetto parrocchiale di Saccon. Notato ben presto dai dirigenti del Padova, esordisce tra i professionisti giovanissimo. Nel 1993, il grande salto: la Juventus guidata da Giampiero Boniperti lo acquista, ponendo le basi per una delle storie d'amore calcistiche più belle di sempre.
              </p>
              <p>
                Rappresenta l'archetipo del numero 10 moderno: un fantasista dotato di visione di gioco sovrumana, tecnica celestiale e una precisione chirurgica sui calci di punizione. Il presidente Gianni Agnelli lo battezzerà affettuosamente <strong>"Pinturicchio"</strong> per l'eleganza raffinata dei suoi colpi, paragonandolo al celebre pittore rinascimentale.
              </p>
              <p>
                Con la maglia bianconera addosso, Alex ha attraversato tutte le stagioni della storia recente: i trionfi degli anni '90 con Marcello Lippi, la sofferenza della Serie B affrontata con lo spirito dei veri capitani, e la rinascita dell'Allianz Stadium coronata dall'ultimo commovente Scudetto degli invincibili nel 21012.
              </p>

              <div className="bg-zinc-950 border border-zinc-800 p-5 mt-6 rounded-none">
                <h4 className="font-display font-bold text-yellow-500 uppercase text-xs tracking-wider mb-3">La leggendaria lettera d'addio del 2012</h4>
                <p className="italic text-zinc-400 text-xs md:text-sm leading-relaxed">
                  "Sopra ogni cosa resta la maglia. Quella che ho amato e amerò sempre, che ho desiderato e rispettato, senza deroghe, senza sconti. Da domani non sarò più un giocatore della Juventus, ma sarò sempre uno di voi. Fino alla fine."
                </p>
              </div>
            </div>

            {/* Quick Card Details */}
            <div className="bg-zinc-950 border border-zinc-850 p-6 space-y-5 rounded-none h-fit">
              <h4 className="font-display font-bold uppercase text-white tracking-wider text-xs border-b border-zinc-850 pb-2">Scheda del Campione</h4>
              <ul className="space-y-4 text-xs font-mono uppercase">
                <li className="flex justify-between border-b border-zinc-900 pb-2">
                  <span className="text-zinc-500">Nome</span>
                  <span className="text-white font-bold">Alessandro Del Piero</span>
                </li>
                <li className="flex justify-between border-b border-zinc-900 pb-2">
                  <span className="text-zinc-500">Data di Nascita</span>
                  <span className="text-white font-bold">9 Novembre 1974</span>
                </li>
                <li className="flex justify-between border-b border-zinc-900 pb-2">
                  <span className="text-zinc-500">Luogo di Nascita</span>
                  <span className="text-white font-bold">Conegliano (TV)</span>
                </li>
                <li className="flex justify-between border-b border-zinc-900 pb-2">
                  <span className="text-zinc-500">Ruolo</span>
                  <span className="text-white font-bold">Seconda Punta / Fantasista</span>
                </li>
                <li className="flex justify-between border-b border-zinc-900 pb-2">
                  <span className="text-zinc-500">Presenze Juve</span>
                  <span className="text-yellow-500 font-bold">705 (Record)</span>
                </li>
                <li className="flex justify-between border-b border-zinc-900 pb-2">
                  <span className="text-zinc-500">Gol Juve</span>
                  <span className="text-yellow-500 font-bold">290 (Record)</span>
                </li>
                <li className="flex justify-between pb-2">
                  <span className="text-zinc-500">Numero di Maglia</span>
                  <span className="text-white font-bold text-sm">10</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Statistiche e Palmarès */}
        {activeTab === 'statistiche' && (
          <div className="space-y-10">
            {/* Grid stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between hover:border-zinc-500 transition-colors">
                  <div>
                    <span className="text-zinc-500 font-mono text-[10px] uppercase tracking-widest block mb-1">Dato Storico</span>
                    <h4 className="text-white font-display text-xs uppercase tracking-wider font-bold mb-3">{stat.label}</h4>
                  </div>
                  <div className="mt-2">
                    <span className="text-yellow-500 font-display font-black text-5xl tracking-tight block mb-2 leading-none">{stat.value}</span>
                    <p className="text-zinc-400 text-xs font-mono">{stat.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* List Trophies */}
            <div className="border border-zinc-800 bg-zinc-950 p-6">
              <h3 className="text-lg font-display font-bold uppercase text-white tracking-widest mb-6 border-b border-zinc-800 pb-3 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                I Trionfi con la Juventus & Nazionale
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {trophies.map((trophy, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-3 bg-black/40 border border-zinc-900 hover:border-zinc-800 transition-all">
                    <div className="w-10 h-10 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-none flex items-center justify-center font-bold flex-shrink-0">
                      🏆
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-sm uppercase text-white tracking-wide">{trophy.name}</span>
                        <span className="bg-yellow-500 text-black font-mono font-bold text-[10px] px-2 py-0.5 rounded-none">
                          x{trophy.count}
                        </span>
                      </div>
                      <p className="text-zinc-500 text-xs mt-1">{trophy.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Momenti Iconici */}
        {activeTab === 'momenti' && (
          <div className="relative border-l border-zinc-800 ml-4 md:ml-6 space-y-10 py-4">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="relative pl-8 md:pl-10 group">
                {/* Timeline Dot */}
                <div className="absolute left-[-6px] top-1.5 w-3 h-3 bg-yellow-500 border-2 border-black rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                
                <div className="bg-zinc-950 border border-zinc-850 p-5 md:p-6 hover:border-yellow-500 transition-all">
                  <span className="inline-block bg-yellow-500 text-black font-mono font-black text-xs px-3 py-1 uppercase tracking-wider mb-3 rounded-none">
                    {milestone.year}
                  </span>
                  <h4 className="text-lg font-display font-black text-white uppercase tracking-tight mb-2">
                    {milestone.title}
                  </h4>
                  <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                    {milestone.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Quiz */}
        {activeTab === 'quiz' && (
          <div className="max-w-2xl mx-auto bg-zinc-950 border border-zinc-850 p-6 md:p-8">
            {!quizFinished ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-zinc-850 pb-4">
                  <span className="font-mono text-xs text-zinc-500 uppercase font-bold">
                    Domanda {currentQuestion + 1} di {quizQuestions.length}
                  </span>
                  <span className="bg-yellow-500/10 text-yellow-500 font-mono text-xs px-2.5 py-1 uppercase border border-yellow-500/20">
                    Punti: {score}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-display font-bold uppercase tracking-tight text-white leading-snug">
                  {quizQuestions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((option, idx) => {
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = idx === quizQuestions[currentQuestion].correctAnswer;
                    let optionStyle = 'bg-black border-zinc-850 hover:border-white text-zinc-300';
                    
                    if (showAnswer) {
                      if (isCorrect) {
                        optionStyle = 'bg-green-950/40 border-green-500 text-green-400';
                      } else if (isSelected) {
                        optionStyle = 'bg-red-950/40 border-red-500 text-red-400';
                      } else {
                        optionStyle = 'bg-black opacity-40 border-zinc-900 text-zinc-600';
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(idx)}
                        disabled={showAnswer}
                        className={`w-full text-left px-5 py-4 border font-bold text-xs md:text-sm uppercase tracking-wider transition-all duration-150 flex justify-between items-center rounded-none ${optionStyle}`}
                      >
                        <span>{option}</span>
                        {showAnswer && isCorrect && <Check className="w-5 h-5 text-green-500" />}
                        {showAnswer && isSelected && !isCorrect && <X className="w-5 h-5 text-red-500" />}
                      </button>
                    );
                  })}
                </div>

                {showAnswer && (
                  <div className="bg-black border border-zinc-850 p-4 animate-in fade-in duration-300">
                    <h5 className="font-mono text-[10px] text-yellow-500 uppercase tracking-widest font-black mb-1">Lo Sapevi che?</h5>
                    <p className="text-zinc-400 text-xs md:text-sm leading-relaxed">{quizQuestions[currentQuestion].explanation}</p>
                    
                    <button
                      onClick={handleNextQuestion}
                      className="mt-4 bg-white text-black px-5 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors rounded-none"
                    >
                      {currentQuestion === quizQuestions.length - 1 ? 'Completa' : 'Avanti'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 rounded-full flex items-center justify-center mx-auto text-3xl">
                  🎖️
                </div>
                <div>
                  <h3 className="text-2xl font-display font-black text-white uppercase tracking-tight">Quiz Completato!</h3>
                  <p className="text-zinc-400 font-mono text-sm mt-2">
                    Hai risposto correttamente a <span className="text-yellow-500 font-bold">{score}</span> domande su {quizQuestions.length}.
                  </p>
                </div>

                <div className="bg-black border border-zinc-900 p-4 max-w-sm mx-auto">
                  <h4 className="font-mono text-xs uppercase font-extrabold text-white">
                    {score === quizQuestions.length 
                      ? '🏅 Livello: CAPITANO LEGENDARIO' 
                      : score >= 2 
                        ? '🥈 Livello: Tifoso Esperto' 
                        : '🥉 Livello: Pulcino Bianconero'}
                  </h4>
                  <p className="text-zinc-500 text-[11px] mt-1 leading-normal">
                    {score === quizQuestions.length 
                      ? 'Conosci ogni dettaglio del Pinturicchio. Alex sarebbe orgoglioso di te!' 
                      : 'Hai un buon livello, ma ci sono ancora dettagli storici da scoprire sul capitano!'}
                  </p>
                </div>

                <button
                  onClick={resetQuiz}
                  className="bg-yellow-500 text-black px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-yellow-400 transition-colors rounded-none"
                >
                  Riprova il Quiz
                </button>
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
