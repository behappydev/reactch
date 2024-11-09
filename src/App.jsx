import React, { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import Product from './components/Product/Product';
import './App.css';

const App = () => {
  const [cartCount, setCartCount] = useState(0); // Estado para el carrito

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <div className="App">
      <NavBar cartCount={cartCount} /> {/* Pasamos la cantidad del carrito */}
      <ItemListContainer welcomeMessage="¡Bienvenido a Planta Store!" />
      <Product name="Bouganvillea" addToCart={addToCart} /> {/* Producto con botón para añadir al carrito */}
    </div>
  );
};

export default App;
