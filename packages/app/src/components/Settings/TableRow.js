import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';
import ToggleActiveGrantCycle from './ToggleActiveGrantCycle';

const TableRow = (props) => {
  const {
    grantCycle,
    onEdit,
    onResultsClick,
    activeGrantCycle,
    setActiveGrantCycle,
    showEditModal,
    getGrantCycles,
  } = props;

  const timeDiff = (dateString) => {
    const date = DateTime.fromISO(dateString);
    const now = DateTime.now().startOf('day');

    return date > now;
  };

  const openedOn = new Date(grantCycle.openedOn);
  const closedOn = new Date(grantCycle.closedOn);

  let openedOnString = openedOn.toLocaleDateString();
  let closedOnString = closedOn.toLocaleDateString();

  return (
    <tr>
      <td>
        {openedOnString} &nbsp;&nbsp;
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
        {closedOnString} &nbsp;&nbsp;
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
          grantCycle={grantCycle}
          activeGrantCycle={activeGrantCycle}
          setActiveGrantCycle={setActiveGrantCycle}
          showEditModal={showEditModal}
          getGrantCycles={getGrantCycles}
        />
      </td>
    </tr>
  );
};

export default TableRow;
