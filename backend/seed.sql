-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  description TEXT,
  price REAL,
  image TEXT,
  categoryId INTEGER
);

-- Insert categories
INSERT INTO categories (id, name) VALUES
  (1, 'Masks'),
  (2, 'Oils & Serums'),
  (3, 'Scalp & Cleansers');

-- Insert products
INSERT INTO products (id, name, description, price, image, categoryId) VALUES
  (1, 'Hydrating Rice Mask', 'A deeply nourishing hair mask made with fermented rice water.', 14.99, '/assets/images/rice-mask.jpg', 1),
  (2, 'Lightweight Rice Oil', 'A non-greasy, shine-enhancing hair oil packed with nutrients.', 12.50, '/assets/images/rice-oil.jpg', 2),
  (3, 'Clarifying Rice Scalp Scrub', 'Removes buildup and promotes a healthy scalp environment.', 10.00, '/assets/images/rice-scrub.jpg', 3),
  (4, 'Moisture Boost Rice Conditioner', 'Deeply conditions and softens dry, brittle hair.', 11.75, '/assets/images/rice-conditioner.jpg', 1),
  (5, 'Rice Repair Serum', 'Strengthens hair strands and reduces breakage over time.', 16.99, '/assets/images/rice-serum.jpg', 2),
  (6, 'Gentle Rice Cleanser', 'Sulfate-free shampoo with rice extract to cleanse and soothe.', 13.50, '/assets/images/rice-cleanser.jpg', 3);
