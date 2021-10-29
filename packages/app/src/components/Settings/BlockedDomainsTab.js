import React, { useState, useEffect } from 'react';
import domainAPI from '../../utils/API/domainAPI';
import DomainItem from './DomainItem';

const BlockedDomainsTab = (props) => {
  const [domainValue, setDomainValue] = useState({ name: '' });

  const handleChange = (e) => {
    setDomainValue(e.currentTarget.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await domainAPI.addDomain({ name: domainValue });
      props.setAllDomains((list) => {
        return [...list, res.data]
      })
      setDomainValue({ name: '' });
    } catch (error) {
      console.log('Error adding domain', error);
    }
  };

  async function getDomains() {
    try {
      const { data } = await domainAPI.findDomains();
      props.setAllDomains(data)
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
      <div className="settings__form">
        <div className="settings__input-block">
          <span className="settings__input">
            <input
              type="text"
              value={domainValue.name}
              onChange={handleChange}
              className="settings__input"
            />
          </span>
        </div>
        <button
          onClick={(e) => handleSubmit(e)}
          className="settings__button"
        >
          Add Domain
        </button>
      </div>
      {props.allDomains.map((domain) => (
        <DomainItem
          key={domain.id}
          domain={domain}
          onEdit={props.onEdit}
          onDelete={props.onDelete}
        />
      ))
      }
    </main>
  );
};

export default BlockedDomainsTab;
