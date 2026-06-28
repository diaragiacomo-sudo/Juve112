import express from "express";
import path from "path";
import Database from "better-sqlite3";
import { createServer as createViteServer } from "vite";
import fs from "fs";

// To make this work nicely when built, we can't easily import from src/data.ts
// if esbuild is strict, but esbuild bundles it so we actually can.
import { initialArticles } from "./src/data";

const dbPath = path.join(process.cwd(), "news.db");
const db = new Database(dbPath);

// Initialize DB schema
db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    date TEXT NOT NULL,
    category TEXT NOT NULL,
    image TEXT NOT NULL,
    likes INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY,
    article_id TEXT NOT NULL,
    author TEXT NOT NULL,
    date TEXT NOT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY(article_id) REFERENCES articles(id) ON DELETE CASCADE
  );
`);

// Seed database if empty
const countStmt = db.prepare("SELECT COUNT(*) as count FROM articles");
const countResult = countStmt.get() as { count: number };
if (countResult.count === 0) {
  const insertArticle = db.prepare(`
    INSERT INTO articles (id, title, summary, content, author, date, category, image, likes)
    VALUES (@id, @title, @summary, @content, @author, @date, @category, @image, @likes)
  `);
  
  const insertComment = db.prepare(`
    INSERT INTO comments (id, article_id, author, date, content)
    VALUES (@id, @article_id, @author, @date, @content)
  `);

  const insertMany = db.transaction((articles) => {
    for (const article of articles) {
      insertArticle.run({
        id: article.id,
        title: article.title,
        summary: article.summary,
        content: article.content,
        author: article.author,
        date: article.date,
        category: article.category,
        image: article.image,
        likes: article.likes,
      });

      for (const comment of article.comments) {
        insertComment.run({
          id: comment.id,
          article_id: article.id,
          author: comment.author,
          date: comment.date,
          content: comment.content,
        });
      }
    }
  });

  insertMany(initialArticles);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/articles", (req, res) => {
    try {
      const articles = db.prepare("SELECT * FROM articles ORDER BY date DESC, id DESC").all();
      const comments = db.prepare("SELECT * FROM comments ORDER BY date DESC").all();

      // Group comments by article_id
      const formattedArticles = articles.map((art: any) => {
        return {
          ...art,
          comments: comments.filter((c: any) => c.article_id === art.id)
        };
      });

      res.json(formattedArticles);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch articles" });
    }
  });

  app.post("/api/articles", (req, res) => {
    const { id, title, summary, content, author, date, category, image, likes } = req.body;
    try {
      const insertArticle = db.prepare(`
        INSERT INTO articles (id, title, summary, content, author, date, category, image, likes)
        VALUES (@id, @title, @summary, @content, @author, @date, @category, @image, @likes)
      `);
      insertArticle.run({ id, title, summary, content, author, date, category, image, likes });
      res.json({ success: true, article: req.body });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to insert article" });
    }
  });

  app.post("/api/articles/:id/like", (req, res) => {
    try {
      db.prepare("UPDATE articles SET likes = likes + 1 WHERE id = ?").run(req.params.id);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: "Failed to like article" });
    }
  });

  app.post("/api/articles/:id/comments", (req, res) => {
    const { id: commentId, author, date, content } = req.body;
    try {
      const insertComment = db.prepare(`
        INSERT INTO comments (id, article_id, author, date, content)
        VALUES (@id, @article_id, @author, @date, @content)
      `);
      insertComment.run({
        id: commentId,
        article_id: req.params.id,
        author,
        date,
        content,
      });
      res.json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to insert comment" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
