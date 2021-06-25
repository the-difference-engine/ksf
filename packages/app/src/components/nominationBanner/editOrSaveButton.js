import React from 'react';
import styles from '../nominationInfo/newstyles.module.css';

const EditOrSaveButton = props => {
	switch (props.badStyles.saveOrEditLabel) {
		case 'Edit':
			return (
				<button
					className='button button-outline'
					onClick={props.handleEditHasBeenClicked}
					style={{'background-color': 'white', color: 'green', 'border-color': 'var(--light-background)', 'border-radius': '4rem'}}
          type='submit'
				>
					Edit
				</button>
			);
		case 'Save':
			return (
				<button
					className='button button-outline'
					type='submit'
					onClick={props.handleSaveHasBeenClicked}
					id={styles.saveBtn}
				>
					Save
				</button>
			);
		default:
			console.log(
				`THIS IS saveOrEditLabel in EditOrSaveButton ${props.badStyles.saveOrEditLabel}`
			);
			return <h1>WTF</h1>;
	}
};

export default EditOrSaveButton;
