import React from 'react';
import styles from './newstyles.module.css';

const ViewCard = props => {
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
                  <span className={styles.value}>
                    {props.formData[label].toLocaleDateString()}
                  </span>
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
        {/* </div> */}
      </div>
    </div>
  );
};

export default ViewCard;
