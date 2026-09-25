const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../../config.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const express = require('express');
const cors = require('cors');
const { connectDB } = require('../../server/config/db');

const searchRouter = require('../../server/routes/search');
const scholarshipsRouter = require('../../server/routes/scholarships');
const authRouter = require('../../server/routes/auth');

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.error('MongoDB connection error in Vercel function:', err);
  }
  next();
});

app.use(['/api/search', '/search'], searchRouter);
app.use(['/api/scholarships', '/scholarships'], scholarshipsRouter);
app.use(['/api/auth', '/auth'], authRouter);

app.get(['/api/health', '/health'], (req, res) => {
  res.status(200).json({ status: 'OK', message: 'ScholarSeek API operational on Vercel' });
});

app.options('*', cors());

module.exports = (req, res) => {
  return app(req, res);
};
