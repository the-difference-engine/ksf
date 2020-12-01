import React from "react";
import ApplicationDetail from "./applicationDetail";
import styles from "./styles.module.css";


function NominationInfo({ NominationData }) {
  const fields = [
    {
      label: "Name",
      value: NominationData.providerName
    },
    {
      label: "Email Address",
      value: NominationData.providerEmailAddress
    },
    {
      label: "Phone Number",
      value: NominationData.providerPhoneNumber
    },
    {
        label: "Title",
        value: NominationData.providerTitle
    },
    {
      label: "Email Validated",
      value: NominationData.emailValidated
    },
    {
      label: "Public Email Domain",
      value: NominationData.publicEmailDomain
    },
    {
      label: "Patient Diagnosis",
      value: 'NominationData.patientDiagnosis'
      // value: NominationData.patientDiagnosis
    }];

    const familyinfo = [
      {
        label: "Name",
        value: NominationData.representativeName
      },
      {
        label: "Email Address",
        value: NominationData.representativeEmailAddress
      },
      {
        label: "Phone Number",
        value: NominationData.representativePhoneNumber
      },
      {
        label: "Relationship",
        value: NominationData.representativeRelationship
      }];
    const patientInfo = [
      {
        label: "Name",
        value: NominationData.patientName
      },
      {
        label: "",
        value: ""
      },
      {
        label: "Admission Date",
        value: NominationData.admissionDate
      },
      {
        label: "Discharge Date",
        value: NominationData.dischargeDate
      },
      {
        label: "Diagnosis/case information",
        value: NominationData.patientDiagnosis
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