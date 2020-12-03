import React, { useContext, useState } from 'react';
import { NominationsDataContext } from '../../../utils/context/NominationsContext';

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
    <div className="container">
      <section className="home-new-files">
        <table className="home-rew-files-table">
          <thead>
            <tr>
              New Files To Review
            </tr>
            <button onClick={() => handleClick()}>see more</button>
          </thead>
          <tbody>
            <tr>
              <td>Application Name</td>
              <td>HP Name</td>
              <td>Family Member Name</td>
              <td>Received Date</td>
              <td>Stage</td>
            </tr>
              {NominationsData
                ?
                conditionalNominationRender().map(nomination =>
                  <tr key={nomination.id}>
                    <td>{nomination.nominationName}</td>
                    <td>{nomination.providerName}</td>
                    <td>{nomination.providerName}</td>
                    <td>{nomination.dateReceived}</td>
                    <td>need stage info</td>
                  </tr>
                ) :
                <p>no new nominations</p>
              }
            </tbody>
        </table>
      </section>
    </div>
  );
};

export default NewFilesToReview;
