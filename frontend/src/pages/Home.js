import React, { useState, useEffect } from 'react';
import { getProducts, getCategories } from '../api/api';
import ProductCard from '../components/ProductCard';

const Home = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    getCategories().then(r => setCategories(r.data));
  }, []);

  // Reset to page 1 when search or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    setLoading(true);
    getProducts(searchQuery, selectedCategory, currentPage)
      .then(r => {
        setProducts(r.data.products);
        setPagination(r.data.pagination);
      })
      .finally(() => setLoading(false));
  }, [searchQuery, selectedCategory, currentPage]);

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 16 }}>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '12px 0', marginBottom: 16 }}>
        <button onClick={() => setSelectedCategory('')}
          style={{ padding: '6px 16px', borderRadius: 20, border: '1px solid #ddd',
            background: selectedCategory === '' ? '#131921' : 'white',
            color: selectedCategory === '' ? 'white' : '#131921',
            cursor: 'pointer', whiteSpace: 'nowrap' }}>
          All
        </button>
        {categories.map(c => (
          <button key={c.id} onClick={() => setSelectedCategory(c.name)}
            style={{ padding: '6px 16px', borderRadius: 20, border: '1px solid #ddd',
              background: selectedCategory === c.name ? '#131921' : 'white',
              color: selectedCategory === c.name ? 'white' : '#131921',
              cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {c.name}
          </button>
        ))}
      </div>

      {/* Hero Banner */}
      <div style={{ background: 'linear-gradient(135deg, #232f3e, #37475a)', borderRadius: 12,
        padding: '32px 24px', marginBottom: 24, color: 'white', textAlign: 'center' }}>
        <h1 style={{ fontSize: 32, marginBottom: 8 }}>Great Indian Sale</h1>
        <p style={{ fontSize: 16, opacity: 0.9 }}>Up to 70% off on top products</p>
      </div>

      {/* Results info */}
      {pagination && (
        <div style={{ fontSize: 13, color: '#565959', marginBottom: 12 }}>
          Showing {products.length} of {pagination.totalProducts} products
          {searchQuery && ` for "${searchQuery}"`}
          {selectedCategory && ` in ${selectedCategory}`}
        </div>
      )}

      {/* Product Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 40, fontSize: 18 }}>Loading products...</div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 40 }}>No products found.</div>
      ) : (
        <div style={{ display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}

      {/* Pagination Controls */}
      {pagination && pagination.totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center',
          alignItems: 'center', gap: 8, marginTop: 32, marginBottom: 16 }}>

          {/* Prev Button */}
          <button
            onClick={() => setCurrentPage(p => p - 1)}
            disabled={!pagination.hasPrevPage}
            style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #ddd',
              background: pagination.hasPrevPage ? 'white' : '#f0f0f0',
              color: pagination.hasPrevPage ? '#131921' : '#999',
              cursor: pagination.hasPrevPage ? 'pointer' : 'not-allowed', fontSize: 13 }}>
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(num => (
            <button key={num} onClick={() => setCurrentPage(num)}
              style={{ width: 36, height: 36, borderRadius: 6,
                border: currentPage === num ? '2px solid #FF9900' : '1px solid #ddd',
                background: currentPage === num ? '#FF9900' : 'white',
                color: currentPage === num ? 'white' : '#131921',
                cursor: 'pointer', fontWeight: currentPage === num ? 'bold' : 'normal',
                fontSize: 13 }}>
              {num}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={!pagination.hasNextPage}
            style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #ddd',
              background: pagination.hasNextPage ? 'white' : '#f0f0f0',
              color: pagination.hasNextPage ? '#131921' : '#999',
              cursor: pagination.hasNextPage ? 'pointer' : 'not-allowed', fontSize: 13 }}>
            Next
          </button>
        </div>
      )}

    </div>
  );
};

export default Home;