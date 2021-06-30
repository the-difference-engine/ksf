import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const MarkStageAsCompleteModal = ({ advanceStage, currentStatus }) => {
    const [isOpen, setIsOpen] = useState(false)
    
    function openModal() {
      setIsOpen(true);
    };

    function closeModal() {
      setIsOpen(false);
    }   

    return (
      <div>
        <button className="button next" onClick={openModal}>
          <span>&#10003;</span>Mark Stage as Complete
        </button>
        <Modal
            className="modal-style"
            overlayClassName="modal-overlay"
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Mark Stage as Complete"
        ><h3>Do You Want to Mark Stage as Complete?</h3>
        <button className='button-modal-next' onClick={() => {
            advanceStage(currentStatus);
            closeModal();
          }}>Yes</button>
        <button className="button-modal-decline" onClick={closeModal}>No</button>
        </Modal>
      </div>
    );
};

export default MarkStageAsCompleteModal;
