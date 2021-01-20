import React, { useContext, useEffect } from 'react';
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

  useEffect(() => {
    if (NominationsData) {
      NominationsData.forEach((nomination) => {
        if (nomination.id === id) {
          return setActiveNomination(nomination);
        }
      });
    }
  }, [NominationsData]);
  return (
    <div className="nomination-show-page">
      <NominationBanner nomination={activeNomination} />
      <ApplicationStages />
      <NominationInfo />
    </div>
  );
};

export default NominationPage;
