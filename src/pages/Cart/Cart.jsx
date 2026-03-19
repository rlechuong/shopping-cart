import { Link, useOutletContext } from "react-router-dom";
import CartItem from "../../components/CartItem/CartItem";
import styles from "./Cart.module.css";

function Cart() {
  const { cart, updateQuantity, clearCart } = useOutletContext();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (window.confirm("Simulate checkout? This will clear your cart.")) {
      clearCart();
    }
  };

  if (cart.length === 0) {
    return (
      <div className={styles.empty}>
        <h1>Your cart is empty</h1>
        <p>
          Head to the <Link to="/shop">shop</Link> to add some items!
        </p>
      </div>
    );
  }

  return (
    <div className={styles.cart}>
      <h1 className={styles.title}>Your Cart</h1>
      <div className={styles.cartLayout}>
        <div className={styles.cartItems}>
          {cart.map((item) => (
            <CartItem key={item.id} item={item} updateQuantity={updateQuantity} />
          ))}
        </div>
        <div className={styles.summary}>
          <h2>Order Summary</h2>
          <div className={styles.summaryRow}>
            <span>Items ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
            <span className={styles.summaryTotal}>${total.toFixed(2)}</span>
          </div>
          <button className={styles.checkoutButton} onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
