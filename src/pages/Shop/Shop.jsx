import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Shop.module.css";

function Shop() {
  const { addToCart } = useOutletContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Something went wrong. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className={styles.message}>Loading Products...</p>;
  if (error) return <p className={styles.message}>{error}</p>;

  return (
    <div className={styles.shop}>
      <h1 className={styles.title}>Shop</h1>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

export default Shop;
