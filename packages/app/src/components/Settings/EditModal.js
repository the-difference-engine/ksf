import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import '../nominationInfo/calendar.css';
import { DateTime } from 'luxon';

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

  const openedOnDateReversedOffset = openedOnInitial;
  openedOnDateReversedOffset.setTime(
    openedOnDateReversedOffset.getTime() +
      openedOnDateReversedOffset.getTimezoneOffset() * 60 * 1000
  );

  const closedOnDateReversedOffset = closedOnInitial;
  closedOnDateReversedOffset.setTime(
    closedOnDateReversedOffset.getTime() +
      closedOnDateReversedOffset.getTimezoneOffset() * 60 * 1000
  );

  const [openedOn, setOpenedOn] = useState(openedOnDateReversedOffset);
  const [closedOn, setClosedOn] = useState(closedOnDateReversedOffset);

  useEffect(() => {
    // Convert existing date to another Timezone
    // const dateTime = dateTime.setZone('utc');
    // console.log('Custom date, utc', dateTime.toISO());
    //2021-05-01T21:11:45.641-04:00

    if (grantCycle) {
      const openedOnDateReversedOffset = new Date(grantCycle.openedOn);
      // openedOnDateReversedOffset.setTime(
      //   openedOnDateReversedOffset.getTime() +
      //     openedOnDateReversedOffset.getTimezoneOffset() * 60 * 1000
      // );

      const closedOnDateReversedOffset = new Date(grantCycle.closedOn);
      // closedOnDateReversedOffset.setTime(
      //   closedOnDateReversedOffset.getTime() +
      //     closedOnDateReversedOffset.getTimezoneOffset() * 60 * 1000
      // );

      setOpenedOn(openedOnDateReversedOffset);
      setClosedOn(closedOnDateReversedOffset);

      // let openedOnDate = new Date(grantCycle.openedOn);
      // let closedOnDate = new Date(grantCycle.closedOn);

      // let openedOnDayLater = DateTime.fromJSDate(openedOnDate);
      // let closedOnDayLater = DateTime.fromJSDate(closedOnDate);

      // openedOnDayLater.setZone('utc');
      // closedOnDayLater.setZone('utc');

      // let openedOnDateString = openedOnDayLater.setZone('utc').toISO();

      // let closedOnDateString = closedOnDayLater.setZone('utc').toISO();

      // let openedOnDate = DateTime.fromJSDate(grantCycle.openedOn);
      // let closedOnDate = DateTime.fromJSDate(grantCycle.closedOn);

      // let openedOnDateString = openedOnDate.toISO();
      // let closedOnDateString = closedOnDate.toISO()

      // setOpenedOn(openedOnDateString);
      // setClosedOn(closedOnDateString);

      // openedOnDate.setTime(
      //   openedOnDate.getTime() + openedOnDate.getTimezoneOffset() * 60 * 1000
      // );
      // setOpenedOn(openedOnDate);
      // closedOnDate.setTime(
      //   closedOnDate.getTime() + closedOnDate.getTimezoneOffset() * 60 * 1000
      // );
      // setClosedOn(closedOnDate);
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
