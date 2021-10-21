import React, { useContext, useEffect, useRef, useState } from 'react';
import { NominationsDataContext } from '../../../utils/context/NominationsContext';
import NominationBanner from '../../nominationBanner/nominationBanner';
import ApplicationStages from '../../applicationStages/ApplicationStages';
import SearchBar from '../../SearchBar';
import ApplicationForm from '../../nominationInfo/ApplicationForm';

const NominationPage = ({
  match: {
    params: { id },
  },
}) => {
  const {
    activeNomination,
    setActiveNomination,
    NominationsData,
    setNominationsData,
  } = useContext(NominationsDataContext);
  const [error, setError] = useState();
  const [editHasBeenClicked, setEditHasBeenClicked] = useState(false);
  const [saveHasBeenClicked, setSaveHasBeenClicked] = useState(false);
  const [cancelHasBeenClicked, setCancelHasBeenClicked] = useState(false);

  const [mode, setMode] = useState('view');

  useEffect(() => {
    if (NominationsData) {
      NominationsData.forEach((nomination) => {
        if (nomination.id === id) {
          return setActiveNomination(nomination);
        } else {
          return setError('Nomination does not exist');
        }
      });
    }
  });

  const {
    hospitalCity,
    hospitalState,
    hospitalZipCode,
    admissionDate,
    dischargeDate,
  } = activeNomination;
  const hospitalAddress = `${hospitalCity}, ${hospitalState}, ${hospitalZipCode}`;

  const admissionDateObjectReversedOffset = new Date(admissionDate);
  admissionDateObjectReversedOffset.setTime(
    admissionDateObjectReversedOffset.getTime() +
      admissionDateObjectReversedOffset.getTimezoneOffset() * 60 * 1000
  );

  const dischargeDateObjectReversedOffset = new Date(dischargeDate);
  dischargeDateObjectReversedOffset.setTime(
    dischargeDateObjectReversedOffset.getTime() +
      dischargeDateObjectReversedOffset.getTimezoneOffset() * 60 * 1000
  );

  const diffDays =
    Math.round(
      Math.abs(
        (admissionDateObjectReversedOffset -
          dischargeDateObjectReversedOffset) /
          /* hours*minutes*seconds*milliseconds */
          (24 * 60 * 60 * 1000)
      )
    ) >= 21
      ? 'Yes'
      : 'No';

  let spanishRepString;
  if (activeNomination.representativeSpanishRequested) {
    spanishRepString = 'Yes';
  } else {
    spanishRepString = 'No';
  }

  const patientInformationData = {
    'Patient Information': '',
    'Patient Name': `${activeNomination.patientName}`,
    'Patient Age': `${activeNomination.patientAge}`,
    'Diagnosis/case information': `${activeNomination.patientDiagnosis}`,
    'Admission Date': admissionDateObjectReversedOffset,
    'Discharge Date': dischargeDateObjectReversedOffset,
    'Hospitalized for at least 21 days?': `${diffDays}`,
  };

  const healthProviderData = {
    'Health Provider Information': '',
    'Provider Name': `${activeNomination.providerName}`,
    'Provider Email Address': `${activeNomination.providerEmailAddress}`,
    'Provider Phone Number': `${activeNomination.providerPhoneNumber}`,
    Title: `${activeNomination.providerTitle}`,
    'Name of Hospital': `${activeNomination.hospitalName}`,
    'Hospital URL': `${activeNomination.hospitalURL}`,
    'Hospital Address': `${hospitalAddress}`,
    'How did you hear about KSF?': '',
  };

  const grantRequestSupportData = {
    'Grant Request Support': '',
    'Grant List': `${activeNomination.grantRequestInfo}`,
  };

  const familyMemberData = {
    'Family Member Information': '',
    'Representative Name': `${activeNomination.representativeName}`,
    'Representative Email Address': `${activeNomination.representativeEmailAddress}`,
    'Representative Phone Number': `${activeNomination.representativePhoneNumber}`,
    Relationship: `${activeNomination.representativeRelationship}`,
    'Request to communicate in Spanish?': `${spanishRepString}`,
  };

  function handleEditHasBeenClicked() {
    setEditHasBeenClicked((editHasBeenClicked) => !editHasBeenClicked);
    setMode('edit');
  }

  function handleSaveHasBeenClicked() {
    setSaveHasBeenClicked((saveHasBeenClicked) => !saveHasBeenClicked);
  }

  function handleCancelHasBeenClicked() {
    setCancelHasBeenClicked((cancelHasBeenClicked) => !cancelHasBeenClicked);
  }

  // used by cancel button and onSubmit to change mode back to 'view' from 'edit'
  function revertMode(mode) {
    setMode(mode);
  }

  const patientInformationDataKeys = Object.keys(patientInformationData);
  const familyMemberDataKeys = Object.keys(familyMemberData);
  const healthProviderDataKeys = Object.keys(healthProviderData);
  const grantRequestSupportDataKeys = Object.keys(grantRequestSupportData);

  return (
    <>
      {activeNomination ? (
        <div className="nomination-show-page">
          <SearchBar />
          <NominationBanner
            mode={mode}
            revertMode={revertMode}
            editHasBeenClicked={editHasBeenClicked}
            saveHasBeenClicked={saveHasBeenClicked}
            handleSaveHasBeenClicked={handleSaveHasBeenClicked}
            handleEditHasBeenClicked={handleEditHasBeenClicked}
            handleCancelHasBeenClicked={handleCancelHasBeenClicked}
            nomination={activeNomination}
          />
          <ApplicationStages />
          <ApplicationForm
            patientInformationData={patientInformationData}
            familyMemberData={familyMemberData}
            healthProviderData={healthProviderData}
            grantRequestSupportData={grantRequestSupportData}
            patientInformationDataKeys={patientInformationDataKeys}
            familyMemberDataKeys={familyMemberDataKeys}
            healthProviderDataKeys={healthProviderDataKeys}
            grantRequestSupportDataKeys={grantRequestSupportDataKeys}
            mode={mode}
            editHasBeenClicked={editHasBeenClicked}
            saveHasBeenClicked={saveHasBeenClicked}
            cancelHasBeenClicked={cancelHasBeenClicked}
            id={id}
            revertMode={revertMode}
          />
        </div>
      ) : (
        <div>{error}</div>
      )}
    </>
  );
};

export default NominationPage;
