const request = require('supertest');
const app = require('./api/index');

async function test() {
  const res = await request(app)
    .post('/api/auth/members')
    .send({
      name: 'Route Test Member',
      email: 'routetest@example.com',
      password: 'password123',
      role: 'Administrator',
      assignedSectors: ['Educational']
    });
  
  console.log('Status:', res.status);
  console.log('Body:', res.body);
  process.exit();
}
test();
