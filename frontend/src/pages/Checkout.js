import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { placeOrder } from '../api/api';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, sessionId, fetchCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: '', address: '', city: '', state: '', zip: '', phone: '' });
  const [loading, setLoading] = useState(false);

  const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await placeOrder({ ...form, session_id: sessionId });
      await fetchCart();
      navigate(`/order-confirmation/${res.data.id}`);
    } catch (err) {
      alert('Order failed: ' + err.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  const inp = (field, placeholder) => (
    <input value={form[field]} onChange={e => setForm({ ...form, [field]: e.target.value })}
      placeholder={placeholder} required
      style={{ width: '100%', padding: '10px 12px', border: '1px solid #ccc', borderRadius: 4, fontSize: 14, boxSizing: 'border-box' }} />
  );

  return (
    <div style={{ maxWidth: 1000, margin: '24px auto', padding: 16, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
      <div style={{ flex: 1, minWidth: 300 }}>
        <h2>Shipping Address</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {inp('full_name', 'Full Name')}
          {inp('address', 'Street Address')}
          {inp('city', 'City')}
          {inp('state', 'State')}
          {inp('zip', 'PIN Code')}
          {inp('phone', 'Phone Number')}
          <button type="submit" disabled={loading}
            style={{ background: '#ffd814', border: 'none', borderRadius: 20, padding: 12, cursor: 'pointer', fontWeight: 500, fontSize: 15 }}>
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
      </div>

      <div style={{ width: 280, alignSelf: 'flex-start', background: 'white', padding: 20, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h3>Order Summary</h3>
        {cartItems.map(i => (
          <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '4px 0' }}>
            <span>{i.name.slice(0, 22)}... ×{i.quantity}</span>
            <span>₹{(Number(i.price) * i.quantity).toLocaleString('en-IN')}</span>
          </div>
        ))}
        <hr style={{ margin: '12px 0' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span>Subtotal</span><span>₹{subtotal.toLocaleString('en-IN')}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#007600', marginBottom: 6 }}>
          <span>Shipping</span><span>₹40</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: 18 }}>
          <span>Total</span><span>₹{(subtotal + 40).toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;