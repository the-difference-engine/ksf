import React from 'react';
import styles from '../nominationInfo/newstyles.module.css';

const EditOrSaveButton = props => {
  switch (props.mode) {
    case 'view':
      return (
        <button
          onClick={props.handleEditHasBeenClicked}
          id={styles.editBtn}
          type='submit'
        >
          Edit
        </button>
      );
    case 'edit':
      return (
        <>
          <button
            type='submit'
            onClick={() => {
              props.handleSaveHasBeenClicked();
            }}
            id={styles.saveBtn}
          >
            Save
          </button>
          <button
            onClick={() => {
              props.revertMode('view');
            }}
            id={styles.cancelBtn}
            type='submit'
          >
            Cancel
          </button>
        </>
      );
    default:
      return <h1></h1>;
  }
};

export default EditOrSaveButton;
