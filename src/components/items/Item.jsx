import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Item = ({ product }) => {
  return (
    <article className="item">
      <Link to={`/item/${product.id}`}>
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
        <p className="price">${product.price}</p>
      </Link>
    </article>
  );
};

Item.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired
};

export default Item;
