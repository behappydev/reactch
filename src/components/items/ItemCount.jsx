import PropTypes from 'prop-types';
import { useState } from 'react';

const ItemCount = ({ stock = 0, initial = 1, onAdd }) => {
  const [count, setCount] = useState(initial);

  const add = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const subtract = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    if (stock > 0 && count <= stock) {
      onAdd(count);
    }
  };

  return (
    <div className="item-count">
      <div className="item-count_controls">
        <button onClick={subtract} disabled={count <= 1}>-</button>
        <span>{count}</span>
        <button onClick={add} disabled={count >= stock || stock === 0}>+</button>
      </div>
      <button 
        onClick={handleAddToCart} 
        disabled={stock === 0 || count > stock}
      >
        {stock === 0 ? "Sin stock" : "Agregar al carrito"}
      </button>
    </div>
  );
};

ItemCount.propTypes = {
  stock: PropTypes.number,
  initial: PropTypes.number,
  onAdd: PropTypes.func.isRequired
};

ItemCount.defaultProps = {
  stock: 0,
  initial: 1
};

export default ItemCount;
