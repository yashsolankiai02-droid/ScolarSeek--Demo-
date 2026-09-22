const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  const defaultURI = 'mongodb+srv://scolarseek_db_user:EuPMvAhGA2qZHCHI@scolarseek.mugfafz.mongodb.net/scholarseek?retryWrites=true&w=majority&appName=ScolarSeek';
  const mongoURI = process.env.MONGODB_URI || defaultURI;

  if (isConnected && mongoose.connection.readyState === 1) {
    return true;
  }

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    isConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ Could not connect to MongoDB Atlas (${error.message}).`);
    isConnected = false;
    return false;
  }
};

const getIsConnected = () => isConnected;

module.exports = { connectDB, getIsConnected };
