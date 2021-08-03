import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import styles from './newstyles.module.css';
import { Controller } from 'react-hook-form';
import Title from './labelTypes/Title';
import Other from './labelTypes/Other';
import Provider from './labelTypes/Provider';
import './calendar.css';


const EditCard = props => {
  // state for React Datepicker

  const [admissionDate, setAdmissionDate] = useState(
    new Date(props.formData['Admission Date'])
  );

  // state for React Datepicker
  const [dischargeDate, setDischargeDate] = useState(
    new Date(props.formData['Discharge Date'])
  );

  return (
    <div className={styles.card}>
      <div className={[styles.gridContainer, styles.content].join(' ')}>
        {props.keys.map(label => {
          switch (true) {
            // Render our titles in form
            case props.titleLabels.includes(label):
              return <Title label={label} />
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
                      String(admissionDate) != 'Invalid Date' && String(dischargeDate) != 'Invalid Date'
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
              return <Provider 
                        id={props.id}
                        formData={props.formData}
                        openWindow={props.openWindow}
                        label={label}
                        />
            // renders diagnosis accross two columns
            case label === 'Diagnosis/case information':
              return <Other label={label} formData={props.formData} style={styles.diagnosis}/>
            // renders everything else
            default:
              return <Other label={label} formData={props.formData} style={""}/>
          }
        })}
      </div>
    </div>
  );

};

export default EditCard;
