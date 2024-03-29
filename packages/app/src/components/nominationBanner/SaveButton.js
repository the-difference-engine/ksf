import React from 'react';
import styles from '../nominationInfo/newstyles.module.css';

const SaveButton = (props) => {
    return (
        <>
        <button
            type='submit'
            onClick={props.handleHasBeenClicked}
            id={styles.saveBtn}
        >
            Save
        </button>
        <button
            onClick={() => {
                props.handleCancelHasBeenClicked()
                props.revertMode('view')
            }}
            id={styles.cancelBtn}
            type='submit'
        >
            Cancel
        </button>
        </>
    );
}

export default SaveButton;