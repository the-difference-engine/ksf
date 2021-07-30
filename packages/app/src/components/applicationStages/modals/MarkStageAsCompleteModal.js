import React, { useState } from 'react';
import Modal from 'react-modal';
import { useContext } from 'react';
import { ActiveNominationContext } from '../../../utils/context/ActiveNominationContext';



Modal.setAppElement('#root');

const MarkStageAsCompleteModal = ({ advanceStage, currentStatus }) => {
    const [activeNomination, setActiveNomination] = useContext(ActiveNominationContext);
    const [isOpen, setIsOpen] = useState(false);
    
    
    function openModal() {
      setIsOpen(true);
    };

    function closeModal() {
      setIsOpen(false);
    }   

  return (
    <div>
      <button disabled = {activeNomination.status == "Declined"} className="button next" onClick={openModal}>
        <span>&#10003;</span>Mark Stage as Complete
      </button>
      <Modal
        className="modal-container"
        overlayClassName="modal-overlay"
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Mark Stage as Complete"
      >
        <div className='modal-close-button' onClick={closeModal}>&times;</div>
          <h3 className='modal-content-text'>Do you want to mark stage as complete?</h3>
        <div className='modal-footer'> 
          <button className='modal-button-yes' onClick={() => {
            advanceStage(currentStatus);
            closeModal();
          }}>Yes</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button className="modal-button-no" onClick={closeModal}>No</button>
        </div>
      </Modal>
    </div>
  );
};

export default MarkStageAsCompleteModal;
