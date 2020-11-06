import React, { useEffect, useState, useContext } from 'react';
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
          ? setAllSearchResultData(nomination)
          : formatSearch(nomination.patientName) === formatSearch(searchTerm)
          ? setAllSearchResultData(nomination)
          : formatSearch(nomination.hospitalName) === formatSearch(searchTerm)
          ? setAllSearchResultData(nomination)
          : formatSearch(nomination.representativeName) ===
            formatSearch(searchTerm)
          ? setAllSearchResultData(nomination)
          : setMessage('Could not find what you are looking for');
      });
    }
  }

  function handleInputChange(e) {
    const { value } = e.target;
    console.log(value, '+_+_+_+_+_');
    setSearchTerm(value);
    setLoading(true);
  }

  function formatSearch(str) {
    return str.toLowerCase().replace(/ /g, '');
  }

  return (
    <>
      <div>{searchTerm}</div>
      {NominationsData ? (
        <>
          <div>{NominationsData[0].patientName}</div>
        </>
      ) : (
        <div>Nadda </div>
      )}

      {SearchResultData ? (
        <>
          <div>{SearchResultData[0]}</div>
        </>
      ) : (
        <div>Nadda </div>
      )}

      {message ? (
        <>
          {console.log(message)}
          <div> hello world </div>
        </>
      ) : (
        <div>goodbye world</div>
      )}

      {console.log(message)}
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
