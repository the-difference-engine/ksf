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
// import nomination from '../../../../api/models/nomination';
// import { google } from 'googleapis';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

SettingsModal.setAppElement('#root');

const SearchBar = (props) => {
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (!firstUpdate.current) {
      console.log('nomination RELOADED');
    }
  }, [props.nominationReloaded]);

  const [searchTerm, setSearchTerm] = useState();
  const [showResults, setShowResults] = useState(false);
  const [settingsResults, setSettingsResults] = useState({});
  const [SearchResultData, setSearchResultData] = useContext(
    SearchResultDataContext
  );

  const [ActiveNomination, SetActiveNomination] = useContext(
    ActiveNominationContext
  );

  // console.log('this is ActiveNomination in searchBar component');
  // // console.dir(props.nomination); // TODO CLEANUP
  // console.log(ActiveNomination);

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

  //   https://drive.google.com/drive/folders/156CbqGdickbnJwVw6j1UOkRAV_mefu_j?usp=sharing

  // https://drive.google.com/drive/u/5/folders/1Uu04G0GGvJVaYE0S9hvc9_6lmtN5XQtQ

  //   const getFolderIdWithApplicationName = async (name) => {
  //    let folderName = nomination.name

  //    let result = await drive.files.list({
  //     q: "mimeType='application/vnd.google-apps.folder' and trashed=false",
  //     fields: 'nextPageToken, files(id, name)',
  //     spaces: 'drive',
  // }).

  //   }

  // const link =

  // console.log(props.nomination);

  const openWindow = (val) => {
    window.open(`https://drive.google.com/drive/u/5/folders/${val}`);
  };

  // const fetchNomination = () => {
  //   nominationsAPI.fetchNomination(ActiveNomination?.id).then((res) => {
  //     const nomination = res.data;
  //     console.log('This is nomination');
  //     console.dir(nomination);
  //   });
  // };
  // useEffect(() => {
  //   if (!firstUpdate.current) {
  //     fetchNomination();
  //   }

  //   firstUpdate.current = false;
  // }, [props.nominationReloaded]);

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
        {/* {props.nomination.driveFolderId} */}
        <div className="cog-container">
          {/* <a
            target="_blank"
            href="https://meetflo.zendesk.com/hc/en-us/articles/230425728-Privacy-Policies"
          >
            Policies
          </a> */}
          {console.log('this is active nomination in searchbar jsx')}
          {console.log(ActiveNomination)}
          {ActiveNomination.driveFolderId != 'false' ? (
            <>
              <FontAwesomeIcon
                onClick={() => {
                  openWindow(props.nomination?.driveFolderId);
                }}
                // icon="fa-solid fa-arrow-up-right-from-square"
                className="cog-icon"
                icon={faExternalLinkAlt}
                // size="3x"
              />
            </>
          ) : (
            <span></span>
          )}
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
