import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = ({ onSearch }) => {
  const { totalItems } = useCart();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch && onSearch(query);
    navigate('/');
  };

  return (
    <nav style={{ background: '#131921', padding: '8px 16px', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16 }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: 24, fontWeight: 'bold', border: '1px solid transparent', padding: '4px 8px' }}>
          amazon
        </Link>
        <form onSubmit={handleSearch} style={{ flex: 1, display: 'flex' }}>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products..."
            style={{ flex: 1, padding: '8px 12px', fontSize: 15, border: 'none', borderRadius: '4px 0 0 4px' }}
          />
          <button type="submit" style={{ background: '#febd69', border: 'none', padding: '8px 14px', borderRadius: '0 4px 4px 0', cursor: 'pointer', fontSize: 18 }}>
            🔍
          </button>
        </form>
        <Link to="/cart" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4, fontWeight: 'bold' }}>
          🛒 Cart
          {totalItems > 0 && (
            <span style={{ background: '#f08804', borderRadius: '50%', padding: '2px 7px', fontSize: 13 }}>
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;