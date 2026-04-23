const pool = require('../config/db');

const getCart = async (req, res) => {
  try {
    const { session_id } = req.params;
    const result = await pool.query(
      `SELECT c.*, p.name, p.price, p.images, p.stock 
      FROM cart c JOIN products p ON c.product_id = p.id 
      WHERE c.session_id = $1`,
      [session_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const { session_id, product_id, quantity = 1 } = req.body;
    const result = await pool.query(
      `INSERT INTO cart (session_id, product_id, quantity) VALUES ($1, $2, $3)
      ON CONFLICT (session_id, product_id) 
       DO UPDATE SET quantity = cart.quantity + $3 RETURNING *`,
      [session_id, product_id, quantity]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    if (quantity <= 0) {
      await pool.query('DELETE FROM cart WHERE id = $1', [id]);
      return res.json({ message: 'Item removed' });
    }
    const result = await pool.query(
      'UPDATE cart SET quantity = $1 WHERE id = $2 RETURNING *',
      [quantity, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM cart WHERE id = $1', [id]);
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const { session_id } = req.params;
    await pool.query('DELETE FROM cart WHERE session_id = $1', [session_id]);
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeFromCart, clearCart };