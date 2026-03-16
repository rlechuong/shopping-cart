import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Navbar.module.css";

function Navbar({ cart }) {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        TempShop
      </Link>
      <ul className={styles.navLinks}>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : "")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/shop" className={({ isActive }) => (isActive ? styles.active : "")}>
            Shop
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? `${styles.cartLink} ${styles.active}` : styles.cartLink
            }
          >
            Cart ({cartCount})
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

Navbar.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({ id: PropTypes.number.isRequired, quantity: PropTypes.number.isRequired }),
  ).isRequired,
};

export default Navbar;
