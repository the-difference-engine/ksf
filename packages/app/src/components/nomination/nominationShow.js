import React, { useContext, useEffect, useState } from 'react';
import NominationBanner from './nominationBanner'
import nominationsAPI from '../../utils/API/nominationsAPI';
import { NominationsDataContext } from '../../utils/context/NominationsContext';
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';

const NominationShow = ({ match: { params: { id } } }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [activeNomination, setActiveNomination] = useContext(ActiveNominationContext)
  const [NominationsData, setNominationsData] = useContext(NominationsDataContext)

  useEffect(() => {
    if (NominationsData) {
      for (var i = 0; i < NominationsData.length; i++) {
        if (id === NominationsData[i].id) {
          console.log('is a match');
          setActiveNomination(NominationsData[i]);
        } else {
          console.log("not a match");
        }
      }
    }
  }, []);

  if (errorMessage && (errorMessage.status === 404 || errorMessage.status === 400)) {
    return (
      <div className="nomination-show-page">
        <p>Nomination does not exist.</p>
      </div>
    );
  }

  if (errorMessage && errorMessage.status === 500) {
    return (
      <div className="nomination-show-page">
        <p>Unknown Error, Please try again in a few minutes.</p>
      </div>
    );
  }

  return (
    <div className="nomination-show-page">
      <NominationBanner nomination={activeNomination && activeNomination}/>
    </div>
  );
};

export default NominationShow;
