import React, { useState, useContext, useEffect } from 'react';
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';
import ApplicationDetail from "./applicationDetail";
import HealthProviderDetail from "./healthProviderDetail";
import styles from "./styles.module.css";



function NominationInfo({bool}) {
  const [activeNomination, setActiveNomination] = useContext(
    ActiveNominationContext
  );
  console.log(bool)
  
  const { hospitalCity, hospitalState, hospitalZipCode, admissionDate } = activeNomination;
  const hospitalAddress = `${hospitalCity}, ${hospitalState}, ${hospitalZipCode}`;


  const dateArr = admissionDate ?  (admissionDate.toString().split("T")[0].split("-")) : [];

  const properDateFormat = `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`
  
  const dischargeDateObject = new Date(activeNomination.dischargeDate);
  const admissionDateObject = new Date(properDateFormat);
  const diffDays = Math.round(Math.abs((admissionDateObject
     - dischargeDateObject) / (24*60*60*1000))) >= 21 ? 'Yes' : 'No';  /* <- hours*minutes*seconds*milliseconds */



  const fields = [
    {
      label: "Provider Name",
      value: activeNomination.providerName
    },
    {
      label: "Email Address",
      value: activeNomination.providerEmailAddress
    },
    {
      label: "Phone Number",
      value: activeNomination.providerPhoneNumber
    },
    {
        label: "Title",
        value: activeNomination.providerTitle
    },
    {
      label: "Name of Hospital",
      value: activeNomination.hospitalName
    },
    {
      label: "Hospital URL",
      value: activeNomination.hospitalURL
    },
    {
      label: "Hospital Address",
      value: hospitalAddress
    },
    {
      label: "How did you hear about KSF?",
      value: ""
    }];

    const familyinfo = [
      {
        label: "Name",
        value: activeNomination.representativeName
      },
      {
        label: "Email Address",
        value: activeNomination.representativeEmailAddress
      },
      {
        label: "Phone Number",
        value: activeNomination.representativePhoneNumber
      },
      {
        label: "Relationship",
        value: activeNomination.representativeRelationship
      },
      {
        label: "Request to communicate in Spanish?",
        value: "No"
      }];
    const patientInfo = [
      {
        label: "Name",
        value: activeNomination.patientName
      },
      {
        label: "Patient Age",
        value: activeNomination.patientAge
      },
      {
        label: "Admission Date",
        value: properDateFormat 
      },
      {
        label: "Discharge Date",
        value: activeNomination.dischargeDate

      },
      {
        label: "Hospitalized for at least 21 days?",
        value: diffDays
      },
      {
        label: "Diagnosis/case information",
        value: activeNomination.patientDiagnosis
      },
    ];
      return (
        <div className={styles.layout}>
          {
          bool ? <div><h1>input stuff here</h1></div> : <div>
            <h1>hello</h1>
            </div>
          }

            {/* second condition to form data */}
            <ApplicationDetail fields={patientInfo} gridContent={true} title="Patient Information" />
            <ApplicationDetail fields={familyinfo} title="Family Member Information"/>
            <HealthProviderDetail fields={fields} gridContent={true} title="Health Provider Information" />
        </div>
      );
    }
  
  export default NominationInfo;
