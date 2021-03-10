import React, { useState, useContext, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SettingsModal from 'react-modal';
import Settings from '../Settings/Settings';
import { NominationsDataContext } from '../../utils/context/NominationsContext';
import { SearchResultDataContext } from '../../utils/context/SearchResultsContext';
import './style.css';

SettingsModal.setAppElement('#root');

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
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
    } else {
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

  function closeModal() {
    setModalIsOpen(false);
  }

  return (
    <>
      <SettingsModal 
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-overlay"
      >
        <Settings/>
        <FontAwesomeIcon 
              onClick={closeModal}
              icon="times"
              className="times-icon"
              size="3x"/>
      </SettingsModal>
      <div className="search-bar-wrapper">
        <div className="search-header-container">
            <Link to="/home"><img className="ksf-logo " src="/ksflogo.png" alt="other" /></Link>
            <div className="command-center-header">
            <strong>Command Center</strong>
            </div>
        </div>
          <div className="form-container">
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
          <div className="cog-container">
            <FontAwesomeIcon 
              onClick={() => setModalIsOpen(true)}
              icon="cog"
              className="cog-icon"
              size="3x"/>
          </div>
        <div data-id="error-message">
          {showErrorMessage ? <>Application Not Found</> : null}
        </div>
      </div>
      {searchResultRedirect()}
    </>
  );
};

export default SearchBar;
