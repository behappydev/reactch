import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import ItemDetail from '../items/ItemDetail';
import LoadingSpinner from '../items/LoadingSpinner';

const ItemDetailContainer = () => {
  const { itemId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const docRef = doc(db, 'products', itemId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Error fetching product detail:", error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [itemId]);

  return (
    <section className="item-detail-container">
      {loading ? <LoadingSpinner /> : <ItemDetail product={product} />}
    </section>
  );
};

export default ItemDetailContainer;
