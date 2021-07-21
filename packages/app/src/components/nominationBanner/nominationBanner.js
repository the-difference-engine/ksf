import style from './style.css';
import React, { useEffect, useState, useContext } from 'react';
import nominationsAPI from '../../utils/API/nominationsAPI'
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';

const states = require('us-state-codes');

const NominationBanner = ({ nomination }) => {
  const date = new Date(nomination.dateReceived).toLocaleDateString();
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
  const [activeNomination, setActiveNomination] = useContext(ActiveNominationContext);
  

  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModalState = () => {
    setIsModalVisible(isModalVisible => !isModalVisible)
  }


  function declineApplication() {
    const declineStatus = 'Declined'
    activeNomination.status = declineStatus
    setActiveNomination({ ...activeNomination })
    
    return updateNomination(declineStatus);
  }

  function updateNomination(s) {
    try {
       nominationsAPI.updateNomination(nomination.id, s);
    } catch (error) {
      console.log(error);
    }
  }

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
            <div className="column name">
              <button className=" decline-button" onClick={toggleModalState} style={{ background: '#f72314', color: '#ffffff', border: '#929292', fontWeight: 'bold' }}>
                Decline Application
              </button>
            </div>
            {isModalVisible &&
            <div className="modal-background">
              <div className="modal-container">
                <button className= "exit-button" onClick={toggleModalState} >&times;</button>
                
                <h3 className="modal-text">Do you want to decline the application?</h3>
                <div className="modal-buttons">
                  <button className="button-yes" onClick={()=>{declineApplication(); 
                    toggleModalState()}}>Yes</button>
                  <button className ="button-no"onClick={toggleModalState} >No</button>
                </div>
              </div>
            </div>
            }
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
                  <strong>{date}</strong>
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
            <div className="column hippa hippa-column">
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
