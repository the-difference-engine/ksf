import React, { createContext, useEffect, useState, useRef } from 'react';
import nominationsAPI from '../API/nominationsAPI';
import states from 'us-state-codes';

export const NominationsDataContext = createContext();

export const NominationsDataProvider = (props) => {
  const [NominationsData, setNominationsData] = useState([]);

  const [activeNomination, setActiveNomination] = useState();

  const apiCalled = useRef(false);

  // useEffect(() => {
  //   if (!apiCalled.current) {
  //     console.log('find all nominations is running in use effect');
  //     findAllNominations();
  //     apiCalled.current = true;
  //   }
  // }, []);

  const nomName = (n) => {
    const lastName = n.patientName ? n.patientName.split(' ')[1] : '';
    const geoState = states.getStateCodeByStateName(n.hospitalState);
    return `${lastName}-${geoState}`;
  };

  const findAllNominations = () => {
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
  };

  return (
    <NominationsDataContext.Provider
      value={{
        NominationsData,
        setNominationsData,
        activeNomination,
        setActiveNomination,
      }}
    >
      {props.children}
    </NominationsDataContext.Provider>
  );
};
