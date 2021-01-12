import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NewNomination = ({nomination}) => {
  if (nomination) {
    console.log(nomination)
    function handleClick() {
      window.location.href = `/nomination/${nomination.id}`
    }

    return (
      <tr key={nomination.id} onClick={handleClick}>
        <td className="new-files-application-name add-padding-left detail-font-size">{nomination.nominationName}</td>
        <td className="detail-font-size">{nomination.providerName}</td>
        <td className="detail-font-size">{nomination.representativeName}</td>
        <td className="detail-font-size">{nomination.dateReceived}</td>
        <td className="detail-font-size">{nomination.status}</td>
        <td className="dot-fa-ellipsis"><FontAwesomeIcon icon="ellipsis-v"/></td>
      </tr>
    )
  }
};

export default NewNomination;
