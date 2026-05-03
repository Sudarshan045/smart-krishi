// src/server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import connectDB from './config/db.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';

// Route imports
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import passport from 'passport';
import './config/passport.js';
import calculationRoutes from './routes/calculations.js';
import chatRoutes from './routes/chat.js';
import adminRoutes from './routes/admin.js';
import translateRoutes from './routes/translate.js';
import aiRoutes from './routes/ai.js';

// ─────────────────────────────────────────────
// Connect to MongoDB
// ─────────────────────────────────────────────
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ─────────────────────────────────────────────
// Security Middleware
// ─────────────────────────────────────────────
app.use(helmet()); // secure HTTP headers

// CORS — allow frontend dev server
app.use(cors({
  origin: [
    process.env.CLIENT_URL || 'http://localhost:3001',
    'http://localhost:3000',
    'http://localhost:3002',
    'http://localhost:5173',
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Global rate limit — generous, tighter limits on specific routes
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 500,                    // 500 requests per IP
  message: { success: false, message: 'Too many requests. Please slow down.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(globalLimiter);

// ─────────────────────────────────────────────
// Body Parsing
// ─────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));  // limit JSON body size
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(passport.initialize());

// ─────────────────────────────────────────────
// Request Logging
// ─────────────────────────────────────────────
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// ─────────────────────────────────────────────
// Health Check (Public)
// ─────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'Smart Krishi API is running 🌾',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// ─────────────────────────────────────────────
// API Routes
// ─────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/calculations', calculationRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/translate', translateRoutes);
app.use('/api/ai', aiRoutes);

// ─────────────────────────────────────────────
// Error Handling
// ─────────────────────────────────────────────
app.use(notFoundHandler);   // 404 for unmatched routes
app.use(errorHandler);      // central error handler

// ─────────────────────────────────────────────
// Start Server
// ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Smart Krishi API running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log('─'.repeat(50));
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err.message);
  process.exit(1);
});

export default app;
