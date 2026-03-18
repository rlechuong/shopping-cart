import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./CartItem.module.css";

function CartItem({ item, updateQuantity }) {
  const [confirmRemove, setConfirmRemove] = useState(false);

  const handleDecrement = () => {
    if (item.quantity - 1 < 1) {
      setConfirmRemove(true);
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const handleConfirmRemove = () => {
    updateQuantity(item.id, 0);
    setConfirmRemove(false);
  };

  const handleCancelRemove = () => {
    setConfirmRemove(false);
  };

  return (
    <div className={styles.cartItem}>
      <img src={item.image} alt={item.title} className={styles.image} />
      <div className={styles.info}>
        <h3 className={styles.title} title={item.title}>
          {item.title}
        </h3>
        <p className={styles.price}>${item.price.toFixed(2)}</p>
        <p className={styles.subtotal}>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <div className={styles.controls}>
        {confirmRemove ? (
          <div className={styles.confirmation}>
            <p>Remove this item?</p>
            <div className={styles.confirmButtons}>
              <button className={styles.confirmYes} onClick={handleConfirmRemove}>
                Yes
              </button>
              <button className={styles.confirmNo} onClick={handleCancelRemove}>
                No
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.quantity}>
              <button onClick={handleDecrement} disabled={confirmRemove}>
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                disabled={confirmRemove}
              >
                +
              </button>
            </div>
            <button className={styles.removeButton} onClick={() => setConfirmRemove(true)}>
              Remove
            </button>
          </>
        )}
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  updateQuantity: PropTypes.func.isRequired,
};

export default CartItem;
