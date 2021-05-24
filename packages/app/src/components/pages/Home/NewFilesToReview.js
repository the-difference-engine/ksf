import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewNomination from './NewNomination';
import styles from './styles.css';
import useSort from './useSort';

const NewFilesToReview = () => {
  const [showAll, setShowAll] = useState(false);
  const { sortedNoms, requestSort, sortConfig } = useSort();
  const sortedNominations = sortedNoms ? sortedNoms.filter((nominations) => nominations.status === 'received') : [];

  const handleClick = () => {
    setShowAll(!showAll);
  };

  const conditionalNominationRender = () => {
    if (sortedNoms && showAll) {
      return sortedNominations;
    }
    if (sortedNoms && !showAll) {
      return sortedNominations.slice(0, 3);
    }
  };

  const renderSortArrow = (columnName) => {
    return sortConfig && sortConfig.key === columnName && <FontAwesomeIcon icon={sortConfig.direction === 'ascending' ? 'arrow-down' : 'arrow-up'} />;
  };

  const renderSortableCell = (key, label) => {
    return (
      <h2 onClick={() => requestSort(key)} className="sortable-column">
        <strong>{label}</strong>
        <>{renderSortArrow(key)}</>
      </h2>
    );
  };

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
          <td className="new-files-see-more">
            <div onClick={handleClick}>
              <FontAwesomeIcon icon={showAll ? 'chevron-circle-up' : 'chevron-circle-down'} />
            </div>
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
        {sortedNominations ? (
          conditionalNominationRender().map((nomination) => <NewNomination nomination={nomination} key={nomination.id} />)
        ) : (
          <tr>
            <td className="add-padding-left new-files-title">
              <h1>No new nominations.</h1>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default NewFilesToReview;
