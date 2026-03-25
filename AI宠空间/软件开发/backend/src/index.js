const express = require('express');
const cors = require('cors');
const client = require('prom-client');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Prometheus metrics setup
const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

app.use(cors());
app.use(express.json());

// API Routes placeholder
app.get('/v1/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Auth Routes
app.post('/v1/auth/register', (req, res) => {
  const { account, password } = req.body;
  // Mock registration
  res.status(201).json({
    code: 200,
    message: 'success',
    data: {
      token: 'mock-jwt-token',
      user_info: { account, name: account }
    }
  });
});

app.post('/v1/auth/login', (req, res) => {
  const { account, password } = req.body;
  // Mock login
  res.json({
    code: 200,
    message: 'success',
    data: {
      token: 'mock-jwt-token',
      user_info: { account, name: account }
    }
  });
});

app.post('/v1/auth/logout', (req, res) => {
  res.json({ code: 200, message: 'success' });
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(port, () => {
  console.log(`PetCare Backend listening on port ${port}`);
});
