import React, { createContext, useState } from 'react';

export const SearchResultDataContext = createContext();

export const SearchResultDataProvider = (props) => {
  const [SearchResultData, setAllSearchResultData] = useState([]);

  return (
    <SearchResultDataContext.Provider
      value={[SearchResultData, setAllSearchResultData]}
    >
      {props.children}
    </SearchResultDataContext.Provider>
  );
};
