import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import styles from './newstyles.module.css';
import { Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import './calendar.css';

const EditCard = props => {
  // state for React Datepicker

  let date = new Date()
  
  const [admissionDate, setAdmissionDate] = useState(
    props.formData['Admission Date'] && date ? new Date(props.formData['Admission Date']) : date
  );

  // state for React Datepicker
  const [dischargeDate, setDischargeDate] = useState(
    props.formData['Discharge Date'] && date ? new Date(props.formData['Discharge Date']) : date
  );

  console.log("EDIT CARD IS RUNNING")
  console.log('THIS IS ADMISSIONDATE', admissionDate)
  console.log('THIS IS dischargeDate', dischargeDate)

  if (String(admissionDate) != 'Invalid Date') {
  return (
    <div className={styles.card}>
      <div className={[styles.gridContainer, styles.content].join(' ')}>
        {props.keys.map(label => {
          switch (true) {
            // Render our titles in form
            case props.titleLabels.includes(label):
              return (
                <div className={styles.header}>
                  <div key={label} className={styles.title}>
                    {label}
                  </div>
                </div>
              );
            // Render dates
            case props.editableDates.includes(label):
              return (
                <div>
                  <label className={styles.label}>{label}</label>
                  {/* Controller Component needed for React Hook Form and React Datepicker Integration*/}
                  <Controller
                    name={label}
                    control={props.control}
                    defaultValue={
                      // from useState hooks above
                      admissionDate && dischargeDate
                        ? label === 'Admission Date'
                          ? new Date(admissionDate)
                          : new Date(dischargeDate)
                        : null
                    }
                    render={({ field: { onChange, value } }) => (
                      <DatePicker
                        selected={value}
                        onChange={onChange}
                        dateFormat='MM/dd/yyyy'
                      />
                    )}
                  />
                  <p className={styles.yupError}>
                    {props.errors[label]?.message}
                  </p>
                </div>
              );
              {
                /* Renders the rest of the form */
              }
            case props.editablePlainText.includes(label):
              return (
                <div>
                  <label className={styles.label}>{label}</label>
                  <input
                    name={label}
                    type='text'
                    defaultValue={props.formData[label]}
                    {...props.register(label)}
                    className={
                      props.errors[label]?.message ? styles.inputError : ''
                    }
                  />
                  <p className={styles.yupError}>
                    {props.errors[label]?.message}
                  </p>
                </div>
              );
              {
                /* Renders Spanish select dropdown */
              }
            case props.spanishDropdown === label:
              return (
                <div>
                  <label className={styles.label}>{label}</label>
                  <select
                    name={label}
                    defaultValue={props.formData[label]}
                    {...props.register(label)}
                  >
                    <option value='Yes'>Yes</option>
                    <option value='No'>No</option>
                  </select>
                </div>
              );
              {
                /* Link opens up provider name's nominations */
              }
            case label === 'Provider Name':
              return (
                <div>
                  <label className={styles.label}>{label}</label>
                  <Link
                    to={`/nomination/${props.id}`}
                    className={styles.linkStyle}
                  >
                    <span
                      className={(styles.value, 'green')}
                      onClick={() => props.openWindow(props.formData[label])}
                      key={label}
                    >
                      {props.formData[label]}
                    </span>
                  </Link>
                </div>
              );
            default:
              return (
                <div
                  className={
                    // Styling for the large diagnosis information displayed in form
                    label === 'Diagnosis/case information'
                      ? styles.diagnosis
                      : ''
                  }
                >
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
  );
} else {
  return <div></div>
}
};

export default EditCard;
