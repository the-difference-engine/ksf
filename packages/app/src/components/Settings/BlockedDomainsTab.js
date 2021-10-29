import React, { useState, useEffect } from 'react';
import domainAPI from '../../utils/API/domainAPI';
import DomainItem from './DomainItem';
import DomainEditModal from './DomainEditModal';
import DeleteDomainModal from './DeleteDomainModal';

const BlockedDomainsTab = (props) => {
  const [domainValue, setDomainValue] = useState({ name: '' });
  const [allDomains, setAllDomains] = useState([]);
  const [showDomainEditModal, setShowDomainEditModal] = useState(false);
  const [domainToEdit, setDomainToEdit] = useState();
  const [showDeleteDomainModal, setShowDeleteDomainModal] = useState(false);
  const [domainToDelete, setDomainToDelete] = useState();

  const handleChange = (e) => {
    setDomainValue(e.currentTarget.value);
  };

  const closeDomainEditModal = () => {
    setShowDomainEditModal(false);
  };

  const closeDeleteDomainModal = () => {
    setShowDeleteDomainModal(false);
  };

  const handleChangeDomainEdit = ({ currentTarget: input }) => {
    setDomainToEdit({ ...domainToEdit, [input.name]: input.value });
  };

  const handleChangeDomainDelete = ({ currentTarget: input }) => {
    setDomainToDelete({ ...domainToDelete, [input.name]: input.value });
  };

  const handleDomainEdit = (domain) => {
    setDomainToEdit({
      name: domain.name,
      id: domain.id,
    });
    setShowDomainEditModal(true);
  };

  const handleDomainDeleteModal = (domain) => {
    setDomainToDelete({
      name: domain.name,
      id: domain.id,
    });
    setShowDeleteDomainModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await domainAPI.addDomain({ name: domainValue });
      setAllDomains((list) => {
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
      setAllDomains(data)
    } catch (error) {
      console.log('Error getting all domains', error);
    }
  }

  const handleDomainUpdate = async (e) => {
    try {
      const { data } = await domainAPI.updateDomain(domainToEdit);

      setDomainToEdit({
        id: '',
        name: '',
      });
      getDomains();
      setShowDomainEditModal(false);
    } catch (ex) {
      console.log('Error in handleDomainUpdate: ', ex);
    }
  }

  const handleDomainDelete = async (id) => {
    try {
      const { data } = await domainAPI.deleteDomain(id);

      setDomainToDelete({
        id: '',
        name: '',
      });
      getDomains();
      setShowDeleteDomainModal(false);
    } catch (ex) {
      console.log('Error in handleDomainDelete: ', ex);
    }
  }

  useEffect(() => {
    getDomains();
  }, []);

  return (
    <>
      <DomainEditModal
        show={showDomainEditModal}
        handleClose={closeDomainEditModal}
        domain={domainToEdit}
        handleChange={handleChangeDomainEdit}
        onSubmit={handleDomainUpdate}
      />
      <DeleteDomainModal
        show={showDeleteDomainModal}
        handleClose={closeDeleteDomainModal}
        domain={domainToDelete}
        handleChange={handleChangeDomainDelete}
        onSubmit={handleDomainDelete}
      />
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
        {allDomains.map((domain) => (
          <DomainItem
            key={domain.id}
            domain={domain}
            onEdit={handleDomainEdit}
            onDelete={handleDomainDeleteModal}
          />
        ))
        }
      </main>
    </>
  );
};

export default BlockedDomainsTab;
