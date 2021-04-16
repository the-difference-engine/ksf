import NominationInfo from '../nominationInfo';
import style from './style.css'
import React, {useEffect, useState} from 'react';
const states = require('us-state-codes');

const NominationBanner = (props) => {
  const date = new Date(props.nomination.dateReceived).toLocaleDateString()
  const lastName = props.nomination.patientName ? props.nomination.patientName.split(' ')[1] : ''
  const geoState = states.getStateCodeByStateName(props.nomination.hospitalState)
  const nominationName = `${lastName}-${geoState}`
  const formattedAmount = props.nomination.amountRequestedCents ? (props.nomination.amountRequestedCents).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : ''

  let backColor = "white";
  let textColor = "green";
  let toSaveOrNotToSave = "Edit"

  if(props.hasBeenClicked) {
    backColor = "green";
    textColor = "white";
    toSaveOrNotToSave = "Save";
  }

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
              <span><h1 className="nom-name"><strong>{nominationName}</strong></h1></span>
            </div>
          </div>

          <div className="row">
            <div className="column hp-name">
              <p className="secondary-dark">HP Name</p>
              <span><h2 className="body-font"><strong>{props.nomination.providerName}</strong></h2></span>
            </div>
            <div className="column fam-name">
              <p className="secondary-dark">Family Member Name</p>
              <span><h2 className="body-font"><strong>{props.nomination.representativeName}</strong></h2></span>
            </div>
            <div className="column created-at">
              <p className="secondary-dark">Submission Date</p>
              <span><h2 className="body-font"><strong>{date}</strong></h2></span>
            </div>
            <div className="column amount">
              <p className="secondary-dark">Grant Amount Requested</p>
              <span><h2 className="body-font"><strong>{formattedAmount ? `$${formattedAmount}` : ''}</strong></h2></span>
            </div>
          </div>
        </div>
        <div className="column column-10">
          <button className="button button-outline edit-button" style={{ backgroundColor: backColor, color:textColor }} onClick={props.handleClick} id="edit-button">{toSaveOrNotToSave}</button>
        </div>
      </div>
    </div>
  );
};

export default NominationBanner;
