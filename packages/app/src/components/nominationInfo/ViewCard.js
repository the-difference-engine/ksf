import React from 'react';
import styles from './newstyles.module.css';
import { Link } from 'react-router-dom';

const ViewCard = props => {
  return (
    <div className={styles.card}>
      <div className={[styles.gridContainer, styles.content].join(' ')}>
        {props.keys.map(label => {
          switch (true) {
            // Render our titles in card
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
                  <span className={styles.value}>
                    {props.formData[label].toLocaleDateString()}
                  </span>
                </div>
              );
            /* Link opens up provider name's nominations */
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
};

export default ViewCard;
