import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SearchResultDataContext } from '../../../utils/context/SearchResultsContext';
import { NominationsDataContext } from '../../../utils/context/NominationsContext';
import styles from './styles.module.css';
import { faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';

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
    <>
      <section className="search-result-card">
        <table className="search-result-table">
          <thead>
            <tr>
              <th>Health Provider Search Results</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.bold}>
              <td>Application Name</td>
              <td>Provider's Name</td>
              <td>Patient Name</td>
              <td>Recieved Date </td>
            </tr>
            {SearchHealthcareProvider?.map((result) => (
              <tr key={result.id}>
                <td>
                  <Link to={`/nomination/${result.id}`}>{result.nominationName}</Link>
                </td>
                <td>{result.providerName}</td>
                <td>{result.patientName}</td>
                <td>{result.dateReceived}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default SearchHealthProvider;
