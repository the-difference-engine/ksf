import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SearchResultDataContext } from '../../../utils/context/SearchResultsContext';
import { NominationsDataContext } from '../../../utils/context/NominationsContext';
import styles from '../../pages/Home/styles.css';
import { faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useSort from '../../pages/Home/useSort';
import { SORT_DIRECTION } from '../../enum.js';

const SearchHealthProvider = () => {
  const [SearchHealthcareProvider, setSearchHealthcareProvider] = useContext(SearchResultDataContext);
  const [NominationsData, setNominationsData] = useContext(NominationsDataContext);
  const { sortedNoms, requestSort, sortConfig } = useSort(SearchHealthcareProvider);

  const findSearchResults = (searchTerm) => {
    let filteredNoms = [];
    if (NominationsData && searchTerm !== undefined) {
      filteredNoms = NominationsData.filter((nomination) => {
        return [nomination.providerName, nomination.patientName, nomination.nominationName, nomination.representativeName].some((nom) => nom.includes(searchTerm));
      });
      setSearchHealthcareProvider(filteredNoms);
    }
  };

  const { id } = useParams();

  useEffect(() => {
    findSearchResults(id);
  }, [NominationsData]);


  //renders down arrow if config direction is ascending, else renders up arrow
  const renderSortArrow = (columnName) => {
    return sortConfig && sortConfig.key === columnName && <FontAwesomeIcon icon={sortConfig.direction === 'ascending' ? 'arrow-down' : 'arrow-up'} />;
  };

  //renders column name with arrow next to it, using requestSort function from useSort.js
  const renderSortableCell = (key, label) => {
    return (
      <h2 onClick={() => requestSort(key)} className="sortable-column">
        <strong>{label}</strong>
        <>{renderSortArrow(key)}</>
      </h2>
    );
  };


  return (
  <>
    <div className="search-bar-wrapper">
      {/* <section className="row"> */}
        <div className=" column column-25">
          <div className="search-header-container ">
            <Link to="/home">
              <img className="ksf-logo " src="/ksflogo.png" alt="other" />
            </Link>
            <div className="command-center-header ">
              <strong>Command Center</strong>
            </div>
          </div>
        </div>
        <div className="form-container column column-50"></div>
      {/* </section> */}
      <div data-id="error-message"></div>
    </div>
    
    <table className="new-files-table">
      <thead>
        <tr>
          <td className="add-padding-left new-files-title same-row-wrapper">
            <FontAwesomeIcon icon="file-image" color="green" />
            <h1>Health Provider Search Results</h1>
            <h1>({SearchHealthcareProvider.length})</h1>
          </td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr className="home-new-files-headers">
          <td className="add-padding-left"> {renderSortableCell('nominationName', 'Application Name')} </td>
          <td className="width-column">
            <h2 className="sortable-column">
              <strong>HP Name</strong>
            </h2>
          </td>
          <td> {renderSortableCell('patientName', 'Patient Name')} </td>
          <td> {renderSortableCell('dateReceived', 'Submission Date')} </td>
          <td className="last-column">
            <h2 className="sortable-column"></h2>
          </td>
        </tr>
        {sortedNoms?.map((result) => (
          <tr key={result.id}>
            <td className="decrease-spacing">
              <Link className="green new-files-application-name add-padding-left detail-font-size" to={`/nomination/${result.id}`}>
                <strong> {result.nominationName}</strong>
                </Link>
              </td>
              <td className="detail-font-size">{result.providerName}</td>
              <td className="detail-font-size">{result.patientName}</td>
              <td className="detail-font-size">{result.dateReceived}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SearchHealthProvider;