import React, { useContext, useEffect, useState } from 'react';
import NominationBanner from './nominationBanner'
import nominationsAPI from '../../utils/API/nominationsAPI';
import NominationInfo from '../nominationInfo';
import './style.css';


const NominationShow = ({ match: { params: { id } } }) => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [activeNomination, setActiveNomination] = useContext(ActiveNominationContext)
  const [NominationsData, setNominationsData] = useContext(NominationsDataContext)

  useEffect(() => {
    if (NominationsData) {
    NominationsData.filter((nomination) => {
      if(nomination.id === id) {
        setActiveNomination(nomination);
      } 
    })
    if(activeNomination.length === 0) {
      setErrorMessage(true);
    }
  }
  }, [id]);

  if (errorMessage && (errorMessage === true)) {
    return (
      <div className="nomination-show-page">
        <p>There has been an error locating the application.</p>
      </div>
    );
  }
  return (
    <div className="nomination-show-page">
      <NominationBanner nomination={activeNomination}/>
    </div>
  );
};

export default NominationShow;
