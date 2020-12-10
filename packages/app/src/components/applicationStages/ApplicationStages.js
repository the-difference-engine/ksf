import React, { useState, useContext, useEffect } from 'react';
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';
import './style.css';
const ApplicationStages = () => {
  const [activeNomination, setActiveNomination] = useContext(
    ActiveNominationContext
  );
  const [status, setStatus] = useState([
    'received',
    'awaiting HIPPA',
    'HIPPA verified',
    'document review',
  ]);

  useEffect(() => {}, [activeNomination]);

  function advanceStage(e) {
    console.log(activeNomination.status);
    console.log(activeNomination);
    if (activeNomination.status === 'received') {
      return (activeNomination.status = 'awaiting HIPPA');
    }
    if (activeNomination.status === 'awaiting HIPPA') {
      return (activeNomination.status = 'HIPPA verified');
    }
    if (activeNomination.status === 'HIPPA verified') {
      return (activeNomination.status = 'document review');
    }
    if (activeNomination.status === 'document review') {
      return (activeNomination.status = 'ready for board review');
    }
  }
  const statusEl = status.map((x, i) => (
    <>
      {status.indexOf(activeNomination.status) === i ? (
        <div className="step current">
          {console.log('*** :) ***')}
          {console.log(i, 'index of map')}
          {console.log(status.indexOf(activeNomination.status))}
          <span>{x}</span>
        </div>
      ) : status.indexOf(activeNomination.status) < i ? (
        <div className="step">
          <span>{x}</span>
        </div>
      ) : status.indexOf(activeNomination.status) > i ? (
        <div className="step done">
          <span>{x}</span>
        </div>
      ) : (
        console.log(':(')
      )}
    </>
  ));

  function createStatusEl(name) {
    const iOfAcitveNomStat = status.indexOf(activeNomination.status);
    name = 'hello';
    return <div>{name}</div>;
  }

  return (
    <>
      {console.log(activeNomination)}
      <div className="container">
        <div className="wrapper">
          <div className="arrow-steps clearfix">{statusEl}</div>
          <div>{createStatusEl()}</div>
          <div className="nav clearfix">
            <div
              href="#"
              className="next pull-right"
              onClick={() => advanceStage()}
            >
              &#10003; Mark Stage as Complete
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ApplicationStages;
