import { Player, Article, ForumThread, Trophy, HistoryMilestone } from './types';

export const initialPlayers: Player[] = [
  {
    id: 'di-gregorio',
    name: 'Michele Di Gregorio',
    number: 1,
    position: 'Portiere',
    age: 28,
    nationality: 'Italia',
    image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=300&h=300&fit=crop',
    stats: {
      matches: 32,
      goals: 0,
      assists: 0,
      yellowCards: 1,
      redCards: 0,
      minutesPlayed: 2880,
      rating: 7.2
    }
  },
  {
    id: 'bremer',
    name: 'Gleison Bremer',
    number: 3,
    position: 'Difensore',
    age: 29,
    nationality: 'Brasile',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=300&h=300&fit=crop',
    stats: {
      matches: 34,
      goals: 3,
      assists: 1,
      yellowCards: 5,
      redCards: 0,
      minutesPlayed: 3060,
      rating: 7.5
    }
  },
  {
    id: 'gatti',
    name: 'Federico Gatti',
    number: 4,
    position: 'Difensore',
    age: 28,
    nationality: 'Italia',
    image: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=300&h=300&fit=crop',
    stats: {
      matches: 30,
      goals: 4,
      assists: 0,
      yellowCards: 7,
      redCards: 0,
      minutesPlayed: 2550,
      rating: 7.1
    }
  },
  {
    id: 'cambiaso',
    name: 'Andrea Cambiaso',
    number: 27,
    position: 'Difensore',
    age: 26,
    nationality: 'Italia',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=300&h=300&fit=crop',
    stats: {
      matches: 33,
      goals: 2,
      assists: 6,
      yellowCards: 4,
      redCards: 0,
      minutesPlayed: 2710,
      rating: 7.4
    }
  },
  {
    id: 'locatelli',
    name: 'Manuel Locatelli',
    number: 5,
    position: 'Centrocampista',
    age: 28,
    nationality: 'Italia',
    image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=300&h=300&fit=crop',
    stats: {
      matches: 35,
      goals: 1,
      assists: 4,
      yellowCards: 6,
      redCards: 0,
      minutesPlayed: 2980,
      rating: 7.3
    }
  },
  {
    id: 'koopmeiners',
    name: 'Teun Koopmeiners',
    number: 8,
    position: 'Centrocampista',
    age: 28,
    nationality: 'Paesi Bassi',
    image: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=300&h=300&fit=crop',
    stats: {
      matches: 28,
      goals: 7,
      assists: 8,
      yellowCards: 3,
      redCards: 0,
      minutesPlayed: 2340,
      rating: 7.6
    }
  },
  {
    id: 'fagioli',
    name: 'Nicolò Fagioli',
    number: 21,
    position: 'Centrocampista',
    age: 25,
    nationality: 'Italia',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=300&h=300&fit=crop',
    stats: {
      matches: 22,
      goals: 2,
      assists: 3,
      yellowCards: 2,
      redCards: 0,
      minutesPlayed: 1450,
      rating: 7.0
    }
  },
  {
    id: 'yildiz',
    name: 'Kenan Yıldız',
    number: 10,
    position: 'Attaccante',
    age: 21,
    nationality: 'Turchia',
    image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=300&h=300&fit=crop',
    stats: {
      matches: 31,
      goals: 6,
      assists: 5,
      yellowCards: 1,
      redCards: 0,
      minutesPlayed: 2100,
      rating: 7.4
    }
  },
  {
    id: 'vlahovic',
    name: 'Dušan Vlahović',
    number: 9,
    position: 'Attaccante',
    age: 26,
    nationality: 'Serbia',
    image: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=300&h=300&fit=crop',
    stats: {
      matches: 33,
      goals: 18,
      assists: 3,
      yellowCards: 4,
      redCards: 1,
      minutesPlayed: 2650,
      rating: 7.7
    }
  },
  {
    id: 'conceicao',
    name: 'Francisco Conceição',
    number: 7,
    position: 'Attaccante',
    age: 23,
    nationality: 'Portogallo',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=300&h=300&fit=crop',
    stats: {
      matches: 25,
      goals: 4,
      assists: 6,
      yellowCards: 3,
      redCards: 0,
      minutesPlayed: 1680,
      rating: 7.3
    }
  }
];

