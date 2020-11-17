import React from "react";
import { render } from "@testing-library/react";
import HealthProvider from './healthProvider';
import dummyData from './dummyData';

test("renders prop name familyRepresentativeName", () => {
  const { getByText } = render(<HealthProvider {...dummyData} />);
  const reg = new RegExp(dummyData.providerName, 'i')
  const familyName = getByText(reg);
  expect(familyName).toBeInTheDocument();
});