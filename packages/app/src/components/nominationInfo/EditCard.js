import React, { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import styles from './newstyles.module.css';
import { Controller } from 'react-hook-form';
import Title from './labelTypes/Title';
import Other from './labelTypes/Other';
import Provider from './labelTypes/Provider';
import './calendar.css';

const EditCard = (props) => {
  return (
    <div className={styles.card}>
      <div className={[styles.gridContainer, styles.content].join(' ')}>
        {props.keys.map((label) => {
          switch (true) {
            // Render our titles in form
            case props.titleLabels.includes(label):
              return <Title label={label} key={label} />;
            // Render dates
            case props.editableDates.includes(label):
              return (
                <div key={label}>
                  <label className={styles.label}>{label}</label>
                  {/* Controller Component needed for React Hook Form and React Datepicker Integration*/}
                  <Controller
                    name={label}
                    control={props.control}
                    defaultValue={
                      String(props.formData['Admission Date']) !==
                        'Invalid Date' &&
                      String(props.formData['Discharge Date']) !==
                        'Invalid Date'
                        ? label === 'Admission Date'
                          ? new Date(props.formData['Admission Date'])
                          : new Date(props.formData['Discharge Date'])
                        : null
                    }
                    render={({ field: { onChange, value } }) => {
                      return (
                        <DatePicker
                          selected={
                            label === 'Admission Date'
                              ? new Date(value)
                              : new Date(value)
                          }
                          onChange={(date) => {
                            const yearLength = date.getFullYear().toString()
                              .length;
                            if (yearLength === 4) {
                              label === 'Admission Date'
                                ? onChange(new Date(date))
                                : onChange(new Date(date));
                            }
                          }}
                          dateFormat="MM/dd/yyyy"
                        />
                      );
                    }}
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
                <div key={label}>
                  <label className={styles.label}>{label}</label>
                  <input
                    name={label}
                    type="text"
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
                <div key={label}>
                  <label className={styles.label}>{label}</label>
                  <select
                    name={label}
                    defaultValue={props.formData[label]}
                    {...props.register(label)}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              );
              {
                /* Link opens up provider name's nominations */
              }
            case label === 'Provider Name':
              return (
                <Provider
                  id={props.id}
                  formData={props.formData}
                  openWindow={props.openWindow}
                  label={label}
                  key={label}
                />
              );
            // renders diagnosis across two columns
            case label === 'Diagnosis/case information':
              return (
                <Other
                  label={label}
                  formData={props.formData}
                  style={styles.diagnosis}
                  key={label}
                />
              );
            // renders everything else
            default:
              return (
                <Other
                  label={label}
                  formData={props.formData}
                  style={''}
                  key={label}
                />
              );
          }
        })}
      </div>
    </div>
  );
};

export default EditCard;