export const initialArticles: Article[] = [
  {
    id: 'art-1',
    title: 'Analisi Tattica: La Juventus di Thiago Motta convince per fluidità e pressing',
    summary: 'Approfondimento sugli schemi tattici, la flessibilità di Cambiaso e la centralità di Koopmeiners nella manovra bianconera.',
    content: `La Juventus sta vivendo un processo di profonda evoluzione tattica sotto la guida di Thiago Motta. I primi mesi della stagione hanno messo in mostra una squadra radicalmente cambiata nei principi fondamentali: possesso palla fluido, aggressione immediata dopo la perdita e interscambiabilità continua dei ruoli.

### La centralità dei terzini "registi"
Uno degli aspetti più intriganti è l'interpretazione del ruolo di Andrea Cambiaso. Spesso partendo come terzino destro, Cambiaso si accentra stabilmente a fianco di Locatelli in fase di costruzione, agendo come vero e proprio centrocampista aggiunto. Questo libera canali di passaggio diretti verso i trequartisti e crea costante superiorità numerica a centrocampo.

### Il pressing e la riconquista immediata
Rispetto al passato, la linea difensiva gioca mediamente 15 metri più alta. Bremer e Gatti accettano l'uno contro uno a tutto campo, permettendo alla squadra di rimanere cortissima. Quando la Juve perde palla, scatta la regola dei 5 secondi: riaggredire immediatamente l'avversario per forzare l'errore o il lancio lungo incontrollato.

### L'importanza delle rotazioni
La Juventus non ha più posizioni fisse. Spesso vediamo l'esterno d'attacco tagliare dentro e il trequartista centrale allargarsi per occupare l'ampiezza. Questa imprevedibilità rende estremamente difficile per i blocchi difensivi avversari mantenere le marcature di reparto.

Cosa ne pensate di questa nuova impostazione? Siete soddisfatti dell'evoluzione della squadra? Ditecelo nei commenti!`,
    author: 'Giacomo Diara',
    date: '2026-06-25',
    category: 'Analisi Tattica',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=450&fit=crop',
    likes: 42,
    comments: [
      {
        id: 'c-1',
        author: 'Filippo_Juve',
        date: '2026-06-25 14:30',
        content: 'Finalmente un calcio moderno, propositivo! Cambiaso è un giocatore fantastico, sa fare tutto.'
      },
      {
        id: 'c-2',
        author: 'BianconeroDOP',
        date: '2026-06-25 15:12',
        content: 'Ottima analisi. Bisogna avere pazienza però, questi meccanismi richiedono tempo per essere perfetti, soprattutto in Europa.'
      }
    ]
  },
  {
    id: 'art-2',
    title: 'Kenan Yıldız e la maglia numero 10: la consacrazione di un talento puro',
    summary: 'La crescita esponenziale del gioiello turco, le sue prestazioni in campo e l\'eredità pesante di una maglia leggendaria.',
    content: `Indossare la maglia numero 10 della Juventus non è mai stato un compito banale. Da Sivori a Platini, passando per Baggio, Del Piero e Tévez, quel numero porta con sé un carico di sogni, responsabilità e magia. A soli 19 anni, Kenan Yıldız ha ereditato questo fardello con una disinvoltura disarmante.

### Un talento sbocciato in fretta
Arrivato dal Bayern Monaco, Yıldız ha dimostrato fin dalle prime apparizioni con la Next Gen una superiorità tecnica e fisica fuori dal comune. Ma è stato il salto in prima squadra a svelare la sua vera stoffa: il controllo orientato, la capacità di girarsi in un fazzoletto e quel tiro a giro sul secondo palo che ricorda inevitabilmente il gol "alla Del Piero".

### Profilo moderno
Yıldız non è il classico trequartista statico di una volta. È un attaccante moderno che ama partire dalla fascia sinistra per poi accentrarsi, dialogando con la punta centrale (Vlahović) o cercando la conclusione personale. La sua forza nelle gambe gli permette di resistere ai contrasti dei difensori più fisici, mantenendo la palla incollata al piede.

### Umiltà ed etica del lavoro
Oltre alle doti tecniche, lo staff tecnico sottolinea continuamente l'atteggiamento mentale del ragazzo. Sempre concentrato, desideroso di imparare e disciplinato tatticamente anche in fase di ripiegamento. La strada è lunga, ma le premesse per una stella assoluta ci sono tutte.

Pensate che Yıldız sia già il leader tecnico di questa Juventus? Lasciate un commento qui sotto!`,
    author: 'Marco Rossi',
    date: '2026-06-20',
    category: 'Focus Giocatori',
    image: 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=800&h=450&fit=crop',
    likes: 56,
    comments: [
      {
        id: 'c-3',
        author: 'DelPieroLeggenda',
        date: '2026-06-20 18:22',
        content: 'Ha le movenze di Alex nei primi anni. Speriamo non si bruci, ma la testa sembra quella giusta.'
      }
    ]
  },
  {
    id: 'art-3',
    title: 'Verso il prossimo impegno di Champions League: sfida decisiva all\'Allianz Stadium',
    summary: 'La Juventus si prepara per la notte europea. Le probabili formazioni, lo stato di forma degli avversari e le parole di Motta.',
    content: `La magica atmosfera delle notti europee sta per tornare all'Allianz Stadium di Torino. La Juventus affronta un crocevia fondamentale per il cammino europeo. Una vittoria garantirebbe l'accesso matematico alla fase successiva, mentre un passo falso complicherebbe notevolmente i piani.

### Infermeria e ballottaggi
Thiago Motta deve fare i conti con alcune assenze importanti in difesa. Gatti guiderà il reparto centrale, molto probabilmente affiancato da Bremer che ha smaltito il recente affaticamento. A centrocampo, Locatelli è sicuro del posto, mentre al suo fianco si giocano una maglia Fagioli e Douglas Luiz. In attacco intoccabile Vlahović, supportato da Conceição, Koopmeiners e Yıldız.

### Gli avversari
La squadra ospite arriva a Torino forte di una striscia di 5 vittorie consecutive in campionato e un gioco molto verticale ed aggressivo. Sarà fondamentale non perdere palloni sanguinosi a centrocampo e sfruttare l'ampiezza con la velocità di Conceição per scardinare la loro linea difensiva.

### Le dichiarazioni della vigilia
"In Europa non esistono partite facili" - ha dichiarato Thiago Motta in conferenza stampa. "Dovremo essere intensi dal primo all'ultimo minuto, spinti dal calore dei nostri tifosi. Vogliamo fare una grande prestazione per noi e per tutto il popolo bianconero."

Qual è il vostro pronostico per la partita? Scrivetelo qui sotto!`,
    author: 'Luca Vitali',
    date: '2026-06-18',
    category: 'Match Preview',
    image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&h=450&fit=crop',
    likes: 38,
    comments: [
      {
        id: 'c-4',
        author: 'CurvaSud1897',
        date: '2026-06-18 20:45',
        content: 'Tutti allo stadio! 2-1 per noi con gol di Vlahovic e Yildiz. Fino alla fine!'
      }
    ]
  }
];

