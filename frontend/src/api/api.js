import axios from 'axios';
const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getProducts = (search = '', category = '', page = 1) =>
  axios.get(`${BASE}/products?search=${search}&category=${category}&page=${page}&limit=8`);

export const getProductById = (id) => axios.get(`${BASE}/products/${id}`);
export const getCategories = () => axios.get(`${BASE}/products/categories`);

export const getCart = (sessionId) => axios.get(`${BASE}/cart/${sessionId}`);
export const addToCart = (data) => axios.post(`${BASE}/cart`, data);
export const updateCartItem = (id, quantity) => axios.put(`${BASE}/cart/${id}`, { quantity });
export const removeFromCart = (id) => axios.delete(`${BASE}/cart/${id}`);
export const clearCart = (sessionId) => axios.delete(`${BASE}/cart/clear/${sessionId}`);

export const placeOrder = (data) => axios.post(`${BASE}/orders`, data);
export const getOrderById = (id) => axios.get(`${BASE}/orders/${id}`);