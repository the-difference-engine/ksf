import React from 'react';
import styles from './newstyles.module.css';
import Title from './labelTypes/Title';
import Other from './labelTypes/Other';
import Provider from './labelTypes/Provider';
import Support from './labelTypes/Support';

const ViewCard = (props) => {
  return (
    <div className={styles.card}>
      <div className={[styles.gridContainer, styles.content].join(' ')}>
        {props.keys.map((label) => {
          switch (true) {
            // Render our titles in card
            case props.titleLabels.includes(label):
              return <Title label={label} key={label} />;
            // Render dates
            case props.editableDates.includes(label):
              return (
                <div key={label}>
                  <label className={styles.label}>{label}</label>
                  <span className={styles.value}>
                    {props.formData[label].toLocaleDateString()}
                  </span>
                </div>
              );
            /* Link opens up provider name's nominations */
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
            // renders diagnosis accross two columns
            case label === 'Diagnosis/case information':
              return (
                <Other
                  label={label}
                  formData={props.formData}
                  style={styles.diagnosis}
                  key={label}
                />
              );
            case label === 'Grant List':
              return <Support formData={props.formData[label]} key={label} />;
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

export default ViewCard;
