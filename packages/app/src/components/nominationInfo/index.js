import React from "react";
import ApplicationDetail from "./applicationDetail";
import styles from "./styles.module.css";

const dummyStyle = {
  margin: '0 auto',
  backgroundColor: 'var(--light-background)',
  padding: '2em',
}

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
      value: NominationData.patientDiagnosis
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
        <div>
          <div style={dummyStyle}>
            <ApplicationDetail fields={fields} gridContent={true} title="Health Provider Information" />
          </div>
          <div style={dummyStyle}>
            <ApplicationDetail fields={familyinfo} title="Family Member Information"/>
          </div>
        </div>
      );
    }
  
  export default NominationInfo;