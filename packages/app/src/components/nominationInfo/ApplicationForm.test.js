import React, { createContext, useState } from 'react';
import { render } from '@testing-library/react';
import ApplicationForm from './ApplicationForm';
import dummyData from './dummyData';
import TestRenderer from 'react-test-renderer';
import { NominationsDataContext } from '../../utils/context/NominationsContext';
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';
import {createMemoryHistory} from 'history'
import {Router} from 'react-router-dom'

// test('renders ViewCards in ApplicationForm', () => {
//   const patientInformationData = {
//     'Patient Information': '',
//     'Patient Name': `${dummyData.patientName}`,
//     'Patient Age': `${dummyData.patientAge}`,
//     'Diagnosis/case information': `${dummyData.patientDiagnosis}`,
//     'Admission Date': dummyData.admissionDate,
//     'Discharge Date': dummyData.dischargeDate,
//     'Hospitalized for at least 21 days?': `${dummyData.diffDays}`,
//   };

//   const healthProviderData = {
//     'Health Provider Information': '',
//     'Provider Name': `${dummyData.providerName}`,
//     'Provider Email Address': `${dummyData.providerEmailAddress}`,
//     'Provider Phone Number': `${dummyData.providerPhoneNumber}`,
//     'Title': `${dummyData.providerTitle}`,
//     'Name of Hospital': `${dummyData.providerTitle}`,
//     'Hospital URL': `${dummyData.providerTitle}`,
//     'Hospital Address': `${dummyData.hospitalAddress}`,
//     'How did you hear about KSF?': '',
//   };

//   const familyMemberData = {
//     'Family Member Information': '',
//     'Representative Name': `${dummyData.representativeName}`,
//     'Representative Email Address': `${dummyData.representativeEmailAddress}`,
//     'Representative Phone Number': `${dummyData.representativePhoneNumber}`,
//     'Relationship': `${dummyData.representativeRelationship}`,
//     'Request to communicate in Spanish?': `${dummyData.spanishRepString}`,
//   };

//   const history = createMemoryHistory()

//     const { getByText } = render(
    
//     <Router history={history}>
//       <NominationsDataContext.Provider value={[[dummyData], jest.fn()]}>
//         <ActiveNominationContext.Provider value={[dummyData, jest.fn()]}>
//             <ApplicationForm            
//                 patientInformationData={patientInformationData}
//                 familyMemberData={familyMemberData}
//                 healthProviderData={healthProviderData}
//                 mode={'view'}
//                 editHasBeenClicked={false}
//                 saveHasBeenClicked={false}
//                 id={"12345"}
//                 revertMode={jest.fn()} 
//             />
//         </ActiveNominationContext.Provider>
//       </NominationsDataContext.Provider>
//     </Router>
// );

//   const reg = new RegExp(dummyData.patientName, 'i');
//   const patientName = getByText(reg);
//   expect(patientName).toBeInTheDocument();

// });


// test('renders EditCards in ApplicationForm', () => {
//   const patientInformationData = {
//     'Patient Information': '',
//     'Patient Name': `${dummyData.patientName}`,
//     'Patient Age': `${dummyData.patientAge}`,
//     'Diagnosis/case information': `${dummyData.patientDiagnosis}`,
//     'Admission Date': dummyData.admissionDate,
//     'Discharge Date': dummyData.dischargeDate,
//     'Hospitalized for at least 21 days?': `${dummyData.diffDays}`,
//   };

//   const healthProviderData = {
//     'Health Provider Information': '',
//     'Provider Name': `${dummyData.providerName}`,
//     'Provider Email Address': `${dummyData.providerEmailAddress}`,
//     'Provider Phone Number': `${dummyData.providerPhoneNumber}`,
//     'Title': `${dummyData.providerTitle}`,
//     'Name of Hospital': `${dummyData.providerTitle}`,
//     'Hospital URL': `${dummyData.providerTitle}`,
//     'Hospital Address': `${dummyData.hospitalAddress}`,
//     'How did you hear about KSF?': '',
//   };

//   const familyMemberData = {
//     'Family Member Information': '',
//     'Representative Name': `${dummyData.representativeName}`,
//     'Representative Email Address': `${dummyData.representativeEmailAddress}`,
//     'Representative Phone Number': `${dummyData.representativePhoneNumber}`,
//     'Relationship': `${dummyData.representativeRelationship}`,
//     'Request to communicate in Spanish?': `${dummyData.representativeSpanishRequested}`,
//   };

//   const history = createMemoryHistory()

//   var { getByText } = render(
//     <Router history={history}>
//       <NominationsDataContext.Provider value={[[dummyData], jest.fn()]}>
//         <ActiveNominationContext.Provider value={[dummyData, jest.fn()]}>
//             <ApplicationForm            
//                 patientInformationData={patientInformationData}
//                 familyMemberData={familyMemberData}
//                 healthProviderData={healthProviderData}
//                 mode={'edit'}
//                 editHasBeenClicked={false}
//                 saveHasBeenClicked={false}
//                 id={"12345"}
//                 revertMode={jest.fn()} 
//             />
//         </ActiveNominationContext.Provider>
//       </NominationsDataContext.Provider>
//     </Router>
//   );
//   const reg = new RegExp(dummyData.patientName, 'i');
//   const patientName = getByText(reg);
//   expect(patientName).toBeInTheDocument();
  
// });
