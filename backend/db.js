const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./data.sqlite');

// Run once: create tables
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      price REAL,
      image TEXT,
      categoryId INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      address TEXT,
      items TEXT,
      total REAL,
      createdAt TEXT
    )
  `);
});

// -------------------
// Product Handlers
// -------------------

exports.getAllProducts = (req, res) => {
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

exports.getProductById = (req, res) => {
  db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json(err);
    res.json(row);
  });
};

exports.addProduct = (req, res) => {
  const { name, description, price, image, categoryId } = req.body;
  db.run(
    'INSERT INTO products (name, description, price, image, categoryId) VALUES (?, ?, ?, ?, ?)',
    [name, description, price, image, categoryId],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ id: this.lastID, ...req.body });
    }
  );
};

exports.updateProduct = (req, res) => {
  const { name, description, price, image, categoryId } = req.body;
  db.run(
    'UPDATE products SET name = ?, description = ?, price = ?, image = ?, categoryId = ? WHERE id = ?',
    [name, description, price, image, categoryId, req.params.id],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ updated: this.changes });
    }
  );
};

exports.deleteProduct = (req, res) => {
  db.run('DELETE FROM products WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ deleted: this.changes });
  });
};

// -------------------
// Category Handlers
// -------------------

exports.getAllCategories = (req, res) => {
  db.all('SELECT * FROM categories', [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
};

// -------------------
// Order Handlers
// -------------------

exports.createOrder = (req, res) => {
  const { name, email, address, items, total } = req.body;
  const createdAt = new Date().toISOString();

  // 🔍 Debug log: shows incoming order
  console.log('📥 Received order:', req.body);

  db.run(
    `INSERT INTO orders (name, email, address, items, total, createdAt)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, email, address, JSON.stringify(items), total, createdAt],
    function (err) {
      if (err) {
        console.error('❌ Failed to insert order:', err.message);
        return res.status(500).json(err);
      }

      console.log('✅ Order saved to DB with ID:', this.lastID);
      res.json({ id: this.lastID, ...req.body });
    }
  );
};
