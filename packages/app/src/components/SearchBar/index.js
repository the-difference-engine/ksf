import React, { useEffect, useState, useContext } from 'react';
import { SearchResultDataContext } from '../../utils/context/SearchResultsContext';
import { NominationsDataContext } from '../../utils/context/NominationsContext';
import nominationsAPI from '../../utils/API/nominationsAPI';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState();
  const [loading, setLoading] = useState(false);
  const [SearchResultData, setAllSearchResultData] = useState();
  const [message, setMessage] = useState('');
  const [NominationsData, setNominationsData] = useContext(
    NominationsDataContext
  );

  useEffect(() => {
    findAllNominations();
  }, []);

  useEffect(() => {
    findSearchResults(searchTerm);
  }, [searchTerm]);

  function findAllNominations() {
    nominationsAPI
      .getNominations()
      .then((res) => {
        setNominationsData(res.data);
      })
      .catch((err) => console.log(err));
  }

  // function findSearchResults(searchTerm) {
  //   if (searchTerm) {
  //     NominationsData.filter((nomination) => {
  //       if (
  //         formatSearch(nomination.providerName) === formatSearch(searchTerm)
  //       ) {
  //         console.log(
  //           nomination,
  //           'find search results runs providerName as expected'
  //         );
  //       }
  //       if (formatSearch(nomination.patientName) === formatSearch(searchTerm)) {
  //         console.log(
  //           nomination,
  //           'find search results runs PatientName as expected'
  //         );
  //       } else {
  //         console.log('not found');
  //       }
  //     });
  //   }
  // }

  function findSearchResults(searchTerm) {
    if (searchTerm) {
      NominationsData.filter((nomination) => {
        formatSearch(nomination.providerName) === formatSearch(searchTerm)
          ? console.log(
              nomination,
              'find search results runs providerName as expected'
            )
          : console.log('not found');
      });
    }
  }

  function handleInputChange(e) {
    const { value } = e.target;
    console.log(value, '+_+_+_+_+_');
    setSearchTerm(value);
    setLoading(true);
    setMessage('');
  }

  function formatSearch(str) {
    return str.toLowerCase().replace(/ /g, '');
  }

  return (
    <>
      <div>{searchTerm}</div>
      {NominationsData ? (
        <>
          {console.log('this is in the component')}
          <div>{NominationsData[0].patientName}</div>
        </>
      ) : (
        <div>Nadda </div>
      )}
      <form>
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
    </>
  );
};

export default SearchBar;
