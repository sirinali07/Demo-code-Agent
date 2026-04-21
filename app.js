const express = require('express');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET;
const AUTH_USERNAME = process.env.AUTH_USERNAME;
const AUTH_PASSWORD = process.env.AUTH_PASSWORD;

if (!JWT_SECRET || !AUTH_USERNAME || !AUTH_PASSWORD) {
  throw new Error('JWT_SECRET, AUTH_USERNAME, and AUTH_PASSWORD environment variables are required');
}

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});

app.post('/login', authLimiter, (req, res) => {
  const { username, password } = req.body || {};

  if (username !== AUTH_USERNAME || password !== AUTH_PASSWORD) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  return res.json({ token });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    return next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
}

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/protected', authLimiter, authenticateToken, (req, res) => {
  res.json({ message: `Protected route accessed by ${req.user.username}` });
});

if (require.main === module) {
  app.listen(3000, () => console.log('Server running'));
}

module.exports = app;
