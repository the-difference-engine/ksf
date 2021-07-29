import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';
import { formatDateString } from '../../utils/formatDateString';

const TableRow = props => {
  const { grantCycle, onEdit, show, onResultsClick } = props;

  const timeDiff = dateString => {
    const date = DateTime.fromISO(dateString);
    const now = DateTime.now().startOf('day');

    return date > now;
  };

  return (
    <tr>
      <td>
        {formatDateString(grantCycle.openedOn)} &nbsp;&nbsp;
        {timeDiff(grantCycle.openedOn) ? (
          <FontAwesomeIcon
            onClick={() => onEdit(grantCycle)}
            icon='pencil-alt'
            className='icon-table'
          />
        ) : (
          ''
        )}
      </td>
      <td>
        {formatDateString(grantCycle.closedOn)} &nbsp;&nbsp;
        {timeDiff(grantCycle.closedOn) ? (
          <FontAwesomeIcon
            onClick={() => onEdit(grantCycle)}
            icon='pencil-alt'
            className='icon-table'
          />
        ) : (
          ''
        )}
      </td>
      <td> {grantCycle.name} </td>
      <td style={{ width: '250px' }}>
        {/* number of applications displayed */}
        {/* {grantCycle.nominations.length} */}
        <button
          onClick={() => onResultsClick(grantCycle)}
          className={
            grantCycle.nominations.length
              ? 'icon-table icon-right-arrow'
              : 'icon-right-arrow-disabled'
          }
        >
          {grantCycle.nominations.length}
        </button>
      </td>
      {/* <td>
        <FontAwesomeIcon
          icon='arrow-right'
          onClick={() => onResultsClick(grantCycle)}
          size='1x'
          className={
            grantCycle.nominations.length
              ? 'icon-table icon-right-arrow'
              : 'icon-right-arrow-disabled'
          }
        />
      </td> */}
    </tr>
  );
};

export default TableRow;
