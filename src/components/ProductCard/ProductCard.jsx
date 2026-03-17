import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./ProductCard.module.css";

function ProductCard({ product, addToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    if (Number.isInteger(value) && value > 0) setQuantity(value);
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setQuantity(1);
  };

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} className={styles.image} />
      <div className={styles.info}>
        <h2 className={styles.title} title={product.title}>
          {product.title}
        </h2>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
      </div>
      <div className={styles.controls}>
        <div className={styles.quantity}>
          <button onClick={handleDecrement}>-</button>
          <input type="number" value={quantity} min="1" onChange={handleQuantityChange} />
          <button onClick={handleIncrement}>+</button>
        </div>
        <button className={styles.addButton} onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductCard;
