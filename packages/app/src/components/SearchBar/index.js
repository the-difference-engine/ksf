import React, { useEffect, useState, useContext } from 'react';
import { NominationsDataContext } from '../../utils/context/NominationsContext';
import nominationsAPI from '../../utils/API/nominationsAPI';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState();
  const [loading, setLoading] = useState(false);
  const [SearchResultData, setSearchResultData] = useState();
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

  useEffect(() => {});

  function findAllNominations() {
    nominationsAPI
      .getNominations()
      .then((res) => {
        setNominationsData(res.data);
      })
      .catch((err) => console.log(err));
  }

  function findSearchResults(searchTerm) {
    if (searchTerm) {
      NominationsData.filter((nomination) => {
        if (
          formatSearch(nomination.providerName) === formatSearch(searchTerm)
        ) {
          setSearchResultData(nomination);
        }
        if (formatSearch(nomination.patientName) === formatSearch(searchTerm)) {
          {
            setSearchResultData(nomination);
          }
        }
        if (
          formatSearch(nomination.hospitalName) === formatSearch(searchTerm)
        ) {
          {
            setSearchResultData(nomination);
          }
        }
        if (
          formatSearch(nomination.representativeName) ===
          formatSearch(searchTerm)
        ) {
          {
            setSearchResultData(nomination);
          }
        } else {
          console.log('Could not find what you are looking for');
        }
      });
    }
  }

  function handleInputChange(e) {
    const { value } = e.target;
    console.log(value, '+_+_+_+_+_');
    if (value.length === 3 || value.length === 6 || value.length > 8) {
      console.log(value.length);
      setSearchTerm(value);
    }
    setLoading(true);
  }

  function formatSearch(str) {
    return str.toLowerCase().replace(/ /g, '');
  }

  return (
    <>
      {/* {console.log(SearchResultData)} */}
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
      {message ? (
        <>
          <div>{message} </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default SearchBar;
