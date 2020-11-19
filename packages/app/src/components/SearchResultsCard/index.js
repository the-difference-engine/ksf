import React, { useEffect, useState, useContext } from 'react';
import { SearchResultDataContext } from '../../utils/context/SearchResultsContext';
import './style.css';

const SearchResultsCard = () => {
  const [SearchResultData, setSearchResultData] = useContext(
    SearchResultDataContext
  );
  return (
    <>
      {console.table(SearchResultData)}
      <section className="search-result-card">
        <table className="search-result-table">
          <thead>
            <tr>
              <th>Provider's Name</th>
              <th>Patient Name</th>
              <th>Recieved Date </th>
            </tr>
          </thead>
          <tbody>
            {SearchResultData
              ? SearchResultData.map((result) => (
                  <tr>
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
