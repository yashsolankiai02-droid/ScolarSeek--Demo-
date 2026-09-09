const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from config.env or .env
dotenv.config({ path: path.resolve(__dirname, '../config.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, './.env') });

const mongoose = require('mongoose');
const Scholarship = require('./models/Scholarship');
const seedScholarships = require('./seedData');

const seedDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI || mongoURI.includes('localhost')) {
    console.log('⚠️ MONGODB_URI is not set to a cloud MongoDB Atlas URL in config.env');
    console.log('💡 Please paste your MongoDB Atlas connection string in config.env first.');
    process.exit(0);
  }

  try {
    console.log('⏳ Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 5000 });
    console.log('✅ Successfully connected to MongoDB Atlas!');
    await Scholarship.deleteMany({});
    console.log('🗑️ Existing collection cleared...');
    
    // Format items without _id to let MongoDB auto generate standard ObjectIDs
    const formatted = seedScholarships.map(({ _id, ...rest }) => rest);
    const created = await Scholarship.insertMany(formatted);
    console.log(`🎉 Successfully seeded ${created.length} scholarships into MongoDB Atlas!`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error.message);
    process.exit(1);
  }
};

seedDB();
