require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const authMiddleware = require('./middleware/auth');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const translateRouter = require('./routes/translate');
const analyzeRouter = require('./routes/analyze');
const paymentsRouter = require('./routes/payments');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Routes za umma
app.use('/api/translate', translateRouter);
app.use('/api/analyze-food', analyzeRouter);

// Routes zinazohitaji uthibitisho wa mtumiaji
app.use('/api/posts', authMiddleware, postsRouter);
app.use('/api/comments', authMiddleware, commentsRouter);
app.use('/api/payments', paymentsRouter); // zingine hazihitaji auth (approve/complete)

// Tumikia faili za frontend zilizojengwa (client/dist) - kwa deploy ya "huduma moja" kama Render
const clientDist = path.join(__dirname, '../client/dist');
app.use(express.static(clientDist));

// Njia yoyote isiyo /api inarudisha index.html (single-page app routing)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(clientDist, 'index.html'));
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong. Please try again.' });
});

app.listen(PORT, () => {
  console.log(`🌍 Feed the World API running on port ${PORT}`);
});