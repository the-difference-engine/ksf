import React, { useState, useEffect } from 'react';
import domainAPI from '../../utils/API/domainAPI';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BlockedDomainsTab = () => {
  const [domainValue, setDomainValue] = useState({ name: '' });
  const [allDomains, setAllDomains] = useState([]);

  const handleChange = (e) => {
    setDomainValue(e.currentTarget.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await domainAPI.addDomain({ name: domainValue });
      let domainList = allDomains;
      setAllDomains((list) => {
        return [...list, res.data];
      });
      setDomainValue({ name: '' });
    } catch (error) {
      console.log('Error adding domain', error);
    }
  };

  async function getDomains() {
    try {
      const { data } = await domainAPI.findDomains();
      setAllDomains(data);
    } catch (error) {
      console.log('Error getting all domains', error);
    }
  }

  async function updateDomain() {
    try {
      const { name } = await domainAPI.updateDomain();
      setDomainValue({ name: name })
    } catch (err) {
      console.log('Error-----------', err);
    }
  }

  useEffect(() => {
    getDomains();
  }, []);

  return (
    <main className="settings__main">
      <h2 className="settings__heading">Blocked Domains</h2>
      <input type="text" value={domainValue.name} onChange={handleChange} />
      <button
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Add Domain
      </button>
      {allDomains.map((domain) => {
        return (
          <div key={domain.id}>
            {domain.name}{' '}
            <FontAwesomeIcon
              onClick={() => updateDomain()}
              icon="pencil-alt"
              className="icon-table-arrow"
            />
          </div>
        );
      })}
    </main>
  );
};

export default BlockedDomainsTab;
