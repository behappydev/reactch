import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext([]);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    // product ya debe tener {id, title, price, image, stock, ...}
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      const updated = cart.map(item =>
        item.id === product.id 
          ? { ...item, quantity: Math.min(item.quantity + quantity, item.stock) } 
          : item
      );
      setCart(updated);
    } else {
      setCart([...cart, { ...product, quantity: Math.min(quantity, product.stock) }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const incrementItem = (id) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        // Solo incrementar si no supera el stock
        if (item.quantity < item.stock) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item; // no incrementa si llegó al stock máximo
        }
      }
      return item;
    }));
  };

  const decrementItem = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.quantity > 1 
        ? { ...item, quantity: item.quantity - 1 } 
        : item
    ));
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider 
      value={{ cart, addToCart, removeFromCart, clearCart, incrementItem, decrementItem, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default CartContext;
