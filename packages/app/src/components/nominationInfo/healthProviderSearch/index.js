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
  const { sortedNoms, requestSort, sortConfig } = useSort();

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

  const renderSortArrow = (columnName) => {
    return sortConfig && sortConfig.key === columnName && <FontAwesomeIcon icon={sortConfig.direction === SORT_DIRECTION.DOWN ? 'arrow-down' : 'arrow-up'} />;
  };

  const renderSortableCell = (key, label) => {
    return (
      <h2 onClick={() => requestSort(key)} className="sortable-column">
        <strong>{label}</strong>
        <>{renderSortArrow(key)}</>
      </h2>
    );
  };

  const sortNominationsByName = (nomsToSort) => {
    nomsToSort.sort((a, b) => {
      let aFirstLetter = a[sortConfig.key].toUpperCase().slice(0)
      let bFirstLetter = b[sortConfig.key].toUpperCase().slice(0)

      if (aFirstLetter < bFirstLetter) {
        return sortConfig.direction === SORT_DIRECTION.UP ? -1 : 1
      }

      if (aFirstLetter > bFirstLetter) {
        return sortConfig.direction === SORT_DIRECTION.UP ? 1 : -1
      }

      return 0
    })
    return nomsToSort
  }

  return (
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
          {/* <td className="add-padding-left width-column">
            <h2 className="sortable-column">
              <strong>Application Name </strong>
            </h2>
          </td> */}
          <td className="add-padding-left"> {renderSortableCell('nominationName', 'Application Name')} </td>
          <td className="width-column">
            <h2 className="sortable-column">
              <strong>HP Name</strong>
            </h2>
          </td>
          <td className="width-column">
            <h2 className="sortable-column">
              <strong>Patient Name</strong>
            </h2>
          </td>
          {/* <td className="width-column">
            <h2 className="sortable-column">
              <strong>Submission Date</strong>
            </h2>
          </td> */}
          <td> {renderSortableCell('dateReceived', 'Submission Date')} </td>
          <td className="last-column">
            <h2 className="sortable-column"></h2>
          </td>
        </tr>
        {SearchHealthcareProvider?.map((result) => (
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
  );
};

export default SearchHealthProvider;