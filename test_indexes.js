const mongoose = require('mongoose');
const User = require('./server/models/User');
const { connectDB } = require('./server/config/db');

async function test() {
  await connectDB();
  try {
    const indexes = await User.collection.indexes();
    console.log('Indexes:', indexes);
  } catch (err) {
    console.error('Error:', err);
  }
  process.exit();
}
test();
