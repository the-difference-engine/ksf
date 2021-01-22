import React from "react";
import { render } from "@testing-library/react";
import ApplicationDetail from './applicationDetail';
import dummyData from './dummyData';

test("renders prop name patientInfo", () => {

  const diffDays = Math.round(Math.abs((dummyData.admissionDate
    - dummyData.dischargeDate) / (24*60*60*1000))) >= 21 ? 'Yes' : 'No';  /* <- hours*minutes*seconds*milliseconds */



  const patientInfo = [
    {
      label: "Name",
      value: dummyData.patientName
    },
    {
      label: "Patient Age",
      value: dummyData.patientAge
    },
    {
      label: "Admission Date",
      value: dummyData.admissionDate
    },
    {
      label: "Discharge Date",
      value: dummyData.dischargeDate
    },
    {
      label: "Hospitalized for at least 21 days?",
      value: diffDays
    },
    {
      label: "Diagnosis/case information",
      value: dummyData.patientDiagnosis
    },
  ];
  // const { getByText } = render(<ApplicationDetail fields={fields} />);
  const { getByText } = render(<ApplicationDetail fields={patientInfo} />);
  const reg = new RegExp(dummyData.patientName, 'i')
  const patientName = getByText(reg);
  expect(patientName).toBeInTheDocument();
});