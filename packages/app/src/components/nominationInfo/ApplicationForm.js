import React, { useEffect, useRef, useContext, useState } from 'react';
// import styles from './styles.module.css';
import styles from './newstyles.module.css';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import nominationsAPI from '../../utils/API/nominationsAPI';
import { NominationsDataContext } from '../../utils/context/NominationsContext';
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// TODO:
// 1. Get original dates to display when edit is clicked
// 2. figure out set view for when API call fails
// 3. Look at back end and write the rest (res.status etc.)
// 4. red text for validation errors
// 5. red highlighting of input box
// 6. add testing

// Taylor and Somers' TODO:
// show previous/default values of dates when edit is clicked - date will not show up until after you've done one edit/save, then if you hit edit again the dates will populate
// red text for validation errors/message, red input box
//  dates displayed once edited are one day prior to the dates inputted - is that on purpose or not?
// figure out formatting of phone number

const ApplicationForm = props => {
	const firstUpdate = useRef(true);

	const [NominationsData, setNominationsData] = useContext(
		NominationsDataContext
	);

	const [activeNomination, setActiveNomination] = useContext(
		ActiveNominationContext
	);

	const [admissionDate, setAdmissionDate] = useState(new Date());
	const [dischargeDate, setDischargeDate] = useState(new Date());

	useEffect(() => {
		if (props.formData['Admission Date'] != 'Invalid Date') {
			setAdmissionDate(props.formData['Admission Date']);
		}
	}, [props.formData['Admission Date']]);

	useEffect(() => {
		if (props.formData['Discharge Date'] != 'Invalid Date') {
			setDischargeDate(props.formData['Discharge Date']);
		}
	}, [props.formData['Discharge Date']]);

	const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
	const yesNoRegex = /^(?:Yes\b|No\b)/;

	useEffect(() => {
		if (!firstUpdate.current) {
			console.log(`THIS IS MODE IN ApplicationForm ${props.mode}`);
		}
	}, [props.mode]);

	useEffect(() => {
		if (!firstUpdate.current) {
			console.log(
				`props.saveHasBeenClicked in Application Form: ${props.saveHasBeenClicked}`
			);
			handleSubmit(submitForm)();
		}
		firstUpdate.current = false;
	}, [props.saveHasBeenClicked]);

	// const functionRequestBody = nomination => {
	// 	const requestBody = {
	// 		admissionDate: nomination.admissionDate,
	// 		dischargeDate: nomination.dischargeDate,
	// 		representativeEmailAddress: nomination.representativeEmailAddress,
	// 		representativePhoneNumber: nomination.representativePhoneNumber,
	// 		representativeRelationship: nomination.representativeRelationship,
	// 		representativeName: nomination.representativeName,
	// 		representativeSpanishRequested: nomination.representativeSpanishRequested,
	// 	};
	// 	return requestBody;
	// };

	const validationSchema = Yup.object({
		'Admission Date': Yup.date().required('Required'),
		'Discharge Date': Yup.date()
			.min(
				Yup.ref('Admission Date'),
				'Discharge date cannot be before admission date.'
			)
			.required('Required'),
		'Representative Name': Yup.string()
			.min(3, 'Must be 3 characters or more.')
			.max(30, 'Must be 30 characters or less.')
			.required('Required'),
		'Representative Email Address': Yup.string()
			.email('Invalid email address.')
			.required('Required'), // This handles email validation with no regex.
		'Representative Phone Number': Yup.string()
			.matches(phoneRegex, 'Please enter a valid phone number.')
			.required('Required'),
		Relationship: Yup.string()
			.min(3, 'Must be at least 3 characters.')
			.max(20, 'Must be no more than 20 characters.')
			.required('Required'),
		'Request to communicate in Spanish?': Yup.string()
			.matches(yesNoRegex, 'Please enter yes or no.')
			.required('Required'),
	});

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		// resolver: yupResolver(validationSchema),
	});

	const submitForm = async data => {
		if (NominationsData) {
			let counter = 0;
			let newActiveNomination = {};
			const newNominationData = NominationsData.map(nomination => {
				if (nomination.id === props.id) {
					nomination.admissionDate = data['Admission Date'];
					nomination.dischargeDate = data['Discharge Date'];
					nomination.representativeEmailAddress =
						data['Representative Email Address'];
					nomination.representativePhoneNumber =
						data['Representative Phone Number'];
					nomination.representativeRelationship = data['Relationship'];
					nomination.representativeName = data['Representative Name'];
					if (data['Request to communicate in Spanish?'] === 'Yes') {
						nomination.representativeSpanishRequested = true;
					} else {
						nomination.representativeSpanishRequested = false;
					}
					newActiveNomination = nomination;
				}
				counter++;
				return nomination;
			});
			const requestBody = {
				admissionDate: newActiveNomination.admissionDate,
				dischargeDate: newActiveNomination.dischargeDate,
				representativeEmailAddress:
					newActiveNomination.representativeEmailAddress,
				representativePhoneNumber:
					newActiveNomination.representativePhoneNumber,
				representativeRelationship:
					newActiveNomination.representativeRelationship,
				representativeName: newActiveNomination.representativeName,
				representativeSpanishRequested:
					newActiveNomination.representativeSpanishRequested,
			};

			const response = await nominationsAPI.updateActiveNomData(
				props.id,
				requestBody
			);
			// check status, validation passed before changing to view
			props.revertMode('view');
			console.log(response);
			setNominationsData(newNominationData);
			setActiveNomination(newActiveNomination);
		}
	};

	const editablePlainText = [
		// editable family info:
		'Representative Name',
		'Representative Email Address',
		'Representative Phone Number',
		'Relationship',
		// 'Request to communicate in Spanish?',
	];

	const spanishDropdown = 'Request to communicate in Spanish?';

	const editableDates = [
		// editable patient info labels with dates:
		'Admission Date',
		'Discharge Date',
	];

	const titleLabels = [
		'Patient Information',
		'Family Member Information',
		'Health Provider Information',
	];

	const modes = {
		view: () => {
			let keys = Object.keys(props.formData);
			return (
				<div className={styles.main}>
					<div className={styles.header}>
						<label className={styles.bold}>{props.title}</label>
					</div>
					<div
						className={[
							styles.content,
							props.gridContent && styles['grid-container'],
						].join(' ')}
					>
						{keys.map(label =>
							label === 'Patient Information' ||
							label === 'Family Member Information' ||
							label === 'Health Provider Information' ? (
								<div key={label} className={styles.title}>
									{label}
								</div>
							) : (
								<div>
									<label className={styles.label}>{label}</label>
									<span className={styles.value}>
										{String(props.formData[label])}
									</span>
								</div>
							)
						)}
					</div>
				</div>
			);
		},
		edit: () => {
			let keys = Object.keys(props.formData);
			console.log('Errors: ', errors);
			console.log('Admission date: ', props.formData['Admission Date']);
			//	console.dir(props.formData.admissionDate)
			console.log('Discharge date: ', props.formData['Discharge Date']);
			console.log(admissionDate, 'admission date');
			return (
				<form>
					<div className={styles.main}>
						<div className={styles.header}>
							<label className={styles.bold}>{props.title}</label>
						</div>
						<div
							className={[
								styles.content,
								props.gridContent && styles['grid-container'],
							].join(' ')}
						>
							{keys.map(label => {
								switch (true) {
									case titleLabels.includes(label):
										return (
											<div key={label} className={styles.title}>
												{label}
											</div>
										);
									case editableDates.includes(label):
										{
											/* const MyContainer = ({ className, children }) => {
											return (
												<div
													style={{
														padding: '16px',
														background: '#216ba5',
														color: '#fff',
													}}
												>
													<CalendarContainer className={className}>
														<div style={{ position: 'relative' }}>
															{children}
														</div>
													</CalendarContainer>
												</div>
											);
										}; */
										}
										return (
											<div>
												<label className={styles.label}>{label}</label>
												{/* <input
													name={label}
													type='date'
													defaultValue={props.formData[label]}
													{...register(label)}
													className={
														errors[label]?.message ? styles.inputError : ''
													}
												/> */}
												<Controller
													name={label}
													control={control}
													render={({ onChange, value }) => (
														<DatePicker
															// selected={props.formData[label]}
															selected={
																admissionDate && dischargeDate
																	? label === 'Admission Date'
																		? new Date(admissionDate)
																		: new Date(dischargeDate)
																	: null
															}
															onChange={date =>
																label === 'Admission Date'
																	? setAdmissionDate(date)
																	: setDischargeDate(date)
															}
															dateFormat='MM/dd/yyyy'
															// calendarContainer={MyContainer}
														/>
													)}
													// onChange={([selected]) => {
													// 	return { value: selected };
													// }}
												/>
												<p className={styles.yupError}>
													{errors[label]?.message}
												</p>
											</div>
										);
									case editablePlainText.includes(label):
										return (
											<div>
												<label className={styles.label}>{label}</label>
												<input
													name={label}
													type='text'
													defaultValue={props.formData[label]}
													{...register(label)}
													className={
														errors[label]?.message ? styles.inputError : ''
													}
												/>
												<p className={styles.yupError}>
													{errors[label]?.message}
												</p>
											</div>
										);
									case spanishDropdown === label:
										return (
											<div>
												<label className={styles.label}>{label}</label>
												<select
													name={label}
													defaultValue={props.formData[label]}
													{...register(label)}
												>
													<option value='Yes'>Yes</option>
													<option value='No'>No</option>
												</select>
											</div>
										);
									default:
										return (
											<div>
												<label className={styles.label}>{label}</label>
												<span className={styles.value}>
													{String(props.formData[label])}
												</span>
											</div>
										);
								}
							})}
						</div>
					</div>
				</form>
			);
		},
	};
	return modes[props.mode]?.() ?? 'Modes DNE';
};

export default ApplicationForm;
