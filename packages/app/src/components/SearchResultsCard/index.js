import React, { useContext, useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { SearchResultDataContext } from '../../utils/context/SearchResultsContext';
import './style.css';


const SearchResultsCard = () => {
  const [SearchResultData, setSearchResultData] = useContext(SearchResultDataContext);


  return (
    <>
      <section className="search-result-card">
        <table className="search-result-table">
          <thead>
            <tr>
              {SearchResultData.length > 0 ? <th> Search Results</th> : <th>No Applications Found</th>}
              <th></th>
              <th></th>
              <th><div className="search-result-exit"><Link to="/">
                <button className="search-result-exit-button"> X </button>
              </Link></div></th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td><h1><strong>Application Name</strong></h1></td>
              <td><h1><strong>Provider's Name</strong></h1></td>
              <td><h1><strong>Patient Name</strong></h1></td>
              <td><h1><strong>Received Date</strong></h1></td>
            </tr>

            {SearchResultData?.map((result) => (
              <tr key={result.id}>
                <td >
                  <Link className="search-result-nomination-link" target="_blank" to={`/nomination/${result.id} `}>{result.nominationName}</Link>
                </td>
                <td>{result.providerName}</td>
                <td>{result.patientName}</td>
                <td>{result.dateReceived}</td>
              </tr>
            ))
            }
          </tbody>
        </table>
      </section>
    </>
  );
};

export default SearchResultsCard;
