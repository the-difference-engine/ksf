import React, { useState } from 'react';
import Modal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  

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
            style={customStyles}
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Mark Stage as Complete"
        ><h3>Do You Want to Mark Stage as Complete?</h3>
        <button className='button next' onClick={() => {
            advanceStage(currentStatus);
            closeModal();
          }}>Yes</button>
        <button className="decline-button" onClick={closeModal}>No</button>
        </Modal>
      </div>
    );
};

export default MarkStageAsCompleteModal;
