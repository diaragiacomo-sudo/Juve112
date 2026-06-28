import React, { useState, useEffect } from 'react';
import { Play, Flame, Heart, Share2, MessageSquare, Clock, Eye, Volume2, VolumeX, Maximize, ListVideo, Sparkles } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  category: 'Momenti Storici' | 'Gol Leggendari' | 'Cori dei Tifosi' | 'Interviste';
  duration: string;
  views: string;
  likes: number;
  date: string;
  description: string;
  placeholderColor: string;
  isPreloaded?: boolean;
}

interface VideoComment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

export default function VideoComponent() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  
  // Custom video player state inside modal
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  
  // Storage for likes and custom comments
  const [likedVideos, setLikedVideos] = useState<string[]>(() => {
    const saved = localStorage.getItem('juve_liked_videos');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [videoLikes, setVideoLikes] = useState<{ [id: string]: number }>(() => {
    const saved = localStorage.getItem('juve_video_likes_map');
    return saved ? JSON.parse(saved) : {};
  });

  const [videoComments, setVideoComments] = useState<{ [id: string]: VideoComment[] }>(() => {
    const saved = localStorage.getItem('juve_video_comments_map');
    if (saved) {
      return JSON.parse(saved);
    }
    // Default mock comments for our pre-seeded videos
    return {
      'vid1': [
        { id: '1', author: 'Claudio89', content: 'Ancora piango a vedere questo video... Il Capitano è eterno! 🖤🤍', timestamp: '2 ore fa' },
        { id: '2', author: 'FinoAllaFine_96', content: 'C\'ero quel giorno allo Stadium. Atmosfera irreale, nessuno voleva farlo andare via.', timestamp: '1 giorno fa' }
      ],
      'vid2': [
        { id: '1', author: 'ZizouFan', content: 'Nedved meritava di giocare quella finale... che partitona incredibile!', timestamp: '3 giorni fa' },
        { id: '2', author: 'Pinturicchio_10', content: 'Il gol di Del Piero contro Hierro è arte pura. Assist di Trezeguet spaziale!', timestamp: '5 giorni fa' }
      ],
      'vid3': [
        { id: '1', author: 'Beppe_Juve', content: 'Brividi continui. Il taglio del nastro, le vecchie glorie sul campo...', timestamp: '1 settimana fa' }
      ],
      'vid4': [
        { id: '1', author: 'CurvaSud_Torino', content: 'Questa canzone mi fa venire la pelle d\'oca ogni singola volta allo stadio!', timestamp: '12 ore fa' }
      ]
    };
  });

  const [newCommentAuthor, setNewCommentAuthor] = useState('');
  const [newCommentText, setNewCommentText] = useState('');

  const preseededVideos: VideoItem[] = [
    {
      id: 'vid1',
      title: "L'ultimo commovente giro di campo di Alessandro Del Piero (13/05/2012)",
      category: 'Momenti Storici',
      duration: '12:45',
      views: '1.2M',
      likes: 4520,
      date: '13 Maggio 2012',
      description: "Il tributo commovente dell'intero Allianz Stadium ad Alessandro Del Piero durante la partita d'addio contro l'Atalanta. Il Capitano saluta in lacrime i tifosi per oltre 20 minuti mentre il gioco continua sul campo.",
      placeholderColor: 'from-zinc-900 via-neutral-900 to-black'
    },
    {
      id: 'vid2',
      title: "Juventus 3-1 Real Madrid - Semifinale Champions League 2003",
      category: 'Momenti Storici',
      duration: '08:30',
      views: '850K',
      likes: 3120,
      date: '14 Maggio 2003',
      description: "La partita perfetta: i gol di Trezeguet, Del Piero e Pavel Nedved annichiliscono i Galacticos del Real Madrid qualificando la Vecchia Signora alla finale tutta italiana di Manchester.",
      placeholderColor: 'from-zinc-800 via-zinc-950 to-neutral-900'
    },
    {
      id: 'vid3',
      title: "La cerimonia d'inaugurazione del nuovo Juventus Stadium (08/09/2011)",
      category: 'Momenti Storici',
      duration: '15:20',
      views: '410K',
      likes: 1850,
      date: '8 Settembre 2011',
      description: "La straordinaria serata di gala che ha inaugurato la nuova casa della Juventus. La storia del club raccontata sul prato verde e l'amichevole d'onore contro il Notts County, il club più antico del mondo che ispirò i colori bianconeri.",
      placeholderColor: 'from-neutral-950 via-zinc-900 to-black'
    },
    {
      id: 'vid4',
      title: "I cori leggendari della Curva Sud: \"Storia di un Grande Amore\"",
      category: 'Cori dei Tifosi',
      duration: '04:15',
      views: '320K',
      likes: 2400,
      date: '20 Febbraio 2024',
      description: "La rassegna dei cori più belli eseguiti dal cuore del tifo bianconero all'Allianz Stadium, con il testo a schermo per cantare tutti insieme l'inno ufficiale.",
      placeholderColor: 'from-zinc-900 via-neutral-950 to-neutral-800'
    },
    {
      id: 'vid5',
      title: "Top 10 Gol di Alessandro Del Piero alla Juventus",
      category: 'Gol Leggendari',
      duration: '06:50',
      views: '980K',
      likes: 4890,
      date: '9 Novembre 2023',
      description: "I migliori gol del mitico capitano numero 10: le celebri parabole a giro 'alla Del Piero', i colpi di tacco geniali e le punizioni millimetriche all'incrocio dei pali.",
      placeholderColor: 'from-neutral-900 via-zinc-950 to-black'
    },
    {
      id: 'vid6',
      title: "Intervista esclusiva a Michel Platini sul suo periodo a Torino",
      category: 'Interviste',
      duration: '11:10',
      views: '150K',
      likes: 920,
      date: '14 Giugno 2021',
      description: "Le Roi Michel si confessa ai microfoni parlando del rapporto unico con l'avvocato Gianni Agnelli, della conquista del Pallone d'oro e delle battaglie scudetto negli anni ottanta.",
      placeholderColor: 'from-zinc-950 via-neutral-900 to-zinc-900'
    }
  ];

  // Sync likes and comments with localStorage
  useEffect(() => {
    localStorage.setItem('juve_liked_videos', JSON.stringify(likedVideos));
  }, [likedVideos]);

  useEffect(() => {
    localStorage.setItem('juve_video_likes_map', JSON.stringify(videoLikes));
  }, [videoLikes]);

  useEffect(() => {
    localStorage.setItem('juve_video_comments_map', JSON.stringify(videoComments));
  }, [videoComments]);

  // Simulate progress when video is playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.8;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    let updatedLikes = [...likedVideos];
    let likesMap = { ...videoLikes };
    
    if (likedVideos.includes(id)) {
      updatedLikes = updatedLikes.filter(vId => vId !== id);
      likesMap[id] = (likesMap[id] || 0) - 1;
    } else {
      updatedLikes.push(id);
      likesMap[id] = (likesMap[id] || 0) + 1;
    }
    
    setLikedVideos(updatedLikes);
    setVideoLikes(likesMap);
  };

  const openVideo = (video: VideoItem) => {
    setSelectedVideo(video);
    setIsPlaying(true);
    setProgress(Math.floor(Math.random() * 20)); // Start from a random short progress for realism
    setNewCommentAuthor('');
    setNewCommentText('');
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentAuthor.trim() || !newCommentText.trim() || !selectedVideo) return;

    const newComment: VideoComment = {
      id: Date.now().toString(),
      author: newCommentAuthor.trim(),
      content: newCommentText.trim(),
      timestamp: 'Proprio ora'
    };

    const currentComments = videoComments[selectedVideo.id] || [];
    setVideoComments({
      ...videoComments,
      [selectedVideo.id]: [newComment, ...currentComments]
    });

    setNewCommentText('');
  };

  // Get current likes count for a video
  const getLikesCount = (video: VideoItem) => {
    const extraLikes = videoLikes[video.id] || 0;
    return video.likes + extraLikes;
  };

  const filteredVideos = activeCategory === 'all'
    ? preseededVideos
    : preseededVideos.filter(v => v.category === activeCategory);

  return (
    <div className="bg-black text-white min-h-screen py-10 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight text-white mb-4">
          Video <span className="text-stroke-white text-zinc-500">Bianconeri</span>
        </h1>
        <div className="w-16 h-1 bg-white mx-auto mb-4"></div>
        <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest font-bold">
          Rivivi i momenti leggendari, i cori da brivido della curva e le interviste che hanno fatto la storia della Vecchia Signora.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 justify-center mb-8 border-b border-zinc-900 pb-6">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider border rounded-none transition-all ${
            activeCategory === 'all'
              ? 'bg-white text-black border-white'
              : 'bg-zinc-950 text-zinc-400 border-zinc-900 hover:border-zinc-700 hover:text-white'
          }`}
        >
          Tutti i Video
        </button>
        {['Momenti Storici', 'Gol Leggendari', 'Cori dei Tifosi', 'Interviste'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider border rounded-none transition-all ${
              activeCategory === cat
                ? 'bg-white text-black border-white'
                : 'bg-zinc-950 text-zinc-400 border-zinc-900 hover:border-zinc-700 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => {
          const isLiked = likedVideos.includes(video.id);
          const totalLikes = getLikesCount(video);

          return (
            <div
              key={video.id}
              onClick={() => openVideo(video)}
              className="bg-zinc-950 border border-zinc-900 group hover:border-white cursor-pointer transition-all flex flex-col h-full shadow-lg overflow-hidden"
            >
              {/* Mock Video Thumbnail */}
              <div className={`relative aspect-video bg-gradient-to-br ${video.placeholderColor} flex items-center justify-center overflow-hidden border-b border-zinc-900`}>
                
                {/* Visual stripes overlay */}
                <div className="absolute inset-0 opacity-10 flex">
                  <div className="w-1/4 h-full bg-white border-r border-black"></div>
                  <div className="w-1/4 h-full bg-black border-r border-white"></div>
                  <div className="w-1/4 h-full bg-white border-r border-black"></div>
                  <div className="w-1/4 h-full bg-black"></div>
                </div>

                {/* Big play button centered */}
                <div className="relative w-14 h-14 rounded-full bg-black/80 border-2 border-white/20 text-white flex items-center justify-center transition-transform group-hover:scale-110 group-hover:bg-white group-hover:text-black duration-300">
                  <Play className="w-6 h-6 ml-1 fill-current" />
                </div>

                {/* Tags bottom */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-center">
                  <span className="bg-black/90 border border-zinc-800 text-white font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-none font-bold">
                    {video.category}
                  </span>
                  <span className="bg-black/95 text-zinc-300 font-mono text-[9px] px-1.5 py-0.5 rounded-none flex items-center gap-1 font-bold">
                    <Clock className="w-3 h-3 text-zinc-500" />
                    {video.duration}
                  </span>
                </div>
              </div>

              {/* Title, metadata and action */}
              <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-display font-black text-sm md:text-base leading-tight uppercase tracking-tight text-white group-hover:text-yellow-500 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-zinc-500 text-xs line-clamp-2">
                    {video.description}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-zinc-900 pt-3 text-[11px] font-mono text-zinc-500 font-bold uppercase">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5 text-zinc-600" />
                      {video.views} visualizzazioni
                    </span>
                  </div>
                  
                  {/* Heart Like */}
                  <button
                    onClick={(e) => handleLike(e, video.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 border transition-all ${
                      isLiked 
                        ? 'bg-red-950/20 border-red-500 text-red-500' 
                        : 'border-zinc-850 text-zinc-400 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-500' : ''}`} />
                    <span>{totalLikes}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FULL-SCREEN VIDEO PLAYER MODAL OVERLAY */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-zinc-950 border border-zinc-800 max-w-5xl w-full flex flex-col lg:flex-row shadow-2xl overflow-hidden rounded-none my-8 max-h-[90vh]">
            
            {/* Left Column: Player & Meta */}
            <div className="flex-grow flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-zinc-900 bg-black max-h-[100%] overflow-y-auto">
              
              {/* Fake Media Stage Screen */}
              <div className="relative aspect-video bg-black flex flex-col items-center justify-center overflow-hidden border-b border-zinc-900 group/player select-none">
                
                {/* Playing State Screen Visualizer */}
                {isPlaying ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950">
                    {/* Visual bar graph representation representing sound waves */}
                    <div className="flex items-end gap-1 h-12">
                      {[...Array(12)].map((_, i) => (
                        <div 
                          key={i} 
                          className="w-1.5 bg-white rounded-t-sm" 
                          style={{ 
                            height: `${Math.floor(Math.random() * 90) + 10}%`,
                            animation: `bounce 0.6s ease-in-out infinite alternate`,
                            animationDelay: `${i * 0.05}s` 
                          }}
                        ></div>
                      ))}
                    </div>
                    <span className="font-mono text-[10px] uppercase text-zinc-500 tracking-widest font-black mt-4 animate-pulse">Riproduzione in corso...</span>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/40">
                    <div className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200 cursor-pointer" onClick={() => setIsPlaying(true)}>
                      <Play className="w-8 h-8 ml-1 fill-current" />
                    </div>
                    <span className="font-mono text-xs uppercase text-zinc-400 tracking-widest mt-4 font-bold">Video in Pausa</span>
                  </div>
                )}

                {/* Bottom Overlay Controls bar */}
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent opacity-95 flex flex-col gap-2">
                  
                  {/* Progress bar slider track */}
                  <div className="relative h-1 bg-zinc-800 cursor-pointer flex items-center" onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    setProgress((clickX / rect.width) * 100);
                  }}>
                    <div className="absolute left-0 top-0 bottom-0 bg-yellow-500" style={{ width: `${progress}%` }}></div>
                    <div className="absolute w-3 h-3 rounded-full bg-white border border-black shadow" style={{ left: `calc(${progress}% - 6px)` }}></div>
                  </div>

                  {/* Icon toggles bar */}
                  <div className="flex items-center justify-between text-zinc-400 text-xs">
                    <div className="flex items-center gap-4">
                      <button className="hover:text-white" onClick={() => setIsPlaying(!isPlaying)}>
                        {isPlaying ? 'PAUSA' : 'RIPRODUCI'}
                      </button>

                      {/* Mute toggle */}
                      <button className="hover:text-white flex items-center gap-1" onClick={() => setIsMuted(!isMuted)}>
                        {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px]">
                        {Math.floor((progress/100) * 8)}:02 / {selectedVideo.duration}
                      </span>
                      <Maximize className="w-4 h-4 hover:text-white cursor-pointer" onClick={() => alert("Simulazione: Schermo Intero")} />
                    </div>
                  </div>
                </div>

              </div>

              {/* Title & info description */}
              <div className="p-6 space-y-4">
                <div>
                  <span className="bg-yellow-500 text-black font-mono font-bold text-[9px] uppercase tracking-widest px-2.5 py-0.5 rounded-none font-bold">
                    {selectedVideo.category}
                  </span>
                  <h2 className="text-xl md:text-2xl font-display font-black uppercase tracking-tight text-white mt-2">
                    {selectedVideo.title}
                  </h2>
                  <span className="text-zinc-500 font-mono text-xs mt-1 block">Caricato il {selectedVideo.date}</span>
                </div>

                <p className="text-zinc-400 text-sm leading-relaxed border-t border-zinc-900 pt-3">
                  {selectedVideo.description}
                </p>

                {/* Share and quick stats row */}
                <div className="flex flex-wrap gap-4 pt-2 justify-between">
                  <div className="flex gap-4 text-xs font-mono text-zinc-500">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {selectedVideo.views} visualizzazioni
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => handleLike(e, selectedVideo.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 border text-xs font-mono font-bold uppercase transition-all ${
                        likedVideos.includes(selectedVideo.id)
                          ? 'bg-red-950/20 border-red-500 text-red-500'
                          : 'border-zinc-800 hover:border-zinc-600'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${likedVideos.includes(selectedVideo.id) ? 'fill-red-500' : ''}`} />
                      <span>{getLikesCount(selectedVideo)} Mi Piace</span>
                    </button>
                    <button
                      onClick={() => alert("Link copiato negli appunti! Condividi con gli amici bianconeri.")}
                      className="border border-zinc-800 hover:border-zinc-600 px-3 py-1.5 text-xs font-mono font-bold uppercase flex items-center gap-1.5"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      Condividi
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Live Chat comments */}
            <div className="w-full lg:w-[350px] bg-zinc-950 p-6 flex flex-col justify-between max-h-[100%] overflow-y-auto">
              
              <div className="space-y-4 flex-grow flex flex-col justify-between overflow-y-auto">
                <div className="border-b border-zinc-900 pb-3 flex items-center justify-between">
                  <h3 className="text-sm font-display font-bold uppercase tracking-widest text-white flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-yellow-500" />
                    Commenti Tifosi
                  </h3>
                  <button onClick={closeVideo} className="text-zinc-500 hover:text-white font-mono text-xs uppercase font-extrabold">
                    Chiudi [X]
                  </button>
                </div>

                {/* Comments List flow container */}
                <div className="space-y-4 max-h-[300px] lg:max-h-[450px] overflow-y-auto pr-1 flex-grow">
                  {(videoComments[selectedVideo.id] || []).length === 0 ? (
                    <div className="text-center py-8 text-zinc-600 font-mono text-xs uppercase font-bold">
                      Nessun commento. Lascia il primo!
                    </div>
                  ) : (
                    (videoComments[selectedVideo.id] || []).map((comm) => (
                      <div key={comm.id} className="bg-black/40 border border-zinc-900 p-3 space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-xs text-yellow-500 font-black">{comm.author}</span>
                          <span className="text-[10px] text-zinc-600 font-mono">{comm.timestamp}</span>
                        </div>
                        <p className="text-zinc-300 text-xs leading-normal font-light">
                          {comm.content}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Add Comment input Form */}
              <form onSubmit={handlePostComment} className="border-t border-zinc-900 pt-4 mt-4 space-y-3">
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Il tuo nome / nickname..."
                    value={newCommentAuthor}
                    onChange={(e) => setNewCommentAuthor(e.target.value)}
                    required
                    className="w-full bg-black border border-zinc-850 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white uppercase tracking-wider font-mono"
                  />
                  <textarea
                    placeholder="Dicci la tua su questo video..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    required
                    rows={2}
                    className="w-full bg-black border border-zinc-850 px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-white resize-none font-light"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-white text-black text-center py-2 text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors rounded-none"
                >
                  Pubblica Commento
                </button>
              </form>

            </div>

          </div>
        </div>
      )}

      {/* Styled bouncy animations for mock player waves */}
      <style>{`
        @keyframes bounce {
          from { transform: scaleY(0.2); }
          to { transform: scaleY(1); }
        }
      `}</style>

    </div>
  );
}
