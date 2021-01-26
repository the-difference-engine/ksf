import React, { useContext, useEffect, useState } from 'react';
import { ActiveNominationContext } from '../../../utils/context/ActiveNominationContext';
import { NominationsDataContext } from '../../../utils/context/NominationsContext';
import NominationBanner from '../../nominationBanner/nominationBanner';
import ApplicationStages from '../../applicationStages/ApplicationStages';

import NominationInfo from '../../nominationInfo';

const NominationPage = ({
  match: {
    params: { id },
  },
}) => {
  const [activeNomination, setActiveNomination] = useContext(
    ActiveNominationContext
  );
  const [NominationsData, setNominationsData] = useContext(
    NominationsDataContext
  );
  const [error, setError] = useState()

  useEffect(() => {
    if (NominationsData) {
      console.log(NominationsData)
      NominationsData.forEach((nomination) => {
        if (nomination.id === id) {
          return setActiveNomination(nomination);
        }
        else {
          return setError('Nomination does not exist')
        }
      });
    }
  }, [NominationsData]);
  return (
    <>
    {activeNomination.length > 0
      ?
    <div className="nomination-show-page">
      <NominationBanner nomination={activeNomination} />
      <ApplicationStages />
      <NominationInfo />
    </div>
      :
    <div>{error}</div>
    }
    </>
  );
};

export default NominationPage;
