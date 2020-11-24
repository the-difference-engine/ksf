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
      return (
        <div className={styles.layout}>
            <ApplicationDetail fields={fields} gridContent={true} title="This is fake Information" />
            <ApplicationDetail fields={familyinfo} title="Family Member Information"/>
            <ApplicationDetail fields={fields} gridContent={true} title="Health Provider Information" />
        </div>
      );
    }
  
  export default NominationInfo;