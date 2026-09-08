const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from config.env or .env
dotenv.config({ path: path.resolve(__dirname, '../config.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, './.env') });

const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

const searchRouter = require('./routes/search');
const scholarshipsRouter = require('./routes/scholarships');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logger for API calls
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
  }
  next();
});

// API Routes
app.use('/api/search', searchRouter);
app.use('/api/scholarships', scholarshipsRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'ScholarSeek API operational' });
});

// Serve frontend static assets in production build
if (process.env.NODE_ENV === 'production' || process.env.SERVE_CLIENT === 'true') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

// Start Server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🚀 ScholarSeek Backend running on http://localhost:${PORT}`);
    console.log(`🔍 Search API endpoint: http://localhost:${PORT}/api/search`);
    console.log(`====================================================`);
  });
};

startServer();
