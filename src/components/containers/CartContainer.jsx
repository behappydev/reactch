import { useCart } from '../context/useCart';
import { Link, useNavigate } from 'react-router-dom';

const CartContainer = () => {
  const { cart, removeFromCart, clearCart, totalPrice, incrementItem, decrementItem } = useCart();
  const navigate = useNavigate();

  if (!cart.length) {
    return (
      <div className="cart-container">
        <h2>Tu carrito está vacío</h2>
        <Link to="/">Volver al catálogo</Link>
      </div>
    );
  }

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-container">
      <h2>Tu carrito</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />
            <div>
              <h3>{item.title}</h3>
              <p>Precio unitario: ${item.price}</p>
              <p>Cantidad: {item.quantity}</p>
              <div style={{display: 'flex', gap: '0.5rem'}}>
                <button onClick={() => decrementItem(item.id)}>-</button>
                <button onClick={() => incrementItem(item.id)}>+</button>
              </div>
              <p>Subtotal: ${item.price * item.quantity}</p>
              <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
      <p>Total: ${totalPrice}</p>
      <button onClick={clearCart}>Vaciar carrito</button>
      <button onClick={handleCheckout}>Finalizar compra</button>
    </div>
  );
};

export default CartContainer;
