import React, { useContext, useEffect, useState } from 'react';
import NominationBanner from './nominationBanner'
import nominationsAPI from '../../utils/API/nominationsAPI';
import { NominationsDataContext } from '../../utils/context/NominationsContext';
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';

const NominationShow = ({ match: { params: { id } } }) => {
  const [NominationData, setNominationData] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)
  const [activeNomination, setActiveNomination] = useContext(ActiveNominationContext)
  const [NominationsData, setNominationsData] = useContext(NominationsDataContext)

  useEffect(() => {
    nominationsAPI.fetchNomination(id)
      .then(function (response) {
        const nomination = response.data.nomination
        setNominationData(nomination);
        setActiveNomination(nomination);
      })
      .catch(function (err) {
        setErrorMessage(err.response)
      })
  }, [id]);

  useEffect(() => {
    if(NominationsData) {
      console.table(NominationsData);
      for(var i; i<=NominationsData.length; i++) {
        if(id === NominationsData[i].id) {
          console.log("is a match");
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
      <NominationBanner nomination={NominationData && NominationData}/>
    </div>
  );
};

export default NominationShow;
