import React from 'react';
import styles from '../newstyles.module.css';
import { Link } from 'react-router-dom';

const Provider = props => {
    return (
        <div>
         <label className={styles.label}>{props.label}</label>
            <Link
                to={`/nomination/${props.id}`}
                className={styles.linkStyle}
                >
                <span
                    className={(styles.value, 'green')}
                    onClick={() => props.openWindow(props.formData[props.label])}
                    key={props.label}
                >
                    {props.formData[props.label]}
                </span>
            </Link>
      </div>
    )
}

export default Provider;