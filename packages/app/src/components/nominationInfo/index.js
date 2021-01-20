import React, { useState, useContext, useEffect } from 'react';
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';
import ApplicationDetail from "./applicationDetail";
import styles from "./styles.module.css";


function NominationInfo() {
  const [activeNomination, setActiveNomination] = useContext(
    ActiveNominationContext
  );
  console.log('activeNomination ',activeNomination)
  const fields = [
    {
      label: "Name",
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
      label: "Email Validated",
      value: activeNomination.emailValidated
    },
    {
      label: "Public Email Domain",
      value: activeNomination.publicEmailDomain
    },
    {
      label: "Patient Diagnosis",
      value: activeNomination.patientDiagnosis
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
            <ApplicationDetail fields={fields} gridContent={true} title="Health Provider Information" />
        </div>
      );
    }
  
  export default NominationInfo;