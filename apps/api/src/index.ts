import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'neonrealms-api',
    timestamp: new Date().toISOString(),
  });
});

// API info
app.get('/api', (_req, res) => {
  res.json({
    name: 'NeonRealms API',
    version: '0.1.0',
    description: 'Backend API for NeonRealms RPG platform',
    endpoints: {
      health: '/health',
      api: '/api',
    },
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`NeonRealms API running on http://localhost:${PORT}`);
});
