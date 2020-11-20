import React from "react";
// import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
// import Link from '../Link.react';
import Login from "./index";

it("Renders Command Center Login", () => {
  const getByText = render(<Login />)
  expect(getByText).toMatchSnapshot();
});