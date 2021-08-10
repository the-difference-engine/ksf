import React, { createContext, useEffect, useState } from 'react';
import { NominationsDataContext } from './NominationsContext';
export const ActiveNominationContext = createContext();

export const ActiveNominationProvider = (props) => {
  const [nomination, setNomination] = useState([]);
  const [NominationsData] = useContext(
    NominationsDataContext
  );

  const idIndexMap = new Map()

  setIdIndexMap(NominationsData)


  const setIdIndexMap = (nominations) => {
    for (i=0; i<nominations.length; i++) {
      idIndexMap.set(nominations[index].id, index)
    }
  }

  const setNominationByID = (id) => {
    setNomination(NominationsData[idIndexMap(id)])
  }

  return (
    <ActiveNominationContext.Provider
      value={{nomination, setNominationByID, setNomination}}
    >
      {props.children}
    </ActiveNominationContext.Provider>
  );
};
