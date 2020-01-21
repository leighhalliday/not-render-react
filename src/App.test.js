import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { AddToCart, Nav } from "./App";

test("renders cart button when available", () => {
  const { getByText } = render(<AddToCart available={true} />);

  expect(getByText(/cart/i)).toBeInTheDocument();
});

test("hides cart button when not available", () => {
  const { queryByText } = render(<AddToCart available={false} />);

  expect(queryByText(/cart/i)).toBeNull();
});

test("adds class to nav when toggled", () => {
  const { getByTestId } = render(<Nav />);
  const navElement = getByTestId("nav");

  expect(navElement).not.toHaveClass("open");
  fireEvent.click(getByTestId("hamburger"));
  expect(navElement).toHaveClass("open");
});
