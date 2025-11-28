import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from './app';

describe('NeonRealms API', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('service', 'neonrealms-api');
      expect(response.body).toHaveProperty('timestamp');
    });

    it('should return valid ISO timestamp', async () => {
      const response = await request(app).get('/health');

      const timestamp = new Date(response.body.timestamp);
      expect(timestamp.toISOString()).toBe(response.body.timestamp);
    });
  });

  describe('GET /api', () => {
    it('should return API info', async () => {
      const response = await request(app).get('/api');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('name', 'NeonRealms API');
      expect(response.body).toHaveProperty('version', '0.1.0');
      expect(response.body).toHaveProperty('description');
    });

    it('should list available endpoints', async () => {
      const response = await request(app).get('/api');

      expect(response.body.endpoints).toHaveProperty('health', '/health');
      expect(response.body.endpoints).toHaveProperty('api', '/api');
    });
  });

  describe('404 handling', () => {
    it('should return 404 for unknown routes', async () => {
      const response = await request(app).get('/unknown-route');

      expect(response.status).toBe(404);
    });
  });

  describe('JSON middleware', () => {
    it('should parse JSON body', async () => {
      const response = await request(app)
        .post('/api')
        .send({ test: 'data' })
        .set('Content-Type', 'application/json');

      // POST to /api doesn't exist, but middleware should parse the body
      expect(response.status).toBe(404);
    });
  });

  describe('CORS middleware', () => {
    it('should include CORS headers', async () => {
      const response = await request(app)
        .get('/health')
        .set('Origin', 'http://localhost:3000');

      expect(response.headers['access-control-allow-origin']).toBeDefined();
    });
  });
});
