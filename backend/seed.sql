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

-- Insert categories (auto-increment IDs)
INSERT INTO categories (name) VALUES
  ('Masks'),
  ('Oils & Serums'),
  ('Scalp & Cleansers');

-- Insert products (local image paths under src/assets/images/)
-- Insert products (local image paths under src/assets/images/)
INSERT INTO products (name, description, price, image, categoryId) VALUES
  ('Hydrating Rice Mask', 'A deeply nourishing hair mask made with fermented rice water.', 14.99, '/assets/images/rice-hair-mask.jpeg', 1),
  ('Lightweight Rice Oil', 'A non-greasy, shine-enhancing hair oil packed with nutrients.', 12.50, '/assets/images/rice-oil.jpeg', 2),
  ('Clarifying Rice Scalp Scrub', 'Removes buildup and promotes a healthy scalp environment.', 10.00, '/assets/images/rice-scrub.jpeg', 3),
  ('Moisture Boost Conditioner', 'Deeply conditions and softens dry, brittle hair.', 11.75, '/assets/images/rice-conditioner.jpeg', 1),
  ('Rice Repair Serum', 'Strengthens hair strands and reduces breakage over time.', 16.99, '/assets/images/rice-serum.jpeg', 2),
  ('Gentle Rice Cleanser', 'Sulfate-free shampoo with rice extract to cleanse and soothe.', 13.50, '/assets/images/rice-cleanser.jpeg', 3);
