import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, updateItem, removeItem } = useCart();
  const navigate = useNavigate();
  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  if (cartItems.length === 0)
    return (
      <div style={{ textAlign: 'center', padding: 80 }}>
        <h2>Your cart is empty</h2>
        <Link to="/" style={{ color: '#007185' }}>Continue Shopping</Link>
      </div>
    );

  return (
    <div style={{ maxWidth: 1100, margin: '24px auto', padding: 16, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 300 }}>
        <h2 style={{ borderBottom: '1px solid #ddd', paddingBottom: 12 }}>Shopping Cart</h2>
        {cartItems.map(item => (
          <div key={item.id} style={{ display: 'flex', gap: 16, padding: '16px 0', borderBottom: '1px solid #eee' }}>
            <img src={item.images[0]} alt={item.name}
              style={{ width: 100, height: 100, objectFit: 'contain', borderRadius: 4 }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 500, marginBottom: 8 }}>{item.name}</p>
              <p style={{ color: '#007600', fontSize: 13, marginBottom: 8 }}>In Stock</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={() => updateItem(item.id, item.quantity - 1)}
                  style={{ width: 28, height: 28, borderRadius: 4, border: '1px solid #ccc', cursor: 'pointer', fontSize: 16 }}>−</button>
                <span style={{ fontWeight: 500 }}>{item.quantity}</span>
                <button onClick={() => updateItem(item.id, item.quantity + 1)}
                  style={{ width: 28, height: 28, borderRadius: 4, border: '1px solid #ccc', cursor: 'pointer', fontSize: 16 }}>+</button>
                <button onClick={() => removeItem(item.id)}
                  style={{ marginLeft: 8, color: '#c40000', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13 }}>Delete</button>
              </div>
            </div>
            <div style={{ fontWeight: 'bold', fontSize: 18 }}>
              ₹{(Number(item.price) * item.quantity).toLocaleString('en-IN')}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div style={{ width: 280, background: 'white', padding: 20, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', alignSelf: 'flex-start' }}>
        <h3 style={{ marginBottom: 12 }}>Order Summary</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
          <span>₹{subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, color: '#007600' }}>
          <span>Shipping</span><span>₹40</span>
        </div>
        <hr />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: 18, margin: '8px 0 16px' }}>
          <span>Total</span><span>₹{(subtotal + 40).toLocaleString('en-IN')}</span>
        </div>
        <button onClick={() => navigate('/checkout')}
          style={{ width: '100%', background: '#ffd814', border: 'none', borderRadius: 20, padding: 12, cursor: 'pointer', fontWeight: 500, fontSize: 15 }}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;