import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SearchResultDataContext } from '../../../utils/context/SearchResultsContext';
import { NominationsDataContext } from '../../../utils/context/NominationsContext';
import styles from './styles.css';
import { faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchHealthProvider = () => {
  const [SearchHealthcareProvider, setSearchHealthcareProvider] = useContext(SearchResultDataContext);
  const [NominationsData, setNominationsData] = useContext(NominationsDataContext);

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

  return (
    <table className="new-files-table">
      <thead>
        <tr>
          <td className="add-padding-left new-files-title">
            <FontAwesomeIcon icon="file-image" color="green" />
            <h1>Health Provider Search Results</h1>
          </td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </thead>
      <tbody>
        <tr className="home-new-files-headers">
          <td className="add-padding-left width-column">
            {' '}
            <h2 className="sortable-column">
              <strong>Application Name </strong>
            </h2>
          </td>
          <td className="width-column">
            <h2 className="sortable-column">
              <strong>HP Name</strong>
            </h2>
          </td>
          <td className="width-column">
            {' '}
            <h2 className="sortable-column">
              <strong>Patient Name</strong>
            </h2>
          </td>
          <td className="width-column">
            {' '}
            <h2 className="sortable-column">
              <strong>Recieved Date</strong>
            </h2>
          </td>
          <td className="last-column">
            <h2 className="sortable-column"></h2>
          </td>
        </tr>
        {SearchHealthcareProvider?.map((result) => (
          <tr key={result.id}>
            <td>
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
