import React, { useState } from 'react';
import grantCycleAPI from '../../utils/API/grantCycleAPI';
import './toggle.css';

const ToggleActiveGrantCycle = ({
  grantCycle,
  activeGrantCycle,
  setActiveGrantCycle,
  showEditModal,
  getGrantCycles,
}) => {
  async function updateActiveGrantCycle() {
    grantCycle.isActive = true;
    try {
      const { data } = await grantCycleAPI.updateGrantCycle(grantCycle);
    } catch (e) {
      console.log('Error using updateGrantCycle:', e);
    }
  }

  const handleToggle = async (e) => {
    if (e.target.checked) {
      await updateActiveGrantCycle();
      await getGrantCycles();
      setActiveGrantCycle(grantCycle);
    }
  };

  const hideToggle = showEditModal ? 'hidden' : '';

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        name={grantCycle.name}
        className="toggle-active-grant"
        checked={activeGrantCycle && activeGrantCycle.id === grantCycle.id}
        onChange={handleToggle}
      />
      <span className={`switch ${hideToggle}`} />
    </label>
  );
};

export default ToggleActiveGrantCycle;
