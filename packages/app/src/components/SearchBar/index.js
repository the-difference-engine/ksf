import React, { useEffect, useState, useContext } from 'react';
import { NominationsDataContext } from '../../utils/context/NominationsContext';
import nominationsAPI from '../../utils/API/nominationsAPI';
import './style.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState();
  const [SearchResultData, setSearchResultData] = useState([]);
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
    const filteredNoms = NominationsData.filter((nomination) => {
      return [
        formatSearch(nomination.providerName),
        formatSearch(nomination.patientName),
        formatSearch(nomination.hospitalName),
        formatSearch(nomination.representativeName),
      ].some((nom) => nom.includes(searchTerm));
    });
    setSearchResultData(filteredNoms);

    filteredNoms.length < 1
      ? setShowErrorMessage(true)
      : setShowErrorMessage(false);
  }

  function handleInputChange(e) {
    const { value } = e.target;
    if (value.length % 3 === 0 && value.length !== 0) {
      findSearchResults(formatSearch(value));
    }
    if (value.length === 0) {
      setSearchResultData([]);
      setShowErrorMessage(false);
    }
    setSearchTerm(formatSearch(value));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!searchTerm) {
      return;
    } else {
      findSearchResults(searchTerm);
    }
  }

  function formatSearch(str) {
    return str.toLowerCase().replace(/ /g, '');
  }

  return (
    <>
      <section className="searchBarWrapper">
        <div className="row">
          <form
            className="column column-40 column-offset-25"
            onSubmit={handleSubmit}
          >
            <fieldset>
              <div className="searchBarInput">
                <input
                  type="text"
                  name="search"
                  placeholder="  Search"
                  data-id="search-input"
                  onChange={handleInputChange}
                  aria-label="search-input"
                />
              </div>
              <div data-id="error-message">
                {showErrorMessage ? <>Application Not Found</> : null}
              </div>
            </fieldset>
          </form>
        </div>
      </section>

      <section className="searchResultCard">
        <table className="searchResultTable">
          <thead>
            <tr>
              <th>Provider's Name</th>
              <th>Patient Name</th>
              <th>Recieved Date </th>
            </tr>
          </thead>
          <tbody>
            {SearchResultData
              ? SearchResultData.map((result) => (
                  <tr>
                    <td>{result.providerName}</td>
                    <td>{result.patientName}</td>
                    <td>{result.dateReceived}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default SearchBar;
