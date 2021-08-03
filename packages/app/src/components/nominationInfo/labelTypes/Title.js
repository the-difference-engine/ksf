import React from 'react';
import styles from '../newstyles.module.css';

const Title = props => {
    return(
      <div className={styles.header}>
        <div key={props.label} className={styles.title}>
          {props.label}
        </div>
      </div>
    )
}

export default Title;