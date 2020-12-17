import React from "react";
import { render } from "@testing-library/react";
import Login from "./index";

it("Renders Command Center Login", () => {
  const getByText = render(<Login />)
  expect(getByText).toMatchSnapshot();
});