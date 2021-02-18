import React, { useContext, useState } from 'react';
import { NominationsDataContext } from '../../../utils/context/NominationsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewNomination from './NewNomination';
import styles from "./styles.css";
import useSort from './useSort'

const NewFilesToReview = () => {
  const [NominationsData, setNominationsData] = useContext(NominationsDataContext);
  const [showAll, setShowAll] = useState(false);
  const receivedNominations = NominationsData ? NominationsData.filter(nominations => nominations.status === "received") : []
  const { sortedNoms, requestSort, sortConfig } = useSort()
  const sortedNominations = sortedNoms ? sortedNoms.filter(nominations => nominations.status === "received") : []

  const handleClick = () => {
    setShowAll(!showAll)
  }

  const conditionalNominationRender = () => {
    if (sortedNoms && showAll) {
      return sortedNominations
    }
    if (sortedNoms && !showAll) {
      return sortedNominations.slice(0,3)
    }
    if (!sortedNoms && showAll) {
      return receivedNominations
    }
    if (!sortedNoms && !showAll) {
      return receivedNominations.slice(0,3)
    }
    // return showAll && receivedNominations || showAll && sortedNominations ? receivedNominations || sortedNominations : receivedNominations.slice(0,3) || sortedNominations.slice(0,3)
  }

  const renderSortArrow = (columnName) => {
    if (!sortConfig) {
      return
    }
    return sortConfig.key === columnName ?
      <FontAwesomeIcon icon={sortConfig.direction === 'ascending' ? "arrow-down" : "arrow-up"} />
      : null
  }

  return (
    <table className="new-files-table">
      <thead>
        <tr>
          <td className="add-padding-left new-files-title">
            <FontAwesomeIcon icon="file-image" color="green" />
            <h1>New Files To Review</h1>
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td className="new-files-see-more">
            <div onClick={handleClick}>
              <FontAwesomeIcon icon={showAll ? "chevron-circle-up" : "chevron-circle-down"} />
            </div>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr className="home-new-files-headers">
          <td className="add-padding-left">
            <h2 onClick={() => requestSort('nominationName')} style={{cursor: 'pointer'}}>
              <strong>Application Name {renderSortArrow('nominationName')}</strong>
            </h2>
          </td>
          <td>
            <h2 onClick={() => requestSort('providerName')} style={{cursor: 'pointer'}}>
              <strong>HP Name {renderSortArrow('providerName')}</strong>
            </h2>
          </td>
          <td>
            <h2 onClick={() => requestSort('representativeName')} style={{cursor: 'pointer'}}>
              <strong>Family Member Name {renderSortArrow('representativeName')}</strong>
            </h2>
          </td>
          <td>
            <h2 onClick={() => requestSort('dateReceived')} style={{cursor: 'pointer'}}>
              <strong>Received Date {renderSortArrow('dateReceived')}</strong>
            </h2>
          </td>
          <td>
            <h2>
              <strong>Stage</strong>
            </h2>
          </td>
          <td></td>
        </tr>
          {NominationsData
            ?
              conditionalNominationRender().map(nomination =>
                <NewNomination nomination={nomination} key={nomination.id} />
              )
            :
            <tr>
              <td className="add-padding-left new-files-title">
                <h1>No new nominations.</h1>
              </td>
            </tr>
          }
        </tbody>
    </table>
  );
};

export default NewFilesToReview;
