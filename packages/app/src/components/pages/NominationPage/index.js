import React, { useContext, useEffect, useState } from 'react';
import { ActiveNominationContext } from '../../../utils/context/ActiveNominationContext';
import { NominationsDataContext } from '../../../utils/context/NominationsContext';
import NominationBanner from '../../nominationBanner/nominationBanner';
import ApplicationStages from '../../applicationStages/ApplicationStages';
import SearchBar from '../../SearchBar'
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
  const [error, setError] = useState();
  const [hasBeenClicked, setHasBeenClicked] = useState(false);

  
  useEffect(() => {
    if (NominationsData) {
      NominationsData.forEach((nomination) => {
        if (nomination.id === id) {
          return setActiveNomination(nomination);
        }
        else {
          return setError('Nomination does not exist')
        }
      });
    }
  });

  function handleClick(){
    setHasBeenClicked((isClicked)=>!isClicked)
  }
  
  return (
    <>
    {activeNomination
      ?
      <div className="nomination-show-page">
        <SearchBar />
        <NominationBanner hasBeenClicked={hasBeenClicked} handleClick={handleClick} nomination={activeNomination} />
        <ApplicationStages />
        <NominationInfo hasBeenClicked={hasBeenClicked}/>
      </div>
      :
    <div>{error}</div>
    }
    </>
  );
};

export default NominationPage;
