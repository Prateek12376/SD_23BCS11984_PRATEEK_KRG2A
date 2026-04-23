const pool = require('../config/db');
const cache = require('../config/cache');  

const getAllProducts = async (req, res) => {
  try {
    const { search, category, page = 1, limit = 8 } = req.query;

    // cache key 
    const cacheKey = `products_${search}_${category}_${page}_${limit}`;

    //if result is already cached
    const cached = cache.get(cacheKey);
    if (cached) {
      console.log(`Cache HIT for key: ${cacheKey}`);
      return res.json(cached);
    }
    console.log(`Cache MISS for key: ${cacheKey} — querying DB`);

    const offset = (page - 1) * limit;
    let query = `SELECT p.*, c.name as category_name FROM products p 
                LEFT JOIN categories c ON p.category_id = c.id WHERE 1=1`;
    let countQuery = `SELECT COUNT(*) FROM products p 
                      LEFT JOIN categories c ON p.category_id = c.id WHERE 1=1`;
    const params = [];

    if (search) {
      params.push(`%${search}%`);
      query += ` AND p.name ILIKE $${params.length}`;
      countQuery += ` AND p.name ILIKE $${params.length}`;
    }
    if (category) {
      params.push(category);
      query += ` AND c.name = $${params.length}`;
      countQuery += ` AND c.name = $${params.length}`;
    }

    query += ` ORDER BY p.created_at DESC`;
    params.push(limit);
    query += ` LIMIT $${params.length}`;
    params.push(offset);
    query += ` OFFSET $${params.length}`;

    const [result, countResult] = await Promise.all([
      pool.query(query, params),
      pool.query(countQuery, params.slice(0, -2))
    ]);

    const totalProducts = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(totalProducts / limit);

    const response = {
      products: result.rows,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalProducts,
        limit: parseInt(limit),
        hasNextPage: parseInt(page) < totalPages,
        hasPrevPage: parseInt(page) > 1
      }
    };

    // Save result to cache for 5 minutes
    cache.set(cacheKey, response);
    console.log(`Cache SET for key: ${cacheKey}`);

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT p.*, c.name as category_name FROM products p 
      LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = $1`,
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories ORDER BY name');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Call this if you ever update products to clear stale cache
const clearProductCache = () => {
  cache.flushAll();
  console.log('Product cache cleared');
};

module.exports = { getAllProducts, getProductById, getCategories, clearProductCache };