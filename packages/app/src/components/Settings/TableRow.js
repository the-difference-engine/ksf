import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';
import { formatDateString } from '../../utils/formatDateString';
import ToggleActiveGrantCycle from './ToggleActiveGrantCycle';

const TableRow = (props) => {
  const {
    grantCycle,
    onEdit,
    onResultsClick,
    activeGrantCycle,
    setActiveGrantCycle,
  } = props;

  const timeDiff = (dateString) => {
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
            icon="pencil-alt"
            className="icon-table-arrow"
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
            icon="pencil-alt"
            className="icon-table-arrow"
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
      <td>
        <ToggleActiveGrantCycle
          id="toggleSwitch"
          // checked={isToggled}
          // onToggle={(e) => setIsToggled(e.target.checked)}
          grantCycle={grantCycle}
          activeGrantCycle={activeGrantCycle}
          setActiveGrantCycle={setActiveGrantCycle}
        />
      </td>
    </tr>
  );
};

export default TableRow;
