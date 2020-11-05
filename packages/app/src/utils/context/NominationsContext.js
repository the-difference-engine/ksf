import React, { createContext, useEffect, useState } from 'react';
import nominationsAPI from '../API/nominationsAPI';

export const NominationsDataContext = createContext();

export const NominationsDataProvider = (props) => {
  const [NominationsData, setNominationsData] = useState([]);

  useEffect(() => {
    findAllNominations();
  }, []);

  function findAllNominations() {
    nominationsAPI
      .getNominations()
      .then((res) => {
        setNominationsData([res.data]);
        console.log(
          'woohoo! this should be the nominatin data from the nom context',
          NominationsData
        );
      })
      .catch((err) =>
        console.log(
          err,
          '*******************************************************'
        )
      );
  }

  return (
    <NominationsDataContext.Provider
      value={[NominationsData, setNominationsData]}
    >
      {props.children}
    </NominationsDataContext.Provider>
  );
};
