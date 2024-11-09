import React from 'react';
import './ItemListContainer.css'; 

const ItemListContainer = ({ welcomeMessage }) => {
  return (
    <div className="item-list-container">
      <h2>{welcomeMessage}</h2>
    </div>
  );
};

export default ItemListContainer;
