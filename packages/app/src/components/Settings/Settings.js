import React, { useState, useEffect, useRef } from 'react';
import { DateTime } from 'luxon';
import TableRow from './TableRow';
import grantCycleAPI from '../../utils/API/grantCycleAPI';
import './styles.css';
import EditModal from './EditModal';

const Settings = (props) => {
  const [newGrantCycle, setNewGrantCycle] = useState({
    openedOn: '',
    closedOn: '',
    name: '',
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

  const handleChangeForEdit = ({ currentTarget: input }) => {
    setGcToEdit({ ...gcToEdit, [input.name]: input.value });
  };

  const handleCreate = async (e) => {
    try {
      const { data } = await grantCycleAPI.createGrantCycle(newGrantCycle);

      setNewGrantCycle({ openedOn: '', closedOn: '', name: '' });
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
      console.log(gcToEdit);
      const { data } = await grantCycleAPI.updateGrantCycle(gcToEdit);

      setGcToEdit({ openedOn: '', closedOn: '', name: '' });
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

  const handleEdit = (gc) => {
    setGcToEdit({
      openedOn: gc.openedOn.split('T')[0],
      closedOn: gc.closedOn.split('T')[0],
      name: gc.name,
      id: gc.id,
    });
    setShowEditModal(true);
  };

  useEffect(() => {
    handleDisableButton(newGrantCycle);
  }, [newGrantCycle]);

  useEffect(() => {
    if (gcToEdit) handleDisableEditButton(gcToEdit);
  }, [gcToEdit]);

  const isDateEditable = (gc) => {
    const millisecondsInADay = 86400000;
    const startDate = new Date(gc.openedOn);
    const endDate = new Date(gc.closedOn);

    return endDate - startDate >= millisecondsInADay ? false : true;
  };

  const handleDisableButton = (gc) => {
    if (gc.openedOn !== '' && gc.closedOn !== '') {
      const editableDate = isDateEditable(gc);

      setDisableButton(editableDate);
      if (!editableDate) {
        setErrors('');
        if (gc.name === '') {
          setDisableButton(true);
          setErrors('Please enter a name for the grant cycle');
        }
      } else setErrors('Start Date must be earlier than End Date');
    } else {
      setDisableButton(true);
    }
  };

  const handleDisableEditButton = (gc) => {
    if (gc.openedOn !== '' && gc.closedOn !== '') {
      const editableDate = isDateEditable(gc);

      setDisableEditButton(editableDate);
      if (!editableDate) {
        setEditErrors('');
        if (gc.name === '') {
          setDisableEditButton(true);
          setEditErrors('Please enter a name for the grant cycle');
        }
        const closed = DateTime.fromISO(gc.closedOn);
        if (DateTime.now() > closed) {
          setDisableEditButton(true);
        }
      } else {
        setEditErrors('Start Date must be earlier than End Date');
      }
    } else {
      setDisableEditButton(true);
    }

    if (disableDatePicker(gc.closedOn)) {
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

  return (
    <div className="settings__container">
      <EditModal
        show={showEditModal}
        handleClose={closeEditModal}
        gc={gcToEdit}
        disableButton={disableEditButton}
        errors={editErrors}
        handleChange={handleChangeForEdit}
        onSubmit={handleUpdate}
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
            <p className="settings__input-label">Start Date:</p>
            <span className="settings__input">
              <input
                value={newGrantCycle.openedOn}
                name="openedOn"
                onChange={handleChange}
                type="date"
              />
            </span>
          </div>
          <div className="settings__input-block">
            <p className="settings__input-label">End Date:</p>
            <span className="settings__input">
              <input
                value={newGrantCycle.closedOn}
                name="closedOn"
                onChange={handleChange}
                type="date"
              />
            </span>
          </div>
          <div className="settings__input-block">
            <p className="settings__input-label">Cycle Name:</p>
            <span className="settings__input">
              <input
                value={newGrantCycle.name}
                name="name"
                onChange={handleChange}
                type="text"
              />
            </span>
          </div>
        </div>
        <button
          ref={createButton}
          disabled={disableButton}
          onClick={handleCreate}
          className="settings__button"
          style={
            disableButton
              ? { color: 'gray', 'border-color': 'gray', 'font-weight': 'bold' }
              : {
                  color: 'var(--brand)',
                  'background-color': '#fff',
                  'border-color': 'var(--brand)',
                }
          }
        >
          Create
        </button>
        <div className="settings__form-errors">{errors}</div>

        <div>
          <h2 className="settings__heading">
            Active Grant Cycle: &nbsp;&nbsp;&nbsp;&nbsp;
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
              </tr>
            </thead>
            <tbody className="settings__tbody">
              {allGrantCycles.map((gc) => (
                <TableRow
                  key={gc.id}
                  grantCycle={gc}
                  onResultsClick={props.onResultsClick}
                  onEdit={handleEdit}
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
