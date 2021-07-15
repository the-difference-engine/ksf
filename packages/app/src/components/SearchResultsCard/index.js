import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SearchResultDataContext } from "../../utils/context/SearchResultsContext";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const SearchResultsCard = () => {

  const [SearchResultData, _] = useContext(SearchResultDataContext);

  const [sortedSearchResults, setSortedSearchResults] = useState([]);
  useEffect(() => {
    setSortedSearchResults(
      SearchResultData.sort((a, b) => {
        let patient1 = a.patientName;
        let patient2 = b.patientName;
        if (patient1 > patient2) {
          return 1;
        }
        if (patient2 > patient1) {
          return -1;
        }
        return 0;
      })
    );
  }, [SearchResultData]);


  return (
    <>
      <section className="search-result-card">
        <table className="search-result-table search-result-data">
          <thead>
            <tr>
              {sortedSearchResults.length > 0 ? (
                <th>
                  <div className="search-result-alignment">
                    <FontAwesomeIcon icon="file-image" color="green" /> Search
                    Results
                  </div>
                </th>
              ) : (
                <th>
                  <div className="search-result-alignment">
                    <FontAwesomeIcon icon="file-image" color="green" /> No
                    Applications Found
                  </div>
                </th>
              )}
              <th></th>
              <th></th>
              <th>
                <div className="search-result-exit">
                  <Link to="/">
                    <button className="search-result-exit-button"> X </button>
                  </Link>
                </div>
              </th>
            </tr>
          </thead>

          <tbody>

            {sortedSearchResults.length > 0 && (
              <tr className="search-result-header">
                <td>
                  <div className="search-result-alignment">
                    <h1>
                      <strong>Application Name</strong>
                    </h1>
                  </div>
                </td>
                <td>
                  <h1>
                    <strong>Provider's Name</strong>
                  </h1>
                </td>
                <td>
                  <h1>
                    <strong>Patient Name</strong>
                  </h1>
                </td>
                <td>
                  <h1>
                    <strong>Received Date</strong>
                  </h1>
                </td>
              </tr>
            )}
            {sortedSearchResults?.map((result) => (
              <tr key={result.id} className="search-result-data">
                <td>
                  <div className="search-result-alignment">
                    <Link
                      className="search-result-nomination-link"
                      target="_blank"
                      to={`/nomination/${result.id} `}
                    >
                      {result.nominationName}
                    </Link>
                  </div>
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

export default SearchResultsCard;
