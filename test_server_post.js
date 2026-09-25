const app = require('./api/index');
const http = require('http');

const server = http.createServer(app);
server.listen(4000, async () => {
  console.log('Server running on port 4000');
  try {
    const res = await fetch('http://localhost:4000/api/auth/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Fetch Member',
        email: 'testfetch@example.com',
        password: 'password123',
        role: 'Administrator',
        assignedSectors: ['Educational']
      })
    });
    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Data:', data);
  } catch (err) {
    console.error('Fetch Error:', err);
  }
  process.exit();
});
