import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from '../layout/NavBar';
import Footer from '../layout/Footer';
import Home from '../pages/Home';
import Category from '../pages/Category';
import ProductDetail from '../pages/ProductDetail';
import Cart from '../pages/Cart';
import Error404 from '../pages/Error404';
import Checkout from '../pages/Checkout'; // Importamos el nuevo componente

const AppRouter = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:categoryId" element={<Category />} />
          <Route path="/item/:itemId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} /> {/* Nueva ruta */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
