import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';
import { formatDateString } from '../../utils/formatDateString';

const TableRow = props => {
  const { grantCycle, onEdit, onResultsClick } = props;

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
            className='icon-table-arrow'
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
            className='icon-table-arrow'
          />
        ) : (
          ''
        )}
      </td>
      <td> {grantCycle.name} </td>
      <td
        onClick={() => onResultsClick(grantCycle)}
        className={
          grantCycle.nominations.length
            ? 'icon-table icon-right-arrow'
            : 'icon-right-arrow-disabled'
        }
      >
        {grantCycle.nominations.length}
      </td>
    </tr>
  );
};

export default TableRow;
