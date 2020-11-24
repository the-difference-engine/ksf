import React from "react";
import { render } from "@testing-library/react";
import GoogleBtn from "./GoogleBtn";

test("Rendering Google Login button", () => {
  const { getByText } = render(<GoogleBtn />);
  const linkElement = getByText(/Sign in with Google/i);
  expect(linkElement).toBeInTheDocument();
});
