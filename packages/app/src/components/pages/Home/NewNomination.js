import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faClock } from '@fortawesome/free-solid-svg-icons';

const currentDate = new Date().getTime();

const getNumberOfDays = (start, end) => {
  const date1 = new Date(start);
  const date2 = new Date(end);
  const dayConversion = 1000 * 60;
  const diffInTime = date2.getTime() - date1.getTime();
  const diffInDays = Math.round(diffInTime / dayConversion);

  if (diffInDays >= 2) {
    return true;
  } else {
    return false;
  }
};

const NewNomination = ({ nomination }) => {
  if (nomination) {
    if (
      nomination.awaitingHipaaTimestamp &&
      getNumberOfDays(nomination.awaitingHipaaTimestamp, currentDate)
    ) {
      return (
        <tr className="landing-table" key={nomination.id}>
          <td className="new-files-application-name add-padding-left detail-font-size">
            <FontAwesomeIcon className="red" color="red" icon={faClock} />
            <Link
              className="green"
              target={'_blank'}
              to={`/nomination/${nomination.id}`}
            >
              {nomination.nominationName}
            </Link>
          </td>
          <td className="detail-font-size">{nomination.providerName}</td>
          <td className="detail-font-size">{nomination.representativeName}</td>
          <td className="detail-font-size">{nomination.dateReceived}</td>
          <td className="detail-font-size">{nomination.status}</td>
        </tr>
      );
    } else {
      return (
        <tr className="landing-table" key={nomination.id}>
          <td className="green new-files-application-name add-padding-left detail-font-size">
            <Link target={'_blank'} to={`/nomination/${nomination.id}`}>
              {nomination.nominationName}
            </Link>
          </td>
          <td className="detail-font-size">{nomination.providerName}</td>
          <td className="detail-font-size">{nomination.representativeName}</td>
          <td className="detail-font-size">{nomination.dateReceived}</td>
          <td className="detail-font-size">{nomination.status}</td>
        </tr>
      );
    }
  }
};

export default NewNomination;
