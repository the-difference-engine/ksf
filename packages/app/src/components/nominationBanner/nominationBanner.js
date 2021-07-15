import React, { useState } from 'react';
import EditOrSaveButton from './editOrSaveButton';

const states = require('us-state-codes');

//export const
/**
 * Creates and renders the active nomination banner.
 *
 * @param {*} props - active nomination props
 * @returns - nomination banner component
 */
const NominationBanner = props => {
	const date = new Date(props.nomination.dateReceived).toLocaleDateString();
	const lastName = props.nomination.patientName
		? props.nomination.patientName.split(' ')[1]
		: '';
	const state = states.getStateCodeByStateName(props.nomination.hospitalState);
	const nominationName = `${lastName}-${state}`;
	const formattedAmount = props.nomination.amountRequestedCents
		? props.nomination.amountRequestedCents
				.toFixed(2)
				.replace(/\d(?=(\d{3})+\.)/g, '$&,')
		: '';
	const hipaaDate = props.nomination.hipaaTimestamp;
	const valid = new Date(hipaaDate).getTime() > 0;
	let newDate = new Date(hipaaDate);
	const time = newDate.toLocaleDateString();
	const minutes = newDate.toLocaleTimeString();
	const finalDate = `${time} – ${minutes}`;

	return (
		<div className='nomination-banner-container'>
			<div className='row'>
				<div className='column column-10 icon-container'>
					<img src='/ksflogo.png' alt='other' />
				</div>

				<div className='column column-80 nomination-details'>
					<div className='row banner-top'>
						<div className='column name' style={{ width: '30%' }}>
							<p>Application</p>
							<span>
								<h1 className='nom-name'>
									<strong>{nominationName}</strong>
								</h1>
							</span>
						</div>
						<div className='column name'>
							<button
								className=' decline-button'
								style={{
									background: '#f72314',
									color: '#ffffff',
									border: '#929292',
									fontWeight: 'bold',
								}}
							>
								Decline Application
							</button>
						</div>
					</div>

					<div className='row'>
						<div className='column hp-name'>
							<p className='secondary-dark'>HP Name</p>
							<span>
								<h2 className='body-font'>
									<strong>{props.nomination.providerName}</strong>
								</h2>
							</span>
						</div>
						<div className='column fam-name'>
							<p className='secondary-dark'>Family Member Name</p>
							<span>
								<h2 className='body-font'>
									<strong>{props.nomination.representativeName}</strong>
								</h2>
							</span>
						</div>
						<div className='column created-at'>
							<p className='secondary-dark'>Submission Date</p>
							<span>
								<h2 className='body-font'>
									<strong>{date}</strong>
								</h2>
							</span>
						</div>
						<div className='column amount'>
							<p className='secondary-dark'>Grant Amount Requested</p>
							<span>
								<h2 className='body-font'>
									<strong>
										{formattedAmount ? `$${formattedAmount}` : ''}
									</strong>
								</h2>
							</span>
						</div>
						<div className='column hippa'>
							<p className='secondary-dark'>HIPAA Date</p>
							<span>
								<h2 className='body-font'>
									<strong>{valid ? finalDate : 'Awaiting HIPAA'}</strong>
								</h2>
							</span>
						</div>
					</div>
				</div>
				<div className='column column-10'>
					<EditOrSaveButton
						mode={props.mode}
						revertMode={props.revertMode}
						handleEditHasBeenClicked={props.handleEditHasBeenClicked}
						handleSaveHasBeenClicked={props.handleSaveHasBeenClicked}
					/>
				</div>
			</div>
		</div>
	);
};

export default NominationBanner;
