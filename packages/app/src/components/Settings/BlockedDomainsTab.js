import React, { useState, useEffect } from 'react';
import domainAPI from '../../utils/API/domainAPI';

const BlockedDomainsTab = () => {
  const [domainValue, setDomainValue] = useState({ name: '' });
  const [allDomains, setAllDomains] = useState([]);

  const handleChange = (e) => {
    setDomainValue(e.currentTarget.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    domainAPI.addDomain({ name: domainValue });
    console.log('clicked----------');
  };

  async function getDomains() {
    try {
      const { data } = await domainAPI.findDomains();
      console.log(data, '------data------');
      // allDomains = data
      setAllDomains(data)
    } catch (error) {
      console.log('Error getting all domains');
    }
  }

  useEffect(() => {
    getDomains();
  });
  
  // getDomains()
  const domainList = allDomains.map((domain) => {
    return <li>{domain.name}</li>;
  });

  console.log(domainValue, '---------------DominValue-=');
  return (
    <main className="settings__main">
      <h2 className="settings__heading">Blocked Domains</h2>
      <input type="text" value={domainValue.name} onChange={handleChange} />
      <button onClick={handleSubmit}>Add Domain</button>
      <ul>{domainList}</ul>
    </main>
  );
};

export default BlockedDomainsTab;
