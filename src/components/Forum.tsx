import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { initialForumThreads } from '../data';
import { ForumThread, ForumPost } from '../types';
import { MessageSquare, Plus, Heart, Send, ArrowLeft, Search, Filter, AlertCircle, Eye, MessageCircle, User, Clock } from 'lucide-react';

export default function ForumComponent() {
  const [threads, setThreads] = useState<ForumThread[]>(() => {
    const saved = localStorage.getItem('juve_forum_threads');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return initialForumThreads;
  });

  const [selectedThread, setSelectedThread] = useState<ForumThread | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Tutti');
  const [isAddingThread, setIsAddingThread] = useState(false);

  // Form States for New Thread
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newCategory, setNewCategory] = useState<'Match Center' | 'Calciomercato' | 'Discussione Generale' | 'Tattica'>('Discussione Generale');
  const [newPostContent, setNewPostContent] = useState('');
  const [formError, setFormError] = useState('');

  // Form States for New Reply
  const [replyAuthor, setReplyAuthor] = useState('');
  const [replyContent, setReplyContent] = useState('');
  const [replyError, setReplyError] = useState('');

  // Sync threads with localStorage and active selection
  useEffect(() => {
    localStorage.setItem('juve_forum_threads', JSON.stringify(threads));
    if (selectedThread) {
      const updated = threads.find(t => t.id === selectedThread.id);
      if (updated) {
        setSelectedThread(updated);
      }
    }
  }, [threads]);

  // Categories list
  const categories = ['Tutti', 'Discussione Generale', 'Match Center', 'Calciomercato', 'Tattica'];

  // Handle Likes for posts
  const handleLikePost = (threadId: string, postId: string) => {
    setThreads(prev => prev.map(thread => {
      if (thread.id === threadId) {
        return {
          ...thread,
          posts: thread.posts.map(post => {
            if (post.id === postId) {
              return { ...post, likes: post.likes + 1 };
            }
            return post;
          })
        };
      }
      return thread;
    }));
  };

  // Add Reply
  const handleAddReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyAuthor.trim() || !replyContent.trim()) {
      setReplyError('Inserisci autore e messaggio per rispondere.');
      return;
    }

    if (!selectedThread) return;

    const newPost: ForumPost = {
      id: `p-${Date.now()}`,
      author: replyAuthor,
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      content: replyContent,
      likes: 0
    };

    setThreads(prev => prev.map(thread => {
      if (thread.id === selectedThread.id) {
        return {
          ...thread,
          repliesCount: thread.repliesCount + 1,
          posts: [...thread.posts, newPost]
        };
      }
      return thread;
    }));

    setReplyAuthor('');
    setReplyContent('');
    setReplyError('');
  };

  // Add Thread
  const handleCreateThread = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newAuthor.trim() || !newPostContent.trim()) {
      setFormError('Compila tutti i campi obbligatori per avviare il topic.');
      return;
    }

    const firstPost: ForumPost = {
      id: `p-${Date.now()}`,
      author: newAuthor,
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      content: newPostContent,
      likes: 0
    };

    const newThread: ForumThread = {
      id: `th-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      author: newAuthor,
      date: new Date().toISOString().slice(0, 10),
      repliesCount: 0,
      views: 1,
      posts: [firstPost]
    };

    setThreads([newThread, ...threads]);
    setNewTitle('');
    setNewAuthor('');
    setNewCategory('Discussione Generale');
    setNewPostContent('');
    setFormError('');
    setIsAddingThread(false);
  };

  // Select thread and increment view count
  const handleSelectThread = (thread: ForumThread) => {
    setThreads(prev => prev.map(t => {
      if (t.id === thread.id) {
        return { ...t, views: t.views + 1 };
      }
      return t;
    }));
    setSelectedThread(thread);
  };

  // Filters logic
  const filteredThreads = threads.filter(thread => {
    const matchesCategory = activeCategory === 'Tutti' || thread.category === activeCategory;
    const matchesSearch = thread.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <AnimatePresence mode="wait">
        {!selectedThread ? (
          /* Forum Overview Screen */
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Header section with Create Thread button */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-8">
              <div>
                <span className="text-xs font-bold uppercase bg-white text-black w-fit px-2.5 py-1 mb-3 tracking-widest inline-block">
                  Curva Virtuale
                </span>
                <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter text-white uppercase leading-none">
                  Forum <span className="text-stroke-white text-zinc-500">dei Tifosi</span>
                </h1>
                <p className="mt-2 text-zinc-400 max-w-xl text-xs md:text-sm">
                  Condividi le tue opinioni sulla Juventus con altri tifosi. Discuti di tattiche, mercato, partite e commenta in libertà!
                </p>
              </div>

              <button
                id="open-add-thread-btn"
                onClick={() => setIsAddingThread(!isAddingThread)}
                className="inline-flex items-center space-x-2 bg-white text-black font-bold uppercase tracking-wider px-6 py-3 rounded-none hover:bg-zinc-200 transition-all self-start md:self-center text-xs"
              >
                <Plus className="w-4 h-4" />
                <span>{isAddingThread ? 'Annulla' : 'Nuovo Argomento'}</span>
              </button>
            </div>

            {/* Create Thread Form */}
            {isAddingThread && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-zinc-900 border border-zinc-800 rounded-none p-6 md:p-8"
              >
                <h3 className="text-xl font-display font-black text-white uppercase mb-6 flex items-center space-x-2">
                  <Plus className="text-white w-5 h-5" />
                  <span>Apri una nuova discussione</span>
                </h3>

                <form onSubmit={handleCreateThread} className="space-y-5">
                  {formError && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded-none flex items-center space-x-2 text-xs">
                      <AlertCircle className="w-4 h-4" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] text-zinc-400 font-mono uppercase mb-2 font-bold">Titolo Discussione</label>
                      <input
                        id="thread-title-input"
                        type="text"
                        placeholder="Es: Cosa pensate del rendimento di Yıldız?"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full bg-black border border-zinc-800 rounded-none px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white text-xs uppercase tracking-wider"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-zinc-400 font-mono uppercase mb-2 font-bold">Sezione</label>
                      <select
                        id="thread-category-select"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as any)}
                        className="w-full bg-black border border-zinc-800 rounded-none px-4 py-3 text-white focus:outline-none focus:border-white text-xs uppercase tracking-wider"
                      >
                        <option value="Discussione Generale">Discussione Generale</option>
                        <option value="Match Center">Match Center</option>
                        <option value="Calciomercato">Calciomercato</option>
                        <option value="Tattica">Tattica</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-zinc-400 font-mono uppercase mb-2 font-bold">Primo Messaggio</label>
                    <textarea
                      id="thread-content-input"
                      rows={5}
                      placeholder="Scrivi qui la tua riflessione per iniziare la discussione..."
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-none px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] text-zinc-400 font-mono uppercase mb-2 font-bold">Pseudonimo / Nome Autore</label>
                      <input
                        id="thread-author-input"
                        type="text"
                        placeholder="Es: JuventusLover..."
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        className="w-full bg-black border border-zinc-800 rounded-none px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white text-xs uppercase tracking-wider"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        id="submit-thread-btn"
                        type="submit"
                        className="w-full bg-white text-black font-bold py-3 px-6 rounded-none hover:bg-zinc-200 transition-all text-xs uppercase tracking-wider"
                      >
                        Avvia Discussione
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Filters Bar */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-none p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-2.5 h-4.5 w-4.5 text-zinc-500" />
                <input
                  id="thread-search-input"
                  type="text"
                  placeholder="Cerca discussioni..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-black border border-zinc-800 rounded-none text-white placeholder-zinc-700 focus:outline-none focus:border-white text-xs uppercase tracking-wider"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-1.5">
                {categories.map(cat => (
                  <button
                    key={cat}
                    id={`thread-filter-${cat}`}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all ${
                      activeCategory === cat
                        ? 'bg-white text-black'
                        : 'bg-black text-zinc-400 hover:text-white border border-zinc-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Threads List Table / Cards Layout */}
            <div className="space-y-4">
              {filteredThreads.map(thread => (
                <div
                  key={thread.id}
                  id={`thread-row-${thread.id}`}
                  onClick={() => handleSelectThread(thread)}
                  className="bg-zinc-900 border border-zinc-800 hover:border-white p-5 rounded-none cursor-pointer transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl"
                >
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-[9px] font-mono uppercase bg-black text-white border border-zinc-800 px-2.5 py-1 rounded-none font-bold tracking-wider">
                        {thread.category}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono flex items-center uppercase tracking-wider font-bold">
                        <Clock className="w-3 h-3 mr-1" /> {thread.date}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-white text-base md:text-lg uppercase hover:opacity-70 transition-opacity">
                      {thread.title}
                    </h3>

                    <div className="flex items-center space-x-2 text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                      <span>Iniziata da:</span>
                      <span className="text-white font-bold">{thread.author}</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 text-[10px] font-mono text-zinc-400 border-t border-zinc-800 pt-3 md:pt-0 md:border-t-0 font-bold uppercase tracking-widest">
                    <span className="flex items-center space-x-1.5">
                      <Eye className="w-4 h-4 text-zinc-500" />
                      <span><strong>{thread.views}</strong> Letture</span>
                    </span>
                    <span className="flex items-center space-x-1.5">
                      <MessageCircle className="w-4 h-4 text-zinc-500" />
                      <span><strong>{thread.repliesCount}</strong> Risposte</span>
                    </span>
                  </div>
                </div>
              ))}

              {filteredThreads.length === 0 && (
                <div className="text-center py-20 bg-zinc-900 border border-zinc-800 rounded-none">
                  <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">Nessuna discussione trovata con questi criteri.</p>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          /* Deep Thread Detail View */
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            {/* Back Button */}
            <button
              id="back-to-forum-btn"
              onClick={() => setSelectedThread(null)}
              className="inline-flex items-center space-x-2 text-white hover:opacity-70 transition-all text-xs font-bold uppercase font-mono tracking-widest border border-zinc-800 px-4 py-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Indietro al Forum</span>
            </button>

            {/* Thread Header */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-none p-5 md:p-6 space-y-2">
              <span className="inline-block bg-white text-black text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-none mb-2">
                {selectedThread.category}
              </span>
              <h1 className="text-2xl md:text-3xl font-display font-black text-white uppercase tracking-tighter leading-none">
                {selectedThread.title}
              </h1>
              <div className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider font-bold flex items-center space-x-2">
                <span>Creato il: {selectedThread.date}</span>
                <span>•</span>
                <span>Letture: {selectedThread.views}</span>
              </div>
            </div>

            {/* Posts/Replies List */}
            <div className="space-y-4">
              {selectedThread.posts.map((post, idx) => (
                <div
                  key={post.id}
                  className={`bg-zinc-900 border ${
                    idx === 0 ? 'border-zinc-700' : 'border-zinc-800'
                  } rounded-none p-5 space-y-4 relative`}
                >
                  {idx === 0 && (
                    <span className="absolute top-4 right-4 bg-white text-black text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-none font-bold">
                      Creatore Topic
                    </span>
                  )}

                  {/* Metadata Header */}
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider font-bold text-zinc-500 col-span-1 border-b border-zinc-850 pb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-none bg-zinc-800 flex items-center justify-center text-white text-[10px] font-black border border-zinc-700">
                        {post.author.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-white">{post.author}</span>
                    </div>
                    <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> {post.date}</span>
                  </div>

                  {/* Message Body */}
                  <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light whitespace-pre-line">
                    {post.content}
                  </p>

                  {/* Likes / Actions bar */}
                  <div className="flex justify-end pt-3 border-t border-zinc-850">
                    <button
                      id={`post-like-btn-${post.id}`}
                      onClick={() => handleLikePost(selectedThread.id, post.id)}
                      className="flex items-center space-x-1.5 text-[10px] font-mono text-zinc-500 hover:text-white transition-all uppercase tracking-wider font-bold"
                    >
                      <Heart className="w-3.5 h-3.5 fill-transparent stroke-current" />
                      <span>{post.likes} Cuori</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Reply Form */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-none p-5 md:p-6 space-y-4">
              <h3 className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-bold">Aggiungi una risposta</h3>

              {replyError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3.5 rounded-none flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>{replyError}</span>
                </div>
              )}

              <form onSubmit={handleAddReply} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <input
                    id="reply-author-input"
                    type="text"
                    placeholder="Il tuo pseudonimo o nome..."
                    value={replyAuthor}
                    onChange={(e) => setReplyAuthor(e.target.value)}
                    className="bg-black border border-zinc-800 rounded-none px-4 py-2.5 text-white placeholder-zinc-700 focus:outline-none focus:border-white text-xs uppercase tracking-wider"
                  />
                  <textarea
                    id="reply-content-input"
                    rows={4}
                    placeholder="Scrivi qui la tua risposta, condividi il tuo parere..."
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    className="bg-black border border-zinc-800 rounded-none px-4 py-2.5 text-white placeholder-zinc-700 focus:outline-none focus:border-white text-xs"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    id="submit-reply-btn"
                    type="submit"
                    className="inline-flex items-center space-x-2 bg-white text-black font-bold px-5 py-2.5 rounded-none hover:bg-zinc-200 transition-all text-xs uppercase tracking-wider"
                  >
                    <Send className="w-4 h-4" />
                    <span>Invia Risposta</span>
                  </button>
                </div>
              </form>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
