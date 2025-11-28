import express, { type Express } from 'express';
import cors, { type CorsOptions } from 'cors';

const app: Express = express();

const DEFAULT_ALLOWED_ORIGINS = ['http://localhost:3000'];
const allowedOrigins = (process.env.ALLOWED_ORIGINS ?? '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const originsToAllow = allowedOrigins.length > 0 ? allowedOrigins : DEFAULT_ALLOWED_ORIGINS;

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) {
      callback(null, false);
      return;
    }

    if (originsToAllow.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(null, false);
  },
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
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

export default app;
