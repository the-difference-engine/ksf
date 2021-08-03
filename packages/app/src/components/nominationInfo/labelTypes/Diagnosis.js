import React from 'react';
import styles from '../newstyles.module.css';

const Diagnosis = props => {
    return (
        <div className={styles.diagnosis}>
            <label className={styles.label}>{props.label}</label>
            <span className={styles.value}>
            {String(props.formData[props.label])}
        </span>
      </div>
    )
}

export default Diagnosis;