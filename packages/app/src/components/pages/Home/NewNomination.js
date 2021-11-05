import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const NewNomination = ({ nomination }) => {
  // TODO: set activenomination here?
  //reactrouter.com/web/api/Link

  // to: string
  // A string representation of the Link location, created by concatenating the location’s pathname, search, and hash properties.

  // <Link to="/courses?sort=name" />;

  //   to: object
  // An object that can have any of the following properties:
  // pathname: A string representing the path to link to.
  // search: A string representation of query parameters.
  // hash: A hash to put in the URL, e.g. #a-hash.
  // state: State to persist to the location.

  // <Link
  //   to={{
  //     pathname: '/courses',
  //     search: '?sort=name',
  //     hash: '#the-hash',
  //     state: { fromDashboard: true },
  //   }}
  // />;
  console.log('This is nomination in NewNominationComponent');
  console.dir(nomination);

  if (nomination) {
    return (
      <tr className="landing-table" key={nomination.id}>
        <td className="green new-files-application-name add-padding-left detail-font-size">
          <Link
            target={'_blank'}
            to={{
              pathname: `/nomination/${nomination.id}`,
              // search: '?sort=name',
              // hash: nomination.id,
              state: { imapirate: 'imapirate' },
            }}
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
  }
};

export default NewNomination;
