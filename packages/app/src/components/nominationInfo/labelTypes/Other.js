import React from 'react';
import styles from '../newstyles.module.css';

const Other = props => {
    return(
        <div className={props.style}>
            <label className={styles.label}>{props.label}</label>
            <span className={styles.value}>
            {props.formData[props.label]}
        </span>
      </div>
    )
}

export default Other;