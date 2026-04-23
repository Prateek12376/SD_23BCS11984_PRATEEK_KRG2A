const pool = require('../config/db');

const placeOrder = async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const { session_id, full_name, address, city, state, zip, phone } = req.body;

    const cartResult = await client.query(
      `SELECT c.*, p.price, p.stock FROM cart c 
      JOIN products p ON c.product_id = p.id WHERE c.session_id = $1`,
      [session_id]
    );
    if (cartResult.rows.length === 0) return res.status(400).json({ error: 'Cart is empty' });

    const subtotal = cartResult.rows.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + 40; // flat shipping

    const orderResult = await client.query(
      `INSERT INTO orders (session_id, full_name, address, city, state, zip, phone, subtotal, total)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [session_id, full_name, address, city, state, zip, phone, subtotal, total]
    );
    const order = orderResult.rows[0];

    for (const item of cartResult.rows) {
      await client.query(
        'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1,$2,$3,$4)',
        [order.id, item.product_id, item.quantity, item.price]
      );
      await client.query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2',
        [item.quantity, item.product_id]
      );
    }

    await client.query('DELETE FROM cart WHERE session_id = $1', [session_id]);
    await client.query('COMMIT');
    res.json(order);
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    const items = await pool.query(
      `SELECT oi.*, p.name, p.images FROM order_items oi 
      JOIN products p ON oi.product_id = p.id WHERE oi.order_id = $1`,
      [id]
    );
    res.json({ ...order.rows[0], items: items.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { placeOrder, getOrderById };