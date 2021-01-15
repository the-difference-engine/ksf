import React from "react";
import { render } from "@testing-library/react";
import ApplicationDetail from './applicationDetail';
import dummyData from './dummyData';

test("renders prop name patientInfo", () => {

  const admissionDate = dummyData.admissionDate;
  // const todaysDate = new Date()
  const determineDischargeDate = dummyData.dischargeDate === null ? new Date() : dummyData.dischargeDate;
  const diffDays = Math.round(Math.abs((admissionDate - determineDischargeDate) / (24*60*60*1000) /* <- hours*minutes*seconds*milliseconds */));
  const patientDaysInHospital = 'Patient was hospitalized for '+diffDays.toString()+ ' days';

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
      value: patientDaysInHospital 
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





// test("renders prop name providerName", () => {
//   const fields = [
//     {
//       label: "Name",
//       value: dummyData.providerName
//     },
//     {
//       label: "Email Address",
//       value: dummyData.providerEmailAddress
//     },
//     {
//       label: "Phone Number",
//       value: dummyData.providerPhoneNumber
//     },
//     {
//         label: "Title",
//         value: dummyData.providerTitle
//     },
//     {
//       label: "Email Validated",
//       value: dummyData.emailValidated
//     },
//     {
//       label: "Public Email Domain",
//       value: dummyData.publicEmailDomain
//     },
//     {
//       label: "Patient Diagnosis",
//       value: dummyData.patientDiagnosis
//     }];
//   const { getByText } = render(<ApplicationDetail fields={fields} />);
//   const reg = new RegExp(dummyData.providerName, 'i')
//   const providerName = getByText(reg);
//   expect(providerName).toBeInTheDocument();
// });