import React, { useContext } from 'react';
import { NominationsDataContext } from '../../../utils/context/NominationsContext';

const NewFilesToReview = () => {
  const [NominationsData, setNominationsData] = useContext(
    NominationsDataContext
  );

  return (
    <div>
      <section className="home-new-files">
        <table className="home-rew-files-table">
          <thead>
            <tr>
              {/* {console.log(NominationsData)} */}
              New Files To Review
            </tr>
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
                NominationsData.filter(nominations =>
                  nominations.status === "received"
                )
                .map(nomination =>
                    <tr key={nomination.id}>
                      <td>{nomination.nominationName}</td>
                      <td>{nomination.providerName}</td>
                      <td>{nomination.providerName}</td>
                      <td>{nomination.dateReceived}</td>
                      <td>need stage info</td>
                    </tr>
                ) :
              <h2>No New Nominations</h2>
              }
            </tbody>
        </table>
      </section>
    </div>
  );
};

export default NewFilesToReview;
