import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewNomination from './NewNomination';
import styles from "./styles.css";
import useSort from './useSort'

const ApplicationViewByStages = () => {
  const [currentlyViewing, setCurrentlyViewing] = useState("Ready for Board Review");
  const { sortedNoms, requestSort, sortConfig } = useSort()

  const conditionalNominationRender = () => {
    if (sortedNoms) {
      return sortedNoms.filter(nominations => nominations.status === currentlyViewing)
    }
  }

  function renderOptionList() {
    const statuses = ["Awaiting HIPAA", "HIPAA Verified", "Document Review", "Ready for Board Review"]
    return statuses.map( (status, index) => <option key={index} selected={status === currentlyViewing} value={status}>{status}</option> )
  }

  const renderSortArrow = (columnName) => {
    return (
      (sortConfig && sortConfig.key === columnName) &&
      <FontAwesomeIcon icon={sortConfig.direction === 'ascending' ? 'arrow-down' : 'arrow-up'} />
    )
  }

  const renderSortableCell = (key, label) => {
    return (
      <h2 onClick={() => requestSort(key)} className="sortable-column">
        <strong>{label}</strong><>{renderSortArrow(key)}</>
      </h2>
    )
  }

  return (
    <table className="new-files-table">
      <thead>
        <tr>
          <td className="add-padding-left new-files-title">
            <FontAwesomeIcon icon="file-image" color="green" />
            <select onChange={e => setCurrentlyViewing(e.currentTarget.value)} className="stage-dropdown">
              {renderOptionList()}
            </select>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr className="home-new-files-headers">
        <td className="add-padding-left"> {renderSortableCell('nominationName', 'Application Name')} </td>
          <td> {renderSortableCell('providerName', 'HP Name')} </td>
          <td> {renderSortableCell('representativeName', 'Family Member Name')} </td>
          <td> {renderSortableCell('dateReceived', 'Received Date')} </td>
          <td><h2><strong>Stage</strong></h2></td>
          <td></td>
        </tr>
          {conditionalNominationRender().length !== 0 && sortedNoms
            ?
            conditionalNominationRender().map(nomination =>
              <NewNomination nomination={nomination} key={nomination.id} />
              )
            :
            <tr>
              <td className="add-padding-left new-files-title"><h1>No nominations in {currentlyViewing}.</h1></td>
            </tr>
          }
        </tbody>
    </table>
  );
};

export default ApplicationViewByStages;
