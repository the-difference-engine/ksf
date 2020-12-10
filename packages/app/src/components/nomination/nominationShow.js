import React, { useEffect, useState } from 'react';
import NominationBanner from './nominationBanner'
import nominationsAPI from '../../utils/API/nominationsAPI';
import NominationInfo from '../nominationInfo';


const NominationShow = ({ match: { params: { id } } }) => {
  const [NominationData, setNominationData] = useState({})
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    nominationsAPI.fetchNomination(id)
      .then(function (response) {
        const nomination = response.data.nomination
        setNominationData(nomination)
      })
      .catch(function (err) {
        setErrorMessage(err.response)
      })
  }, [id]);

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
      {NominationData &&
        <React.Fragment>
          <NominationBanner nomination={NominationData}/>
          <NominationInfo NominationData={NominationData}/>
        </React.Fragment>
      }
    </div>
  );
};

export default NominationShow;
