import React, { createContext, useState } from 'react';

export const SearchResultDataContext = createContext();

export const SearchResultDataProvider = (props) => {
  const [SearchResultData, setSearchResultData] = useState([]);

  return (
    <SearchResultDataContext.Provider
      value={[SearchResultData, setSearchResultData]}
    >
      {props.children}
    </SearchResultDataContext.Provider>
  );
};
