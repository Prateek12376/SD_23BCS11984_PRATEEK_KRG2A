import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCart, addToCart, updateCartItem, removeFromCart } from '../api/api';
import { v4 as uuidv4 } from 'uuid';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const [sessionId] = useState(() => {
    let id = localStorage.getItem('session_id');
    if (!id) {
      id = uuidv4();
      localStorage.setItem('session_id', id);
    }
    return id;
  });

  const fetchCart = useCallback(async () => {
    try {
      const res = await getCart(sessionId);
      setCartItems(res.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }, [sessionId]);

  useEffect(() => {
    fetchCart();
  }, [sessionId]);

  const addItem = async (product_id, quantity = 1) => {
    await addToCart({ session_id: sessionId, product_id, quantity });
    fetchCart();
  };

  const updateItem = async (id, quantity) => {
    await updateCartItem(id, quantity);
    fetchCart();
  };

  const removeItem = async (id) => {
    await removeFromCart(id);
    fetchCart();
  };

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        updateItem,
        removeItem,
        totalItems,
        sessionId,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);