export const initialForumThreads: ForumThread[] = [
  {
    id: 'th-1',
    title: 'Chi deve affiancare Locatelli a centrocampo? Fagioli o Thuram?',
    category: 'Tattica',
    author: 'JuveTactics',
    date: '2026-06-26',
    repliesCount: 4,
    views: 142,
    posts: [
      {
        id: 'p-1',
        author: 'JuveTactics',
        date: '2026-06-26 10:00',
        content: 'Vedo molti pareri discordanti sull\'assetto del nostro centrocampo. Locatelli sembra aver trovato una costanza pazzesca, ma chi è il suo partner ideale? Fagioli dà più qualità nel palleggio stretto, ma forse con Thuram abbiamo più copertura fisica ed inserimenti. Voi chi preferite per dare equilibrio?',
        likes: 12
      },
      {
        id: 'p-2',
        author: 'MaxAllegriFan',
        date: '2026-06-26 10:45',
        content: 'Dipende dalla partita. Contro squadre abbottonate preferisco Fagioli per trovare lo spazio con la sua tecnica. Contro squadre fisiche assolutamente Thuram.',
        likes: 8
      },
      {
        id: 'p-3',
        author: 'GigiBuffon_97',
        date: '2026-06-26 11:15',
        content: 'Io andrei stabilmente con Thuram. Ci serve fisicità a centrocampo se giochiamo con così tanti giocatori offensivi contemporaneamente (Koopmeiners, Yildiz, Vlahovic, Conceicao).',
        likes: 14
      },
      {
        id: 'p-4',
        author: 'JuveTactics',
        date: '2026-06-26 12:00',
        content: 'Punto di vista interessante, in effetti l\'equilibrio difensivo è fondamentale per non subire ripartenze dolorose.',
        likes: 3
      }
    ]
  },
  {
    id: 'th-2',
    title: 'Calciomercato Estivo: Quali sono i ruoli prioritari da rinforzare?',
    category: 'Calciomercato',
    author: 'MercatoBianconero',
    date: '2026-06-24',
    repliesCount: 2,
    views: 210,
    posts: [
      {
        id: 'p-5',
        author: 'MercatoBianconero',
        date: '2026-06-24 15:30',
        content: 'Manca poco alla fine della stagione e si comincia a parlare di mercato. Secondo me serve urgentemente un vice-Vlahovic affidabile e un difensore centrale mancino per completare la rosa. Siete d\'accordo o vedete altre priorità?',
        likes: 15
      },
      {
        id: 'p-6',
        author: 'Pavel89',
        date: '2026-06-24 16:10',
        content: 'Vice-Vlahovic assolutamente prioritario. Quest\'anno Dušan ha dovuto giocarle quasi tutte e alla fine era stremato. Ci serve un attaccante d\'area esperto accettando anche la panchina.',
        likes: 19
      },
      {
        id: 'p-7',
        author: 'ChicoJuve',
        date: '2026-06-24 17:05',
        content: 'Io prenderei anche un esterno sinistro difensivo alternativo per far respirare Cambiaso. Un profilo giovane e di corsa.',
        likes: 6
      }
    ]
  },
  {
    id: 'th-3',
    title: 'Commenti Post Partita Juventus - Milan: analisi di un pareggio spettacolare',
    category: 'Match Center',
    author: 'CurvaSud_92',
    date: '2026-06-22',
    repliesCount: 2,
    views: 185,
    posts: [
      {
        id: 'p-8',
        author: 'CurvaSud_92',
        date: '2026-06-22 23:15',
        content: 'Finita ora. Un 2-2 intenso, pieno di capovolgimenti di fronte. Peccato aver preso il secondo gol su una disattenzione da calcio d\'angolo, ma la reazione della squadra nel secondo tempo è stata di grande cuore. Di Gregorio miracoloso nel finale!',
        likes: 22
      },
      {
        id: 'p-9',
        author: 'Tarek_Juve',
        date: '2026-06-22 23:30',
        content: 'Concordo, Di Gregorio ci ha salvato la pelle all\'ultimo secondo. Comunque gran gol di Vlahovic su assist pazzesco di Yildiz. Quella coppia sta crescendo benissimo.',
        likes: 11
      },
      {
        id: 'p-10',
        author: 'LorisBianconero',
        date: '2026-06-23 08:30',
        content: 'Peccato per i 2 punti persi, ma la prestazione è stata incoraggiante. Continuiamo così, la strada è quella giusta!',
        likes: 5
      }
    ]
  }
];

