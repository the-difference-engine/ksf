import React, { useState, useContext, useEffect } from 'react';
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';
// importing activeNominationContext has attribute status
import nominationsAPI from '../../utils/API/nominationsAPI';
import './style.css';
import MarkStageAsComplete from './modals/MarkStageAsCompleteModal';

const ApplicationStages = (props) => {
  const [activeNomination, setActiveNomination] = useContext(
    ActiveNominationContext
  );

  const [currentStatus, setCurrentStatus] = useState();
  // status array is used as the param in
  const status = [
    'Received',
    'Awaiting HIPAA',
    'HIPAA Verified',
    'Document Review',
    'Ready for Board Review',
  ];

  useEffect(() => {
    setCurrentStatus(capitalize(activeNomination.status));
  }, [activeNomination, currentStatus]);

  function createStatusEl() {
    const activeStatusIndex = status.indexOf(currentStatus);
    if (activeNomination.status === 'Declined') {
      return status.map((stat) => (
        <>
          <div className="red-step"></div>
        </>
      ));
    } else {
      return status.map((stat, i) => (
        <>
          {activeStatusIndex === i ? (
            <div className="step current">
              <span>{stat}</span>
            </div>
          ) : activeStatusIndex < i ? (
            <div className="step">
              <span>{stat}</span>
            </div>
          ) : activeStatusIndex > i ? (
            <div className="step complete">
              <span className="checkmark">✓</span>
            </div>
          ) : null}
        </>
      ));
    }
  }

  function advanceStage(value) {
    let index = status.indexOf(value);
    if (index >= 0 && index < status.length - 1) {
      let nextItem = status[index + 1];
      activeNomination.status = nextItem;
      setCurrentStatus(nextItem);
      return updateNom(nextItem);
    }
  }

  function updateNom(currentStatus) {
    try {
      nominationsAPI
        .updateNomination(activeNomination.id, currentStatus)
        .then((res) => {
          if (res.status == 200) {
            let response = res.data;

            // if (typeof response.driveFolderId == 'string') {
            //   activeNomination.driveFolderId = response.driveFolderId;
            //   setActiveNomination((activeNomination) => {
            //     return {
            //       ...activeNomination,
            //       driveFolderId: response.driveFolderId,
            //     };
            //   });
            // }

            // setActiveNomination((activeNomination) => {
            //   return {
            //     ...activeNomination,
            //     status: response.status,
            //   };
            // });

            setActiveNomination((activeNomination) => ({
              ...activeNomination,
              ...response,
            }));
          }
        });
    } catch (err) {
      console.log(err);
    }
  }

  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <>
      <div className="nomination-bar-wrapper">
        <div className="wrapper">
          {currentStatus === 'Declined' ? (
            <div className="status-bar red-arrow-steps clearfix">
              {createStatusEl()}
            </div>
          ) : (
            <div className="status-bar arrow-steps clearfix">
              {createStatusEl()}
            </div>
          )}
          <div className="button-next-wrapper">
            <div className="modal-wrapper">
              <MarkStageAsComplete
                advanceStage={advanceStage}
                currentStatus={currentStatus}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationStages;
