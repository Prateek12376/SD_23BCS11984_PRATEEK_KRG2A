import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../api/api';
import { useCart } from '../context/CartContext';
import StarRating from '../components/StarRating';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentImg, setCurrentImg] = useState(0);
  const { addItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(id).then(r => setProduct(r.data));
  }, [id]);

  if (!product) return <div style={{ textAlign: 'center', padding: 60 }}>Loading...</div>;

  const specs = product.specifications || {};

  return (
    <div style={{ maxWidth: 1100, margin: '24px auto', padding: 16, background: 'white', borderRadius: 8 }}>
      <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
        {/* Image Carousel */}
        <div style={{ flex: '0 0 380px' }}>
          <img src={product.images[currentImg]} alt={product.name}
            style={{ width: '100%', height: 380, objectFit: 'contain', border: '1px solid #eee', borderRadius: 8 }} />
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            {product.images.map((img, i) => (
              <img key={i} src={img} alt="" onClick={() => setCurrentImg(i)}
                style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4, border: i === currentImg ? '2px solid #f08804' : '1px solid #eee', cursor: 'pointer' }} />
            ))}
          </div>
        </div>

        {/* Details */}
        <div style={{ flex: 1, minWidth: 260 }}>
          <h1 style={{ fontSize: 22, fontWeight: 600, marginBottom: 8 }}>{product.name}</h1>
          <StarRating rating={product.rating} />
          <span style={{ color: '#565959', fontSize: 13, marginLeft: 8 }}>{product.review_count?.toLocaleString()} ratings</span>
          <hr style={{ margin: '12px 0' }} />
          <div style={{ fontSize: 28, fontWeight: 'bold', color: '#0f1111', marginBottom: 8 }}>
            ₹{Number(product.price).toLocaleString('en-IN')}
          </div>
          <div style={{ color: product.stock > 0 ? '#007600' : '#c40000', fontWeight: 500, marginBottom: 16 }}>
            {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
          </div>
          <p style={{ color: '#333', lineHeight: 1.6, marginBottom: 16 }}>{product.description}</p>

          {Object.keys(specs).length > 0 && (
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ marginBottom: 8 }}>Specifications</h3>
              <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <tbody>
                  {Object.entries(specs).map(([k, v]) => (
                    <tr key={k} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '6px 12px 6px 0', fontWeight: 500, color: '#565959', width: '40%' }}>{k}</td>
                      <td style={{ padding: '6px 0' }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={() => addItem(product.id)}
              style={{ flex: 1, background: '#ffd814', border: 'none', borderRadius: 20, padding: '12px', cursor: 'pointer', fontWeight: 500, fontSize: 15 }}>
              Add to Cart
            </button>
            <button onClick={async () => { await addItem(product.id); navigate('/cart'); }}
              style={{ flex: 1, background: '#ff9900', border: 'none', borderRadius: 20, padding: '12px', cursor: 'pointer', fontWeight: 500, fontSize: 15 }}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;