export const trophies: Trophy[] = [
  {
    id: 'scudetto',
    name: 'Scudetto (Campionato Italiano)',
    count: 36,
    years: [
      '1905', '1925/26', '1930/31', '1931/32', '1932/33', '1933/34', '1934/35', '1949/50', '1951/52', '1957/58',
      '1959/60', '1960/61', '1966/67', '1971/72', '1972/73', '1974/75', '1976/77', '1977/78', '1980/81', '1981/82',
      '1983/84', '1985/86', '1994/95', '1996/97', '1997/98', '2001/02', '2002/03', '2011/12', '2012/13', '2013/14',
      '2014/15', '2015/16', '2016/17', '2017/18', '2018/19', '2019/20'
    ],
    iconName: 'Shield'
  },
  {
    id: 'coppa-italia',
    name: 'Coppa Italia',
    count: 15,
    years: [
      '1937/38', '1941/42', '1958/59', '1959/60', '1964/65', '1978/79', '1982/83', '1989/90', '1994/95', '2014/15',
      '2015/16', '2016/17', '2017/18', '2020/21', '2023/24'
    ],
    iconName: 'Trophy'
  },
  {
    id: 'supercoppa',
    name: 'Supercoppa Italiana',
    count: 9,
    years: [
      '1995', '1997', '2002', '2003', '2012', '2013', '2015', '2018', '2020'
    ],
    iconName: 'Award'
  },
  {
    id: 'champions-league',
    name: 'UEFA Champions League / Coppa dei Campioni',
    count: 2,
    years: [
      '1984/85', '1995/96'
    ],
    iconName: 'Globe'
  },
  {
    id: 'coppa-uefa',
    name: 'Coppa UEFA / Europa League',
    count: 3,
    years: [
      '1976/77', '1989/90', '1992/93'
    ],
    iconName: 'Award'
  },
  {
    id: 'supercoppa-europea',
    name: 'Supercoppa UEFA',
    count: 2,
    years: [
      '1984', '1996'
    ],
    iconName: 'Zap'
  },
  {
    id: 'intercontinentale',
    name: 'Coppa Intercontinentale',
    count: 2,
    years: [
      '1985', '1996'
    ],
    iconName: 'Map'
  }
];

