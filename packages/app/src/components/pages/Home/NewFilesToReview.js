import React, { useContext, useState } from 'react';
import { NominationsDataContext } from '../../../utils/context/NominationsContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "./styles.css";

const NewFilesToReview = () => {
  const [NominationsData, setNominationsData] = useContext(NominationsDataContext);
  const [showAll, setShowAll] = useState(false);
  const receivedNominations = NominationsData ? NominationsData.filter(nominations => nominations.status === "received") : []

  const handleClick = () => {
    setShowAll(!showAll)
  }

  const conditionalNominationRender = () => {
    return showAll ? receivedNominations : receivedNominations.slice(0,3)
  }

  return (
    <div className="new-files-container">
        <table className="home-new-files-table">
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
                <div onClick={() => handleClick()}>
                  { showAll ? <FontAwesomeIcon icon="chevron-circle-up" /> : <FontAwesomeIcon icon="chevron-circle-down" />}
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr className="home-new-files-headers">
              <td className="add-padding-left"><h2>Application Name</h2></td>
              <td><h2>HP Name</h2></td>
              <td><h2>Family Member Name</h2></td>
              <td><h2>Received Date</h2></td>
              <td><h2>Stage</h2></td>
            </tr>
              {NominationsData
                ?
                conditionalNominationRender().map(nomination =>
                  <tr key={nomination.id}>
                    <td className="new-files-application-name add-padding-left">{nomination.nominationName}</td>
                    <td>{nomination.providerName}</td>
                    <td>{nomination.representativeName}</td>
                    <td>{nomination.dateReceived}</td>
                    <td>need stage info</td>
                  </tr>
                ) :
                <tr>
                  <td>no new nominations</td>
                </tr>
              }
            </tbody>
        </table>
    </div>
  );
};

export default NewFilesToReview;
