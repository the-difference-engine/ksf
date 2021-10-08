import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import states from 'us-state-codes';
import { Link } from 'react-router-dom';
import { formatDateString } from '../../utils/formatDateString';

const GrantCycleNomsResults = ({ results: grantCycle, onClick }) => {
  const nomName = (n) => {
    const lastName = n.patientName ? n.patientName.split(' ')[1] : '';
    const state = states.getStateCodeByStateName(n.hospitalState);
    return `${lastName}-${state}`;
  };

  console.log(grantCycle.nominations);

  // const declinedApps = grantCycle.nominations.map((nom) => {
  //   const declinedArray = [];
  //   if (nom.status === 'Declined') {
  //     declinedArray.push(nom);
  //   }
  //   return declinedArray;
  // });

  // const declinedApp = grantCycle.nominations.status.map

  // const redLink = declinedApp ? 'red-link' : '';

  return (
    <div className="settings__container">
      <header className="settings__header">
        <FontAwesomeIcon
          icon="arrow-left"
          className="icon-table icon-arrow-left"
          size="2x"
          onClick={() => onClick()}
        />
        <h1 className="settings__title">
          {'Grant Cycle: ' +
            formatDateString(grantCycle.openedOn) +
            ' - ' +
            formatDateString(grantCycle.closedOn)}
        </h1>
      </header>
      <main className="settings__results">
        <table className="settings__results-table">
          <thead>
            <tr>
              <th>Application Name</th>
              <th>HP Name</th>
              <th>Family Member Name</th>
              <th>Received Date</th>
            </tr>
          </thead>
          <tbody>
            {grantCycle.nominations?.map((n) => (
              <tr key={n.id}>
                <td>
                  <Link
                    // className={`settings__results-link ${redLink}`}
                    target={'_blank'}
                    to={`/nomination/${n.id}`}
                  >
                    {nomName(n)}
                  </Link>
                </td>
                <td>{n.providerName}</td>
                <td>{n.representativeName}</td>
                <td>{formatDateString(n.dateReceived)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default GrantCycleNomsResults;
