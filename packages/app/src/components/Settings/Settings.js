import React, { useState, useEffect, useRef } from 'react';
import { DateTime } from 'luxon';
import TableRow from './TableRow';
import grantCycleAPI from '../../utils/API/grantCycleAPI';
import './styles.css';
import EditModal from './EditModal';
import DatePicker from 'react-datepicker';
import handleYearValidation from '../../utils/handleYearValidation';
import '../nominationInfo/calendar.css';

const Settings = (props) => {
  const [newGrantCycle, setNewGrantCycle] = useState({
    openedOn: '',
    closedOn: '',
    name: '',
    isActive: false,
  });
  const [allGrantCycles, setGrantCycles] = useState([]);
  const [disableButton, setDisableButton] = useState(true);
  const [disableEditButton, setDisableEditButton] = useState(true);
  const [errors, setErrors] = useState('');
  const [editErrors, setEditErrors] = useState('');
  const createButton = useRef(null);
  const [activeGrantCycle, setActiveGrantCycle] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [gcToEdit, setGcToEdit] = useState();

  // const [isToggled, setIsToggled] = useState(false);

  async function getGrantCycles() {
    try {
      const { data } = await grantCycleAPI.getGrantCycles();
      setGrantCycles(data);
    } catch (e) {
      console.log('Error using getGrantCycles: ', e);
    }
  }

  async function getActiveGrantCycle() {
    try {
      const { data } = await grantCycleAPI.getActiveGrantCycle();
      setActiveGrantCycle(data);
    } catch (e) {
      console.log('Error using getActiveGrantCycle: ', e);
    }
  }

  useEffect(() => {
    getGrantCycles();
    getActiveGrantCycle();
  }, []);

  const handleChange = ({ currentTarget: input }) => {
    setNewGrantCycle({ ...newGrantCycle, [input.name]: input.value });
  };

  const handleStartDateCreation = (date) => {
    date = date ?? new Date();
    if (handleYearValidation(date)) {
      setNewGrantCycle({ ...newGrantCycle, openedOn: date });
    }
  };

  const handleEndDateCreation = (date) => {
    date = date ?? new Date();
    if (handleYearValidation(date)) {
      setNewGrantCycle({ ...newGrantCycle, closedOn: date });
    }
  };

  const handleChangeForEdit = ({ currentTarget: input }) => {
    setGcToEdit({ ...gcToEdit, [input.name]: input.value });
  };

  // useEffect(() => {
  //   if (!isToggled) {
  //     updateActiveGrantCycle(gcToEdit);
  //   }
  // }, [isToggled]);

  const handleOpenedOnDateChanges = (date) => {
    date = date ?? new Date();
    if (handleYearValidation(date)) {
      setGcToEdit({ ...gcToEdit, openedOn: date });
    }
  };

  const handleClosedOnDateChanges = (date) => {
    date = date ?? new Date();
    if (handleYearValidation(date)) {
      setGcToEdit({ ...gcToEdit, closedOn: date });
    }
  };

  const handleCreate = async (e) => {
    try {
      const { data } = await grantCycleAPI.createGrantCycle(newGrantCycle);

      setNewGrantCycle({
        openedOn: '',
        closedOn: '',
        name: '',
        isActive: false,
      });
      createButton.current.blur();
      getGrantCycles();
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setErrors(ex.response.data);
        createButton.current.blur();
      } else {
        console.log(ex);
      }
    }
  };

  const handleUpdate = async (e) => {
    try {
      const { data } = await grantCycleAPI.updateGrantCycle(gcToEdit);

      setGcToEdit({ openedOn: '', closedOn: '', name: '', isActive: '' });
      getGrantCycles();
      setShowEditModal(false);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        setEditErrors(ex.response.data);
      } else {
        console.log(ex);
      }
    }
  };

  const handleEdit = (grantCycle) => {
    setGcToEdit({
      openedOn: grantCycle.openedOn.split('T')[0],
      closedOn: grantCycle.closedOn.split('T')[0],
      name: grantCycle.name,
      id: grantCycle.id,
      isActive: grantCycle.isActive,
    });
    setShowEditModal(true);
  };

  useEffect(() => {
    handleDisableButton(newGrantCycle);
  }, [newGrantCycle]);

  useEffect(() => {
    if (gcToEdit) handleDisableEditButton(gcToEdit);
  }, [gcToEdit]);

  const isDateEditable = (grantCycle) => {
    const millisecondsInADay = 86400000;
    const startDate = new Date(grantCycle.openedOn);
    const endDate = new Date(grantCycle.closedOn);

    return endDate - startDate >= millisecondsInADay ? false : true;
  };

  const handleDisableButton = (grantCycle) => {
    if (grantCycle.openedOn !== '' && grantCycle.closedOn !== '') {
      const editableDate = isDateEditable(grantCycle);

      setDisableButton(editableDate);
      if (!editableDate) {
        setErrors('');
        if (grantCycle.name === '') {
          setDisableButton(true);
          setErrors('Please enter a name for the grant cycle');
        }
      } else setErrors('Start Date must be earlier than End Date');
    } else {
      setDisableButton(true);
    }
  };

  const handleDisableEditButton = (grantCycle) => {
    if (grantCycle.openedOn !== '' && grantCycle.closedOn !== '') {
      const editableDate = isDateEditable(grantCycle);

      setDisableEditButton(editableDate);
      if (!editableDate) {
        setEditErrors('');
        if (grantCycle.name === '') {
          setDisableEditButton(true);
          setEditErrors('Please enter a name for the grant cycle');
        }
        const closed = DateTime.fromISO(grantCycle.closedOn);
        if (DateTime.now() > closed) {
          setDisableEditButton(true);
        }
      } else {
        setEditErrors('Start Date must be earlier than End Date');
      }
    } else {
      setDisableEditButton(true);
    }

    if (disableDatePicker(grantCycle.closedOn)) {
      setEditErrors('Cannot set date earlier than today.');
      setDisableEditButton(true);
    }
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const disableDatePicker = (d) => {
    const now = DateTime.now();

    return now > DateTime.fromISO(d);
  };

  // to hide the input elements when edit cycle modal is open
  const editModalHiddenClass = showEditModal ? 'hidden' : '';
  // conditional styles for disabled button
  const disableButtonStyle = disableButton
    ? 'disabled-edit-btn'
    : 'enabled-edit-btn';

  return (
    <div className="settings__container">
      <EditModal
        show={showEditModal}
        handleClose={closeEditModal}
        grantCycle={gcToEdit}
        disableButton={disableEditButton}
        errors={editErrors}
        handleChange={handleChangeForEdit}
        onSubmit={handleUpdate}
        handleOpenedOnDateChanges={handleOpenedOnDateChanges}
        handleClosedOnDateChanges={handleClosedOnDateChanges}
      />
      <header className="settings__header">
        <h1 className="settings__title">Settings</h1>
      </header>

      <aside className="settings__sidebar">
        <ul className="settings__list">
          <li className="settings__list-item">Grant Cycle</li>
        </ul>
      </aside>

      <main className="settings__main">
        <h2 className="settings__heading">Create Grant Cycle</h2>
        <div className="settings__form">
          <div className="settings__input-block">
            <p className="settings__input-label start-date">Start Date:</p>
            <span className="settings__input">
              <div className={editModalHiddenClass}>
                <DatePicker
                  name="openedOn"
                  value={newGrantCycle.openedOn}
                  selected={newGrantCycle.openedOn}
                  onChange={handleStartDateCreation}
                  placeholderText="mm/dd/yyyy"
                />
              </div>
            </span>
          </div>
          <div className="settings__input-block">
            <p className="settings__input-label end-date">End Date:</p>
            <span className="settings__input">
              <div className={editModalHiddenClass}>
                <DatePicker
                  name="closedOn"
                  value={newGrantCycle.closedOn}
                  selected={newGrantCycle.closedOn}
                  onChange={handleEndDateCreation}
                  placeholderText="mm/dd/yyyy"
                />
              </div>
            </span>
          </div>
          <div className="settings__input-block">
            <p className="settings__input-label cycle-name">Cycle Name:</p>
            <span className="settings__input">
              <div className={editModalHiddenClass}>
                <input
                  value={newGrantCycle.name}
                  name="name"
                  onChange={handleChange}
                  type="text"
                />
              </div>
            </span>
          </div>
          <div className={`${editModalHiddenClass} button-div`}>
            <button
              ref={createButton}
              disabled={disableButton}
              onClick={handleCreate}
              className={`settings__button ${disableButtonStyle}`}
            >
              Create
            </button>
          </div>
        </div>
        <div className="settings__form-errors">{errors}</div>

        <div>
          <h2 className="settings__heading">
            Active Grant Cycle: &nbsp;
            {activeGrantCycle ? (
              <span className="settings__activeGrantCycle">
                {activeGrantCycle.name}
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
              {allGrantCycles.map((gc) => (
                <TableRow
                  key={gc.id}
                  grantCycle={gc}
                  onResultsClick={props.onResultsClick}
                  onEdit={handleEdit}
                  activeGrantCycle={activeGrantCycle}
                  setActiveGrantCycle={setActiveGrantCycle}
                />
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Settings;
