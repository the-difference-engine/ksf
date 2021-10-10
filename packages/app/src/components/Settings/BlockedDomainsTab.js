import React, { useState } from 'react';
import blockedDomainsList from '../../utils/blockedDomainsList';

const BlockedDomainsTab = () => {
  const [domainValue, setDomainValue] = useState('');

  const handleChange = (e) => {
    setDomainValue(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    blockedDomainsList.push(domainValue);
    console.log('clicket----------');
  };

  console.log(domainValue, '---------------DominValue-=');
  return (
    <main className="settings__main">
      <h2 className="settings__heading">Blocked Domains</h2>
      <input type="text" value={domainValue} onChange={handleChange} />
      <button onClick={handleSubmit}>Add Domain</button>
      <ul>
        {blockedDomainsList.map((domain) => {
          return <li>{domain}</li>;
        })}
      </ul>
    </main>
  );
};

export default BlockedDomainsTab;
