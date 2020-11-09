import React, { useEffect, useState, useContext } from 'react';
import { NominationsDataContext } from '../../utils/context/NominationsContext';
import nominationsAPI from '../../utils/API/nominationsAPI';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState();
  const [loading, setLoading] = useState(false);
  const [SearchResultData, setSearchResultData] = useState([]);
  const [errorMessageActive, setErrorMessageActive] = useState(false);
  const [NominationsData, setNominationsData] = useContext(
    NominationsDataContext
  );
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  useEffect(() => {
    findAllNominations();
  }, []);

  function findAllNominations() {
    nominationsAPI
      .getNominations()
      .then((res) => {
        setNominationsData(res.data);
      })
      .catch((err) => console.log(err));
  }

  function findSearchResults(searchTerm) {
    let results = [];
    NominationsData.filter((nomination) => {
      [nomination.providerName, nomination.patientName].map((nomName) => {
        if (
          formatSearch(nomName).includes(formatSearch(searchTerm)) &&
          !results.includes(nomination.id)
        ) {
          results.push(nomination);
          setErrorMessageActive(false);
        } else {
          setErrorMessageActive(true);
        }
      });
    });
    console.log('---------------------results', results);
    setSearchResultData(results);
  }

  function handleInputChange(e) {
    const { value } = e.target;
    console.log(value, '------');
    if (value.length % 3 === 0) {
      console.log(value.length, '-- value length');
      setSearchTerm(value);
      findSearchResults(value);
    }
    setSearchTerm(value);
    setLoading(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    findSearchResults(searchTerm);
    if (errorMessageActive === true) {
      setShowErrorMessage(true);
    }
  }

  function formatSearch(str) {
    return str.toLowerCase().replace(/ /g, '');
  }

  return (
    <>
      {console.log('search result data:', SearchResultData)}
      {console.log(SearchResultData.length, 'searchResult data length')}
      <form onSubmit={handleSubmit}>
        <fieldset>
          <input
            type="text"
            name="search"
            placeholder="  Search"
            id="search-input"
            onChange={handleInputChange}
          ></input>
        </fieldset>
      </form>
      {showErrorMessage ? (
        <>
          <div>Application Not Found</div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchBar;
