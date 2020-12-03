import React, { createContext, useEffect, useState } from 'react';

export const ActiveNominationContext = createContext();

export const ActiveNominationProvider = (props) => {
  const [activeNomination, setActiveNomination] = useState(["a", "b", "c"]);

  return (
    <ActiveNominationContext.Provider
      value={[activeNomination, setActiveNomination]}
    >
      {props.children}
    </ActiveNominationContext.Provider>
  );
};