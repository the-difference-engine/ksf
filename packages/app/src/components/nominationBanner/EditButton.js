import React from 'react';
import styles from '../nominationInfo/newstyles.module.css';

const EditButton = (props) => {
    return (
        <button
        onClick={props.handleHasBeenClicked}
        id={styles.editBtn}
        type='submit'
        >
        Edit
        </button>
    );
}

export default EditButton;