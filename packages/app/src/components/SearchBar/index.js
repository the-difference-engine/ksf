import React, { useEffect, useState, useContext } from 'react';

const SearchBar = () => {
  const [searhTerm, setSearchTerm] = useState(['hello search teem']);

  useEffect(() => {});

  return (
    <>
      <div>{searhTerm[0]}</div>
    </>
  );
};

export default SearchBar;
