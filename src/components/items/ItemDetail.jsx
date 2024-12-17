import PropTypes from 'prop-types';
import ItemCount from './ItemCount';
import { useCart } from '../context/useCart';

const ItemDetail = ({ product }) => {
  const { addToCart } = useCart();

  const handleAdd = (quantity) => {
    addToCart(product, quantity);
  };

  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div className="item-detail">
      <img src={product.image} alt={product.title} className="item-detail_image" />
      <div className="item-detail_info">
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p className="price">${product.price}</p>
        {product.stock > 0 ? (
          <p>Stock disponible: {product.stock} unidades</p>
        ) : (
          <p style={{color: 'red'}}>Sin stock disponible</p>
        )}
        <ItemCount stock={product.stock} onAdd={handleAdd} />
      </div>
    </div>
  );
};

ItemDetail.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    stock: PropTypes.number
  })
};

export default ItemDetail;
