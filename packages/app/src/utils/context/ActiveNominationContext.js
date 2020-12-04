import React, { createContext, useEffect, useState } from 'react';

export const ActiveNominationContext = createContext();

export const ActiveNominationProvider = (props) => {
  const [activeNomination, setActiveNomination] = useState(
    {admissionDate: "2020-07-08T05:00:00.000Z",
    amountGrantedCents: null,
    amountRequestedCents: 727866,
    attachmentsDestination: null,
    createdAt: "2020-12-01T02:00:59.015Z",
    dateReceived: "9/15/2020",
    dischargeDate: "07/31/2020",
    emailValidated: false,
    hospitalAddress: "1515 Holcombe",
    hospitalCity: "Houston",
    hospitalName: "MD Anderson Hospital",
    hospitalState: "Texas",
    hospitalURL: "www.",
    hospitalZipCode: "77030",
    id: "aa248592-3afa-458f-80ea-1159f40b26c7",
    nominationName: "Bruxvoort-TX",
    patientAge: "18 Years of Age or Older",
    patientDiagnosis: "Patient was diagnosed with Chronic Myelomonocytic Leukemia in May 2019.  After two attempts to manage his disease in clinical trials of chemotherapy, he was referred for a bone marrow/stem cell transplant which began in July 2020.  Patient was hospitalized for 24 days and then required to stay in Houston near MD Anderson for the next 76 days for ongoing treatment to address graft vs. host disease and other infections related to the transplant.",
    patientName: "Glenn Bruxvoort",
    providerEmailAddress: "Sheila_X_Jones@bcbstx.com",
    providerName: "Sheila Jones",
    providerPhoneNumber: " (972) 766-8343",
    providerTitle: "Social Worker",
    publicEmailDomain: false,
    representativeEmailAddress: "Mgbruxvoort@gmail.com",
    representativeName: "Melanie Bruxvoort",
    representativePhoneNumber: " (979) 255-6778",
    representativeRelationship: "Spouse",
    status: "received",
    updatedAt: "2020-12-01T02:00:59.015Z"});

  return (
    <ActiveNominationContext.Provider
      value={[activeNomination, setActiveNomination]}
    >
      {props.children}
    </ActiveNominationContext.Provider>
  );
};