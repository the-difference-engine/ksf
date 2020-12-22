import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NewNomination = (nomination) => {
  if (nomination) {
    return (
      <tr key={nomination.nomination.id}>
        <td className="new-files-application-name add-padding-left detail-font-size">{nomination.nomination.nominationName}</td>
        <td className="detail-font-size">{nomination.nomination.providerName}</td>
        <td className="detail-font-size">{nomination.nomination.representativeName}</td>
        <td className="detail-font-size">{nomination.nomination.dateReceived}</td>
        <td className="detail-font-size">need stage info</td>
        <td className="dot-fa-ellipsis"><FontAwesomeIcon icon="ellipsis-v"/></td>
      </tr>
    )
  }
};

export default NewNomination;
