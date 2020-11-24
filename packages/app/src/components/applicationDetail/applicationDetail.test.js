import React from "react";
import { render } from "@testing-library/react";
import ApplicationDetail from './applicationDetail';
import dummyData from './dummyData';

test("renders prop name providerName", () => {
  const fields = [
    {
      label: "Name",
      value: dummyData.providerName
    },
    {
      label: "Email Address",
      value: dummyData.providerEmailAddress
    },
    {
      label: "Phone Number",
      value: dummyData.providerPhoneNumber
    },
    {
        label: "Title",
        value: dummyData.providerTitle
    },
    {
      label: "Email Validated",
      value: dummyData.emailValidated
    },
    {
      label: "Public Email Domain",
      value: dummyData.publicEmailDomain
    },
    {
      label: "Patient Diagnosis",
      value: dummyData.patientDiagnosis
    }];
  const { getByText } = render(<ApplicationDetail fields={fields} />);
  const reg = new RegExp(dummyData.providerName, 'i')
  const providerName = getByText(reg);
  expect(providerName).toBeInTheDocument();
});