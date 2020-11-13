import React from "react";
import { render } from "@testing-library/react";
import HealthProvider from './healthProvider';
import dummyData from './dummyData';

//Todo - make this a Jest snapshot test - https://jestjs.io/docs/en/snapshot-testing
test("renders prop name familyRepresentativeName", () => {
  const { getByText } = render(<HealthProvider {...dummyData} />);
  const reg = new RegExp(dummyData.providerName, 'i')
  const familyName = getByText(reg);
  expect(familyName).toBeInTheDocument();
});