import styles from '../../components/nominationInfo/newstyles.module.css';
import style from './style.css';
import React, { useEffect, useState, useContext } from 'react';
import nominationsAPI from '../../utils/API/nominationsAPI';
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';
import EditButton from './EditButton';
import SaveButton from './SaveButton';

const states = require('us-state-codes');

/**
 * Creates and renders the active nomination banner.
 *
 * @param {*} props - active nomination props
 * @returns - nomination banner component
 */
const NominationBanner = (props) => {
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
  const minutes = newDate.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const finalDate = `${time} – ${minutes}`;
  const [activeNomination, setActiveNomination] = useContext(
    ActiveNominationContext
  );

  const [declineAppModalVisible, setdeclineAppModalVisible] = useState(false);
  const toggleDeclineAppModalState = () => {
    setdeclineAppModalVisible((declineAppModalVisible) => !declineAppModalVisible);
  };

  const [resendEmailModalVisible, setResendEmailModalVisible] = useState(false);

  const toggleEmailModalState = () => {
    setResendEmailModalVisible(
      (resendEmailModalVisible) => !resendEmailModalVisible
    );
    setRecipientChecked('');
    setEmailTypeChecked('');
  };

  const [recipientChecked, setRecipientChecked] = useState('');
  const [emailTypeChecked, setEmailTypeChecked] = useState('');

  const handleRecipientChange = (e) => {
    setRecipientChecked(e.target.value);
  };

  const handleEmailTypeChange = (e) => {
    setEmailTypeChecked(e.target.value);
  };

  function declineApplication() {
    const declineStatus = 'Declined';
    activeNomination.status = declineStatus;
    setActiveNomination({ ...activeNomination });

    return updateNomination(declineStatus);
  }

  function updateNomination(s) {
    try {
      nominationsAPI.updateNomination(props.nomination.id, s);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="nomination-banner-container">
      <div className="row" id={styles.rowOverride}>
        <div className="column column-10 icon-container">
          <img src="/ksflogo.png" alt="other" />
        </div>

        <div className="column column-80 nomination-details">
          <div className="row banner-top">
            <div className="column name" style={{ width: '30%' }}>
              <p>Application</p>
              <span>
                <h1 className="nom-name">
                  <strong>{nominationName}</strong>
                </h1>
              </span>
            </div>
            <div className="column name">
              <button
                disabled={activeNomination.status == 'Declined'}
                className="decline-button banner-buttons"
                onClick={toggleDeclineAppModalState}
              >
                Decline Application
              </button>
              <button
                disabled={activeNomination.status == 'Declined'}
                className="resend-email-btn banner-buttons"
                onClick={toggleEmailModalState}
              >
                Resend Email
              </button>
            </div>
            {/* Decline Application Modal */}
            {declineAppModalVisible && (
              <div className="modal-background">
                <div className="modal-container">
                  <button className="exit-button" onClick={toggleDeclineAppModalState}>
                    &times;
                  </button>
                  <h3 className="modal-text">
                    Are you sure you want to decline the application?
                  </h3>
                  <div className="modal-buttons">
                    <button
                      className="button-yes"
                      onClick={() => {
                        declineApplication();
                        toggleDeclineAppModalState();
                      }}
                    >
                      Confirm
                    </button>
                    <button className="button-no" onClick={toggleDeclineAppModalState}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Resend Email Modal */}
            {resendEmailModalVisible && (
              <div className="modal-background">
                <div className="email-modal-container">
                  <button
                    className="exit-button"
                    onClick={toggleEmailModalState}
                  >
                    &times;
                  </button>
                  <form className='email-form'>
                    <fieldset className='resend-fieldset'>
                      <legend className= 'resend-legend'>Recipient</legend>
                      <div>
                        <label htmlFor="family-member" className="survey">
                          <input
                            type="radio"
                            name="family-member"
                            value="family-member"
                            id="family-member"
                            checked={recipientChecked === 'family-member'}
                            onChange={handleRecipientChange}
                            className="family-member radio"
                          />
                          Family Member
                        </label>
                      </div>
                      <div>
                        <label htmlFor="healthcare-provider" className="survey">
                          <input
                            type="radio"
                            name="healthcare-provider"
                            value="healthcare-provider"
                            id="healthcare-provider"
                            checked={recipientChecked === 'healthcare-provider'}
                            onChange={handleRecipientChange}
                            className="healthcare-provider radio"
                          />
                          Healthcare Provider
                        </label>
                      </div>
                    </fieldset>
                    <fieldset className='resend-fieldset'>
                      <legend className='email-legend resend-legend'>Email Type</legend>
                      <div>
                        <label htmlFor="hipaa" className="survey">
                          <input
                            type="radio"
                            name="hipaa"
                            value="hipaa"
                            id="hipaa"
                            checked={emailTypeChecked === 'hipaa'}
                            onChange={handleEmailTypeChange}
                            className="hipaa radio"
                          />
                          HIPAA
                        </label>
                      </div>
                      <div>
                        <label htmlFor="survey" className="survey">
                          <input
                            type="radio"
                            name="survey"
                            value="survey"
                            id="survey"
                            checked={emailTypeChecked === 'survey'}
                            onChange={handleEmailTypeChange}
                            className="survey radio"
                          />
                          Survey
                        </label>
                      </div>
                    </fieldset>
                  </form>

                  <div className="email-modal-buttons">
                    <button
                      className="button-yes"
                      onClick={() => {
                        toggleEmailModalState();
                      }}
                    >
                      Submit
                    </button>
                    <button
                      className="button-no"
                      onClick={toggleEmailModalState}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="row">
            <div className="column hp-name">
              <p className="secondary-dark">HP Name</p>
              <span>
                <h2 className="body-font">
                  <strong>{props.nomination.providerName}</strong>
                </h2>
              </span>
            </div>
            <div className="column fam-name">
              <p className="secondary-dark">Family Member Name</p>
              <span>
                <h2 className="body-font">
                  <strong>{props.nomination.representativeName}</strong>
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
                  <strong>
                    {formattedAmount ? `$${formattedAmount}` : ''}
                  </strong>
                </h2>
              </span>
            </div>
            <div className="column hippa">
              <p className="secondary-dark">HIPAA Date</p>
              <span>
                <h2 className="body-font">
                  <strong>{valid ? finalDate : 'Awaiting HIPAA'}</strong>
                </h2>
              </span>
            </div>
          </div>
        </div>
        <div>
          {props.mode == 'view' ? (
            <EditButton handleHasBeenClicked={props.handleEditHasBeenClicked} />
          ) : (
            <SaveButton
              revertMode={props.revertMode}
              handleHasBeenClicked={props.handleSaveHasBeenClicked}
              handleCancelHasBeenClicked={props.handleCancelHasBeenClicked}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NominationBanner;
