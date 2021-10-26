import React, { useState, useEffect, useRef } from 'react';
import { DateTime } from 'luxon';
import TableRow from './TableRow';
import grantCycleAPI from '../../utils/API/grantCycleAPI';
import './styles.css';
import EditModal from './EditModal';
import DatePicker from 'react-datepicker';
import handleYearValidation from '../../utils/handleYearValidation';
import '../nominationInfo/calendar.css';
import BlockedDomainsTab from './BlockedDomainsTab';
import GrantCycleTab from './GrantCycleTab';

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

      if (gcToEdit.isActive) {
        setActiveGrantCycle(gcToEdit);
      }

      setGcToEdit({
        id: '',
        openedOn: '',
        closedOn: '',
        name: '',
        isActive: '',
      });
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

  const [currentTab, setCurrentTab] = useState('Grant Cycle');

  const changeTabView = (e) => {
    setCurrentTab(e.target.textContent);
  };
  const tabs = ['Grant Cycle', 'Blocked Domains'].map((tabName) => {
    let active;
    if (currentTab === tabName) {
      active = 'active_tab';
    }
    return (
      <li className={`settings__list-item ${active}`} onClick={changeTabView}>
        {tabName}
      </li>
    );
  });

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
        <ul className="settings__list">{tabs}</ul>
      </aside>

      {currentTab === 'Grant Cycle' &&
        <GrantCycleTab
          editModalHiddenClass={editModalHiddenClass}
          newGrantCycle={newGrantCycle}
          handleStartDateCreation={handleStartDateCreation}
          handleChange={handleChange}
          handleCreate={handleCreate}
          disableButton={disableButton}
          disableButtonStyle={disableButtonStyle}
          errors={errors}
          activeGrantCycle={activeGrantCycle}
          allGrantCycles={allGrantCycles}
          onResultsClick={props.onResultsClick}
          handleEdit={handleEdit}
          setActiveGrantCycle={setActiveGrantCycle}
          showEditModal={showEditModal}
        />
      }
      {currentTab === 'Blocked Domains' && <BlockedDomainsTab />}
    </div>
  );
};

export default Settings;
