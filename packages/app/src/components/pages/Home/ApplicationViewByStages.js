import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewNomination from './NewNomination';
import styles from './styles.css';
import useSort from './useSort';
import { SORT_DIRECTION } from '../../enum.js';
import { NominationsDataContext } from '../../../utils/context/NominationsContext';

const ApplicationViewByStages = () => {
  const [NominationsData, setNominationsData] = useContext(NominationsDataContext)
  const [currentlyViewing, setCurrentlyViewing] = useState('Ready for Board Review');
  const { sortedNoms, requestSort, sortConfig } = useSort(NominationsData);
  
  function renderOptionList() {
    const statuses = ['HIPAA Verified', 'Document Review', 'Ready for Board Review'];
    return statuses.map((status, index) => (
      <option key={index} selected={status === currentlyViewing} value={status}>
        {status}
      </option>
    ));
  }

  const renderSortArrow = (columnName) => {
    return sortConfig && sortConfig.key === columnName && <FontAwesomeIcon icon={sortConfig.direction === SORT_DIRECTION.UP ? 'arrow-down' : 'arrow-up'} />;
  };

  const renderSortableCell = (key, label) => {
    return (
      <h2 onClick={() => requestSort(key)} className="sortable-column">
        <strong>{label}</strong>
        <>{renderSortArrow(key)}</>
      </h2>
    );
  };

  
  const handleViewStageChange = (evt) => {
    setCurrentlyViewing(evt.currentTarget.value);
    requestSort('dateReceived', true);
  };

  const conditionalNominationRender = () => {
    if (sortedNoms) {
      return sortedNoms.filter((nominations) => nominations.status === currentlyViewing);
    }
  };

  

  return (
    <table className="new-files-table">
      <thead>
        <tr>
          <td className="add-padding-left new-files-title">
            <FontAwesomeIcon icon="file-image" color="green" />
            <select onChange={(e) => handleViewStageChange(e)} className="stage-dropdown">
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
          <td> {renderSortableCell('dateReceived', 'Submission Date')} </td>
          <td>
            <h2>
              <strong>Stage</strong>
            </h2>
          </td>
        </tr>
        {conditionalNominationRender().length !== 0 && sortedNoms ? (
          conditionalNominationRender().map((nomination) => <NewNomination nomination={nomination} key={nomination.id} />)
        ) : (
          <tr>
            <td className="add-padding-left new-files-title">
              <h1>No nominations in {currentlyViewing}.</h1>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ApplicationViewByStages;
