import React, { useState, useContext, useEffect, useRef } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SettingsModal from 'react-modal';
import Settings from '../Settings/Settings';
import GrantCycleNomsResults from '../Settings/GrantCycleNomsResults';
import { NominationsDataContext } from '../../utils/context/NominationsContext';
import { ActiveNominationContext } from '../../utils/context/ActiveNominationContext';
import { SearchResultDataContext } from '../../utils/context/SearchResultsContext';
import './style.css';
import ApplicationViewByStages from '../pages/Home/ApplicationViewByStages';
import nominationsAPI from '../../utils/API/nominationsAPI';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

SettingsModal.setAppElement('#root');

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState();
  const [showResults, setShowResults] = useState(false);
  const [settingsResults, setSettingsResults] = useState({});
  const [SearchResultData, setSearchResultData] = useContext(
    SearchResultDataContext
  );

  const [ActiveNomination, SetActiveNomination] = useContext(
    ActiveNominationContext
  );

  const [NominationsData, setNominationsData] = useContext(
    NominationsDataContext
  );
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [startEmpty, setStartEmpty] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function findSearchResults(searchTerm) {
    let filteredNoms = [];

    if (NominationsData) {
      filteredNoms = NominationsData.filter((nomination) => {
        return [
          formatSearch(nomination.providerName),
          formatSearch(nomination.patientName),
          formatSearch(nomination.nominationName),

          //  The Representative name(called Family Member name on the fronted)
          // is not included as one of columns in the search result. Therefore the is confusion when search results don't seem to match the search term.
          // Waiting to hear from Bill if the line in question (formatSearch(nomination.representativeName)) should stay or not

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
    setStartEmpty(false);
    if (!searchTerm) {
      return;
    } else {
      findSearchResults(searchTerm);
    }
  }

  function formatSearch(str) {
    return str.toLowerCase();
  }

  function searchResultRedirect() {
    if (!startEmpty) {
      if (SearchResultData.length === 1) {
        return <Redirect to={`/nomination/${SearchResultData[0].id}`} />;
      } else if (SearchResultData.length > 1) {
        return <Redirect to="/searchresults" />;
      } else {
        return null;
      }
    }
  }

  function closeModal() {
    setShowResults(false);
    setModalIsOpen(false);
  }

  function handleShowingResults(grantCycle) {
    if (grantCycle.nominations.length) {
      setShowResults(true);
      setSettingsResults(grantCycle);
    }
  }

  function handleGoBack() {
    setShowResults(false);
  }

  return (
    <>
      <SettingsModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-overlay"
      >
        {showResults ? (
          <GrantCycleNomsResults
            onClick={handleGoBack}
            results={settingsResults}
          />
        ) : (
          <Settings onResultsClick={handleShowingResults} />
        )}

        <FontAwesomeIcon
          onClick={closeModal}
          icon="times"
          className="times-icon"
          size="3x"
        />
      </SettingsModal>
      <div className="search-bar-wrapper">
        <div className="search-header-container">
          <Link to="/home">
            <img className="ksf-logo " src="/ksflogo.png" alt="other" />
          </Link>
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
          {/* <a
            target="_blank"
            href="https://meetflo.zendesk.com/hc/en-us/articles/230425728-Privacy-Policies"
          >
            Policies
          </a> */}

          <FontAwesomeIcon
            onClick={() => setModalIsOpen(true)}
            icon="cog"
            className="cog-icon"
            size="3x"
          />
        </div>

        <div data-id="error-message">
          {showErrorMessage ? <Redirect to="/searchresults" /> : null}
        </div>
      </div>
      {searchResultRedirect()}
    </>
  );
};

export default SearchBar;
