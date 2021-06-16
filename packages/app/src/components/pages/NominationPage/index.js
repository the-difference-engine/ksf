import React, { useContext, useEffect, useState } from 'react';
import { ActiveNominationContext } from '../../../utils/context/ActiveNominationContext';
import { NominationsDataContext } from '../../../utils/context/NominationsContext';
import NominationBanner from '../../nominationBanner/nominationBanner';
import ApplicationStages from '../../applicationStages/ApplicationStages';
import SearchBar from '../../SearchBar'
import NominationInfo from '../../nominationInfo';
import ApplicationUpdateDetail from '../../nominationInfo/applicationUpdateDetail';

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
  const [saveHasBeenClicked, setSaveHasBeenClicked] = useState(false);


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

  function handleClick() {
    setHasBeenClicked((hasBeenClicked) => !hasBeenClicked)
    console.log(`this is has been CLICKED in handClick function in NominationPage: ${hasBeenClicked}`)
  }

  function handleSaveHasBeenClicked() {
    console.log("handle save has been clicked")
    setSaveHasBeenClicked((saveHasBeenClicked) => !saveHasBeenClicked)
  }

  return (
    <>
      {activeNomination
        ?
        <div className="nomination-show-page">
          <SearchBar />
          <NominationBanner hasBeenClicked={hasBeenClicked} handleSaveHasBeenClicked={handleSaveHasBeenClicked} handleClick={handleClick} nomination={activeNomination} />
          <ApplicationStages />
          {/* Sends click state data to all NominationInfo children */}
          <NominationInfo hasBeenClicked={hasBeenClicked} saveHasBeenClicked={saveHasBeenClicked}/>
        </div>
        :
        <div>{error}</div>
      }
    </>
  );
};

export default NominationPage;
