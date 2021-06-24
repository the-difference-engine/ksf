import React, { useEffect, useRef } from 'react';
// import styles from './styles.module.css';
import styles from './newstyles.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const ApplicationForm = props => {
	const firstUpdate = useRef(true);

	const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
	const yesNoRegex = /^(?:Yes\b|No\b)/;

	useEffect(() => {
		if (!firstUpdate.current) {
			console.log(`THIS IS MODE IN ApplicationForm ${props.mode}`);
		}
		firstUpdate.current = false;
	}, [props.mode]);

	const validationSchema = Yup.object({
		admissionDate: Yup.date().required('Required'),
		dischargeDate: Yup.date()
			.min(
				Yup.ref('admissionDate'),
				'Discharge date cannot be before admission date.'
			)
			.required('Required'),
		repName: Yup.string()
			.min(3, 'Must be 3 characters or more.')
			.max(30, 'Must be 30 characters or less.')
			.required('Required'),
		email: Yup.string().email('Invalid email address.').required('Required'), // This handles email validation with no regex.
		phoneNum: Yup.string()
			.matches(phoneRegex, 'Please enter a valid phone number.')
			.required('Required'),
		relationship: Yup.string()
			.min(3, 'Must be at least 3 characters.')
			.max(20, 'Must be no more than 20 characters.')
			.required('Required'),
		spanishComms: Yup.string()
			.matches(yesNoRegex, 'Please enter yes or no.')
			.required('Required'),
	});

	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = () => console.log('on submit triggered');

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

	const submitFunction = () => {};

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
				<form onSubmit={handleSubmit(submitFunction)}>
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
               if (titleLabels.includes(label)) {
									<div key={label} className={styles.title}>
										{label}
									</div>;
								} else if (editableDates.includes(label)) {
									<input
										name={label}
										type='date'
										defaultValue={props.formData[label]}
										ref={register}
									/>;
								} else if (editablePlainText.includes(label)) {
									<input
										name={label}
										type='text'
										defaultValue={props.formData[label]}
										ref={register}
									/>;
								} else {
									<div>
										<label className={styles.label}>{label}</label>
										<span className={styles.value}>
											{String(props.formData[label])}
										</span>
									</div>;
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
