import React, { useContext, useState } from 'react';
import { NominationsDataContext } from '../../../utils/context/NominationsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewNomination from './NewNomination';
import styles from "./styles.css";

const ApplicationViewByStages = () => {
  const [NominationsData, setNominationsData] = useContext(NominationsDataContext);
  const [currentlyViewing, setCurrentlyViewing] = useState("Ready for Board Review");

  const conditionalNominationRender = () => {
    return NominationsData.filter(nominations => nominations.status === currentlyViewing)
  }

  function renderOptionList() {
    const statuses = ["Awaiting HIPAA", "HIPAA Verified", "Document Review", "Ready for Board Review"]
    return statuses.map( (status, index) => <option key={index} selected={status === currentlyViewing} value={status}>{status}</option> )
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
          <td className="add-padding-left"><h2><strong>Application Name</strong></h2></td>
          <td><h2><strong>HP Name</strong></h2></td>
          <td><h2><strong>Family Member Name</strong></h2></td>
          <td><h2><strong>Received Date</strong></h2></td>
          <td><h2><strong>Stage</strong></h2></td>
          <td></td>
        </tr>
          {NominationsData && conditionalNominationRender().length !== 0
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
