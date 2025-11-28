import app from './app';

const PORT = process.env.PORT || 4000;

// Start server
app.listen(PORT, () => {
  console.log(`NeonRealms API running on http://localhost:${PORT}`);
});
