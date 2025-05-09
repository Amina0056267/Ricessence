
const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Product routes
app.get('/products', db.getAllProducts);
app.get('/products/:id', db.getProductById);
app.post('/products', db.addProduct);
app.put('/products/:id', db.updateProduct);
app.delete('/products/:id', db.deleteProduct);

// Category routes
app.get('/categories', db.getAllCategories);

// Order route
app.post('/orders', db.createOrder);

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

app.post('/orders', (req, res, next) => {
  console.log('🛬 /orders route hit'); // ✅ NEW DEBUG LINE
  next(); // pass control to the real handler
}, db.createOrder);

app.get('/reviews/:productId', db.getReviewsByProductId);
app.post('/reviews', db.addReview);



