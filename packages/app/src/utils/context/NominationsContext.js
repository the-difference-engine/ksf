import React, { createContext, useEffect, useState } from 'react';
import nominationsAPI from '../API/nominationsAPI';
import states from 'us-state-codes';

export const NominationsDataContext = createContext();

export const NominationsDataProvider = (props) => {
  const [NominationsData, setNominationsData] = useState([]);

  const [activeNomination, setActiveNomination] = useState({});

  const [apiCalled, setApiCall] = useState(false);

  useEffect(() => {
    if (!apiCalled) {
      console.log('find all nominations is running in use effect');
      findAllNominations();
      setApiCall(true);
    }
  }, []);

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

  const getNominationById = (id) => {
    nominationsAPI.fetchNomination(id).then((res) => {
      nomination = res.data;
      setActiveNomination(nomination);
    });
  };

  return (
    <NominationsDataContext.Provider
      value={{
        NominationsData,
        setNominationsData,
        activeNomination,
        setActiveNomination,
        getNominationById,
      }}
    >
      {props.children}
    </NominationsDataContext.Provider>
  );
};
