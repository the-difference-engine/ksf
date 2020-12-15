import React, { useState, useContext, useEffect } from 'react';
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';
import nominationsAPI from '../../utils/API/nominationsAPI';
import './style.css';

const ApplicationStages = () => {
  const [activeNomination, setActiveNomination] = useContext(
    ActiveNominationContext
  );
  const [currentStatus, setCurrentStatus] = useState('received');
  const status = [
    'Received',
    'Awaiting HIPAA',
    'HIPAA Verified',
    'Document Review',
    'Ready for Board Review',
  ];

  useEffect(() => {
    setCurrentStatus(activeNomination.status);
  }, [currentStatus]);

  function advanceStage(activeNomStatus) {
    switch (activeNomStatus) {
      case 'Received':
        activeNomination.status = 'Awaiting HIPAA';
        setCurrentStatus('Awaiting HIPAA');
        updateNom('Awaiting HIPAA');
        break;
      case 'Awaiting HIPAA':
        activeNomination.status = 'HIPAA Verified';
        setCurrentStatus('HIPAA Verified');
        updateNom('HIPAA Verified');
        break;
      case 'HIPAA Verified':
        activeNomination.status = 'Document Review';
        setCurrentStatus('Document Review');
        updateNom('Document Review');
        break;
      case 'Document Review':
        activeNomination.status = 'Ready for Board Review';
        setCurrentStatus('Ready for Board Review');
        updateNom('Ready for Board Review');
        break;
    }
  }

  function createStatusEl() {
    if (activeNomination.status === 'received') {
      activeNomination.status = 'Received';
    }
    const iOfActiveNomStat = status.indexOf(activeNomination.status);
    return status.map((stat, i) => (
      <>
        {iOfActiveNomStat === i ? (
          <div key={i} className="step current">
            <span>{stat}</span>
          </div>
        ) : iOfActiveNomStat < i ? (
          <div key={i} className="step">
            <span>{stat}</span>
          </div>
        ) : iOfActiveNomStat > i ? (
          <div key={i} className="step complete">
            <span className="checkmark">✓</span>
          </div>
        ) : null}
      </>
    ));
  }

  function updateNom(currentStatus) {
    nominationsAPI
      .updateNomination(activeNomination.id, currentStatus)
      .then((res) => {})
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="nomination-bar-wrapper">
        <div className="wrapper">
          <div className="arrow-steps clearfix">{createStatusEl()}</div>
          <div
            className="next pull-right"
            onClick={() => advanceStage(activeNomination.status)}
          >
            <span>&#10003;</span>Mark Stage as Complete
          </div>
        </div>
      </div>
    </>
  );
};
export default ApplicationStages;
