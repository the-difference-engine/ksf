import React, { useEffect, useState, useContext } from 'react';
import { SearchResultDataContext } from '../../utils/context/SearchResultsContext';
import { NominationsDataContext } from '../../utils/context/NominationsContext';

const SearchBar = () => {
  const [searhTerm, setSearchTerm] = useState(['hello search teem']);
  const [SearchResultData, setAllSearchResultData] = useContext(
    SearchResultDataContext
  );
  const [NominationsData, setNominationsData] = useContext(
    NominationsDataContext
  );

  useEffect(() => {});

  return (
    <>
      <div>{searhTerm[0]}</div>
      <div>{SearchResultData[0]}</div>
      <div>{NominationsData[0]}</div>
    </>
  );
};

export default SearchBar;
