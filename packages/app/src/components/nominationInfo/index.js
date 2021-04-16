import React, { useState, useContext, useEffect } from 'react';
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';
import ApplicationDetail from './applicationDetail';
import HealthProviderDetail from './healthProviderDetail';
import styles from './styles.module.css';

function NominationInfo() {
  const [activeNomination, setActiveNomination] = useContext(ActiveNominationContext);

  const { hospitalCity, hospitalState, hospitalZipCode, admissionDate, dischargeDate } = activeNomination;
  const hospitalAddress = `${hospitalCity}, ${hospitalState}, ${hospitalZipCode}`;

  const admissionDateObject = new Date(admissionDate);
  const properDateFormat = admissionDateObject.toLocaleDateString();

  const dischargeDateObject = new Date(activeNomination.dischargeDate);
  const diffDays = Math.round(Math.abs((admissionDateObject - dischargeDateObject) / (24 * 60 * 60 * 1000))) >= 21 ? 'Yes' : 'No'; /* <- hours*minutes*seconds*milliseconds */

  const newDate = new Date(dischargeDate);
  const dischargeDateStr = newDate.toLocaleDateString();

  const fields = [
    {
      label: 'Provider Name',
      value: activeNomination.providerName,
    },
    {
      label: 'Email Address',
      value: activeNomination.providerEmailAddress,
    },
    {
      label: 'Phone Number',
      value: activeNomination.providerPhoneNumber,
    },
    {
      label: 'Title',
      value: activeNomination.providerTitle,
    },
    {
      label: 'Name of Hospital',
      value: activeNomination.hospitalName,
    },
    {
      label: 'Hospital URL',
      value: activeNomination.hospitalURL,
    },
    {
      label: 'Hospital Address',
      value: hospitalAddress,
    },
    {
      label: 'How did you hear about KSF?',
      value: '',
    },
  ];

  const familyinfo = [
    {
      label: 'Name',
      value: activeNomination.representativeName,
    },
    {
      label: 'Email Address',
      value: activeNomination.representativeEmailAddress,
    },
    {
      label: 'Phone Number',
      value: activeNomination.representativePhoneNumber,
    },
    {
      label: 'Relationship',
      value: activeNomination.representativeRelationship,
    },
    {
      label: 'Request to communicate in Spanish?',
      value: 'No',
    },
  ];
  const patientInfo = [
    {
      label: 'Name',
      value: activeNomination.patientName,
    },
    {
      label: 'Patient Age',
      value: activeNomination.patientAge,
    },
    {
      label: 'Admission Date',
      value: properDateFormat,
    },
    {
      label: 'Discharge Date',
      value: dischargeDateStr,
    },
    {
      label: 'Hospitalized for at least 21 days?',
      value: diffDays,
    },
    {
      label: 'Diagnosis/case information',
      value: activeNomination.patientDiagnosis,
    },
  ];
  return (
    <div className={styles.layout}>
      <ApplicationDetail fields={patientInfo} gridContent={true} title="Patient Information" />
      <ApplicationDetail fields={familyinfo} title="Family Member Information" />
      <HealthProviderDetail fields={fields} gridContent={true} title="Health Provider Information" />
    </div>
  );
}

export default NominationInfo;
