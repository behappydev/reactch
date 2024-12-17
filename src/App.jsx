import { CartProvider } from './components/context/CartContext';
import AppRouter from './components/router/AppRouter';

function App() {
  return (
    <CartProvider>
      <AppRouter />
    </CartProvider>
  );
}

export default App;
