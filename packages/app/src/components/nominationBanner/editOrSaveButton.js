import React from 'react';
import styles from '../nominationInfo/newstyles.module.css';

const EditOrSaveButton = props => {
	switch (props.mode) {
		case 'view':
			console.log(`Props Mode in Button view: ${props.mode}`);
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
			console.log(`Props Mode in Button edit: ${props.mode}`);
			return (
				<button
					className='button button-outline'
					type='submit'
					// onClick={props.handleSaveHasBeenClicked}
					onClick={() => {
						props.handleSaveHasBeenClicked();
						console.log(`Button Click: ${props.mode}`);
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
