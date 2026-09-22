const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from config.env or .env
dotenv.config({ path: path.resolve(__dirname, '../config.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const { connectDB } = require('../server/config/db');

const searchRouter = require('../server/routes/search');
const scholarshipsRouter = require('../server/routes/scholarships');
const authRouter = require('../server/routes/auth');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Ensure MongoDB Atlas Connection on Vercel Serverless Function invocations
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.error('MongoDB connection error in Vercel function:', err);
  }
  next();
});

// Request logger for API calls
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    console.log(`[Vercel Serverless ${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
  }
  next();
});

// API Routes
app.use('/api/search', searchRouter);
app.use('/api/scholarships', scholarshipsRouter);
app.use('/api/auth', authRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'ScholarSeek API operational on Vercel' });
});

// Root API fallback
app.get('/api', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'ScholarSeek Vercel Serverless API' });
});

module.exports = app;
