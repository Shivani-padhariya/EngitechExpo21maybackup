// ─── Crash handlers FIRST — before any require() ─────────
process.on('uncaughtException', (err) => {
  console.error('💥 UNCAUGHT EXCEPTION:', err.message);
  console.error(err.stack);
  process.exit(1);
});
process.on('unhandledRejection', (reason) => {
  console.error('💥 UNHANDLED REJECTION:', reason);
  process.exit(1);
});

console.log('[BOOT] Step 1 — handlers registered');

require('dotenv').config();
console.log('[BOOT] Step 2 — dotenv loaded');

// Fix: Node.js DNS defaults to 127.0.0.1 on this machine; override to Google DNS
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
console.log('[BOOT] Step 3 — dns overridden');

const express = require('express');
console.log('[BOOT] Step 4 — express loaded');

const mongoose = require('mongoose');
console.log('[BOOT] Step 5 — mongoose loaded');

const cors = require('cors');
console.log('[BOOT] Step 6 — cors loaded');

const authRoutes = require('./routes/auth');
console.log('[BOOT] Step 7 — auth routes loaded');

const blogRoutes = require('./routes/blogs');
console.log('[BOOT] Step 8 — blog routes loaded');

const formRoutes = require('./routes/forms');
console.log('[BOOT] Step 9 — form routes loaded');

const app = express();
console.log('[BOOT] Step 10 — express app created');

// ─── Middleware ───────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:3002',
  'http://localhost:3003',
  'https://engitechexpo.onrender.com',
  'https://engitechexpo.com',
  'https://www.engitechexpo.com',
  ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (origin.startsWith('http://localhost:')) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS: origin ${origin} not allowed`));
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logger
app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.url}`);
  next();
});

// Serve robots.txt to block crawlers
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /\n');
});

// ─── Routes ──────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/forms', formRoutes);

// Health check
app.get('/api/health', async (req, res) => {
  let dbInfo = { connected: false, dbName: null, blogCount: null };
  try {
    if (mongoose.connection.readyState === 1) {
      const Blog = require('./models/Blog');
      const [total, published] = await Promise.all([
        Blog.countDocuments(),
        Blog.countDocuments({ status: 'published' })
      ]);
      dbInfo = {
        connected: true,
        dbName: mongoose.connection.db.databaseName,
        totalBlogs: total,
        publishedBlogs: published
      };
    }
  } catch(e) { dbInfo.error = e.message; }

  res.json({
    success: true,
    message: 'EngiTech Expo API is running',
    timestamp: new Date(),
    env: {
      hasMongoUri: !!process.env.MONGO_URI,
      port: process.env.PORT || '5000 (default)',
      nodeVersion: process.version
    },
    db: dbInfo
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.url} not found` });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// ─── Database + Start ─────────────────────────────────────
const PORT = process.env.PORT || 5000;
console.log(`[BOOT] Step 11 — PORT=${PORT}, MONGO_URI=${process.env.MONGO_URI ? 'SET' : 'NOT SET'}`);

function startServer() {
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📋 Admin: ${process.env.ADMIN_EMAIL || 'NOT SET'}`);
  });
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`[WARN] Port ${PORT} already in use — server may already be running`);
    } else {
      console.error('Server error:', err);
    }
  });
}

if (process.env.MONGO_URI) {
  console.log('[BOOT] Connecting to MongoDB...');
  mongoose.connect(process.env.MONGO_URI)
    .then(() => {
      console.log('✅ MongoDB connected');
      startServer();
    })
    .catch(err => {
      console.error('❌ MongoDB connection failed:', err.message);
      console.warn('[BOOT] Starting without DB — limited functionality');
      startServer();
    });
} else {
  console.warn('[BOOT] No MONGO_URI — starting without DB');
  startServer();
}

// Export for Hostinger's runner (it may try to call app.listen — we already did it above)
module.exports = app;
