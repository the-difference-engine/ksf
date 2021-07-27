import {useState} from 'react'

export default {
  id: "12345",
  patientName: 'Bruce Wayne',
  patientAge: '25ish',
  admissionDate: '2020-06-05',
  dischargeDate: '2020-06-15',
  patientDiagnosis: 'goosebumps',
  providerName: 'Arthur Doyle',
  providerEmailAddress: 'adoyle@example.com',
  providerPhoneNumber: '773-403-8977 ',
  providerTitle: 'Health Wizard',
  emailValidated: true,
  publicEmailDomain: true,
  admissionDate: new Date('2020-06-05'),
  dischargeDate: new Date('2020-07-05'),
  diffDays: 'Yes',
  hospitalCity: "Little Rock",
  hospitalState: "AR",
  hospitalZipCode: "72202",
  hospitalName: "Arkansas Children's Hospital",
  representativeName: "jim bob",
  representativeEmailAddress: "jimbob@gmail.com",
  representativePhoneNumber: "556-777-9987",
  representativeRelationship: "Parent",
  representativeSpanishRequested: "No"
};

// const dummyData = {
//   id: "12345",
//   patientName: 'Bruce Wayne',
//   patientAge: '25ish',
//   admissionDate: '2020-06-05',
//   dischargeDate: '2020-06-15',
//   patientDiagnosis: 'goosebumps',
//   providerName: 'Arthur Doyle',
//   providerEmailAddress: 'adoyle@example.com',
//   providerPhoneNumber: '773-403-8977 ',
//   providerTitle: 'Health Wizard',
//   emailValidated: true,
//   publicEmailDomain: true,
//   admissionDate: new Date('2020-06-05'),
//   dischargeDate: new Date('2020-07-05'),
//   diffDays: 'Yes',
//   hospitalCity: "Little Rock",
//   hospitalState: "AR",
//   hospitalZipCode: "72202",
//   hospitalName: "Arkansas Children's Hospital",
//   representativeName: "jim bob",
//   representativeEmailAddress: "jimbob@gmail.com",
//   representativePhoneNumber: "556-777-9987",
//   representativeRelationship: "Parent",
//   representativeSpanishRequested: "No"
// }

// export const [NominationsData, setNominationsData] = useState([dummyData]);
// export const [ActiveNomination, setActiveNomination] = useState(dummyData);
