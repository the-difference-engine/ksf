import React from 'react';
const states = require('us-state-codes');

const NominationBanner = ({ nomination }) => {
  const date = new Date(nomination.createdAt).toLocaleDateString()
  const lastName = nomination.patientName ? nomination.patientName.split(' ')[1] : ''
  const state = states.getStateCodeByStateName(nomination.hospitalState)
  const nominationName = `${lastName}-${state}`

  return (
    <div className="nomination-banner-container">
      <div className="row">
        <div className="column column-10 icon-container">
          <img src="/ksflogo.png" alt="other"/>
        </div>

        <div className="column column-80 nomination-details">

          <div className="row banner-top">
            <div className="column name">
              <p>Application</p>
              <span><h1><strong>{nominationName}</strong></h1></span>
            </div>
          </div>

          <div className="row banner-bottom">
            <div className="column hp-name">
              <p className="secondary-dark">HP Name</p>
              <span><h2 className="body-font"><strong>{nomination.providerName}</strong></h2></span>
            </div>
            <div className="column fam-name">
              <p className="secondary-dark">Family Member Name</p>
              <span><h2 className="body-font"><strong>{nomination.representativeName}</strong></h2></span>
            </div>
            <div className="column created-at">
              <p className="secondary-dark">Created Date</p>
              <span><h2 className="body-font"><strong>{date}</strong></h2></span>
            </div>
            <div className="column amount">
               <p className="secondary-dark">Grant Amount Requested</p>
              <span><h2 className="body-font"><strong>${nomination.amountRequestedCents}</strong></h2></span>
            </div>
          </div>
        </div>
        <div className="column column-10">
          <button className="button button-outline edit-button" id="edit-button">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default NominationBanner;