const mongoose = require('mongoose');
const User = require('./server/models/User');
const { connectDB } = require('./server/config/db');

async function test() {
  await connectDB();
  try {
    const newMember = await User.create({
      name: 'Test Member',
      email: 'testmember@example.com',
      password: 'password123',
      role: 'Administrator',
      assignedSectors: ['All Sectors']
    });
    console.log('Success:', newMember);
    await User.deleteOne({ email: 'testmember@example.com' });
  } catch (err) {
    console.error('Error:', err);
  }
  process.exit();
}
test();
