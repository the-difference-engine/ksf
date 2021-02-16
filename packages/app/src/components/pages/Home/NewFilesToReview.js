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
  const { nominations, requestSort, sortConfig } = useSort(NominationsData)

  const handleClick = () => {
    setShowAll(!showAll)
  }

  const conditionalNominationRender = () => {
    return showAll ? receivedNominations : receivedNominations.slice(0,3)
  }

  const sortedNominationRender = () => {
    return nominations && showAll ? nominations : nominations.slice(0,3)
  }

  const createClassName = (columnName) => {
    if(!sortConfig) {
      return
    }
    return sortConfig.key === columnName ? sortConfig.direction : null;
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
            <h2
              onClick={() => requestSort('nominationName')}
              className={createClassName('nominationName')}
            >
              <strong>Application Name</strong>
            </h2>
          </td>
          <td>
            <h2
              onClick={() => requestSort('providerName')}
              className={createClassName('providerName')}
            >
              <strong>HP Name</strong>
            </h2>
          </td>
          <td>
            <h2
              onClick={() => requestSort('representativeName')}
              className={createClassName('representativeName')}
            >
              <strong>Family Member Name</strong>
            </h2>
          </td>
          <td>
            <h2
              onClick={() => requestSort('dateReceived')}
              className={createClassName('dateReceived')}
            >
              <strong>Received Date</strong>
            </h2>
          </td>
          <td>
            <h2
              onClick={() => requestSort('stage')}
              className={createClassName('stage')}
            >
              <strong>Stage</strong>
            </h2>
          </td>
          <td></td>
        </tr>
          {NominationsData && !nominations
            ?
              conditionalNominationRender().map(nomination =>
                <NewNomination nomination={nomination} key={nomination.id} />
              )
            :
            nominations
            ?
              sortedNominationRender().map(nomination =>
                <NewNomination nomination={nomination} key={nomination.id} />
              )
            :
            <tr>
              <td className="add-padding-left new-files-title"><h1>No new nominations.</h1></td>
            </tr>
          }
        </tbody>
    </table>
  );
};

export default NewFilesToReview;
