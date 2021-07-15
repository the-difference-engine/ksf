import React, { useContext, useEffect, useRef, useState } from 'react';
import { ActiveNominationContext } from '../../../utils/context/ActiveNominationContext';
import { NominationsDataContext } from '../../../utils/context/NominationsContext';
import NominationBanner from '../../nominationBanner/nominationBanner';
import ApplicationStages from '../../applicationStages/ApplicationStages';
import SearchBar from '../../SearchBar';
import NominationInfo from '../../nominationInfo';
import ApplicationUpdateDetail from '../../nominationInfo/applicationUpdateDetail';
import ApplicationForm from '../../nominationInfo/ApplicationForm';
import { DateTime } from "luxon";



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
	const [editHasBeenClicked, setEditHasBeenClicked] = useState(false);
	const [saveHasBeenClicked, setSaveHasBeenClicked] = useState(false);
	// const [validationFailed, setValidationFailed] = useState(false)

	const [mode, setMode] = useState('view');

	useEffect(() => {
		if (NominationsData) {
			NominationsData.forEach(nomination => {
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


	// const getUTCDate = (dateString) => {
	// 	const date = new Date(dateString);
	  
	// 	return new Date(
	// 	  date.getUTCFullYear(),
	// 	  date.getUTCMonth(),
	// 	  date.getUTCDate(),
	// 	  date.getUTCHours(),
	// 	  date.getUTCMinutes(),
	// 	  date.getUTCSeconds(),
	// 	);
	//   };

	// look at format and DatePicker

	//	const admissionDateStr = admissionDate ? format(getUTCDate(admissionDate), 'MM/dd/yyyy') : '';
	
//	const dischargeDateStr = dischargeDate ? format(getUTCDate(dischargeDate), 'MM/dd/yyyy') : '';

// const date = getDatePickerValue() // e.g. 2014-06-25 10:00:00 (picked in any time zone)
// const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone // e.g. America/Los_Angeles

// const utcDate = zonedTimeToUtc(date, timeZone)
	// let admissionDateUTC
	// if (admissionDate) {
	//     admissionDateUTC = zonedTimeToUtc(admissionDate2, timeZone).toUTCString()
	// }
	// let dischargeDateUTC
	// if (dischargeDate) {
	// 	dischargeDateUTC = zonedTimeToUtc(dischargeDate2, timeZone).toUTCString()
	// }

	// const admissionDate2 = new Date(admissionDate)
	// const dischargeDate2 = new Date(dischargeDate)
	// const convertToUTC = (date) => {
	// 	const nowUTC = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
	// 	date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())

	// 	return new Date(nowUTC)
	// }
	// let admissionDateUTC
	// if (admissionDate) {
	//     admissionDateUTC = convertToUTC(admissionDate2)
	// }
	// let dischargeDateUTC
	// if (dischargeDate) {
	// 	dischargeDateUTC = convertToUTC(dischargeDate2)
	// }
	// const admissionDateObject = new Date(admissionDate);
	// const dischargeDateObject = new Date(dischargeDate);
    const luxonDate = DateTime.now().toISO()

	const admissionDateObject2 = new Date(admissionDate);
	admissionDateObject2.setTime(admissionDateObject2.getTime() + admissionDateObject2.getTimezoneOffset()*60*1000)
	
	const dischargeDateObject2 = new Date(dischargeDate);
	dischargeDateObject2.setTime(dischargeDateObject2.getTime() + dischargeDateObject2.getTimezoneOffset()*60*1000)

	// console.log("this is admissionDateUTC", admissionDateUTC)
	// console.log("this is dischargeDateUTC", dischargeDateUTC)

	const diffDays =
		Math.round(
			Math.abs(
				(admissionDateObject2 - dischargeDateObject2) / (24 * 60 * 60 * 1000)
			)
		) >= 21
			? 'Yes'
			: 'No'; /* <- hours*minutes*seconds*milliseconds */

	let spanishRepString;
	if (activeNomination.representativeSpanishRequested) {
		spanishRepString = 'Yes'
	} else {
		spanishRepString = 'No'
	}

	const formData = {
		'Patient Information': '',
		'Patient Name': `${activeNomination.patientName}`,
		'Patient Age': `${activeNomination.patientAge}`,
		'Admission Date': admissionDateObject2,
		'Discharge Date': dischargeDateObject2,
		'Hospitalized for at least 21 days?': `${diffDays}`,
		'Diagnosis/case information': `${activeNomination.patientDiagnosis}`,
		'Family Member Information': '',
		'Representative Name': `${activeNomination.representativeName}`,
		'Representative Email Address': `${activeNomination.representativeEmailAddress}`,
		'Representative Phone Number': `${activeNomination.representativePhoneNumber}`,
		Relationship: `${activeNomination.representativeRelationship}`,
		'Request to communicate in Spanish?': `${spanishRepString}`,
		'Health Provider Information': '',
		'Provider Name': `${activeNomination.providerName}`,
		'Provider Email Address': `${activeNomination.providerEmailAddress}`,
		'Provider Phone Number': `${activeNomination.providerPhoneNumber}`,
		Title: `${activeNomination.providerTitle}`,
		'Name of Hospital': `${activeNomination.providerTitle}`,
		'Hospital URL': `${activeNomination.providerTitle}`,
		'Hospital Address': `${hospitalAddress}`,
		'How did you hear about KSF?': '',
	};

	function handleEditHasBeenClicked() {
		setEditHasBeenClicked(editHasBeenClicked => !editHasBeenClicked);
		console.log(`Nomination Page - handleEditHasBeenClicked: ${editHasBeenClicked}, ${mode}`);

		setMode('edit');

		console.log(`THIS IS MODE IN PARENT COMPONENT: ${mode}`);
	}

	function handleSaveHasBeenClicked() {
		setSaveHasBeenClicked(saveHasBeenClicked => !saveHasBeenClicked);
		// setMode('view');
		console.log(
			`Nomination Page - handleSaveHasBeenClicked: ${saveHasBeenClicked}, ${mode}`
		);
	}

	// function handleFailedValidation() {

	// }

	function revertMode(mode) {
		setMode(mode)
	}

	return (
		<>
			{activeNomination ? (
				<div className='nomination-show-page'>
					<SearchBar />
					<NominationBanner
					  mode={mode}
						editHasBeenClicked={editHasBeenClicked}
						saveHasBeenClicked={saveHasBeenClicked}
						handleSaveHasBeenClicked={handleSaveHasBeenClicked}
						handleEditHasBeenClicked={handleEditHasBeenClicked}
						nomination={activeNomination}
					/>
					<ApplicationStages />
					{/* Sends click state data to all NominationInfo children */}
					<ApplicationForm
						formData={formData}
						mode={mode}
						editHasBeenClicked={editHasBeenClicked}
						saveHasBeenClicked={saveHasBeenClicked}
						nomination={activeNomination}
						gridContent={true}
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
