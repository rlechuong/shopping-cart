import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        const updatedCart = prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + product.quantity } : item,
        );
        return updatedCart;
      }
      return [...prevCart, product];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    } else {
      setCart((prevCart) =>
        prevCart.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)),
      );
    }
  };

  const clearCart = () => setCart([]);

  return (
    <div>
      <Navbar cart={cart} />
      <main>
        <Outlet context={{ cart, addToCart, updateQuantity, clearCart }} />
      </main>
    </div>
  );
}

export default App;
