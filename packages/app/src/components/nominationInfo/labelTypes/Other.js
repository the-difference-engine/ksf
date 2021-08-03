import React from 'react';
import styles from '../newstyles.module.css';

const Other = props => {
    return (
        <div>
            <label className={styles.label}>{props.label}</label>
            <span className={styles.value}>
            {String(props.formData[props.label])}
        </span>
      </div>
    )
}

export default Other;