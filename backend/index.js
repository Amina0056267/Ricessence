
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const db = require('./db');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey123';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

// Auth Middleware
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Login Route
app.post('/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid password' });
  }
});

// Product routes
app.get('/products', db.getAllProducts);
app.get('/products/:id', db.getProductById);
app.post('/products', authenticateJWT, db.addProduct);
app.put('/products/:id', authenticateJWT, db.updateProduct);
app.delete('/products/:id', authenticateJWT, db.deleteProduct);

// Category routes
app.get('/categories', async (req, res) => {
  const categories = await db.all('SELECT * FROM categories');
  res.json(categories);
});

// Order routes
app.get('/orders', authenticateJWT, db.getOrders);
app.post('/orders', (req, res, next) => {
  console.log('🛬 /orders route hit');
  next(); 
}, db.createOrder);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

app.get('/reviews/:productId', db.getReviewsByProductId);
app.post('/reviews', db.addReview);



