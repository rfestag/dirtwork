import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { MyComponent } from "./index";

describe("MyComponent", () => {
  test("renders MyComponent component", () => {
    render(<MyComponent />);
    expect(screen.getByText("Example Component")).toBeInTheDocument();
  });
});