export const historyMilestones: HistoryMilestone[] = [
  {
    year: '1897',
    title: 'La Fondazione',
    description: 'Il 1° novembre 1897, un gruppo di studenti del liceo classico Massimo d\'Azeglio di Torino fonda la "Sport-Club Juventus" su una panchina di Corso Re Umberto. I primi colori sociali sono rosa e nero, sostituiti nel 1903 dai leggendari bianconeri arrivati da Nottingham.'
  },
  {
    year: '1905',
    title: 'Il Primo Scudetto',
    description: 'La Juventus vince il suo primo campionato italiano superando nel girone finale il Genoa e l\'U.S. Milanese. È l\'inizio di una gloriosa serie di successi nazionali.'
  },
  {
    year: '1923',
    title: 'Il connubio con la Famiglia Agnelli',
    description: 'Il 24 luglio 1923, l\'assemblea dei soci elegge Edoardo Agnelli, figlio del fondatore della FIAT, come nuovo presidente. Nasce un legame storico e indissolubile, il più antico e duraturo del mondo dello sport mondiale.'
  },
  {
    year: '1930-1935',
    title: 'Il Quinquennio d\'Oro',
    description: 'Sotto la guida del tecnico Carlo Carcano, la Juventus conquista cinque scudetti consecutivi. È l\'epoca di leggende come Rosetta, Caligaris, Borel II e gli oriundi Orsi e Cesarini. La squadra costituisce l\'ossatura dell\'Italia campione del mondo nel 1934.'
  },
  {
    year: '1957',
    title: 'Il Trio Magico: Boniperti, Charles e Sívori',
    description: 'Con l\'arrivo del gigante gallese John Charles e dell\'estroso argentino Omar Sívori, che si uniscono alla leggenda Giampiero Boniperti, nasce un attacco stellare che domina l\'Italia conquistando la prima Stella d\'oro (10 scudetti) nel 1958.'
  },
  {
    year: '1982',
    title: 'La Seconda Stella e Michel Platini',
    description: 'Nel 1982 la Juventus conquista il suo ventesimo scudetto, fregiandosi della seconda stella d\'oro. In quell\'estate arriva a Torino Michel Platini, il leggendario "Le Roi", che vincerà tre Palloni d\'Oro consecutivi trascinando la squadra alla conquista di tutti i trofei internazionali possibili.'
  },
  {
    year: '1996',
    title: 'Sul tetto d\'Europa a Roma',
    description: 'Il 22 maggio 1996, la Juventus di Marcello Lippi sconfigge l\'Ajax ai calci di rigore nella finale dell\'Olimpico di Roma, conquistando la sua seconda Champions League. Protagonisti assoluti Vialli, Ravanelli, Sousa e un giovanissimo Alessandro Del Piero.'
  },
  {
    year: '2011-2020',
    title: 'I 9 Scudetti di fila: Il Mito del Record',
    description: 'Inaugurato il nuovo Juventus Stadium (poi Allianz Stadium), la società avvia un ciclo di domini nazionali senza precedenti nella storia del calcio italiano ed europeo, vincendo nove scudetti consecutivi con Antonio Conte, Massimiliano Allegri e Maurizio Sarri.'
  },
  {
    year: 'Oggi',
    title: 'Il Futuro e la Nuova Era',
    description: 'Con un progetto focalizzato sull\'eccellenza tattica, la valorizzazione dei giovani talenti cresciuti nel settore giovanile (Next Gen) e un calcio moderno e internazionale, la Juventus affronta le nuove sfide mondiali mantenendo intatta la propria identità storica.'
  }
];
