import React, { createContext, useEffect, useState } from 'react';
import nominationsAPI from '../API/nominationsAPI';

export const NominationsDataContext = createContext();

export const NominationsDataProvider = (props) => {
  const [NominationsData, setNominationsData] = useState();

  return (
    <NominationsDataContext.Provider
      value={[NominationsData, setNominationsData]}
    >
      {props.children}
    </NominationsDataContext.Provider>
  );
};
