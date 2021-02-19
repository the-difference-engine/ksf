import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'

const NewNomination = ({nomination}) => {
  if (nomination) {

    return (
      <tr className="landing-table" key={nomination.id}>
        <td className="green new-files-application-name add-padding-left detail-font-size"><Link to={`/nomination/${nomination.id}`}>{nomination.nominationName}</Link></td>
        <td className="detail-font-size">{nomination.providerName}</td>
        <td className="detail-font-size">{nomination.representativeName}</td>
        <td className="detail-font-size">{nomination.dateReceived}</td>
        <td className="detail-font-size">{nomination.status}</td>
      </tr>
    )
  }
};

export default NewNomination;
