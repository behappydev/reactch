import PropTypes from 'prop-types';
import Item from './Item';

const ItemList = ({ products }) => {
  if (!products.length) {
    return <p>No se encontraron productos.</p>;
  }

  return (
    <div className="item-list">
      {products.map(prod => (
        <Item key={prod.id} product={prod} />
      ))}
    </div>
  );
};

ItemList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  })).isRequired
};

export default ItemList;
