const pool = require('../config/db');

const seed = async () => {
  await pool.query(`
    INSERT INTO categories (name) VALUES
    ('Electronics'), ('Books'), ('Clothing'), ('Kitchen'), ('Sports')
    ON CONFLICT DO NOTHING;
  `);

  await pool.query(`
    INSERT INTO products (name, description, price, stock, category_id, images, rating, review_count, specifications) VALUES
    ('Apple iPhone 15', 'Latest iPhone with A16 chip', 79999, 50, 1,
    ARRAY['https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500'],
    4.5, 2341, '{"Storage":"128GB","Color":"Black","Display":"6.1 inch"}'),
    ('Samsung 65" 4K TV', 'Crystal clear 4K display', 54999, 20, 1,
    ARRAY['https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500'],
    4.3, 876, '{"Resolution":"4K","Size":"65 inch","HDR":"Yes"}'),
    ('Sony WH-1000XM5 Headphones', 'Industry leading noise cancellation', 24999, 100, 1,
    ARRAY['https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500'],
    4.7, 5432, '{"Type":"Over-ear","Wireless":"Yes","Battery":"30hrs"}'),
    ('The Alchemist', 'Paulo Coelho bestseller novel', 299, 200, 2,
    ARRAY['https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500'],
    4.8, 12000, '{"Author":"Paulo Coelho","Pages":"197","Language":"English"}'),
    ('Atomic Habits', 'Build good habits, break bad ones', 499, 150, 2,
    ARRAY['https://images.unsplash.com/photo-1589998059171-988d887df646?w=500'],
    4.9, 8700, '{"Author":"James Clear","Pages":"320","Language":"English"}'),
    ('Men''s Running Shoes', 'Lightweight running shoes', 2999, 80, 5,
    ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'],
    4.2, 3200, '{"Material":"Mesh","Sole":"Rubber","Sizes":"6-12"}'),
    ('Yoga Mat', 'Anti-slip premium yoga mat', 799, 120, 5,
    ARRAY['https://images.unsplash.com/photo-1601925228988-22e4d1b5af2c?w=500'],
    4.4, 1500, '{"Thickness":"6mm","Material":"TPE","Size":"183x61cm"}'),
    ('Men''s Cotton T-Shirt', 'Comfortable everyday t-shirt', 499, 300, 3,
    ARRAY['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'],
    4.1, 6700, '{"Material":"100% Cotton","Fit":"Regular","Sizes":"S-XXL"}'),
    ('Non-stick Cookware Set', '5-piece kitchen cookware set', 3499, 40, 4,
    ARRAY['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500'],
    4.6, 980, '{"Pieces":"5","Material":"Aluminum","Dishwasher Safe":"Yes"}'),
    ('Air Fryer 4L', 'Healthy cooking with less oil', 4999, 60, 4,
    ARRAY['https://images.unsplash.com/photo-1648170547949-e4fb8c0c7e24?w=500'],
    4.5, 2100, '{"Capacity":"4L","Wattage":"1500W","Timer":"60 min"}')
  `);

  console.log('✅ Database seeded!');
  process.exit();
};

seed().catch(console.error);