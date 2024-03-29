import React from 'react';
import DatePicker from 'react-datepicker';
import styles from './newstyles.module.css';
import { Controller } from 'react-hook-form';
import Title from './labelTypes/Title';
import Other from './labelTypes/Other';
import Provider from './labelTypes/Provider';
import './calendar.css';
import Select from 'react-select';
import handleYearValidation from '../../utils/handleYearValidation';

const EditCard = (props) => {
  // options for React-Select Dropdown
  const options = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No' },
  ];

  // styles for React-Select Dropdown
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: 'black',
      '&:active': {
        backgroundColor: 'transparent',
      },
      backgroundColor: 'transparent',
      backgroundColor: state.isFocused
        ? 'var(--light-background)'
        : 'transparent',
      cursor: 'pointer',
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused ? 'var(--brand)' : 'black',
    }),
    menu: (provided) => ({
      ...provided,
      width: '50%',
      cursor: 'pointer',
      marginTop: 0,
      marginBottom: 0,
    }),
    control: (base) => ({
      ...base,
      border: '0.1px solid #d1d1d1',
      boxShadow: 'none',
      '&:hover': {
        border: '1px solid var(--brand)',
      },
      width: '50%',
      minHeight: '40px',
      height: '40px',
      cursor: 'pointer',
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: '40px',
      padding: '0 6px',
    }),
    input: (provided) => ({
      ...provided,
      margin: '1px',
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: '40px',
    }),
  };

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
                          selected={new Date(value)}
                          onChange={(date) => {
                            date = date ?? onChange(new Date());
                            if (handleYearValidation(date)) {
                              onChange(new Date(date));
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
                <div key={label} className="dropdown-div">
                  <label className={styles.label}>{label}</label>
                  <Controller
                    render={({ field: { onChange } }) => {
                      return (
                        <Select
                          options={options}
                          defaultValue={{
                            value: props?.formData[label],
                            label: props?.formData[label],
                          }}
                          onChange={(e) => onChange(e.value)}
                          styles={customStyles}
                        />
                      );
                    }}
                    name={label}
                    control={props.control}
                  />
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
