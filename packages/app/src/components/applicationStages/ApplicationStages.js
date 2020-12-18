import React, { useState, useContext, useEffect } from 'react';
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';
import nominationsAPI from '../../utils/API/nominationsAPI';
import './style.css';
const ApplicationStages = () => {
  const [activeNomination, setActiveNomination] = useContext(
    ActiveNominationContext
  );
  const [currentStatus, setCurrentStatus] = useState();
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
    nominationsAPI
      .updateNomination(activeNomination.id, currentStatus)
      .then((res) => {})
      .catch((err) => console.log(err));
  }
  const capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  return (
    <>
      <div className="nomination-bar-wrapper">
        <div className="wrapper">
          {currentStatus ? (
            <div className="arrow-steps clearfix">{createStatusEl()}</div>
          ) : null}
          <div
            className="next pull-right"
            onClick={() => advanceStage(currentStatus)}
          >
            <span>&#10003;</span>Mark Stage as Complete
          </div>
        </div>
      </div>
    </>
  );
};
export default ApplicationStages;
