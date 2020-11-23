import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { NominationsDataContext } from '../../utils/context/NominationsContext';
import { SearchResultDataContext } from '../../utils/context/SearchResultsContext';
import nominationsAPI from '../../utils/API/nominationsAPI';
import SearchResultsCard from '../SearchResultsCard';
import './style.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState();
  const [SearchResultData, setSearchResultData] = useContext(
    SearchResultDataContext
  );
  const [NominationsData, setNominationsData] = useContext(
    NominationsDataContext
  );
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const [state = { redirect: true }, setState] = useState(null);

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
      <div className="search-bar-wrapper">
        <section className="row">
          <div className=" column column-25">
            <div className="search-header-container row">
              <img className="ksf-logo " src="/ksflogo.png" alt="other" />
              <div className="comand-center-header column">
                <strong>Comand Center</strong>
              </div>
            </div>
          </div>
          <div className="form-container column column-50">
            <form onSubmit={handleSubmit}>
              <input
                className="search-input-class"
                type="text"
                name="search"
                placeholder="  Search"
                data-id="search-input"
                onChange={handleInputChange}
                aria-label="search-input"
              />
            </form>
          </div>
        </section>
        <div data-id="error-message">
          {showErrorMessage ? <>Application Not Found</> : null}
        </div>
      </div>
      {SearchResultData.length === 1 ? (
        <Redirect to={`/nomination/${SearchResultData[0].id}`} />
      ) : SearchResultData.length > 1 ? (
        <SearchResultsCard />
      ) : null}
    </>
  );
};

export default SearchBar;
