import React from 'react';
import './Product.css';

const Product = ({ name, addToCart }) => {
  return (
    <div className="product">
      <h2>{name}</h2>
      <p>Hermosa planta Bouganvillea, ideal para decorar tu jardín.</p>
      <button onClick={addToCart}>Agregar al Carrito</button>
    </div>
  );
};

export default Product;
