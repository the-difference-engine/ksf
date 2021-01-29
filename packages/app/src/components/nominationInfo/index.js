import React, { useState, useContext, useEffect } from 'react';
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';
import ApplicationDetail from "./applicationDetail";
import HealthProviderDetail from "./healthProviderDetail";
import styles from "./styles.module.css";






function NominationInfo() {
  const [activeNomination, setActiveNomination] = useContext(
    ActiveNominationContext
  );
  



  const hospitalAddress = activeNomination.hospitalCity+', '+activeNomination.hospitalState+', '+activeNomination.hospitalZipCode

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
      }];
    const patientInfo = [
      {
        label: "Name",
        value: activeNomination.patientName
      },
      {
        label: "",
        value: ""
      },
      {
        label: "Admission Date",
        value: activeNomination.admissionDate
      },
      {
        label: "Discharge Date",
        value: activeNomination.dischargeDate
      },
      {
        label: "Diagnosis/case information",
        value: activeNomination.patientDiagnosis
      },
    ];
      return (
        <div className={styles.layout}>
            <ApplicationDetail fields={patientInfo} gridContent={true} title="Patient Information" />
            <ApplicationDetail fields={familyinfo} title="Family Member Information"/>
            {/* <ApplicationDetail fields={fields} gridContent={true} title="Health Provider Information" /> */}
            <HealthProviderDetail fields={fields} gridContent={true} title="Health Provider Information" />
        </div>
      );
    }
  
  export default NominationInfo;