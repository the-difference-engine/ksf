import React, { useCallback, useEffect, useRef, useContext } from 'react';
// import styles from './styles.module.css';
import styles from './newstyles.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import nominationsAPI from '../../utils/API/nominationsAPI';
import { NominationsDataContext } from '../../utils/context/NominationsContext';
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';

const ApplicationForm = props => {
	const firstUpdate = useRef(true);

	const [NominationsData, setNominationsData] = useContext(
		NominationsDataContext
	);

	const [activeNomination, setActiveNomination] = useContext(
		ActiveNominationContext
	);

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

	const functionRequestBody = nomination => {
		const requestBody = {
			admissionDate: nomination.admissionDate,
			dischargeDate: nomination.dischargeDate,
			representativeEmailAddress: nomination.representativeEmailAddress,
			representativePhoneNumber: nomination.representativePhoneNumber,
			representativeRelationship: nomination.representativeRelationship,
			representativeName: nomination.representativeName,
			representativeSpanishRequested: nomination.representativeSpanishRequested,			
		}
		return requestBody;
	};

	// const apiCallback = useCallback(() => {
	// 	const requestBody2 = functionRequestBody(props.nomination);
	// 	const jsonObject = JSON.stringify(requestBody2);
	// 	console.log('hello in apiCallback');
	// 	console.log(`JSON STRINGIFY ${jsonObject}`);
	// }, [props.nomination]);

	// useEffect(() => {
	// 	if (!firstUpdate.current) {
	// 		console.log('hello');
	// 		apiCallback();
	// 	}
	// 	firstUpdate.current = false;
	// }, [apiCallback]);

	const validationSchema = Yup.object({
		'Admission Date': Yup.date().required('Required'),
		'Discharge Date': Yup.date()
			.min(
				Yup.ref('admissionDate'),
				'Discharge date cannot be before admission date.'
			)
			.required('Required'),
		'Representative Name': Yup.string()
			.min(3, 'Must be 3 characters or more.')
			.max(30, 'Must be 30 characters or less.')
			.required('Required'),
		'Email Address': Yup.string()
			.email('Invalid email address.')
			.required('Required'), // This handles email validation with no regex.
		'Phone Number': Yup.string()
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
		formState: { errors },
	} = useForm({
		// resolver: yupResolver(validationSchema),
	});

	// function updateNominationById(id, newData) {
	// 	nominationsAPI
	// 		.updateActiveNomData(id, newData)
	// 		.then(res => {
	// 			console.log(res);
	// 		})
	// 		.then(() => {
	// 			nominationsAPI
	// 				.getNominations()
	// 				.then(res => {
	// 					const nominations = res.data;
	// 					nominations.forEach(nomination => {
	// 						nomination.nominationName = nomName(nomination);
	// 						nomination.dateReceived = new Date(
	// 							nomination.dateReceived
	// 						).toLocaleDateString();
	// 					});
	// 					setNominationsData(nominations);
	// 				})
	// 				.catch(err => console.log(err));
	// 		});
	// }

	// need to fix this on Wednesday
	const submitForm = async data => {
		if (NominationsData) {
			let counter = 0;
			const newNominationData = NominationsData.map(nomination => {
				if (nomination.id === props.id) {
					nomination.admissionDate = data['Admission Date'];
					nomination.dischargeDate = data['Discharge Date'];
					nomination.representativeEmailAddress = data['Email Address'];
					nomination.representativePhoneNumber = data['Phone Number'];
					nomination.representativeRelationship = data['Relationship'];
					nomination.representativeName = data['Representative Name'];
					nomination.representativeSpanishRequested =
						data['Request to communicate in Spanish?'];
					setActiveNomination(nomination);
					console.log(nomination);
					console.log(`Counter: ${counter}`);
				}
				counter++;
				return nomination;
			});
			const requestBody = {
				admissionDate: activeNomination.admissionDate,
				dischargeDate: activeNomination.dischargeDate,
				representativeEmailAddress: activeNomination.representativeEmailAddress,
				representativePhoneNumber: activeNomination.representativePhoneNumber,
				representativeRelationship: activeNomination.representativeRelationship,
				representativeName: activeNomination.representativeName,
				representativeSpanishRequested: activeNomination.representativeSpanishRequested
			}
			// const jsonObject = JSON.stringify(requestBody)
			// console.log(`JSON STRINGIFY ${jsonObject}`);
			const response = await nominationsAPI.updateActiveNomData(props.id, requestBody)
			console.log(response);
			setNominationsData(newNominationData);
			props.returnToViewMode()
		}

		// updateNominationById(props.nomination.id, data).then(() => {
		// 	console.log(`on submit triggered ${data}`);
		// 	props.returnToViewMode();
		// this returns to view mode after successful update request
		// });
	};

	const editablePlainText = [
		// editable family info:
		'Representative Name',
		'Email Address',
		'Phone Number',
		'Relationship',
		'Request to communicate in Spanish?',
	];

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
										return (
											<div>
											<label className={styles.label}>{label}</label>
												<input
													name={label}
													type='date'
													defaultValue={props.formData[label]}
													{...register(label)}
												/>
												<p>{errors[label]?.message}</p>
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
												/>
												<p>{errors[label]?.message}</p>
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
							{/* <button type='submit'>Submit</button> */}
						</div>
					</div>
				</form>
			);
		},
	};
	return modes[props.mode]?.() ?? 'Modes DNE';
};

export default ApplicationForm;

// const myForm = () => {
//   const refSubmitButtom = useRef<HTMLButtonElement>(null);
//   const { handleSubmit } = useForm();
//   const triggerSubmit = () => {
//     refSubmitButtom?.current?.click();
//   };
//   const submitHandler = (data: any) => {
//     console.log(data);
//   }
//   return (
//     <>
//     <form onSubmit={handleSubmit(submitHandler)}>
//        {/* your form goes here */}
//       <button hidden={true} ref={refSubmitButtom} type={"submit"} />
//     </form>
//     </>
//   )
// }

// Four Things in Edit Mode:
// Titles to render one way - CHECK
// Date inputs to render one way
// Text inputs to render one way
// Everything else

// let keys = Object.keys(props.formData);
// let jsxArray = keys.map(key => {
//   switch (true) {
//     case editableDates.includes(key):
//       return (
//         <input
//           name={key}
//           type='date'
//           defaultValue={props.formData[key]}
//         />
//       );
//     default:
//       return (
//         <h1>
//           {key},{props.formData[key]}
//         </h1>
//       );
//   }
// });
// jsxArray.push(<input type='submit' />);
// let reactElements = React.createElement(
//   'form',
//   { onSubmit: handleSubmit(onSubmit) },
//   jsxArray
// );
// return reactElements;
