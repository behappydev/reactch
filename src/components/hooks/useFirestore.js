import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';

const simulateDelay = (ms) => new Promise((res) => setTimeout(res, ms));

export const useFirestore = (categoryId, searchQuery) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const productsRef = collection(db, 'products');
        let q = productsRef;

        if (categoryId) {
          q = query(productsRef, where('category', '==', categoryId));
        }

        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const filtered = searchQuery
          ? productsData.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
          : productsData;

        await simulateDelay(300);

        setData(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [categoryId, searchQuery]);

  return { data, loading };
};
