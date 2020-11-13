import React from "react";
import { render } from "@testing-library/react";
import FamilyInformation from './familyInformation';
import dummyData from './dummyData';

//Todo - make this a Jest snapshot test - https://jestjs.io/docs/en/snapshot-testing
test("renders prop name familyRepresentativeName", () => {
  const { getByText } = render(<FamilyInformation {...dummyData} />);
  const reg = new RegExp(dummyData.familyRepresentativeName, 'i')
  const familyName = getByText(reg);
  expect(familyName).toBeInTheDocument();
});
