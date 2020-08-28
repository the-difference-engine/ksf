import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

//Todo - make this a Jest snapshot test - https://jestjs.io/docs/en/snapshot-testing
xtest("renders learn react link", () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
