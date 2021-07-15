import React from 'react';
import styles from '../nominationInfo/newstyles.module.css';

const EditOrSaveButton = props => {
	switch (props.mode) {
		case 'view':
			return (
				<button
					className='button button-outline'
					onClick={props.handleEditHasBeenClicked}
					style={{
						'background-color': 'white',
						color: 'green',
						'border-color': 'var(--light-background)',
						'border-radius': '4rem',
					}}
					type='submit'
				>
					Edit
				</button>
			);
		case 'edit':
			return (
				<button
					className='button button-outline'
					type='submit'
					onClick={() => {
						props.handleSaveHasBeenClicked();
					}}
					id={styles.saveBtn}
				>
					Save
				</button>
			);
		default:
			return <h1></h1>;
	}
};

export default EditOrSaveButton;
