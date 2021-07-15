import React, { useContext, useEffect, useRef, useState } from 'react';
import { ActiveNominationContext } from '../../../utils/context/ActiveNominationContext';
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
	const [activeNomination, setActiveNomination] = useContext(
		ActiveNominationContext
	);
	const [NominationsData, setNominationsData] = useContext(
		NominationsDataContext
	);
	const [error, setError] = useState();
	const [editHasBeenClicked, setEditHasBeenClicked] = useState(false);
	const [saveHasBeenClicked, setSaveHasBeenClicked] = useState(false);

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

	const admissionDateObject2 = new Date(admissionDate);
	admissionDateObject2.setTime(
		admissionDateObject2.getTime() +
			admissionDateObject2.getTimezoneOffset() * 60 * 1000
	);

	const dischargeDateObject2 = new Date(dischargeDate);
	dischargeDateObject2.setTime(
		dischargeDateObject2.getTime() +
			dischargeDateObject2.getTimezoneOffset() * 60 * 1000
	);

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
		spanishRepString = 'Yes';
	} else {
		spanishRepString = 'No';
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
		setMode('edit');
	}

	function handleSaveHasBeenClicked() {
		setSaveHasBeenClicked(saveHasBeenClicked => !saveHasBeenClicked);
	}

	function revertMode(mode) {
		setMode(mode);
	}

	return (
		<>
			{activeNomination ? (
				<div className='nomination-show-page'>
					<SearchBar />
					<NominationBanner
						mode={mode}
						revertMode={revertMode}
						editHasBeenClicked={editHasBeenClicked}
						saveHasBeenClicked={saveHasBeenClicked}
						handleSaveHasBeenClicked={handleSaveHasBeenClicked}
						handleEditHasBeenClicked={handleEditHasBeenClicked}
						nomination={activeNomination}
					/>
					<ApplicationStages />
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
