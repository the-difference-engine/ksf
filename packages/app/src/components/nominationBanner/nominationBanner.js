import styles from '../../components/nominationInfo/newstyles.module.css';
import style from './style.css';
import React, { useState, useContext } from 'react';
import nominationsAPI from '../../utils/API/nominationsAPI';
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';
import EditButton from './EditButton';
import SaveButton from './SaveButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import ResendEmailBtn from './resendEmailBtn.js';
import ResendEmailModal from './resendEmailModal.js';
import DeclineAppModal from './declineAppModal.js';
import DeclineAppBtn from './declineAppBtn.js';
import HandleAttachmentBtn from './handleAttachmentBtn';
import HandleAttachmentModal from './handleAttachmentModal';
import { useEffect } from 'react';

const states = require('us-state-codes');
const paperclip = false;
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
  ? ((props.nomination.amountRequestedCents) / 100)
  .toFixed(2)
  .replace(/\d(?=(\d{3})+\.)/g, '$&,')
  : '';


  const hipaaDate = props.nomination.hipaaTimestamp;
  const hipaaReminder = props.nomination.awaitingHipaaReminderEmailTimestamp;
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

  const [showDocsButton, setShowDocsButton] = useState(false);

  const openWindow = (val) => {
    window.open(`https://drive.google.com/drive/folders/${val}`);
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModalState = () => {
    setIsModalVisible((isModalVisible) => !isModalVisible);
  };

  const [declineAppModalVisible, setDeclineAppModalVisible] = useState(false);
  const toggleDeclineAppModalState = () => {
    setDeclineAppModalVisible(
      (declineAppModalVisible) => !declineAppModalVisible
    );
  };
  function hasAttachments() {
    setActiveNomination({...activeNomination, attachments: false})
    return resetAttachments(activeNomination)
  }
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
  function resetAttachments(s) {
    try {
      nominationsAPI.updateActiveNomData(props.nomination.id, s);
    } catch (error) {
      console.log(error)
    }
  }
  let hipaaStatus = hipaaReminder ? 'Reminder Email Sent   ' : 'Awaiting';
  const [resendEmailModalVisible, setResendEmailModalVisible] = useState(false);
  const toggleEmailModalState = () => {
    setResendEmailModalVisible(
      (resendEmailModalVisible) => !resendEmailModalVisible
    );
  };
  const [
    handleAttachmentModalVisible,
    setHandleAttachmentModalVisible,
  ] = useState(false);
  const toggleHandleAttachmentModalState = () => {
    setHandleAttachmentModalVisible(
      (handleAttachmentModalVisible) => !handleAttachmentModalVisible
    );
  };
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
                  <strong>
                    {nominationName}
                    {props.nomination.attachments && (
                      <FontAwesomeIcon
                        className="green"
                        color="green"
                        icon={faPaperclip}
                      />
                    )}
                  </strong>
                </h1>
              </span>
            </div>
            {isModalVisible && (
              <div className="modal-background">
                <div className="modal-container">
                  <button className="exit-button" onClick={toggleModalState}>
                    &times;
                  </button>
                  <h3 className="modal-text">
                    Do you want to decline the application?
                  </h3>
                  <div className="modal-buttons">
                    <button
                      className="button-yes"
                      onClick={() => {
                        declineApplication();
                        toggleModalState();
                      }}
                    >
                      Yes
                    </button>
                    <button className="button-no" onClick={toggleModalState}>
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
            {props.nomination.attachments && (
              <div>
                <HandleAttachmentBtn
                  status={activeNomination.status}
                  toggleHandleAttachmentModalState={
                    toggleHandleAttachmentModalState
                  }
                />
              </div>
            )}
            {handleAttachmentModalVisible && (
              <HandleAttachmentModal
                toggleHandleAttachmentModalState={
                  toggleHandleAttachmentModalState
                }
                attachmentsHandled={hasAttachments}
              />
            )}
            <div className="column name">
              <DeclineAppBtn
                status={activeNomination.status}
                toggleDeclineAppModalState={toggleDeclineAppModalState}
              />
            </div>
            {isModalVisible && (
              <div className="modal-background">
                <div className="modal-container">
                  <button className="exit-button" onClick={toggleModalState}>
                    &times;
                  </button>
                  <h3 className="modal-text">
                    Do you want to decline the application?
                  </h3>
                  <div className="modal-buttons">
                    <button
                      className="button-yes"
                      onClick={() => {
                        declineApplication();
                        toggleModalState();
                      }}
                    >
                      Yes
                    </button>
                    <button className="button-no" onClick={toggleModalState}>
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="column name">
              <ResendEmailBtn
                status={activeNomination.status}
                toggleEmailModalState={toggleEmailModalState}
              />
              {activeNomination.driveFolderId &&
                activeNomination.status != 'received' &&
                activeNomination.status != 'Awaiting HIPAA' && (
                  <span>
                    <button
                      onClick={() => {
                        openWindow(activeNomination.driveFolderId);
                      }}
                      className={`docs-btn banner-buttons ${styles.docsBtn}`}
                    >
                      <FontAwesomeIcon icon="external-link-alt" size="lg" />
                      View Documents
                    </button>
                  </span>
                )}
              {activeNomination.driveFolderId == '' &&
                activeNomination.status != 'received' &&
                activeNomination.status != 'Awaiting HIPAA' && (
                  <span>
                    <h1 style={{ color: 'red' }}>
                      There was a problem creating a google drive folder. Please
                      recreate the nomination.
                    </h1>
                  </span>
                )}
            </div>
            {declineAppModalVisible && (
              <DeclineAppModal
                declineApplication={declineApplication}
                toggleDeclineAppModalState={toggleDeclineAppModalState}
              />
            )}
            {resendEmailModalVisible && (
              <ResendEmailModal
                status={activeNomination.status}
                toggleEmailModalState={toggleEmailModalState}
                nomination={props.nomination}
              />
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
            {!paperclip && (
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
            )}
            
            <div className="column hippa">
              <p className="secondary-dark">HIPAA Date</p>
              <span>
                <h2 className="body-font">
                  <strong>
                    {valid ? (
                      finalDate
                    ) : (
                      <>
                        {hipaaStatus}
                        {hipaaReminder && hipaaStatus ? (
                          <FontAwesomeIcon
                            className="red"
                            color="red"
                            icon={faClock}
                          />
                        ) : null}
                      </>
                    )}
                  </strong>
                </h2>
              </span>
            </div>
          </div>
        </div>
        <div>
          {props.mode === 'view' ? (
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

