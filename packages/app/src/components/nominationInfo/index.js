import React, { useState, useContext, useEffect } from 'react';
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';
import ApplicationDetail from "./applicationDetail";
import styles from "./styles.module.css";

/*

  admissionDate: null
amountGrantedCents: null
amountRequestedCents: 3654
attachmentsDestination: null
  createdAt: "2021-01-08T01:12:59.547Z"
  dateReceived: "11/6/2020"
  dischargeDate: null
emailValidated: false
hospitalAddress: "456 N Main St."
hospitalCity: "Gotham "
hospitalName: "Gotham General Hospital"
hospitalState: "New Jersey"
hospitalURL: "ggh.com"
hospitalZipCode: "07320"
id: "764f8167-52da-44ff-9c1d-a42e98cf672b"
nominationName: "undefined-NJ"
patientAge: "18 Years of age or older"
patientDiagnosis: null
patientName: "Jack Napier"
providerEmailAddress: "gotham.general@gmail.com"
providerName: "Bruce Wayne"
providerPhoneNumber: "555-137-5681"
providerTitle: "Professor"
publicEmailDomain: true
representativeEmailAddress: "hquinn@dc.com"
representativeName: "Harley Quinn"
representativePhoneNumber: "222-222-2222"
representativeRelationship: "Significant Other"
status: "received"
updatedAt: "2021-01-08T01:12:59.547Z"
verificationCode: "55fb8126-6f87-4309-b3db-05082ecf45c5"


const admit = new Date()
let apply = new Date()
apply.setDate(apply.getDate() + 80)

console.log('admint ', admit.toString())
console.log('apply ', apply.toString())
console.log('diff ', new Date(apply-admit).toString())
*/
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
        label: "Patient Age",
        value: activeNomination.patientAge
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
        label: "Hospitalized for at least 21 days?",
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