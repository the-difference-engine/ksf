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

  const phoneRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/

	const yesNoRegex = /^(?:Yes\b|No\b)/;
};

export default ApplicationUpdateDetailNew;
