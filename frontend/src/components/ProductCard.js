import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import StarRating from './StarRating';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  return (
    <div style={{ background: 'white', borderRadius: 8, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', gap: 8, transition: 'transform 0.2s' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >
      <Link to={`/product/${product.id}`}>
        <img src={product.images[0]} alt={product.name}
          style={{ width: '100%', height: 180, objectFit: 'contain', borderRadius: 4 }} />
      </Link>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: '#0f1111', fontWeight: 500, fontSize: 14, lineHeight: 1.4 }}>
        {product.name.length > 50 ? product.name.slice(0, 50) + '...' : product.name}
      </Link>
      <StarRating rating={product.rating} />
      <span style={{ fontSize: 13, color: '#565959' }}>({product.review_count?.toLocaleString()} reviews)</span>
      <span style={{ fontSize: 20, fontWeight: 'bold', color: '#0f1111' }}>
        ₹{Number(product.price).toLocaleString('en-IN')}
      </span>
      <button onClick={() => addItem(product.id)}
        style={{ background: '#ffd814', border: 'none', borderRadius: 20, padding: '8px', cursor: 'pointer', fontWeight: 500, fontSize: 13 }}>
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;