import React, { useContext, useState } from 'react';
import { NominationsDataContext } from '../../../utils/context/NominationsContext';
import styles from "./styles.css";

const NewFilesToReview = () => {
  const [NominationsData, setNominationsData] = useContext(
    NominationsDataContext
  );
  const [showAll, setShowAll] = useState(false);
  const receivedNominations = NominationsData ? NominationsData.filter(nominations => nominations.status === "received") : []

  const handleClick = () => {
    setShowAll(!showAll)
  }

  const conditionalNominationRender = () => {
    return showAll ? receivedNominations : receivedNominations.slice(0,3)
  }

  return (
    <div className="container new-files-container">

        <table className="home-rew-files-table">
          <thead>
            <tr>
              <h1>New Files To Review</h1>
            </tr>
            <button onClick={() => handleClick()}>see more</button>
          </thead>
          <tbody>
            <tr>
              <td><h2>Application Name</h2></td>
              <td><h2>HP Name</h2></td>
              <td><h2>Family Member Name</h2></td>
              <td><h2>Received Date</h2></td>
              <td><h2>Stage</h2></td>
            </tr>
              {NominationsData
                ?
                conditionalNominationRender().map(nomination =>
                  <tr key={nomination.id}>
                    <td><p>{nomination.nominationName}</p></td>
                    <td><p>{nomination.providerName}</p></td>
                    <td><p>{nomination.providerName}</p></td>
                    <td><p>{nomination.dateReceived}</p></td>
                    <td><p>need stage info</p></td>
                  </tr>
                ) :
                <p>no new nominations</p>
              }
            </tbody>
        </table>

    </div>
  );
};

export default NewFilesToReview;
