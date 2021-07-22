import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './newstyles.module.css';
import { Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

const EditCard = props => {
  const [admissionDate, setAdmissionDate] = useState(
    new Date(props.formData['Admission Date'])
  );
  const [dischargeDate, setDischargeDate] = useState(
    new Date(props.formData['Discharge Date'])
  );

  let keys = Object.keys(props.formData);
  return (
    <div className={styles.card}>
      <div className={[styles.gridContainer, styles.content].join(' ')}>
        {keys.map(label => {
          switch (true) {
            case props.titleLabels.includes(label):
              return (
                <div className={styles.header}>
                  <div key={label} className={styles.title}>
                    {label}
                  </div>
                </div>
              );
            case props.editableDates.includes(label):
              return (
                <div>
                  <label className={styles.label}>{label}</label>
                  <Controller
                    name={label}
                    control={props.control}
                    defaultValue={
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
                        calendarClassName='calendar'
                      />
                    )}
                  />
                  <p className={styles.yupError}>
                    {props.errors[label]?.message}
                  </p>
                </div>
              );
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
};

export default EditCard;
