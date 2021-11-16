import React, { createContext, useState, useEffect } from 'react';

export const GoogleTokenDataContext = createContext();

export const GoogleTokenDataProvider = (props) => {
  const [googleToken, setGoogleToken] = useState("");

  useEffect(() => {
  }, [googleToken])

  return (
    <GoogleTokenDataContext.Provider
      value={[googleToken, setGoogleToken]}
    >
      {props.children}
    </GoogleTokenDataContext.Provider>
  );
};
