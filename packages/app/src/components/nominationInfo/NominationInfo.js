import React from 'react';
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';
import HealthProviderDetail from "./healthProviderDetail";
import styles from "./styles.module.css";


const NominationInfo = (props) => {

  const [activeNomination, setActiveNomination] = useContext(
    ActiveNominationContext
  );

  const { hospitalCity, hospitalState, hospitalZipCode, admissionDate, dischargeDate } = activeNomination;
  const hospitalAddress = `${hospitalCity}, ${hospitalState}, ${hospitalZipCode}`;

  const admissionDateObject = new Date(admissionDate);

  const properDateFormat = admissionDateObject.toLocaleDateString();

  const dischargeDateObject = new Date(activeNomination.dischargeDate);

  const diffDays = Math.round(Math.abs((admissionDateObject - dischargeDateObject) / (24 * 60 * 60 * 1000))) >= 21 ? 'Yes' : 'No'; /* <- hours*minutes*seconds*milliseconds */

  const newDate = new Date(dischargeDate);
  const dischargeDateStr = newDate.toLocaleDateString();



  const formData = {
    "Provider Name": `${activeNomination.providerName}`,
    "Email Address": `${activeNomination.providerEmailAddress}`,
    "Phone Number": `${activeNomination.providerPhoneNumber}`,
    "Title": `${activeNomination.providerTitle}`,
    "Name of Hospital": `${activeNomination.providerTitle}`,
    "Hospital URL": `${activeNomination.providerTitle}`,
    "Hospital Address": `${hospitalAddress}`,
    "How did you hear about KSF?": '',
    "Representative Name": `${activeNomination.representativeName}`,
    "Email Address": `${activeNomination.representativeEmailAddress}`,
    "Phone Number": `${activeNomination.representativePhoneNumber}`,
    "Relationship": `${activeNomination.representativeRelationship}`,
    "Request to communicate in Spanish?": "No",

    "Patient Name": `${activeNomination.patientName}`,
    "Patient Age": `${activeNomination.patientAge}`,
    "Admission Date": `${properDateFormat}`,
    "Discharge Date": `${activeNomination.dischargeDate}`,
    "Hospitalized for at least 21 days?": `${diffDays}`,
    "Diagnosis/case information": `${activeNomination.patientDiagnosis}`,
  }


  // function calculate(num1, num2, action) {
  //   const actions = {
  //     add: (a, b) => a + b,
  //     subtract: (a, b) => a - b,
  //     multiply: (a, b) => a * b,
  //     divide: (a, b) => a / b,
  //   };
  
  //   return actions[action]?.(num1, num2) ?? "Calculation is not recognised";
  // }

  // function getDrink (type) {
  //   var drinks = {
  //     'coke': 'Coke',
  //     'pepsi': 'Pepsi',
  //     'lemonade': 'Lemonade',
  //     'default': 'Default item'
  //   };
  //   return 'The drink I chose was ' + (drinks[type] || drinks['default']);
  // }
  
  // var drink = getDrink('coke');


  
  return (
    <FormData />
  )

}

export default NominationInfo;