import React, { useState, useEffect, useRef } from "react";
import DatePicker from 'react-datepicker';
import TableRow from './TableRow';

const GrantCycleTab = (props) => {

    const createButton = useRef(null);

    return (
        <main className="settings__main">
          <h2 className="settings__heading">Create Grant Cycle</h2>
          <div className="settings__form">
            <div className="settings__input-block">
              <p className="settings__input-label start-date">Start Date:</p>
              <span className="settings__input">
                <div className={props.editModalHiddenClass}>
                  <DatePicker
                    name="openedOn"
                    value={props.newGrantCycle.openedOn}
                    selected={props.newGrantCycle.openedOn}
                    onChange={props.handleStartDateCreation}
                    placeholderText="mm/dd/yyyy"
                  />
                </div>
              </span>
            </div>
            <div className="settings__input-block">
              <p className="settings__input-label end-date">End Date:</p>
              <span className="settings__input">
                <div className={props.editModalHiddenClass}>
                  <DatePicker
                    name="closedOn"
                    value={props.newGrantCycle.closedOn}
                    selected={props.newGrantCycle.closedOn}
                    onChange={props.handleEndDateCreation}
                    placeholderText="mm/dd/yyyy"
                  />
                </div>
              </span>
            </div>
            <div className="settings__input-block">
              <p className="settings__input-label cycle-name">Cycle Name:</p>
              <span className="settings__input">
                <div className={props.editModalHiddenClass}>
                  <input
                    value={props.newGrantCycle.name}
                    name="name"
                    onChange={props.handleChange}
                    type="text"
                  />
                </div>
              </span>
            </div>
            <div className={`${props.editModalHiddenClass} button-div`}>
              <button
                ref={createButton}
                disabled={props.disableButton}
                onClick={props.handleCreate}
                className={`settings__button ${props.disableButtonStyle}`}
              >
                Create
              </button>
            </div>
          </div>
          <div className="settings__form-errors">{props.errors}</div>

          <div>
            <h2 className="settings__heading">
              Active Grant Cycle: &nbsp;
              {props.activeGrantCycle ? (
                <span className="settings__activeGrantCycle">
                  {props.activeGrantCycle.name}
                </span>
              ) : (
                <span className="settings__activeGrantCycle">None</span>
              )}
            </h2>
          </div>

          <h2 className="settings__heading">Grant Cycle History</h2>
          <div className="settings__table-wrapper">
            <table className="settings__table">
              <thead className="settings__thead">
                <tr>
                  <th style={{ width: '10%' }}>Start Date</th>
                  <th style={{ width: '10%' }}>End Date</th>
                  <th style={{ width: '10%' }}>Cycle Name</th>
                  <th style={{ width: '10%' }}>Applications</th>
                  <th style={{ width: '10%' }}>Active Cycle</th>
                </tr>
              </thead>
              <tbody className="settings__tbody">
                {props.allGrantCycles.map((gc) => (
                  <TableRow
                    key={gc.id}
                    grantCycle={gc}
                    onResultsClick={props.onResultsClick}
                    onEdit={props.handleEdit}
                    activeGrantCycle={props.activeGrantCycle}
                    setActiveGrantCycle={props.setActiveGrantCycle}
                    showEditModal={props.showEditModal}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </main>
    );
};

export default GrantCycleTab;