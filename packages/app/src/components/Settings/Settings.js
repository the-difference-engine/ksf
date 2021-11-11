import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import BlockedDomainsTab from './BlockedDomainsTab';
import GrantCycleTab from './GrantCycleTab';

const Settings = (props) => {
 
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

      <header className="settings__header">
        <h1 className="settings__title">Settings</h1>
      </header>

      <aside className="settings__sidebar">
        <ul className="settings__list">{tabs}</ul>
      </aside>

      {currentTab === 'Grant Cycle' &&
        <GrantCycleTab onResultsClick={props.onResultsClick} />
      }

      {currentTab === 'Blocked Domains' && <BlockedDomainsTab />}

    </div>
  );
};

export default Settings;
