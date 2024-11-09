import React from 'react';
import CartWidget from '../CartWidget/CartWidget';
import './NavBar.css';

const NavBar = ({ cartCount }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Planta Store</h1>
      </div>
      <ul className="nav-links">
        <li><a href="/">Inicio</a></li>
        <li><a href="/productos">Productos</a></li>
        <li><a href="/contacto">Contacto</a></li>
      </ul>
      <CartWidget cartCount={cartCount} />
    </nav>
  );
};

export default NavBar;
