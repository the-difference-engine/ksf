import React, { useState } from 'react';
import './toggle.css';

const ToggleActiveGrantCycle = () => {

  return (
    <label className="toggle-switch">
      <input
        type="checkbox"
        className="toggle-active-grant"
        // checked={isToggled}
        // onChange={(e) => setIsToggled(e.target.checked)}
      />
      <span className="switch" />
    </label>
  );
};

export default ToggleActiveGrantCycle;
