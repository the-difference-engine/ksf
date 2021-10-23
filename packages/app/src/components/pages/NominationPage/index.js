import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { NominationsDataContext } from '../../../utils/context/NominationsContext';
import NominationBanner from '../../nominationBanner/nominationBanner';
import ApplicationStages from '../../applicationStages/ApplicationStages';
import SearchBar from '../../SearchBar';
import ApplicationForm from '../../nominationInfo/ApplicationForm';
import nominationsAPI from '../../../utils/API/nominationsAPI';

import { withRouter } from 'react-router-dom';
const NominationPage = (props) => {
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

  // const [loaded, reload] = useState(false);

  // const location = useLocation();

  // console.log('this is location');
  // console.dir(location);

  console.log('this is props');
  console.dir(props);

  const getNominationById = (id) => {
    nominationsAPI.fetchNomination(id).then((res) => {
      let nomination = res.data;
      console.log('nomination fetch by id is running');
      console.log('this nomination from res.data');
      console.dir(nomination);
      //   setActiveNomination(() => {
      //     // reload((load) => !load);

      //     return {
      //       ...nomination,
      //     };
      //   });
      setActiveNomination({ ...nomination });
    });
  };

  useEffect(() => {
    if (props.state?.nomination) {
      getNominationById(props.state.nomination.id);
    }
    console.log('useEffect Is running');
    // reload((load) => !load);
    // if (NominationsData) {
    //   NominationsData.forEach((nomination) => {
    //     if (nomination.id === id) {
    //       return setActiveNomination(nomination);
    //     } else {
    //       return setError('Nomination does not exist');
    //     }
    //   });
    // }
  }, [props]);

  useEffect(() => {
    console.log('this is active nomination from useEffect [activeNomination]');
    console.dir(activeNomination);
    // reload((load) => !load);
    if (activeNomination) {
      if (typeof activeNomination.status == 'string') {
        console.log('status is a string');
      } else {
        let type = typeof activeNomination.status;
        console.log('status is not a string');
        console.log(`activeNomination.status type is: ${type}`);
        console.log(`activeNominaton.status is ${activeNomination.status}`);
      }
    }
    // console.log('reload has happened');
  }, [activeNomination]);

  if (activeNomination) {
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

    const patientInformationDataKeys = Object.keys(patientInformationData);
    const familyMemberDataKeys = Object.keys(familyMemberData);
    const healthProviderDataKeys = Object.keys(healthProviderData);
    const grantRequestSupportDataKeys = Object.keys(grantRequestSupportData);

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

    return (
      <>
        {props.state.nomination && (
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
              id={props.state.nomination.id}
              revertMode={revertMode}
            />
          </div>
        )}
      </>
    );
  } else {
    return <div>no data</div>;
  }
};

export default withRouter(NominationPage);
