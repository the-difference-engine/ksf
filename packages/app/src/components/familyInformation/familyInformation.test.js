import React from "react";
import { render } from "@testing-library/react";
import FamilyInformation from './familyInformation';
import dummyData from './dummyData';

//Todo - make this a Jest snapshot test - https://jestjs.io/docs/en/snapshot-testing
test("renders prop name representativeName", () => {
  const fields = [
    {
      label: "Name",
      value: dummyData.representativeName
    },
    {
      label: "Email Address",
      value: dummyData.representativeEmailAddress
    },
    {
      label: "Phone Number",
      value: dummyData.representativePhoneNumber
    },
    {
      label: "Relationship",
      value: dummyData.representativeRelationship
    }];
  const { getByText } = render(<FamilyInformation fields={fields} />);
  const reg = new RegExp(dummyData.representativeName, 'i')
  const familyName = getByText(reg);
  expect(familyName).toBeInTheDocument();
});
