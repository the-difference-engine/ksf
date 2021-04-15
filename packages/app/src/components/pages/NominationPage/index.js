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
  const [error, setError] = useState()
  const [hasBeenClicked, setHasBeenClicked] = useState(false);
  console.log(activeNomination)
  console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&")
  
  useEffect(() => {
    if (NominationsData) {
      NominationsData.forEach((nomination) => {
        console.log("*****************")
        console.log(nomination)
        console.log("*****************")
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
    setHasBeenClicked((isclicked)=>!isclicked)
  }
  return (
    <>
    {activeNomination
      ?
      <div className="nomination-show-page">
        <SearchBar />
        <NominationBanner fields={handleClick} nomination={activeNomination} />
        <ApplicationStages />
        <NominationInfo fields={hasBeenClicked}/>
      </div>
      :
    <div>{error}</div>
    }
    </>
  );
};

export default NominationPage;
