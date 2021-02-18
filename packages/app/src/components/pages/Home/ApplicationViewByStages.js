import React, { useContext, useState } from 'react';
import { NominationsDataContext } from '../../../utils/context/NominationsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewNomination from './NewNomination';
import styles from "./styles.css";
import useSort from './useSort'

const ApplicationViewByStages = () => {
  const [NominationsData, setNominationsData] = useContext(NominationsDataContext);
  const [currentlyViewing, setCurrentlyViewing] = useState("Ready for Board Review");
  const { sortedNoms, requestSort, sortConfig } = useSort()
  console.log(currentlyViewing)

  const conditionalNominationRender = () => {
    return NominationsData.filter(nominations => nominations.status === currentlyViewing)
  }

  function renderOptionList() {
    const statuses = ["Awaiting HIPAA", "HIPAA Verified", "Document Review", "Ready for Board Review"]
    return statuses.map( status => <option selected={status === currentlyViewing} value={status}>{status}</option> )
  }

  const sortedNominationRender = () => {
    return sortedNoms ? sortedNoms.filter(nominations => nominations.status === currentlyViewing) : null
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
            <select onChange={e => setCurrentlyViewing(e.target.value)} className="stage-dropdown">
              {renderOptionList()}
            </select>
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
          {NominationsData && conditionalNominationRender().length !== 0 && !sortedNoms
            ?
            conditionalNominationRender().map(nomination =>
              <NewNomination nomination={nomination} key={nomination.id} />
              )
            :
            sortedNoms
            ?
            sortedNominationRender().map(nomination =>
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
