import React, { useState } from 'react';
import Modal from 'react-modal';
import { useContext } from 'react';
import { ActiveNominationContext } from '../../../utils/context/ActiveNominationContext';

Modal.setAppElement('#root');

const MarkStageAsCompleteModal = ({ advanceStage, currentStatus }) => {
  const [activeNomination, setActiveNomination] = useContext(
    ActiveNominationContext
  );
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button
        disabled={
          activeNomination.status === 'Declined' ||
          activeNomination.status === 'Ready for Board Review'
        }
        className="button next"
        onClick={openModal}
      >
        <span>&#10003;</span>Mark Stage as Complete
      </button>
      <Modal
        className="modal-container"
        overlayClassName="modal-background"
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Mark Stage as Complete"
      >
        <button className="exit-button" onClick={closeModal}>
          &times;
        </button>
        <h3 className="modal-text">
          Are you sure you want to mark stage as complete?
        </h3>
        <div className="modal-buttons">
          <button
            className="button-yes"
            onClick={() => {
              advanceStage(currentStatus);
              closeModal();
            }}
          >
            Confirm
          </button>
          <button className="button-no" onClick={closeModal}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default MarkStageAsCompleteModal;
