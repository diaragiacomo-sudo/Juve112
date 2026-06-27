export interface PlayerStats {
  matches: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  minutesPlayed: number;
  rating: number; // e.g., 7.4
}

export interface Player {
  id: string;
  name: string;
  number: number;
  position: 'Portiere' | 'Difensore' | 'Centrocampista' | 'Attaccante';
  age: number;
  nationality: string;
  image: string;
  stats: PlayerStats;
}

export interface Comment {
  id: string;
  author: string;
  date: string;
  content: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  comments: Comment[];
  likes: number;
}

export interface ForumPost {
  id: string;
  author: string;
  date: string;
  content: string;
  likes: number;
}

export interface ForumThread {
  id: string;
  title: string;
  category: 'Match Center' | 'Calciomercato' | 'Discussione Generale' | 'Tattica';
  author: string;
  date: string;
  repliesCount: number;
  views: number;
  posts: ForumPost[];
}

export interface Trophy {
  id: string;
  name: string;
  count: number;
  years: string[];
  iconName: string;
}

export interface HistoryMilestone {
  year: string;
  title: string;
  description: string;
}
