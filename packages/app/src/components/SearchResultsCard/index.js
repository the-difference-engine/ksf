import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { SearchResultDataContext } from '../../utils/context/SearchResultsContext';
import './style.css';

const SearchResultsCard = () => {
  const [SearchResultData, setSearchResultData] = useContext(
    SearchResultDataContext
  );
  return (
    <>
      <section className="search-result-card">
        <table className="search-result-table">
          <thead>
            <tr>
              <th>Search Results</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Application Name</td>
              <td>Provider's Name</td>
              <td>Patient Name</td>
              <td>Recieved Date </td>
            </tr>
            {SearchResultData
              ? SearchResultData.map((result) => (
                  <tr key={result.id}>
                    <td>
                      <Link to={`/nomination/${result.id}`}>
                        {result.nominationName}
                      </Link>
                    </td>
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

export default SearchResultsCard;
