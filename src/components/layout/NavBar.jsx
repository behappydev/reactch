import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart';
import SearchBar from './SearchBar';

const NavBar = () => {
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/?search=${encodeURIComponent(query)}`);
  };

  return (
    <header className="navbar">
      <div className="navbar__logo">
        <Link to="/">PlantStore</Link>
      </div>
      <div className="navbar__search">
        <SearchBar onSearch={handleSearch} />
      </div>
      <nav className="navbar__links">
        <Link to="/cart" className="navbar__cart">
          Carrito ({totalItems})
        </Link>
      </nav>
    </header>
  );
};

export default NavBar;
