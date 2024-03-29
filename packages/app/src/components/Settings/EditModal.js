import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import '../nominationInfo/calendar.css';

const EditModal = ({
  show,
  handleClose,
  grantCycle,
  errors,
  disableButton,
  handleChange,
  handleOpenedOnDateChanges,
  handleClosedOnDateChanges,
  onSubmit,
}) => {
  const showHideClassName = show
    ? 'edit-modal edit-modal-display-block'
    : 'edit-modal edit-modal-display-none';

  let openedOnInitial;
  let closedOnInitial;

  grantCycle
    ? (openedOnInitial = new Date(grantCycle.openedOn))
    : (openedOnInitial = new Date());
  grantCycle
    ? (closedOnInitial = new Date(grantCycle.closedOn))
    : (closedOnInitial = new Date());

  const [openedOn, setOpenedOn] = useState(openedOnInitial);
  const [closedOn, setClosedOn] = useState(closedOnInitial);

  useEffect(() => {
    if (grantCycle) {
      const openedOnDateReversedOffset = new Date(grantCycle.openedOn);
      const closedOnDateReversedOffset = new Date(grantCycle.closedOn);
      setOpenedOn(openedOnDateReversedOffset);
      setClosedOn(closedOnDateReversedOffset);
    }
  }, [grantCycle]);

  return (
    <div className={showHideClassName}>
      <div className="edit-modal-main">
        {grantCycle ? (
          <>
            <h1 className="settings__heading">Edit Cycle</h1>
            <div className="settings__form">
              <div className="settings__input-block">
                <p className="settings__input-label">Start Date:</p>
                <span className="settings__input">
                  <DatePicker
                    name="openedOn"
                    selected={
                      String(openedOn) !== 'Invalid Date'
                        ? new Date(openedOn)
                        : null
                    }
                    onChange={handleOpenedOnDateChanges}
                  />
                </span>
              </div>
              <div className="settings__input-block">
                <p className="settings__input-label">End Date:</p>
                <span className="settings__input">
                  <DatePicker
                    selected={
                      String(closedOn) !== 'Invalid Date'
                        ? new Date(closedOn)
                        : null
                    }
                    onChange={handleClosedOnDateChanges}
                  />
                </span>
              </div>
              <div className="settings__input-block" id="cycle__name">
                <p className="settings__input-label">Name:</p>
                <span className="settings__input">
                  <input
                    value={grantCycle.name}
                    name="name"
                    onChange={handleChange}
                    type="text"
                  />
                </span>
              </div>
            </div>
            <div className="edit-button-div">
              <button
                className="edit-modal-button"
                onClick={onSubmit}
                disabled={disableButton}
              >
                Update
              </button>
              <button
                className="edit-modal-button-cancel"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
            <div className="edit-modal-errors">{errors}</div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default EditModal;
