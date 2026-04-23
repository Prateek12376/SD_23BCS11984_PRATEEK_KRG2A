import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById } from '../api/api';

const OrderConfirmation = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrderById(id).then(r => setOrder(r.data));
  }, [id]);

  if (!order) return <div style={{ textAlign: 'center', padding: 60 }}>Loading...</div>;

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 24, background: 'white', borderRadius: 8, textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.1)' }}>
      <div style={{ fontSize: 60, marginBottom: 16 }}>✅</div>
      <h1 style={{ color: '#007600', marginBottom: 8 }}>Order Placed Successfully!</h1>
      <p style={{ color: '#565959', marginBottom: 16 }}>Thank you, {order.full_name}!</p>
      <div style={{ background: '#f0f2f2', borderRadius: 8, padding: 16, marginBottom: 24, textAlign: 'left' }}>
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Deliver to:</strong> {order.address}, {order.city}, {order.state} - {order.zip}</p>
        <p><strong>Total Paid:</strong> ₹{Number(order.total).toLocaleString('en-IN')}</p>
        <p><strong>Status:</strong> <span style={{ color: '#007600' }}>{order.status}</span></p>
      </div>
      <h3 style={{ marginBottom: 12, textAlign: 'left' }}>Items Ordered</h3>
      {order.items?.map(item => (
        <div key={item.id} style={{ display: 'flex', gap: 12, padding: '8px 0', borderBottom: '1px solid #eee', textAlign: 'left' }}>
          <img src={item.images[0]} alt={item.name} style={{ width: 60, height: 60, objectFit: 'contain' }} />
          <div>
            <p style={{ fontWeight: 500 }}>{item.name}</p>
            <p style={{ color: '#565959', fontSize: 13 }}>Qty: {item.quantity} × ₹{Number(item.price).toLocaleString('en-IN')}</p>
          </div>
        </div>
      ))}
      <Link to="/" style={{ display: 'inline-block', marginTop: 24, background: '#ffd814', padding: '10px 28px', borderRadius: 20, textDecoration: 'none', color: '#0f1111', fontWeight: 500 }}>
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderConfirmation;