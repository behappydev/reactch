import React from 'react';
import './CartWidget.css';

const CartWidget = ({ cartCount }) => {
  return (
    <div className="cart-widget">
      <span role="img" aria-label="cart">🛒</span>
      <span>{cartCount}</span> {/* Muestra la cantidad en el carrito */}
    </div>
  );
};

export default CartWidget;
