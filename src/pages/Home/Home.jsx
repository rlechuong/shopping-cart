import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.home}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Welcome to TempShop</h1>
          <p className={styles.heroSubtitle}>
            Discover our curated collection of quality products at unbeatable prices.
          </p>
          <Link to="/shop" className={styles.heroButton}>
            Shop Now
          </Link>
        </div>
      </section>
      <section className={styles.features}>
        <div className={styles.featureCard}>
          <span className={styles.featureIcon}>🚚</span>
          <h2>Free Shipping</h2>
          <p>Free delivery on all orders over $50.</p>
        </div>
        <div className={styles.featureCard}>
          <span className={styles.featureIcon}>⭐</span>
          <h2>Quality Products</h2>
          <p>Every product is carefully selected for quality.</p>
        </div>
        <div className={styles.featureCard}>
          <span className={styles.featureIcon}>🔒</span>
          <h2>Secure Checkout</h2>
          <p>Your payment information is always safe with us.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
