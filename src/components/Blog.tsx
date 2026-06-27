import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { initialArticles } from '../data';
import { Article, Comment } from '../types';
import { BookOpen, Plus, Heart, MessageSquare, Send, ArrowLeft, Clock, User, Filter, AlertCircle, CheckCircle } from 'lucide-react';

export default function BlogComponent() {
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('juve_articles');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return initialArticles;
  });

  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Tutti');
  const [isAddingArticle, setIsAddingArticle] = useState(false);

  // Form States for New Article
  const [newTitle, setNewTitle] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newCategory, setNewCategory] = useState('Analisi Tattica');
  const [formError, setFormError] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Form States for New Comment
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [commentError, setCommentError] = useState('');

  // Persist articles in localStorage
  useEffect(() => {
    localStorage.setItem('juve_articles', JSON.stringify(articles));
    if (selectedArticle) {
      // Keep selected article synced with state edits (e.g. comments/likes)
      const updated = articles.find(a => a.id === selectedArticle.id);
      if (updated) {
        setSelectedArticle(updated);
      }
    }
  }, [articles]);

  // Categories list
  const categories = ['Tutti', 'Analisi Tattica', 'Focus Giocatori', 'Match Preview', 'News'];

  // Handle Likes
  const handleLike = (articleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setArticles(prev => prev.map(art => {
      if (art.id === articleId) {
        return { ...art, likes: art.likes + 1 };
      }
      return art;
    }));
  };

  // Add Comment
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentAuthor.trim() || !commentContent.trim()) {
      setCommentError('Inserisci il nome e il commento prima di inviare.');
      return;
    }

    if (!selectedArticle) return;

    const newComment: Comment = {
      id: `comm-${Date.now()}`,
      author: commentAuthor,
      date: new Date().toISOString().slice(0, 16).replace('T', ' '),
      content: commentContent
    };

    setArticles(prev => prev.map(art => {
      if (art.id === selectedArticle.id) {
        return {
          ...art,
          comments: [newComment, ...art.comments]
        };
      }
      return art;
    }));

    setCommentAuthor('');
    setCommentContent('');
    setCommentError('');
  };

  // Create Article
  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim() || !newContent.trim() || !newAuthor.trim()) {
      setFormError('Compila tutti i campi prima di pubblicare.');
      return;
    }

    // Unsplash selection based on category for gorgeous visual results
    let selectedImage = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&h=450&fit=crop';
    if (newCategory === 'Focus Giocatori') {
      selectedImage = 'https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=800&h=450&fit=crop';
    } else if (newCategory === 'Match Preview') {
      selectedImage = 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&h=450&fit=crop';
    }

    const newArticle: Article = {
      id: `art-${Date.now()}`,
      title: newTitle,
      summary: newSummary,
      content: newContent,
      author: newAuthor,
      date: new Date().toISOString().slice(0, 10),
      category: newCategory,
      image: selectedImage,
      comments: [],
      likes: 0
    };

    setArticles([newArticle, ...articles]);
    
    // Clear forms
    setNewTitle('');
    setNewSummary('');
    setNewContent('');
    setNewAuthor('');
    setNewCategory('Analisi Tattica');
    setFormError('');
    setIsAddingArticle(false);
    
    // Show Toast
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  // Filtered Articles
  const filteredArticles = articles.filter(art => activeCategory === 'Tutti' || art.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Toast Alert Success */}
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 right-4 z-50 bg-zinc-900 border border-gold-500 rounded-xl p-4 shadow-2xl flex items-center space-x-3 max-w-sm"
          >
            <CheckCircle className="text-gold-500 w-6 h-6 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-white">Articolo Pubblicato!</h4>
              <p className="text-xs text-zinc-400 mt-0.5">Il tuo articolo è ora disponibile sul blog della Juventus.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!selectedArticle ? (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            {/* Header section with Publish Button */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-900 pb-8">
              <div>
                <span className="text-xs font-bold uppercase bg-white text-black w-fit px-2.5 py-1 mb-3 tracking-widest inline-block">
                  Juventus Editorial
                </span>
                <h1 className="text-4xl md:text-5xl font-display font-black tracking-tighter text-white uppercase leading-none">
                  Il Blog <span className="text-stroke-white text-zinc-500">dei Tifosi</span>
                </h1>
                <p className="mt-2 text-zinc-400 max-w-xl text-xs md:text-sm">
                  Rimani sempre aggiornato sulle novità di calciomercato, tattiche e curiosità del mondo bianconero. Aggiungi il tuo contributo!
                </p>
              </div>

              <button
                id="open-add-article-btn"
                onClick={() => setIsAddingArticle(!isAddingArticle)}
                className="inline-flex items-center space-x-2 bg-white text-black font-bold uppercase tracking-wider px-6 py-3 rounded-none hover:bg-zinc-200 transition-all self-start md:self-center text-xs"
              >
                <Plus className="w-4 h-4" />
                <span>{isAddingArticle ? 'Chiudi Scrittura' : 'Scrivi Articolo'}</span>
              </button>
            </div>

            {/* New Article Form Accordion */}
            {isAddingArticle && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-zinc-900 border border-zinc-800 rounded-none p-6 md:p-8 overflow-hidden"
              >
                <h3 className="text-xl font-display font-black text-white uppercase mb-6 flex items-center space-x-2">
                  <Plus className="text-white w-5 h-5" />
                  <span>Scrivi un nuovo articolo</span>
                </h3>

                <form onSubmit={handleCreateArticle} className="space-y-5">
                  {formError && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3.5 rounded-none flex items-center space-x-2 text-xs">
                      <AlertCircle className="w-4 h-4" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] text-zinc-400 font-mono uppercase mb-2 font-bold">Titolo Articolo</label>
                      <input
                        id="article-title-input"
                        type="text"
                        placeholder="Es: Analisi del nuovo acquisto..."
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="w-full bg-black border border-zinc-800 rounded-none px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white text-xs uppercase tracking-wider"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-zinc-400 font-mono uppercase mb-2 font-bold">Categoria</label>
                      <select
                        id="article-category-select"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full bg-black border border-zinc-800 rounded-none px-4 py-3 text-white focus:outline-none focus:border-white text-xs uppercase tracking-wider"
                      >
                        <option value="Analisi Tattica">Analisi Tattica</option>
                        <option value="Focus Giocatori">Focus Giocatori</option>
                        <option value="Match Preview">Match Preview</option>
                        <option value="News">News</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-zinc-400 font-mono uppercase mb-2 font-bold">Sommario Breve</label>
                    <input
                      id="article-summary-input"
                      type="text"
                      placeholder="Fornisci una sintesi accattivante dell'articolo..."
                      value={newSummary}
                      onChange={(e) => setNewSummary(e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-none px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white text-xs uppercase tracking-wider"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-zinc-400 font-mono uppercase mb-2 font-bold">Contenuto dell'Articolo</label>
                    <textarea
                      id="article-content-input"
                      rows={6}
                      placeholder="Scrivi qui il tuo articolo in modo esteso. Puoi usare descrizioni e commenti..."
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-none px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white text-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] text-zinc-400 font-mono uppercase mb-2 font-bold">Firma / Nome Autore</label>
                      <input
                        id="article-author-input"
                        type="text"
                        placeholder="Es: Marco Bianconero..."
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        className="w-full bg-black border border-zinc-800 rounded-none px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white text-xs uppercase tracking-wider"
                      />
                    </div>
                    <div className="flex items-end">
                      <button
                        id="submit-article-btn"
                        type="submit"
                        className="w-full bg-white text-black font-bold py-3 px-6 rounded-none hover:bg-zinc-200 transition-all text-xs uppercase tracking-wider"
                      >
                        Pubblica Articolo
                      </button>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Category Navigation filter */}
            <div className="flex flex-wrap gap-2 border-b border-zinc-900 pb-4">
              {categories.map(cat => (
                <button
                  key={cat}
                  id={`article-filter-${cat}`}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-none text-[10px] font-bold uppercase tracking-widest transition-all ${
                    activeCategory === cat
                      ? 'bg-white text-black'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map(article => (
                <article
                  key={article.id}
                  id={`article-card-${article.id}`}
                  onClick={() => setSelectedArticle(article)}
                  className="bg-zinc-900 border border-zinc-800 rounded-none overflow-hidden group hover:border-white transition-all cursor-pointer flex flex-col h-full shadow-2xl"
                >
                  {/* Article Cover Image */}
                  <div className="relative aspect-video bg-zinc-900 overflow-hidden border-b border-zinc-800">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300 mix-blend-luminosity"
                    />
                    <div className="absolute top-3 left-3 bg-black border border-zinc-850 text-white text-[9px] font-mono tracking-widest uppercase px-2.5 py-1 rounded-none font-bold">
                      {article.category}
                    </div>
                  </div>

                  {/* Article details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-3 text-[10px] text-zinc-500 font-mono mb-3 uppercase tracking-wider font-bold">
                        <span className="flex items-center"><User className="w-3 h-3 mr-1" /> {article.author}</span>
                        <span>•</span>
                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1" /> {article.date}</span>
                      </div>
                      
                      <h3 className="font-display font-black text-white text-lg lg:text-xl uppercase leading-none tracking-tighter mb-3">
                        {article.title}
                      </h3>
                      
                      <p className="text-zinc-400 text-xs mt-2 font-light leading-relaxed">
                        {article.summary}
                      </p>
                    </div>

                    {/* Likes & Comments counters footer */}
                    <div className="mt-6 pt-4 border-t border-zinc-800 flex items-center justify-between text-zinc-500 text-[10px] font-mono font-bold uppercase tracking-wider">
                      <button 
                        id={`like-btn-${article.id}`}
                        onClick={(e) => handleLike(article.id, e)}
                        className="flex items-center space-x-1.5 hover:text-white transition-all"
                      >
                        <Heart className="w-3.5 h-3.5 fill-transparent stroke-current" />
                        <span>{article.likes}</span>
                      </button>

                      <span className="flex items-center space-x-1 text-zinc-400">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>{article.comments.length} Commenti</span>
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* No articles fallback */}
            {filteredArticles.length === 0 && (
              <div className="text-center py-20 bg-zinc-950 border border-zinc-900 rounded-xl">
                <p className="text-zinc-500">Nessun articolo trovato in questa categoria.</p>
              </div>
            )}
          </motion.div>
        ) : (
          /* Detailed Single Article View */
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            {/* Back Button */}
            <button
              id="back-to-blog-btn"
              onClick={() => setSelectedArticle(null)}
              className="inline-flex items-center space-x-2 text-white hover:opacity-70 transition-all text-xs font-bold uppercase font-mono tracking-widest border border-zinc-800 px-4 py-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Torna al blog</span>
            </button>

            {/* Article Main Frame */}
            <div>
              <span className="inline-block bg-white text-black text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-none mb-4">
                {selectedArticle.category}
              </span>
              <h1 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tighter leading-none">
                {selectedArticle.title}
              </h1>

              {/* Author & Date metadata */}
              <div className="flex items-center space-x-4 text-xs text-zinc-500 font-mono mt-4 pb-6 border-b border-zinc-800 uppercase font-bold tracking-wider">
                <span className="flex items-center"><User className="w-4 h-4 mr-1.5" /> {selectedArticle.author}</span>
                <span>|</span>
                <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5" /> {selectedArticle.date}</span>
                <span>|</span>
                <button 
                  id={`detail-like-btn-${selectedArticle.id}`}
                  onClick={(e) => handleLike(selectedArticle.id, e)} 
                  className="flex items-center space-x-1 text-white hover:opacity-70 transition-all font-bold"
                >
                  <Heart className="w-4 h-4 fill-white/10 stroke-current" />
                  <span>{selectedArticle.likes} Cuori</span>
                </button>
              </div>
            </div>

            {/* Article Image Banner */}
            <div className="aspect-video bg-zinc-900 rounded-none overflow-hidden border border-zinc-800">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover mix-blend-luminosity"
              />
            </div>

            {/* Article Text Content */}
            <div className="prose prose-invert max-w-none text-zinc-300 leading-relaxed space-y-4 text-base md:text-lg">
              {selectedArticle.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('###')) {
                  return <h3 key={idx} className="text-xl md:text-2xl font-display font-black text-white uppercase mt-8 mb-4 tracking-tighter">{paragraph.replace('###', '').trim()}</h3>;
                }
                return <p key={idx} className="font-light text-zinc-400">{paragraph}</p>;
              })}
            </div>

            {/* Interactive Comment Section */}
            <div className="border-t border-zinc-900 pt-10 space-y-8">
              <h3 className="text-xl font-display font-black text-white uppercase tracking-tighter flex items-center space-x-2">
                <MessageSquare className="text-white w-5 h-5" />
                <span>Discussione ({selectedArticle.comments.length})</span>
              </h3>

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="bg-zinc-900 border border-zinc-800 rounded-none p-5 md:p-6 space-y-4">
                <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider font-bold">Aggiungi un commento</h4>
                
                {commentError && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs p-3 rounded-none flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{commentError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4">
                  <input
                    id="comment-author-input"
                    type="text"
                    placeholder="Il tuo pseudonimo o nome..."
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    className="bg-black border border-zinc-800 rounded-none px-4 py-2.5 text-white placeholder-zinc-700 focus:outline-none focus:border-white text-xs uppercase tracking-wider"
                  />
                  <textarea
                    id="comment-content-input"
                    rows={3}
                    placeholder="Scrivi qui il tuo commento o opinione..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    className="bg-black border border-zinc-800 rounded-none px-4 py-2.5 text-white placeholder-zinc-700 focus:outline-none focus:border-white text-xs"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    id="submit-comment-btn"
                    type="submit"
                    className="inline-flex items-center space-x-2 bg-white text-black font-bold uppercase tracking-wider px-5 py-2.5 rounded-none hover:bg-zinc-200 transition-all text-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Commenta</span>
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-4">
                {selectedArticle.comments.map(comment => (
                  <div key={comment.id} className="bg-zinc-900 border border-zinc-800 p-4 rounded-none space-y-2">
                    <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold">
                      <span className="text-white">{comment.author}</span>
                      <span>{comment.date}</span>
                    </div>
                    <p className="text-zinc-400 text-xs leading-relaxed">{comment.content}</p>
                  </div>
                ))}

                {selectedArticle.comments.length === 0 && (
                  <p className="text-center py-6 text-zinc-500 text-xs font-mono uppercase tracking-widest">Ancora nessun commento. Sii il primo a scriverne uno!</p>
                )}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
