import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "../firebase/config"; // Ruta al archivo config.js
import products from "./products"; // Ruta al archivo products.js

const uploadProductsToFirestore = async () => {
  const productsCollection = collection(db, "products");

  try {
    for (const product of products) {
      const productRef = doc(productsCollection, product.id);
      await setDoc(productRef, product);
      console.log(`Producto ${product.title} subido con éxito.`);
    }
    console.log("Todos los productos fueron subidos con éxito.");
  } catch (error) {
    console.error("Error subiendo los productos:", error);
  }
};

uploadProductsToFirestore();
