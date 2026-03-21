import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CartItem from "./CartItem";

const mockItem = { id: 1, title: "Test Item", price: 9.99, image: "test-image..jpg", quantity: 2 };

describe("CartItem", () => {
  it("renders item information correctly", () => {
    const mockUpdateQuantity = vi.fn();

    render(<CartItem item={mockItem} updateQuantity={mockUpdateQuantity} />);

    expect(screen.getByRole("img", { name: /test item/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /test item/i })).toBeInTheDocument();
    expect(screen.getByText(/\$9\.99/i)).toBeInTheDocument();
    expect(screen.getByText(/Subtotal: \$19\.98/i)).toBeInTheDocument();
  });

  it("calls updateQuantity with increased quantity when + is clicked", async () => {
    const user = userEvent.setup();
    const mockUpdateQuantity = vi.fn();

    render(<CartItem item={mockItem} updateQuantity={mockUpdateQuantity} />);

    const incrementButton = screen.getByRole("button", { name: "+" });
    await user.click(incrementButton);

    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it("calls updateQuantity with decreased quantity when - is clicked", async () => {
    const user = userEvent.setup();
    const mockUpdateQuantity = vi.fn();

    render(<CartItem item={mockItem} updateQuantity={mockUpdateQuantity} />);

    const decrementButton = screen.getByRole("button", { name: "-" });
    await user.click(decrementButton);

    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1);
  });

  it("shows confirmation when remove button is clicked", async () => {
    const user = userEvent.setup();
    const mockUpdateQuantity = vi.fn();

    render(<CartItem item={mockItem} updateQuantity={mockUpdateQuantity} />);

    const removeButton = screen.getByRole("button", { name: /remove/i });
    await user.click(removeButton);

    expect(screen.getByText(/remove this item/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /yes/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /no/i })).toBeInTheDocument();
  });

  it("calls updateQuantity with 0 when confirm yes is clicked", async () => {
    const user = userEvent.setup();
    const mockUpdateQuantity = vi.fn();

    render(<CartItem item={mockItem} updateQuantity={mockUpdateQuantity} />);

    const removeButton = screen.getByRole("button", { name: /remove/i });
    await user.click(removeButton);
    const yesButton = screen.getByRole("button", { name: /yes/i });
    await user.click(yesButton);

    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 0);
  });

  it("hides confirmation when no is clicked", async () => {
    const user = userEvent.setup();
    const mockUpdateQuantity = vi.fn();

    render(<CartItem item={mockItem} updateQuantity={mockUpdateQuantity} />);

    const removeButton = screen.getByRole("button", { name: /remove/i });
    await user.click(removeButton);
    const noButton = screen.getByRole("button", { name: /no/i });
    await user.click(noButton);

    expect(screen.queryByText(/remove this item/i)).not.toBeInTheDocument();
  });
});
