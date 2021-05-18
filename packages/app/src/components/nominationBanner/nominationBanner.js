import style from './style.css';
import React from 'react';
const states = require('us-state-codes');

const NominationBanner = ({ nomination }) => {
  const date = new Date(nomination.dateReceived);
  const submissionDate = date.toLocaleDateString();
  const submissionDateMinutes = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const finalSubmissionDate = `${submissionDate} – ${submissionDateMinutes}`;
  const lastName = nomination.patientName ? nomination.patientName.split(' ')[1] : '';
  const state = states.getStateCodeByStateName(nomination.hospitalState);
  const nominationName = `${lastName}-${state}`;
  const formattedAmount = nomination.amountRequestedCents ? nomination.amountRequestedCents.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : '';
  const hippaDate = nomination.hipaaTimestamp;
  const valid = new Date(hippaDate).getTime() > 0;
  let newDate = new Date(hippaDate);
  const time = newDate.toLocaleDateString();
  const minutes = newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const finalDate = `${time} – ${minutes}`;

  return (
    <div className="nomination-banner-container">
      <div className="row">
        <div className="column column-10 icon-container">
          <img src="/ksflogo.png" alt="other" />
        </div>

        <div className="column column-80 nomination-details">
          <div className="row banner-top">
            <div className="column name" style={{ width: '25%' }}>
              <p>Application</p>
              <span>
                <h1 className="nom-name">
                  <strong>{nominationName}</strong>
                </h1>
              </span>
            </div>
            <div className="column center">
              <button className="decline-button button-center button">
                <span>Decline Application</span>
              </button>
            </div>
          </div>
          <div className="row">
            <div className="column hp-name">
              <p className="secondary-dark">HP Name</p>
              <span>
                <h2 className="body-font">
                  <strong>{nomination.providerName}</strong>
                </h2>
              </span>
            </div>
            <div className="column fam-name">
              <p className="secondary-dark">Family Member Name</p>
              <span>
                <h2 className="body-font">
                  <strong>{nomination.representativeName}</strong>
                </h2>
              </span>
            </div>
            <div className="column created-at">
              <p className="secondary-dark">Submission Date</p>
              <span>
                <h2 className="body-font">
                  <strong>{finalSubmissionDate}</strong>
                </h2>
              </span>
            </div>
            <div className="column amount">
              <p className="secondary-dark">Grant Amount Requested</p>
              <span>
                <h2 className="body-font">
                  <strong>{formattedAmount ? `$${formattedAmount}` : ''}</strong>
                </h2>
              </span>
            </div>
            <div className="column hippa">
              <p className="secondary-dark">HIPPA Date</p>
              <span>
                <h2 className="body-font">
                  <strong>{valid ? finalDate : 'Awaiting HIPPA'}</strong>
                </h2>
              </span>
            </div>
          </div>
        </div>
        <div className="column column-10">
          <button className="button button-outline edit-button" id="edit-button">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NominationBanner;
