import React, { useState, useContext, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { NominationsDataContext } from '../../utils/context/NominationsContext';
import { SearchResultDataContext } from '../../utils/context/SearchResultsContext';
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
  const [startEmpty, setStartEmpty] = useState(true);

  function findSearchResults(searchTerm) {
    let filteredNoms = []
    if(NominationsData) {
      filteredNoms = NominationsData.filter((nomination) => {
        return [
          formatSearch(nomination.providerName),
          formatSearch(nomination.patientName),
          formatSearch(nomination.nominationName),
          formatSearch(nomination.representativeName),
        ].some((nom) => nom.includes(searchTerm));
      });
      setSearchResultData(filteredNoms); 
      filteredNoms.length < 1
      ? setShowErrorMessage(true)
      : setShowErrorMessage(false);
    } 
  }

  function handleInputChange(e) {
    const { value } = e.target;
    if (value.length === 0) {
      setSearchResultData([]);
      setShowErrorMessage(false);
    }
    setSearchTerm(formatSearch(value));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStartEmpty(false)
    if (!searchTerm) {
      return;
    } else {
      findSearchResults(searchTerm);
    }
  }

  function formatSearch(str) {
    return str.toLowerCase().replace(/ /g, '');
  }

  function searchResultRedirect() {
    if (!startEmpty) {
      if (SearchResultData.length === 1) {
        return <Redirect to={`/nomination/${SearchResultData[0].id}`} />
      } else if (SearchResultData.length > 1) {
        return <Redirect to="/searchresults" />
      } else {
        return null
      }
    }
  }
  return (
    <>
      <div className="search-bar-wrapper">
        <section className="row">
          <div className=" column column-25">
            <div className="search-header-container row">
              <Link to="/home"><img className="ksf-logo " src="/ksflogo.png" alt="other" /></Link>
              <div className="comand-center-header column">
                <strong>Command Center</strong>
              </div>
            </div>
          </div>
          <div className="form-container column column-50">
            <form onSubmit={handleSubmit} className="search-form">
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

          <select className ="select">Here </select>
        </section>
        <div data-id="error-message">
          {showErrorMessage ? <Redirect to="/searchresults" />: null}
        </div>
      </div>
      {searchResultRedirect()}
    </>
  );
};

export default SearchBar;
