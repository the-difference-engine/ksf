import React, { createContext, useEffect, useState } from 'react';
import nominationsAPI from '../API/nominationsAPI';
import states from 'us-state-codes';

export const NominationsDataContext = createContext();

export const NominationsDataProvider = (props) => {
  const [NominationsData, setNominationsData] = useState();

  useEffect(() => {
    findAllNominations();
  }, []);

  const nomName = (n) => {
    const lastName = n.patientName ? n.patientName.split(' ')[1] : '';
    const state = states.getStateCodeByStateName(n.hospitalState);
    return `${lastName}-${state}`;
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
      value={[NominationsData, setNominationsData]}
    >
      {props.children}
    </NominationsDataContext.Provider>
  );
};

// export default { findAllNominations }