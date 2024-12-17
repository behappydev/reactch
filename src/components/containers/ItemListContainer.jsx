import { useLocation, useParams } from 'react-router-dom';
import ItemList from '../items/ItemList';
import LoadingSpinner from '../items/LoadingSpinner';
import { useFirestore } from '../hooks/useFirestore';

const ItemListContainer = () => {
  const { categoryId } = useParams();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('search') || '';

  const { data: products, loading } = useFirestore(categoryId, searchQuery);

  return (
    <section className="item-list-container">
      {loading ? <LoadingSpinner /> : <ItemList products={products} />}
    </section>
  );
};

export default ItemListContainer;
