import React, { useEffect, useState, useContext } from 'react';
import { SearchResultDataContext } from '../../utils/SearchResults';

const SearchBar = () => {
  const [searhTerm, setSearchTerm] = useState(['hello search teem']);
  const [SearchResultData, setAllSearchResultData] = useContext(
    SearchResultDataContext
  );

  useEffect(() => {});

  return (
    <>
      <div>{searhTerm[0]}</div>
      <div>{SearchResultData[0]}</div>
    </>
  );
};

export default SearchBar;