import React, { useState } from 'react';
import blockedDomainsList from '../../utils/blockedDomainsList';

const BlockedDomainsTab = () => {
  return (
    <main className="settings__main">
      <h2 className="settings__heading">Blocked Domains</h2>
      <ul>
        {blockedDomainsList.map((domain) => {
          return <li>{domain}</li>;
        })}
      </ul>
    </main>
  );
};

export default BlockedDomainsTab;
