import { useState } from 'react';
import { db } from '../firebase/config';
import { collection, doc, writeBatch, serverTimestamp } from 'firebase/firestore';
import { useCart } from '../context/useCart';
import { useNavigate } from 'react-router-dom';

// Ejemplo de simple validación de email
const isValidEmail = (email) => {
  // Patrón básico para validar email
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
};

const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  // Estado del formulario
  const [buyer, setBuyer] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  // Estados adicionales
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [orderId, setOrderId] = useState(null);

  const handleInputChange = (e) => {
    setBuyer({ ...buyer, [e.target.name]: e.target.value });
    setErrorMessage('');
  };

  const validateForm = () => {
    if (!buyer.name.trim() || !buyer.email.trim() || !buyer.phone.trim() || !buyer.address.trim()) {
      return "Por favor completa todos los campos.";
    }
    if (!isValidEmail(buyer.email)) {
      return "Por favor ingresa un email válido.";
    }
    if (cart.length === 0) {
      return "El carrito está vacío.";
    }
    return null; // Sin errores
  };

  const handleOrder = async () => {
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setLoading(true);
    setErrorMessage('');

    const order = {
      buyer,
      items: cart.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity
      })),
      total: totalPrice,
      date: serverTimestamp()
    };

    const batch = writeBatch(db);
    const ordersRef = collection(db, 'orders');
    const orderRef = doc(ordersRef); // Genera un ID nuevo para la orden

    batch.set(orderRef, order);

    // Actualización de stock
    for (let item of cart) {
      const productRef = doc(db, 'products', item.id);
      const newStock = item.stock - item.quantity;

      if (newStock < 0) {
        // Si no hay stock suficiente, cancelamos la operación
        setLoading(false);
        setErrorMessage(`No hay suficiente stock de ${item.title}. Actualiza tu carrito.`);
        return;
      }

      batch.update(productRef, { stock: newStock });
    }

    try {
      await batch.commit();
      clearCart();
      setOrderId(orderRef.id);
    } catch (error) {
      console.error("Error al procesar la transacción:", error);
      setErrorMessage("Hubo un error al procesar tu compra. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <div style={{maxWidth: '500px', margin: '2rem auto', background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'}}>
      {!orderId ? (
        <>
          <h2 style={{marginBottom: '1.5rem'}}>Finalizar Compra</h2>
          <p style={{marginBottom: '1rem'}}>Completa tus datos para confirmar la compra:</p>

          <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <input 
              type="text" 
              name="name" 
              placeholder="Nombre Completo"
              value={buyer.name}
              onChange={handleInputChange}
              style={inputStyle}
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email"
              value={buyer.email}
              onChange={handleInputChange}
              style={inputStyle}
            />
            <input 
              type="tel" 
              name="phone" 
              placeholder="Teléfono"
              value={buyer.phone}
              onChange={handleInputChange}
              style={inputStyle}
            />
            <input 
              type="text" 
              name="address" 
              placeholder="Dirección"
              value={buyer.address}
              onChange={handleInputChange}
              style={inputStyle}
            />
            <p style={{fontWeight: 'bold'}}>Total a pagar: ${totalPrice}</p>

            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}

            <button 
              onClick={handleOrder} 
              disabled={loading} 
              style={buttonStyle(loading)}
            >
              {loading ? "Procesando..." : "Confirmar compra"}
            </button>
          </div>
        </>
      ) : (
        <div style={{textAlign: 'center'}}>
          <h2>¡Compra realizada con éxito!</h2>
          <p style={{margin: '1rem 0'}}>Tu número de orden es: <strong>{orderId}</strong></p>
          <p>Gracias por confiar en <strong>VERDANCY</strong>. Recibirás un email con los detalles del pedido.</p>
          <button onClick={handleBackHome} style={buttonStyle(false)}>Volver al inicio</button>
        </div>
      )}
    </div>
  );
};

const inputStyle = {
  padding: '0.5rem',
  fontSize: '1rem',
  border: '1px solid #ccc',
  borderRadius: '4px'
};

const buttonStyle = (disabled) => ({
  padding: '0.7rem 1rem',
  fontSize: '1rem',
  background: disabled ? '#ccc' : '#2E7D32',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: disabled ? 'not-allowed' : 'pointer',
  transition: 'background 0.3s ease'
});

export default Checkout;
