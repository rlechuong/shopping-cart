import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

describe("Navbar", () => {
  const mockCart = [];

  it("renders navigation links", () => {
    render(
      <MemoryRouter>
        <Navbar cart={mockCart} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: /^home$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^shop$/i })).toBeInTheDocument();
  });

  it("shows cart count of 0 when cart is empty", () => {
    render(
      <MemoryRouter>
        <Navbar cart={[]} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: /cart \(0\)/i })).toBeInTheDocument();
  });

  it("shows correct cart count when cart has items", () => {
    const cartWithItems = [
      { id: 1, title: "Test Product", price: 9.99, quantity: 2 },
      { id: 2, title: "Another Product", price: 14.99, quantity: 3 },
    ];

    render(
      <MemoryRouter>
        <Navbar cart={cartWithItems} />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: /cart \(5\)/i })).toBeInTheDocument();
  });
});
