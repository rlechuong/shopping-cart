import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductCard from "./ProductCard";

const mockProduct = { id: 1, title: "Test Product", price: 9.99, image: "test-image.jpg" };

describe("ProductCard", () => {
  it("renders product information correctly", () => {
    const mockAddToCart = vi.fn();

    render(<ProductCard product={mockProduct} addToCart={mockAddToCart} />);

    expect(screen.getByRole("img", { name: /test product/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /test product/i })).toBeInTheDocument();
    expect(screen.getByText(/\$9\.99/i)).toBeInTheDocument();
  });

  it("increments quantity when + button is clicked", async () => {
    const user = userEvent.setup();
    const mockAddToCart = vi.fn();

    render(<ProductCard product={mockProduct} addToCart={mockAddToCart} />);

    const incrementButton = screen.getByRole("button", { name: "+" });
    await user.click(incrementButton);

    expect(screen.getByRole("spinbutton")).toHaveValue(2);
  });

  it("does not decrement quantity below 1", async () => {
    const user = userEvent.setup();
    const mockAddToCart = vi.fn();

    render(<ProductCard product={mockProduct} addToCart={mockAddToCart} />);

    const decrementButton = screen.getByRole("button", { name: "-" });
    await user.click(decrementButton);

    expect(screen.getByRole("spinbutton")).toHaveValue(1);
  });

  it("calls addToCart with correct data when Add to Cart is clicked", async () => {
    const user = userEvent.setup();
    const mockAddToCart = vi.fn();

    render(<ProductCard product={mockProduct} addToCart={mockAddToCart} />);

    const addToCartButton = screen.getByRole("button", { name: /add to cart/i });
    await user.click(addToCartButton);

    expect(mockAddToCart).toHaveBeenCalledWith({ ...mockProduct, quantity: 1 });
  });

  it("resets quantity to 1 after adding to cart", async () => {
    const user = userEvent.setup();
    const mockAddToCart = vi.fn();

    render(<ProductCard product={mockProduct} addToCart={mockAddToCart} />);

    const incrementButton = screen.getByRole("button", { name: "+" });
    const addToCartButton = screen.getByRole("button", { name: /add to cart/i });

    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(addToCartButton);

    expect(screen.getByRole("spinbutton")).toHaveValue(1);
  });
});
