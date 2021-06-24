import React, { useContext, useEffect, useState, useRef } from 'react';
import styles from './styles.module.css';
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';
import { useFormikContext, Formik, useFormik } from 'formik'; // npm install formik --save
import * as Yup from 'yup'; // npm install yup --save
import nominationsAPI from '../../utils/API/nominationsAPI';

/**
 * Function which is called to update the current active nomination's data fields.
 *
 * @param {*} props - active nomination props
 * @returns - renders data based on click status of edit button
 */

const ApplicationUpdateDetailNew = props => {
	const [activeNomination, setActiveNomination] = useContext(
		ActiveNominationContext
	);

	const phoneRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

	const yesNoRegex = /^(?:Yes\b|No\b)/;

	const patientTitle = 'Patient Information';
	const familyMemberTitle = 'Family Member Information';

	const firstUpdate = useRef(true);
	const formRef = useRef();

	const SubmitComponent = (props) => {
		const formikContext = useFormikContext();
		useEffect(() => {
			if (!firstUpdate.current) {
				console.log('save has been clicked');
				// triggerHandleSubmit();
				formikContext.submitForm();
			}
			firstUpdate.current = false;
		}, [props.saveHasBeenClicked]);
		return null;
	};

	// const triggerHandleSubmit = () => {
	// 	// if (formRef.current) {
	// 	console.log('trigger handle submit');
	// 	// formRef.current.handleSubmit();
	// 	// formikContext.submitForm();
	// 	// }
	// };

	// useEffect(() => {
	//    // Submit the form imperatively as an effect as soon as form values.token are 6 digits long
	//    if (values.token.length === 6) {
	//      submitForm();
	//    }
	//  }, [values, submitForm]);

	return (
		<div className={styles.main}>
			<div className={styles.header}>
				<label className={styles.bold}>{props.title}</label>
			</div>
			{props.title === 'Patient Information' ? (
				<div>
					<Formik
						innerRef={formRef}
						initialValues={{
							admissionDate: props.propsData[2].value,
							dischargeDate: activeNomination.dischargeDate,
							repName: activeNomination.representativeName,
							email: activeNomination.representativeEmailAddress,
							phoneNum: activeNomination.representativePhoneNumber,
							relationship: activeNomination.representativeRelationship,
							spanishComms: props.propsData[4].value,
						}}
						validationSchema={Yup.object({
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
							email: Yup.string()
								.email('Invalid email address.')
								.required('Required'), // This handles email validation with no regex.
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
						})}
						// onSubmit needs to fire when props.hasBeenClicked it true...how??!
						// onSubmit={(values, actions) => {
						// 	console.log('Did I make it here?');
						// 	// nominationsAPI.updateActiveNomData(activeNomination.id, values);
						// 	// actions.setSubmitting(false);
						// }}
						onSubmit={(values, actions) => {
							setTimeout(() => {
								console.log('NEW ON SUBMIT')
								actions.setSubmitting(false);
							}, 1000);
						}}
					>
						{formikProps => (
							<form onSubmit={formikProps.handleSubmit}>
								<h1>
									<SubmitComponent />
								</h1>
								<div
									className={[
										styles.content,
										props.gridContent && styles['grid-container'],
									].join(' ')}
								>
									{props.propsData.map(obj => (
										<div
											key={obj.label}
											className={obj.label === '' ? styles.mobileHide : ''}
										>
											{obj.label === 'Admission Date' ||
											obj.label === 'Discharge Date' ? (
												<div>
													<label className={styles.label}>{obj.label}</label>
													{/* Need to tie label to value in next line somehow, and make functional for each label. */}
													<input
														name={obj.label}
														type='date'
														defaultValue={obj.value}
													/>
												</div>
											) : (
												<div>
													<label className={styles.label}>{obj.label}</label>
													<span className={styles.value}>
														{String(obj.value)}
													</span>
												</div>
											)}
										</div>
									))}
								</div>
								{formikProps.errors.name && (
									<div id='feedback'>{formikProps.errors.name}</div>
								)}
								{/* <SubmitHandler /> */}
							</form>
						)}
					</Formik>
				</div>
			) : (
				// False condition which does not change any form data.
				<div
					className={[
						styles.content,
						props.gridContent && styles['grid-container'],
					].join(' ')}
				>
					{props.propsData.map(obj => (
						<div
							key={obj.label}
							className={obj.label === '' ? styles.mobileHide : ''}
						>
							<label className={styles.label}>{obj.label}</label>
							<input name={obj.label} type='text' defaultValue={obj.value} />
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default ApplicationUpdateDetailNew;