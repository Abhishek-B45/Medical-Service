const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:5000', 'https://your-production-url.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

module.exports = cors(corsOptions);
