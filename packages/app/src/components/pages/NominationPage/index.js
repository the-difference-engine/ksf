import React, { useContext, useEffect, useState } from 'react';
import { ActiveNominationContext } from '../../../utils/context/ActiveNominationContext';
import { NominationsDataContext } from '../../../utils/context/NominationsContext';
import NominationBanner from '../../nominationBanner/nominationBanner';
import ApplicationStages from '../../applicationStages/ApplicationStages';
import SearchBar from '../../SearchBar'
import NominationInfo from '../../nominationInfo';
import ApplicationUpdateDetail from '../../nominationInfo/applicationUpdateDetail';
import RenderForm from '../../nominationInfo/RenderForm'


const NominationPage = ({

  match: {
    params: { id },
  },
}) => {
  const [activeNomination, setActiveNomination] = useContext(
    ActiveNominationContext
  );
  const [NominationsData, setNominationsData] = useContext(
    NominationsDataContext
  );
  const [error, setError] = useState();
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  const [saveHasBeenClicked, setSaveHasBeenClicked] = useState(false);

  const [mode, setMode] = useState('view')

  useEffect(() => {
    if (NominationsData) {
      NominationsData.forEach((nomination) => {
        if (nomination.id === id) {
          return setActiveNomination(nomination);
        }
        else {
          return setError('Nomination does not exist')
        }
      });
    }
  });


  // const [activeNomination, setActiveNomination] = useContext(
  //   ActiveNominationContext
  // );

  const { hospitalCity, hospitalState, hospitalZipCode, admissionDate, dischargeDate } = activeNomination;
  const hospitalAddress = `${hospitalCity}, ${hospitalState}, ${hospitalZipCode}`;

  const admissionDateObject = new Date(admissionDate);

  const properDateFormat = admissionDateObject.toLocaleDateString();

  const dischargeDateObject = new Date(activeNomination.dischargeDate);

  const diffDays = Math.round(Math.abs((admissionDateObject - dischargeDateObject) / (24 * 60 * 60 * 1000))) >= 21 ? 'Yes' : 'No'; /* <- hours*minutes*seconds*milliseconds */

  const newDate = new Date(dischargeDate);
  const dischargeDateStr = newDate.toLocaleDateString();



  const formData = {
    "Provider Name": `${activeNomination.providerName}`,
    "Email Address": `${activeNomination.providerEmailAddress}`,
    "Phone Number": `${activeNomination.providerPhoneNumber}`,
    "Title": `${activeNomination.providerTitle}`,
    "Name of Hospital": `${activeNomination.providerTitle}`,
    "Hospital URL": `${activeNomination.providerTitle}`,
    "Hospital Address": `${hospitalAddress}`,
    "How did you hear about KSF?": '',
    "Representative Name": `${activeNomination.representativeName}`,
    "Email Address": `${activeNomination.representativeEmailAddress}`,
    "Phone Number": `${activeNomination.representativePhoneNumber}`,
    "Relationship": `${activeNomination.representativeRelationship}`,
    "Request to communicate in Spanish?": "No",

    "Patient Name": `${activeNomination.patientName}`,
    "Patient Age": `${activeNomination.patientAge}`,
    "Admission Date": `${properDateFormat}`,
    "Discharge Date": `${activeNomination.dischargeDate}`,
    "Hospitalized for at least 21 days?": `${diffDays}`,
    "Diagnosis/case information": `${activeNomination.patientDiagnosis}`,
  }


  function handleClick() {
    setHasBeenClicked((hasBeenClicked) => !hasBeenClicked)
    console.log(`this is has been CLICKED in handClick function in NominationPage: ${hasBeenClicked}`)

  setMode('edit')
    setTimeout(() => {  
        console.log(`THIS IS MODE IN PARENT COMPONENT: ${mode}`) 
    }, 2000);
  }

  function handleSaveHasBeenClicked() {
    console.log("handle save has been clicked")
    setSaveHasBeenClicked((saveHasBeenClicked) => !saveHasBeenClicked)
  }

  const showNewStuff = true

  return (
     // TODO FIRST: remove hasBeenClicked prop from RenderForm so it doesn't rerender twice when handleClick() runs above.
     <>
{activeNomination
  ?
  <div className="nomination-show-page">
    <SearchBar />
    <NominationBanner hasBeenClicked={hasBeenClicked} handleSaveHasBeenClicked={handleSaveHasBeenClicked} handleClick={handleClick} nomination={activeNomination} />
    <ApplicationStages />
    {/* Sends click state data to all NominationInfo children */}
    
    <RenderForm formData={formData} mode={mode} hasBeenClicked={hasBeenClicked} saveHasBeenClicked={saveHasBeenClicked} nomination={activeNomination}/>
  </div>
  :
  <div>{error}</div>
}
</>
  );
};

export default NominationPage;


    
// <>
// {activeNomination
//   ?
//   <div className="nomination-show-page">
//     <SearchBar />
//     <NominationBanner hasBeenClicked={hasBeenClicked} handleSaveHasBeenClicked={handleSaveHasBeenClicked} handleClick={handleClick} nomination={activeNomination} />
//     <ApplicationStages />
//     {/* Sends click state data to all NominationInfo children */}
//     <NominationInfo hasBeenClicked={hasBeenClicked} saveHasBeenClicked={saveHasBeenClicked}/>
//   </div>
//   :
//   <div>{error}</div>
// }
// </>