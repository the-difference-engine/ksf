import React, { createContext, useEffect, useState } from 'react';
import nominationsAPI from '../API/nominationsAPI';
import states from 'us-state-codes';

export const NominationsDataContext = createContext();

export const NominationsDataProvider = (props) => {
  const [NominationsData, setNominationsData] = useState();

  const [apiCalled, setApiCall] = useState(false);

  useEffect(() => {
    if (!apiCalled) {
      console.log('use effect in nominationsDataContext');
      findAllNominations();
      setApiCall(true);
    }
    // findAllNominations();
  }, []);

  const nomName = (n) => {
    const lastName = n.patientName ? n.patientName.split(' ')[1] : '';
    const geoState = states.getStateCodeByStateName(n.hospitalState);
    return `${lastName}-${geoState}`;
  };

  function findAllNominations() {
    nominationsAPI
      .getNominations()
      .then((res) => {
        const nominations = res.data;
        nominations.forEach((nomination) => {
          nomination.nominationName = nomName(nomination);
          nomination.dateReceived = new Date(
            nomination.dateReceived
          ).toLocaleDateString();
        });
        setNominationsData(nominations);
      })
      .catch((err) => console.log(err));
  }

  return (
    <NominationsDataContext.Provider
      value={{ NominationsData, setNominationsData, findAllNominations }}
    >
      {props.children}
    </NominationsDataContext.Provider>
  );
};
